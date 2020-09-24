<template>
	<div class="gd-shopHome-product-main">
		<h4><span></span>PP制品</h4>
		<div class="gd-shop-card">
			<goods-item v-for="(item,index) in result.list" :key="index" :record="item" @handleDetail="handleDetail" />
		</div>
		<div style="margin-top: 36px;text-align: center">
			<el-pagination background layout="prev, pager, next" :total="result.total" :page-size="queryParams.pageSize || 20"
			 :current-page.sync="queryParams.pageNum" @current-change="getGoodsList" />
		</div>
	</div>
</template>

<script>
	import GoodsItem from '@/views/shop/components/GoodsItem.vue'
	import {
		Debounce
	} from '@/utils/FnUtils.js'
	export default {
		components: {
			GoodsItem
		},
		data() {
			return {
				queryParams: {
					pageSize: 20,
					pageNum: 1
				},
				result: {},
				loading: false,
			}
		},
		created() {
			this.getGoodsList()
		},
		methods: {
			getGoodsList: Debounce(async function() {
				this.loading = true
				try {
					const res = await this.$ajax.goods.querySearchPage(this.queryParams)
					this.result = res.result
					this.loading = false
				} catch (e) {
					this.loading = false
				}
			}),
		}
	}
</script>

<style lang="less">
	.gd-shopHome-product-main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		h4 {
			width: 100%;
			font-size: 18px;
			font-weight: bold;
			text-align: left;
			display: flex;
			align-items: center;
			margin-left: 100px;

			span {
				height: 25px;
				width: 2px;
				background-color: #EE7C51;
				display: block;
				margin-right: 10px;
			}
		}
		.gd-shop-card {
			width: 1200px;
			display: flex;
			flex-wrap: wrap;

		}
	}
</style>
