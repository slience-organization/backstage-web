<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchForm.name" aria-placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定批量删除吗？" @confirm="">
          <el-button type="dander" slot="reference" :aria-disabled="delBtnStatus">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table border stripe
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="名称" width="120"></el-table-column>
      <el-table-column prop="code" label="唯一编码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status===0" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.status===1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row.id)">分配权限</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <!-- <el-button type="text">删除</el-button> -->
          <template>
            <el-popconfirm title="这是一段内容确定删除吗？">
              <el-button slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      :total="total">
      :current-page="currentPage"
    </el-pagination>

    <!-- 新增弹框 -->
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" prop="code">
          <el-input v-model="editForm.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { _getAllRoles , _addRole } from 'network/api'
export default {
  name: 'Role',
  data () {
    return {
      delBtnStatus: true,
      total: 100,
      size: 10,
      currentPage: 1,
      dialogVisible: false,
      editForm: {
        name: '',
        code: '',
        remark: ''
      },
      searchForm: {

      },
      tableData: [
        {
          name: '普通用户',
          code: 'normal',
          remark: 'aslkdjflsakdjf',
          status: 1
        }, {
          name: '管理员',
          code: 'admin',
          remark: 'aslkdjflsakdjf',
          status: 1
        }, 
      ],
      editFormRules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加或编辑接口
          this.$message('点解了添加')
          _addRole(this.editForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    _addRole(role) {
      _addRole(role).then(res => {
        //console.log(res)
      })
    },
    _getAllRoles() {
      _getAllRoles().then(res => {
        //console.log(res)
        if(res.data.code === 666) {
          this.tableData = res.data.data
        }
      })
    }
    
  },
  created() {
    this._getAllRoles()
  },
  mounted() {

  }
}
</script>

<style  scoped>
  .el-pagination {
    margin-top: 20px;
  }
</style>
