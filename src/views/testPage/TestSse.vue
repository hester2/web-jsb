<template>
  <div class="TestSse">TestSse</div>

</template>

<script>
export default {
  name: 'TestSse',

  components: {},

  mixins: [],

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {
    if (typeof (EventSource) !== 'undefined') {
      this.sse()
    } else {
      this.$message.error('当前浏览器不支持服务器发送的事件')
    }
  },

  mounted() {
  },

  destroyed() {
  },

  methods: {
    sse() {
      const that = this
      const evtSource = new EventSource('http://192.168.101.106:7001/goodsShop/live/connect')
      // const evtSource = new EventSource('http://192.168.101.106:7001/goodsShop/live/connect', { withCredentials: true })
      console.log('evtSource状态码：', evtSource.readyState)
      evtSource.onopen = function(e) {
        that.$message.success('open')
        console.log(e)
      }
      evtSource.onmessage = function(e) {
        that.$message({
          title: '打印结果',
          message: e.data,
          type: 'success'
        })
      }
      evtSource.onerror = function(e) {
        // console.log('evtSource状态码：', evtSource.readyState)
        // console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
