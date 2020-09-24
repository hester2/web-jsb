<template>
  <div class="login-main">
    <div class="gd-login-main">
      <div class="gd-login-row">
        <div class="gd-home-login">
          <login-content @afterLogin="afterLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LoginContent from '@/views/user/components/LoginContent'

export default {
  name: 'Login',
  components: {
    LoginContent
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    afterLogin() {
      if (this.$route.query.redirect) {
        this.$router.path(this.$route.query.redirect)
      } else {
        this.$router.push({ name: 'Index' })
      }
    }
  }
}
</script>
<style lang="less">
  .login-main {
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
      height: 335px;
      width: 250px;
      background-color: #fff;
      z-index: 999;
      box-shadow: 0px 1px 6px 0px rgba(25, 8, 15, 0.17);
    }

    .gd-home-login-comp {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p:nth-of-type(1) {
        margin-bottom: 20px;
      }

      img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
        margin-top: 20px;
      }

      p {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    .gd-home-login-to {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      box-sizing: border-box;
      padding: 0px 20px;
      margin-top: 9px;
      color: #333333;
      display: flex;
      justify-content: flex-end;

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

    .gd-home-login-to:nth-of-type(2) {
      margin-top: 0px;
      display: flex;
      justify-content: flex-start;
      font-size: 14px;
    }

    .gd-home-login-bo {
      display: flex;
      justify-content: space-between;
      margin: 12px 0px;
      width: 100%;

      span:nth-of-type(1) {
        display: block;
        color: #ADADAD;
        font-size: 12px;
      }

      span:nth-of-type(2) {
        display: block;
        color: #FF7444;
        font-size: 12px;
      }
    }

    .gd-home-login-third {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      img {
        display: block;
        width: 15px;
        height: 14px;
      }

      img:nth-of-type(1) {
        margin-right: 6px;
      }

      img:nth-of-type(2) {
        margin-left: 6px;
      }
    }

    .gd-home-login-mr {
      font-size: 12px;
      margin: 0px;
      height: 19px;
    }

    .el-divider__text {
      font-size: 12px;
      color: #666666;
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

    .el-tabs__content {
      overflow: visible;
    }

    .el-tabs__item:hover {
      color: #EE7C51;
    }
  }

</style>
