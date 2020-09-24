<template>
	<div>
		<div class="gd-preview-ler">
			<p class="gd-preview-pty">商品分类</p>
			<el-collapse @change="handleFication">
				<el-collapse-item v-for="(item,index) in productItem" :key="index" :title="item.name">
					<p class="gd-ufin-ellipsis" v-for="o in item.children">{{o.title}}</p>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script>
	import {
		Debounce
	} from '@/utils/FnUtils.js'
	export default {
		name: 'productTitle',
		props: {
			productItem: Array
		},
		watch: {
			productItem(val) {
				this.localRecord = val
			}
		},
		data() {
			return {
				localRecord: '',
			}
		},
		methods: {
			handleFication(val) {
				console.log(val)
			},
		},
		mounted() {
			
		},
		created() {}
	}
</script>

<style lang="less">
	.gd-preview-ler {
		position: fixed;
		z-index: 9999999999999;
		bottom: 100px;
		left: 0px;
		width: 200px;
		height: auto;
		border: 1px solid rgba(230, 230, 230, 1);

		.gd-preview-pty {
			background-color: #EE7C51;
			color: #fff;
			text-align: left;
			height: 45px;
			line-height: 45px;
			font-size: 14px;
			box-sizing: border-box;
			padding: 0px 10px;
		}

		.el-collapse-item {
			.el-collapse-item__header {
				background-color: #F8F8F8;
				box-sizing: border-box;
				padding: 0px 10px;
			}
		}

		.el-collapse-item__content {
			p {
				text-align: left;
				box-sizing: border-box;
				padding-left: 10px;
			}

			p:hover {
				color: #EE7C51;
				cursor: pointer;
			}
		}
	}
</style>
