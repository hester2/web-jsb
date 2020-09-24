<template>
  <div>
    <div class="w gd-regist-main">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="ruleForm.code" type="text" autocomplete="off" />
          <el-button type="primary" @click="submitCode">发送验证码</el-button>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getRegister
} from '@/api/user.js' // 调用接口
import {
  loginCode
} from '@/api/user.js'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      // 注册
      ruleForm: {
        pass: '',
        name: ''
      },
      rules: {
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          min: 0,
          max: 11,
          message: '您输入的账号有误',
          trigger: 'blur'
        }
        ]
      }
    }
  },
	created() {
		
	},
  methods: {
    submitCode() {
      loginCode({
        phone: this.ruleForm.name

      }).then(response => {
        console.log(response)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getRegister({
            loginRegisterVo: '注册',
            appType: 1

          }).then(response => {

          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
	.gd-regist-main{
		width: 300px;
	}
</style>
