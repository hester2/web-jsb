<template>
  <div class="gd-shop-layout">
    <el-container style="flex-direction: column;">
      <page-header />
      <el-main style="margin-top: 90px;">
        <div v-if="$route.meta.keepAlive">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
        <div v-else>
          <router-view />
        </div>
				
        <page-chart :class="!isChart==false?'gd-page-ml-chat':''"/>
				<page-live></page-live>
        <wei-xin-register-dialog ref="WeiXinRegisterDialog" />
      </el-main>
      <page-footer />
    </el-container>
  </div>

</template>

<script>
import shopRouter from '@/router/moudel/shop'
import { PageHeader, PageChart, PageFooter,PageLive,PageChatHome } from '@/components'
import { mapActions } from 'vuex'
import WeiXinRegisterDialog from '@/views/user/components/WeiXinRegisterDialog'
import userInfoMixins from '@/Mixins/userInfoMixins'

export default {
  name: 'ShopLayout',

  components: {
    PageFooter,
    PageChart,
    PageHeader,
		PageLive,
		PageChatHome,
    WeiXinRegisterDialog
  },

  mixins: [userInfoMixins],

  props: {},

  data() {
    return {
      shopRouter,
      chartShow: true,
      issue_content: '', // 输入框中的内容
      serch_result_issue: false, // 控制搜索的问题显示隐藏
      serch_result: [
        {
          name: '7042'
        },
        {
          name: '7041'
        },
        {
          name: '2220'
        },
        {
          name: '2220'
        },
        {
          name: '2220'
        }
      ]
    }
  },

  computed: {
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
    },
		isChart:function(){
			return this.$route.path === '/chat'
		}
  },

  watch: {
     
  },

  created() {
    
  },

  mounted() {
    if (this.$route.query.code && !this.token && Object.keys(this.userInfo).length === 0) {
      this.wxLogin()
    }
  },

  destroyed() {
  },

  methods: {
    ...mapActions('user', ['WxLogin']),
    async wxLogin() {
      const res = await this.WxLogin(
        {
          appId: 'wxe4cd6faf73a4952f',
          secret: 'ed6deab4586f40c9a1f9cd4c7c05e88d',
          code: this.$route.query.code,
          grantType: 'authorization_code'
        }
      )
      console.log(res)
      if (res.result.bindState === 0) {
        this.$refs.WeiXinRegisterDialog.edit(res.result)
      } else {
        // this.emitAfterLogin(res)
      }
    },
		handleState(){
			console.log(this.$route.query.rcInfoState)
			
		},
    goUserCenter() {
      this.$router.push({ name: 'purchaseOrder' })
    },
    handleActive(o) {
      this.issue_content = o
      this.serch_result_issue = false
    },
    // 表单模糊搜索
    inputFunc() {
      if (this.issue_content.length > 0) {
        this.serch_result_issue = true
      } else {
        this.serch_result_issue = false
      }
    },
    handleRegist() {
      this.$router.push({
        name: 'Register'
      })
    },
    handleLogin() {
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style scoped lang="less">
.gd-shop-layout{
  width: 100%;
  min-height: 100vh;
}
.gd-page-ml-chats{
	display: none;
}

</style>
