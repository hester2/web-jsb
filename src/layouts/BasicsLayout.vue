<template>
  <div class="basics-layout">
    <div v-if="$route.meta.keepAlive">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>

</template>

<script>
export default {
  name: 'BasicsLayout',

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

</style>
