<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchForm.username" aria-placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定批量删除吗？" @confirm="">
          <el-button type="dander" slot="reference" :disabled="delBtnStatus">批量删除</el-button>
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
      <el-table-column prop="avatar" label="头像" width="100">
        <template slot-scope="scope">
          <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="账户(手机号)" show-overflow-tooltip width="170px"></el-table-column>
      <el-table-column prop="code" label="角色名称" show-overflow-tooltip width="170px">
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-for="item in scope.row.avatar" :key="item.id">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="170px">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status===0" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.status===1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="170px"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="roleHandle(scope.row.id)">分配角色</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="repassHandle(scope.row.id,scope.row.username)">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
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
				:page-sizes="[10, 20, 50, 100]"
				:current-page="currentPage"
				:page-size="size"
				:total="total">
		</el-pagination>

    <!--新增对话框-->
		<el-dialog
				title="添加用户"
				:visible.sync="dialogVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm">
				<el-form-item label="手机号"  prop="phone" label-width="100px">
					<el-input v-model="editForm.phone" autocomplete="off"></el-input>
				</el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
					<el-input v-model="editForm.password" autocomplete="off"></el-input>
				</el-form-item>
        <el-form-item label="角色" loading prop="password" label-width="100px">
					<el-select v-model="value" placeholder="请选择" @visible-change="getAllRoles($event)">
            <el-option
              v-for="item in roles"
              :key="item.code"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
            </el-option>
          </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('editForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
			</div>
		</el-dialog>

    <!--分配权限对话框-->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="40%">
      <el-form :model="roleForm">
        <el-tree
          :data="roleTreeData"
          show-checkbox
          ref="roleTree"
          :check-strictly = checkStrictly 
          node-key="id"
          :default-expand-all = true
          :props="defaultProps">
        </el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="submitRoleHandle('roleForm')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { _getAllUsers, _addUser, _getAllRoles } from 'network/api'
export default {
  name: 'User',
  data () {
    return {
      searchForm: {},
      delBtnStatus: true,

      total: 0,
      size: 10,
      currentPage: 1,

      dialogVisible: false,
      editForm: {
        phone: '',
        password: ''
      },

      tableData: [
        {
          username: '小明',
          phone: '18771055529',
          code: 'admin',
          email: '18771055529@123.com',
          avatar: '',
          status: 0
        }, {
          username: '小红',
          phone: '456127545',
          code: 'user',
          email: '4512@123.com',
          avatar: '',
          status: 1
        },
      ],
      roles: [{
        code: 'Beijing',
        name: '北京'
      }, {
        code: 'Shanghai',
        name: '上海'
      }, {
        code: 'Nanjing',
        name: '南京'
      }],
      value: '',
      editFormRules: {
        phone: [
          {required: true, message: '请输入账户', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      roleTreeData:  [],
      treeCheckedKeys: [],
      checkStrictly: true
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
      console.log("勾选")
      console.log(val)
      this.multipleSelection = val;

      this.delBtlStatu = val.length == 0
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getUserList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    repassHandle(id, username) {
      //重置密码
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加或编辑接口
          console.log(this.editForm)
          _addUser(this.editForm).then(res => {
            if(res.data.code === 666) {
              this.dialogVisible = false
              this._getAllUsers()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    _getAllUsers() {
      _getAllUsers().then(res => {
        //console.log(res)
        if(res.data.code === 666) {
          this.tableData = res.data.data
        }
        
      })
    },
    getAllRoles(e) {//下拉框显示时获取数据
      if(e) {
        _getAllRoles().then(res => {
          console.log(res.data.data)
          this.roles = res.data.data
        })
      }
    }
  },
  created() {
    this._getAllUsers()
  }
}
</script>

<style  scoped>

</style>
