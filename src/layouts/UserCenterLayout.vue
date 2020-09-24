<template>
  <el-container class="gd-user-center-layout" style="flex-direction: column;min-height: 100vh">
    <page-header />
    <el-container style="width: 1200px;margin:90px auto;padding-top: 20px">
      <el-aside width="160px">
        <el-menu
          background-color="#fff"
          text-color="#545C64"
          active-text-color="#EE7C51"
          router
          :default-active="defaultActive"
        >
          <el-menu-item
            v-for="(item,index) in menuList"
            :key="index"
            :index="`${item.path}`"
            :route="item"
          >
            {{ item.meta.title }}
          </el-menu-item>
          <el-menu-item @click="goSellerCenter">
            卖家管理中心
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin-left: 10px;">
        <div v-if="$route.meta.keepAlive">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
        <div v-else>
          <router-view />
        </div>
        <page-chart />
      </el-main>
    </el-container>
    <page-footer />
  </el-container>

</template>

<script>
import userCenter from '@/router/moudel/userCenter'
import { PageHeader, PageFooter, PageChart } from '@/components'

export default {
  name: 'UserCenterLayout',

  components: { PageHeader, PageFooter, PageChart },

  mixins: [],

  props: {},

  data() {
    return {
      userCenter,
      defaultActive: this.$route.path
    }
  },

  computed: {
    menuList: function() {
      return userCenter.filter((item) => {
        return !item.meta.hidden
      })
    }
  },

  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val)
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
    goSellerCenter() {
      /* window.location.href = 'http://www.baidu.com'*/
      this.$message.success('功能尚在开发中……')
    }
  }
}
</script>

<style scoped lang="less">
  .gd-user-center-layout {
    background-color: #FAFAFA;
    width: 100%;
    min-height: 100vh;
    .gd-user-center-layout-main {
      width: 1200px;
      margin: auto;
      padding-top: 20px;
       .el-menu-item.is-active{
        background-color:#EE7C51 ;
      }
    }
    .el-main{
      overflow: inherit;
      width: 1040px;
    }
    .el-menu{
      border: none;
    }
    .is-active{
      background-color: #EE7C51 !important;
      color: #fff !important;
    }
    .el-menu-item, .el-submenu__title{
      height: 45px;
      line-height: 45px;
    }
  }
</style>
