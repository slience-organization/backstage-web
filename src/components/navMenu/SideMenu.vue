<template>
  
  <el-menu
    :default-active="this.$store.state.menus.editableTabsValue"
    @open="handleOpen" @close="handleClose"
    background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">

    <router-link to="/sys/index">
      <el-menu-item index="sysIndex" @click="selectMenu({name: 'sysIndex',title: '首页'})">
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
        <el-menu-item :index="item.name" @click="selectMenu(item)">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </router-link>
      
    </el-submenu>

  </el-menu>
  
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      menuList: this.$store.state.menus.menuList
    }
  },
  computed: {
    // menuList() {
    //   return this.$store.state.menus.menuList
    // }
  },
  methods: {
    selectMenu(item) {
      this.$store.commit('addTab', item)
    },
    selectIndex() {
      console.log(this.$store.state.menus.menuList)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    console.log('created')
    console.log(this.$store.state.menus.menuList)
  }
}
</script>

<style  scoped>
  .el-menu {
    height: 100%;
  }
</style>
