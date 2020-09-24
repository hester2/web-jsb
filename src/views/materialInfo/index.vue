<template>
  <!-- 富文本编辑页面/对私 -->
  <div class="gd-text-main">
    <div class="gd-text-card">
      <textEdit />
    </div>
  </div>
</template>

<script>
import textEdit from '@/components/textEdit/index.vue'
export default {
  components: {
    textEdit
  },
  data() {
    return {

    }
  },
  created() {

  }
}
</script>

<style lang="less">
	.gd-text-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.gd-text-card {
			margin-top: 100px;
			width: 900px;
			height: auto;
		}
	}
</style>
