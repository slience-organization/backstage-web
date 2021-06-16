<template>
  <div style="...">
    <h2>你好! {{ userInfo.username }} 同学</h2>

    <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="10epx">
      <el-form-item label="旧密码" prop="currentPass">
        <el-input type="password" v-model="passForm.currentPass" autocomplete="off"></el-input></el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="passForm.password" autocomplete="off"></el-input></el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passForm')">提交</el-button><el-button @click="resetForm( 'passForm ')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'UserCenter',
  data () {
    let validatePass = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入密码'))
      }else if(value != this.passForm.password) {
        callback(new Error('密码不一致！'))
      }else {
        callback()
      }
    }

    return {
      userInfo: {

      },
      passForm: {
        password: '',
        checkPass: '',
        currentPass: ''
      },
      rules: {
        password: [
          {required: true, message: '请输入密码', tigger: 'blur'},
          {min: '6', tigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass, tigger: 'blur'}
        ],
        currentPass: [
          {required: true, message: '请输入密码', tigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$message('提交表单')
    }
  },
}
</script>

<style  scoped>

</style>
