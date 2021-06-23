<template>
    <el-container>
      <el-main>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <h2>Login</h2>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="loginForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
          <el-alert :title="loginErro" type="error" show-icon v-show="loginFail"></el-alert>
          <!-- <el-image src=""></el-image>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="loginForm.code"></el-input>
          </el-form-item> -->

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
</template>

<script>
  import {_getHomeMultiData, _login} from 'network/api'

  export default {
    components:{},
    props:{},
    data(){
      return {
        loginErro: '',
        loginFail: false,
        loginForm: {
          phone: '',
          password: '',
          code: ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 3, message: '长度至少3个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, message: '长度至少3个字符', trigger: 'blur' }
          ]
          // code: [
          //   { required: true, message: '请输入验证码', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
          // ]
        }
      }
    },
    watch:{},
    computed:{},
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            let {phone,password} = this.loginForm
            
            _login(phone,password).then(res => {
              if(res.data.code === 666) {
                sessionStorage.setItem('userInfo', res.data.data.user)
                sessionStorage.setItem('token', res.data.data.token)
                this.$router.push({
                  name: 'Index'
                })
                
              }else {
                this.loginErro = res.data.msg
                this.loginFail = true
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){},
    mounted(){}
  }
</script>
  
<style lang="scss" scoped>
  .el-container {
    height: 100vh;
    padding: 10% 20%;
    background-color: #F0F8FF;
  }
  .el-main {
    display: flex;
    justify-content: center;
  }
  .el-form {
    width: 50%;
    min-width: 400px;
  }
</style>