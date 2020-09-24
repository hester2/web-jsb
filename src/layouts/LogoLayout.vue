<template>
  <div class="gd-logo-layout">
    <div class="gd-logo-layout-header">
      <div class="gd-logo-content">
        <img src="../assets/logo-1.png" alt="" @click="handleRoute">
        <p>{{ $route.meta.title }}</p>
      </div>
    </div>
    <div v-if="$route.meta.keepAlive" class="gd-logo-layout-main">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div v-else class="gd-logo-layout-main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoLayout',

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

  methods: {
    handleRoute() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
  .gd-logo-layout {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:center;
    .gd-logo-layout-header {
      width: 1200px;
      height: 100px;
      .gd-logo-content {
        width: 600px;
        height: 76px;
        display: flex;
        align-items:flex-end;
				margin-bottom: 10px;
        img {
          width: 206px;
          height: 33px;
          cursor: pointer;
          display: block;
        }

        p {
          color: #666;
          font-size: 20px;
          margin-left: 20px;
          border-left: 1px solid #ccc;
          box-sizing: border-box;
          padding-left: 15px;
        }
      }

    }

    .gd-logo-layout-main {
      width: 100%;
    }

  }

</style>
