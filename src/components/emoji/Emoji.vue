<template>
  <span class='rong-emoji-content' :name='text'  @click="emojiClick"> {{text}} </span>
</template>
<script>
export default {
  components: {},
  props: ['text', 'isInput'],
  data() {
    return {}
  },
  methods: {
    emojiClick() {
      this.$emit('onClick', this.text)
    }
  }
}
</script>
