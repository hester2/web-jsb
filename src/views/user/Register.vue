<template>
  <div class="register-container">
    <div class="gd-login-main">
      <div class="gd-login-row">
        <div class="gd-home-login">
          <div class="gd-home-login-to">注册</div>
          <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-input v-model="form.verifyCode" type="text" placeholder="请输入验证码" autocomplete="off" />
              <el-button v-show="sendRegAuthCode" type="primary" @click="submitCode">获取验证码</el-button>
              <el-button v-show="!sendRegAuthCode" type="primary" class="auth_text">{{ regist_auth_time }}秒后重发</el-button>
            </el-form-item>
            <el-button type="primary" class="gd-home-btn" @click="submitRegisterForm('form')">注册</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Message
} from 'element-ui'

export default {
  name: 'Register',
  components: {
  },
  data() {
    return {
      dialogSoft: false,
      dialogWeChat: false,
      appid: 'wxe4cd6faf73a4952f',
      scope: 'snsapi_login',
      activeName: 'first',
      state: 'a-zA-Z0-9',
      sendRegAuthCode: true,
      /* 验证码‘倒计时' */
      auth_time: 0,
      regist_auth_time: 0,
      // 注册
      form: {
        verifyCode: '',
        phone: '',
        nickname: '',
        identificationCode: 1,
        appType: 1
      },
      // 表单验证
      rules: {
        phone: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '您输入正确的手机号码',
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        verifyCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
  },
  methods: {
    async submitCode() {
      await this.$refs.form.validateField('phone', async(errorMessage) => {
        if (errorMessage === '') {
          try {
            const res = await this.$ajax.user.loginCode({ phone: this.form.phone })
            this.$message.success(res.message)
            this.sendAuthCode = false
            this.auth_time = 60
            this.countDown()
          } catch (e) {
            this.$message.error(e.message)
          }
        }
      })
    },
    // 倒计时
    countDown() {
      setTimeout(() => {
        if (this.auth_time) {
          this.auth_time--
          this.countDown()
        } else {
          this.sendAuthCode = true
        }
      }, 1000)
    },
    // 注册接口
    submitRegisterForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/Register', this.form)
            .then(response => {
              this.$router.push({ name: 'Home' })
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
<style lang="less">
  .register-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .gd-login-main {
      height: 480px;
      background-image: url(../../assets/img/bg-login-001.png);
      width: 100%;
      background-size: 100% 100%;
      position: relative;
    }

    .gd-home-login {
      position: absolute;
      right: 400px;
      top: 75px;
      height: 300px;
      width: 250px;
      background-color: #fff;
      z-index: 999;
      box-shadow: 0px 1px 6px 0px rgba(25, 8, 15, 0.17);
    }

    .gd-home-login-to {
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      margin-top: 20px;
      color: #333333;
      text-align: center;
      font-size: 16px;

      span {
        border: 1px solid #ff5722;
        font-size: 12px;
        color: #ff5722;
        height: 24px;
        line-height: 24px;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 0px 5px;
      }

      img {
        display: block;
        width: 28px;
        height: 28px;
      }
    }

    .el-form {
      width: 250px;
      height: auto;
      box-sizing: border-box;
      padding: 0px 20px;
      position: relative;

      .gd-home-login-code {
        height: 244px;
        width: 100%;
        position: absolute;
        z-index: 999;
        top: -28px;
        left: 0px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
          width: 80px;
          height: 80px;
          display: block;
        }

        p:nth-of-type(1) {
          font-size: 15px;
        }

        p:nth-of-type(2) {
          font-size: 14px;
        }
      }

      .el-form-item__content {
        margin-left: 0px !important;
        border-bottom: 1px solid #DBDBDB;
        margin-top: 15px;
        display: flex;

        .el-input__inner {
          padding: 0px;
        }

        .el-button {
          width: 130px;
          height: 22px;
          line-height: 22px;
          margin: 0px !important;
          background: rgba(235, 235, 235, 1);
          border: none;

          span {
            display: block;
            width: 100%;
            height: 22px;
            line-height: 22px;
            color: #FF6735;
            text-align: center;
            font-size: 12px !important;
          }
        }
      }

      .el-form-item {
        margin-bottom: 10px;
      }

      .el-tabs__content {
        overflow: auto;
      }

      .el-input {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }

      .el-icon-s-custom {
        color: #999;
      }

      .el-input__inner {
        border: none;
        height: 28px;
        line-height: 28px;
      }

      .el-button--primary {
        width: 100%;
        height: 35px;
        padding: 0px;
        margin-top: 10px;
      }

      .el-input__icon {
        line-height: 30px;
      }

      .el-form-item__error {
        line-height: 16px;
      }
    }

    .gd-home-login-btm {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0px 20px;
    }

    .el-tabs__nav-wrap:after {
      background-color: transparent;
    }

    .el-tabs__header {
      box-sizing: border-box;
      padding: 0px 30px;
    }

    .el-tabs__item.is-active {
      color: #EE7C51;
    }

    .el-tabs__active-bar {
      background-color: #EE7C51;
    }

    .el-tabs__item {
      padding: 0px 10px;
    }

    .gd-login-wchat {
      background-color: #fff;
      height: 335px;
      width: 250px;
      position: absolute;
      z-index: 99999;
      top: -94px;
      left: 0px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      align-items: center;

      .gd-login-wchat-top {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 44px;
        left: -24px;
      }
      p{
        position: absolute;
        bottom: 41px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 15px;
      }
      img{
        display: block;
        margin-left: 200px;
        margin-top: 10px;
      }
    }
    .el-tabs__content{
      overflow: visible;
    }
    .el-tabs__item:hover{
      color: #EE7C51;
    }

  }
</style>
