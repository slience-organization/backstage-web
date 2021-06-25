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
      <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="code" label="角色名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-for="item in scope.row.avatar" :key="item.id">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status===0" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.status===1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
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
				title="提示"
				:visible.sync="dialogVisible"
				width="600px"
				:before-close="handleClose">

			<el-form :model="editForm" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户名" prop="username" label-width="100px">
					<el-input v-model="editForm.username" autocomplete="off"></el-input>
					<el-alert
							title="初始密码为888888"
							:closable="false"
							type="info"
							style="line-height: 12px;"
					></el-alert>
				</el-form-item>
				<el-form-item label="邮箱"  prop="email" label-width="100px">
					<el-input v-model="editForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号"  prop="phone" label-width="100px">
					<el-input v-model="editForm.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态"  prop="statu" label-width="100px">
					<el-radio-group v-model="editForm.statu">
						<el-radio :label="0">禁用</el-radio>
						<el-radio :label="1">正常</el-radio>
					</el-radio-group>
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

      editFormRules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        statu: [
          {required: true, message: '请选择状态', trigger: 'blur'}
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

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created() {

  }
}
</script>

<style  scoped>

</style>
