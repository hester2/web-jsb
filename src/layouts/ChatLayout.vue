<template>
  <div class="gd-shop-layout" style="overflow: hidden">
    <page-header/>
    <div style="width: 100%;display: flex;justify-content: center;padding-bottom: 20px">
      <div class="gd-chatIm-layout-sm">
        <Page-chat-home></Page-chat-home>
        <div class="gd-logo-layout-chat-tbt">
          <div v-if="$route.meta.keepAlive" class="gd-logo-layout-main-s">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </div>
          <div v-else class="gd-logo-layout-main gd-logo-layout-main-b">
            <router-view/>
          </div>

        </div>
      </div>
    </div>
    <!-- <page-chart :class="!isChart==false?'gd-page-ml-chat':''" /> -->
  </div>
</template>

<script>
  import shopChatRouter from '@/router/moudel/shopChat'
  import {
    Debounce
  } from '@/utils/FnUtils.js'
  import {
    PageHeader,
    PageChart,
    PageFooter,
    PageChatHome
  } from '@/components'

  export default {
    name: 'ChatLayout',
    components: {
      PageFooter,
      PageChart,
      PageHeader,
      PageChatHome
    },

    mixins: [],

    props: {},

    data() {
      return {
        shopChatRouter,
        chartShow: false,
      }
    },

    computed: {
      isChart: function () {
        console.log(this.$route.path)
        return this.$route.path === '/chat'
      }
    },

    watch: {},

    created() {
    },

    mounted() {

    },

    destroyed() {
    },

    methods: {}
  }
</script>

<style lang="less">
  .gd-logo-layout-main-s {
    margin-top: 110px;

  }

  .gd-chatIm-layout-sm {
    display: flex;
    justify-content: center;
    width: 1091px;
    height: 81.3vh;
    margin-top: 110px;
    overflow: hidden;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
  }

  .gd-logo-layout-chat-tbt {
    width: 1024px;
    height: 81.3vh;
    background-color: #fff;
    display: flex;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
  }

  .gd-logo-layout-main-b {
    overflow: hidden;
  }
</style>
