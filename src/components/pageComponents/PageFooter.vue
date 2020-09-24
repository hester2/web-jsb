<template>
  <el-footer class="gd-page-footer">
    <div class="gd-page-footer-content">
      <div class="gd-footer">金塑宝信息科技有限公司版权所有2020 闽ICP备88888888号</div>
    </div>
  </el-footer>

</template>

<script>
export default {
  name: 'PageFooter',

  components: {},

  mixins: [],

  props: {},

  data() {
    return {}
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

<style scoped lang="less">
  .gd-page-footer {
    display: flex;
    align-items: center;
    justify-content: center;

    .gd-page-footer-content {
      margin: auto;
      width: 1200px;
      .gd-footer {
        text-align: center;
        background-color: transparent;
        color: #999999;
        font-size: 12px;
      }
    }

    .el-footer {
      height: 100px !important;
    }
  }
</style>
