<template>
  <div class="bind-phone-dialog">
    <el-dialog title="绑定手机号" :visible.sync="visible" width="20%" :append-to-body="true">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="nickname">
          <el-input v-model="form.nickname" placeholder="用户昵称" />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input v-model="form.verifyCode" type="text" placeholder="请输入验证码" autocomplete="off" />
          <el-button v-show="sendWxAuthCode" type="primary" @click="submitCode">获取验证码</el-button>
          <el-button v-show="!sendWxAuthCode" type="primary" class="auth_text">{{ auth_time }}秒后重发</el-button>
        </el-form-item>
        <el-button type="primary" class="gd-home-btn" @click="handleValidate()">提交</el-button>
      </el-form>
    </el-dialog>

  </div>

</template>

<script>
import { mapActions } from 'vuex'
import dialogFormMixins from '@/Mixins/dialogFormMixins'

export default {
  name: 'BindPhoneDialog',

  components: {},

  mixins: [dialogFormMixins],

  props: {},

  data() {
    return {
      auth_time: 0,
      sendWxAuthCode: true,
      // 绑定手机号表单
      form: {
        verifyCode: '',
        phone: '',
        nickname: '',
        appType: 1,
        wxUnionId: ''
      },
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
        }
        ],
        verifyCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      }
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {
  },

  destroyed() {
  },

  methods: {
    ...mapActions('user', ['BindPhone']),
    /* afterEdit(data) {
      this.form.nickname = data.nickName
    },*/
    async submitCode() {
      await this.$refs.form.validateField('phone', async(errorMessage) => {
        console.log(errorMessage)
        if (!errorMessage) {
          try {
            const res = await this.$ajax.user.loginCode({ phone: this.form.phone })
            this.$message.success(res.message)
            this.sendAuthCode = false
            this.auth_time = 60
            this.countDown()
          } catch (e) {
            // this.$message.error(e.message)
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
    // 绑定手机号
    async handleSubmit() {
      const res = await this.BindPhone(this.form)
      if (res) {
        this.$emit('submit', res)
        this.hide()
      }
    }
  }
}
</script>

<style scoped lang="less">
.bind-phone-dialog{
  .el-form {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0px 20px;
    position: relative;

    .gd-home-login-code {
      height: 244px;
      width: 100%;
      position: absolute;
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

    .gd-login-wchat {
      background-color: #fff;
      height: 335px;
      width: 100%;
      position: absolute;
      z-index: 999;
      top: -69px;
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
        left: -17px;
      }

      p {
        position: absolute;
        bottom: 41px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 15px;
      }

      img {
        display: block;
        margin-left: 200px;
        margin-top: 10px;
      }
    }
  }
}
</style>
