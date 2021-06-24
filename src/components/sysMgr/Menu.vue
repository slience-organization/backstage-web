<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
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
      <el-table-column prop="component" label="菜单组件"></el-table-column
      <el-table-column prop="orderNum" label="排序号"></el-table-column>
      <el-table-column prop="status" label="类型">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status===0" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.status===1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      dialogVisible: false,
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
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style  scoped>

</style>
