
export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      visible: false
    }
  },

  computed: {
  },

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
      this.$emit('hide')
      this.visible = false
    }
  }
}
