<template>
  <div class="gd-login-dialog">
    <el-dialog :visible.sync="visible" width="20%">
      <login-content @afterLogin="afterLogin" />
    </el-dialog>
  </div>

</template>

<script>
import LoginContent from '@/views/user/components/LoginContent'

export default {
  name: 'LoginDialog',

  components: { LoginContent },

  mixins: [],

  props: {
  },

  data() {
    return {
      visible: false
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

  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    afterLogin(res) {
      this.hide()
      this.$emit('afterLogin', res)
    }
  }
}
</script>

<style scoped lang="less">

</style>
