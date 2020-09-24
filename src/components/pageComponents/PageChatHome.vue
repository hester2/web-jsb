<template>
	<div style="box-sizing: border-box; width: 67px;" class="gd-chatIms-main">
		<el-container style="height: 100%" :class="whether == true ? 'fixTitle' :''" ref="tabScroll">
			<el-header style="height: 100%;">
				<div class="gd-header-chat-card">
					<el-menu background-color="#28292C" style="height: 100%;" text-color="#545C64" active-text-color="#EE7C51" :router="true"
					 :default-active="defaultActive">
            <img width="35" style="margin-top: 10px"  :src="userInfo.headAddr" alt="">
						<el-menu-item v-for="(item,index) in shopMenu" :key="index" :index="item.path" :route="item">
              <div class="gd-layout-chat-icon">
                <span :class="item.meta.icon"></span>
              </div>
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
	import PageChatHomeRouter from '@/router/moudel/shopChat'
  import {
    mapGetters
  } from 'vuex'
	export default {
		name: 'PageChatHome',
		components: {

		},
		data() {
			return {
				PageChatHomeRouter,
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
				return PageChatHomeRouter.filter((item) => {
					return !item.meta.hidden
				})
			},
      ...mapGetters([
        'userInfo'
      ]),
		},
		methods: {},
		mounted() {

		},
		destroyed() {

		}
	}
</script>

<style lang="less">
	.gd-chatIms-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 100%;
		box-sizing: border-box;
		height:81.3vh;

		.gd-chatIm-w {
			width: 1024px;
			height: 88vh;
			background-color: #fff;
			display: flex;
			box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
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
			animation: mymove 0.6s;
			/* Safari 与 Chrome */
		}

		@keyframes mymove {
			from {
				top: 0px;
			}

			to {
				top: 90px;
			}
		}

		.gd-header-chat-card {
			width: 100%;
			height: 100%;
		}

		.el-header {
			background-color: transparent !important;
			padding: 0px;
		}
		.el-container{
			width: 100%;
		}
    .el-menu-item{
      display: flex;
      align-items: center;
    }
    .el-menu-item:nth-of-type(1){
      margin-top: 20px;
      .gd-layout-chat-icon {
        span {
          font-size: 27px;
        }
      }
    }
    .gd-layout-chat-icon{
      span{
        font-size: 30px;
      }
    }
	}
</style>
