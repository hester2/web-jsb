export default {
  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      visible: false,
      form: {},
      rules: {}
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
    add(data) {
      this.visible = true
      this.$refs.form.resetFields()
      this.afterAdd(data)
    },
    afterAdd(data) {},
    edit(data) {
      console.log('dialogFormMixins.edit', data)
      this.visible = true
      Object.keys(this.form).forEach((k) => {
        if (data[k]) {
          this.form[k] = data[k]
        }
        this.afterEdit(data)
      })
    },
    afterEdit(data) {},
    handleValidate(mode) {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          if (mode !== 'test') {
            this.handleSubmit()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSubmit() {},
    hide() {
      this.$emit('hide')
      this.visible = false
    }
  }
}
