<template>
  
  <el-menu
    default-active="0"
    @open="handleOpen" @close="handleClose"
    background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">

    <router-link to="/sys/index">
      <el-menu-item index="0">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    </router-link>

    <el-submenu :index="menu.name" v-for="menu in menuList" :key="menu.name">

      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.title}}</span>
      </template>

      <router-link :to="item.path" v-for="item in menu.children" :key="item.name">
        <el-menu-item :index="item.name">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </router-link>

      <!-- <router-link to="/role">
        <el-menu-item index="1-2">
          <i class="el-icon-rank"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
      </router-link>
      
      <router-link to="/menu">
        <el-menu-item index="1-3">
          <i class="el-icon-menu"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
      </router-link> -->
      
    </el-submenu>

    <!-- <el-submenu index="2">

      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>系统工具</span>
      </template>

      <router-link to="/dict">
        <el-menu-item index="2-1">
          <i class="el-icon-s-order"></i>
          <span slot="title">数字字典</span>
        </el-menu-item>
      </router-link>

    </el-submenu> -->

  </el-menu>
  
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      
    }
  },
  computed: {
    menuList() {
      return this.$store.state.menus.menuList
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    //console.log(this.$store.state.menus.menuList)
  }
}
</script>

<style  scoped>
  .el-menu {
    height: 100%;
  }
</style>
