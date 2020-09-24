<template>
  <el-header class="gd-page-header" style="height: 90px">
    <el-container style="height: 30px" class="gd-header-top">
      <div class="gd-header-cp">
        <div class="gd-header-le">
          <span>金塑宝欢迎您!</span>
          <span v-if="isLogin">{{ userInfo.phone }}</span>
          <span v-else @click="handleLogin">登录</span>
          <span>|</span>
          <span v-if="isLogin" style="cursor: pointer;" @click="handleLogOut">退出</span>
          <span v-else @click="handleRegist">注册</span>
        </div>
        <div class="gd-header-le">
          <span>
            <span @click="goUserCenter">用户中心</span>
          </span>
          <span>|</span>
          <span>帮助中心</span>
          <span>|</span>
          <span>客服热线:123456789</span>
        </div>
      </div>
    </el-container>

    <el-container style="height: 60px" class="gd-header-main">
      <el-header>
        <div class="gd-header-card">
          <img src="../../assets/logo-1.png" style="float:left;" alt="" @click="()=>{$router.push({name:'Home'})}">
          <el-menu
            background-color="#fff"
            text-color="#545C64"
            active-text-color="#EE7C51"
            mode="horizontal"
            :router="true"
            :default-active="defaultActive"
          >
            <el-menu-item
              v-for="(item,index) in shopMenu"
              :key="index"
              :index="item.path"
              :route="item"
            >
              {{ item.meta.title }}
            </el-menu-item>
          </el-menu>
          <div class="gd-header-col">
            <input
              v-model="issue_content"
              type="text"
              placeholder="请输入牌号进行搜索"
              @input="inputFunc"
            >
            <el-button type="primary" size="small">搜索</el-button>

            <div v-show="serch_result_issue" class="gd-header-serch-result">
              <li v-for="item in searchData" @click="handleActive(item.name)">
                {{ item.name }}
              </li>
            </div>
          </div>
        </div>
      </el-header>
    </el-container>

  </el-header>
</template>

<script>
import shopRouter from '@/router/moudel/shop'
import { mapGetters, mapActions } from 'vuex'
import { APP_TYPE } from '@/store/mutation-types'
import userInfoMixins from '@/Mixins/userInfoMixins'

export default {
  name: 'PageHeader',
  mixins: [userInfoMixins],
  data() {
    return {
      APP_TYPE,
      shopRouter,
      defaultActive: this.$route.path,
      chartShow: false,
      issue_content: '', // 输入框中的内容
      serch_result_issue: false // 控制搜索的问题显示隐藏
    }
  },
  computed: {
    isLogin: function() {
      // console.log(!!this.userInfo.phone && !!this.token)
      return !!this.userInfo.phone && !!this.token
    },
    shopMenu: function() {
      return shopRouter.filter((item) => {
        return !item.meta.hidden
      })
    },
    // 表单模糊搜索
    searchData() {
      var issue_content = this.issue_content
      if (issue_content) {
        return this.serch_result.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return String(product[key]).toLowerCase().indexOf(issue_content) > -1
          })
        })
      }
      return this.products
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // console.log(val)
        this.defaultActive = val.path
        this.$forceUpdate()
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {

  },
  mounted() {

  },
  destroyed() {

  },
  methods: {
    ...mapActions('user', ['Logout']),
    inputFunc() {
      if (this.issue_content.length > 0) {
        this.serch_result_issue = true
      } else {
        this.serch_result_issue = false
      }
    },
    goUserCenter() {
      // console.log('userCenter', this.$router)
      if (this.isLogin) {
        this.$router.push({ path: '/userCenter' })
      } else {
        this.$message.warning('请先登录')
      }
    },
    handleActive(o) {
      this.issue_content = o
      this.serch_result_issue = false
    },
    handleRegist() {
      this.$router.push({ name: 'Register' })
    },
    handleLogin() {
      this.$router.push({ name: 'Login' })
    },
    async handleLogOut() {
      const res = await this.Logout({ appType: APP_TYPE, phone: this.userInfo.phone })
      if (res.code === 200) {
        this.$message.success('退出登录成功')
      }
    }
  }
}
</script>

<style lang="less">
  .gd-page-header {
    padding: 0;
    height: auto;
		position: fixed;
		width: 100%;
		z-index:1000;

    .gd-header-top {
      width: 100%;
      height: 30px;
      display: flex;
      background-color: #000;
      justify-content: center;
    }

    .gd-header-cp {
      display: flex;
      width: 1150px;
      height: 30px;
      line-height: 30px;
      justify-content: space-between;
    }

    .gd-header-le {
      font-size: 14px;
      color: #fff;

      a {
        text-decoration: none;
        color: #fff;
      }
    }

    .gd-header-le span {
      height: 30px;
      line-height: 30px;
      margin-right: 5px;
      cursor: pointer;
    }

    .gd-header-le span:nth-of-type(1) {
      margin-right: 20px;
    }

    .gd-header-le:nth-of-type(1) span:nth-of-type(2) {
      color: #EE7C51;
    }

    .gd-header-le:nth-of-type(2) span:nth-of-type(1) {
      margin-right: 5px;
    }

    .gd-header-col {
      display: flex;
      justify-content: flex-start;
      position: relative;

      .gd-header-serch-result {
        position: absolute;
        background-color: #fff;
        top: 40px;
        left: 0px;
        width: 226px;
        z-index: 999;
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);

        li {
          text-align: left;
          font-size: 14px;
          color: #666;
          box-sizing: border-box;
          padding-left: 20px;
          cursor: pointer;
        }
      }
    }

    .gd-header-col .el-button {
      padding: 0px 10px;
    }

    .gd-header-col input {
      height: 35px;
      line-height: 35px;
      box-sizing: border-box;
      padding: 0px 20px;
      border: none;
      border: 1px solid #ccc;
      border-radius: 5px 0px 0px 5px;
      width: 180px;

      outline: none;
    }
  }

  //头部

</style>
