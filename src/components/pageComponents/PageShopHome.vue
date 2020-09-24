<template>
	<div class="gd-shopHome-main">
		<img class="gd-shopHome-img" src="" alt="">
		<el-container style="height: 60px" class="gd-header-main" :class="whether == true ? 'fixTitle' :''" ref="tabScroll">
			<el-header>
				<div class="gd-header-card">
					<el-menu background-color="#fff" text-color="#545C64" active-text-color="#EE7C51" mode="horizontal" :router="true"
					 :default-active="defaultActive">
						<el-menu-item v-for="(item,index) in shopMenu" :key="index" :index="item.path" :route="item">
							{{ item.meta.title }}
						</el-menu-item>
					</el-menu>
				</div>
			</el-header>
		</el-container>

	</div>
</template>

<script>
	import {
		Debounce
	} from '@/utils/FnUtils.js'
	import shopHomeRouter from '@/router/moudel/shopHome'
	export default {
		name: 'PageShopHome',
		components: {

		},
		data() {
			return {
				shopHomeRouter,
				index: 0,
				result: {},
				loading: false,
				whether: false,
				menu: ['店铺首页', '店铺分类', '店铺直播'],
				defaultActive: this.$route.path,
			}
		},
		created() {

		},
		computed: {
			shopMenu: function() {
				return shopHomeRouter.filter((item) => {
					return !item.meta.hidden
				})
			},
		},
		methods: {
			handleClick(idx) {
				this.index = idx;
				if (idx == 0) {
					this.$router.push({
						name: 'ShopHome'
					})
				} else if (idx == 1) {
					this.$router.push({
						name: 'ShopHomeProduct'
					})
				} else if (idx == 2) {
					this.$router.push({
						name: 'ShopHomeLive'
					})
				}
			},
			handleScroll: Debounce(async function() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

				if (scrollTop > 120) {
					this.whether = true
				} else {
					this.whether = false
				}
				console.log('滚动距离', scrollTop)
			}),
		},
		mounted() {
			window.addEventListener("scroll", this.handleScroll);
		},
		destroyed() {

		}
	}
</script>

<style lang="less">
	.gd-shopHome-main {
		overflow: hidden;

		.gd-shopHome-img {
			height: 120px;
			width: 100%;
			display: block;
			margin-top: 90px;
			background-color: #eee;
		}

		.el-button {
			border: 0px solid #DCDFE6;
			background-color: transparent;
			border-radius: 0px;

			a {
				text-decoration: none;
				color: #333;
			}
		}

		.shopActive {
			border-bottom: 2px solid #EE7C51 !important;
		}
	

		.fixTitle {
			position: fixed; //固定定位
			left: 0;
			top: 90px;
			z-index: 200;
			background-color: #fff;
			animation:mymove 0.6s;
			/* Safari 与 Chrome */
		}
		@keyframes mymove
		{
		from {top:0px;}
		to {top:90px;}
		}

		
	}
</style>
