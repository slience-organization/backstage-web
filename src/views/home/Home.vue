<template>
  
  <el-container>
    <el-aside width="200px">
      <side-menu></side-menu>
    </el-aside>
    
    <el-container>
      <el-header>
        <strong>后台管理系统</strong>
        <div class="header-avator">
          <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="" target="">网站</el-link>
          <el-link href="" target="">网站</el-link>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import SideMenu from 'components/navMenu/SideMenu.vue'
  
  export default {
    name: 'Home',
    components:{
      SideMenu,
    },
    props:{},
    data(){
      return {
      }
    },
    watch:{},
    computed:{},
    methods:{},
    created(){},
    mounted(){}
  }
</script>
  
<style lang="scss" scoped>
  .el-container {
    padding: 0;
    margin: 0;
    height: 100vh;
  }
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .header-avator {
    width: 220px;
    float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>