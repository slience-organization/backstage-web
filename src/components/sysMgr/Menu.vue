<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table style="width: 100%;margin-bottom: 20px;"
      :data="tableData" row-key="id" border default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column prop="name" label="名称" sortable width="180"></el-table-column>
      <el-table-column prop="perms" label="权限编码" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.type===0">目录</el-tag>
          <el-tag size="small" v-else-if="scope.row.type===1">菜单</el-tag>
          <el-tag size="small" v-else-if="scope.row.type===2">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="菜单URL"></el-table-column>
      <el-table-column prop="component" label="菜单组件"></el-table-column>
      <el-table-column prop="orderNum" label="排序号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status===0" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.status===1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
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

    <!-- 新增弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">
        
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="editForm.parentId" placeholder="请选择上级菜单">
            <template v-for="item in tableData">
              <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
              <template v-for="child in item.children">
                <el-option :label="child.name" :value="child.id" :key="child.id">
                  <span>{{"-" + child.name}}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="perms">
          <el-input v-model="editForm.perms"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="editForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL" prop="path">
          <el-input v-model="editForm.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单组件" prop="component">
          <el-input v-model="editForm.component"></el-input>
        </el-form-item>
        
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="editForm.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="editForm.status">
            <el-radio :label=0>正常</el-radio>
            <el-radio :label=1>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum">
          <el-input-number v-model="editForm.orderNum" :min="1" label="排序号">1</el-input-number>
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
export default {
  name: 'Menu',
  data () {
    return {
      dialogVisible: false,
      editForm: {

      },
      editFormRules: {
        parentId: [
          {required: true, message:'请选择上级菜单', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        perms: [
          {required: true, message: '请输入权限编码', trigger: 'blur'}
        ],
        type: [
          {required: true, message:'请选择状态', trigger: 'blur'}
        ],
        orderNum: [
          {required: true, message: '请填入排序号', trigger: 'blur'}
        ],
        status: [
          {required: true, message:'请选择状态', trigger: 'blur'}
        ]
      },
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        status: 0,
        type: 0
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        status: 1,
        type: 0
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        type: 0,
        status: 0,
        children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            status: 0,
            type: 0
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            status: 0,
            type: 0
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        status: 0,
        type: 0
      }],
    }
  },
  created() {
    this.getMenuTree()
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    getMenuTree() {
      //获取菜单接口
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加或编辑接口
          
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style  scoped>

</style>
