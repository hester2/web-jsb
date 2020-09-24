<template>
  <div class="gd-shop-layout">
    <page-header/>
    <page-chart :chart-show="chartShow"/>
    <page-chart-home/>
    <div v-if="$route.meta.keepAlive" class="gd-logo-layout-main">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <div v-else class="gd-logo-layout-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import shopHomeRouter from '@/router/moudel/shopHome'
  import {
    PageHeader,
    PageChart,
    PageFooter,
    pageChartHome
  } from '@/components'

  export default {
    name: 'ShopHomeLayout',

    components: {
      PageFooter,
      PageChart,
      PageHeader,
      pageChartHome
    },

    mixins: [],

    props: {},

    data() {
      return {
        shopHomeRouter,
        chartShow: false,
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

    methods: {}
  }
</script>

<style lang="less">

</style>
