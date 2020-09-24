<template>
  <div class="gd-goods-sort">
    <div>{{ label }}</div>
  </div>

</template>

<script>
export default {
  name: 'GoodsSort',

  components: {},

  mixins: [],

  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [Number, String],
    label: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      localValue: null
    }
  },

  computed: {},

  watch: {
    value(val) {
      this.localValue = val
    },
    localValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },

  created() {
  },

  mounted() {
  },

  destroyed() {
  },

  methods: {}
}
</script>

<style scoped>

</style>
