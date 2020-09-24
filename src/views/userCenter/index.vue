<template>
  <div class="gd-ucenter-main">
    <div class="gd-ucenter-bottom">
      <el-tabs v-model="activeName" style="height: auto;" :tab-position="tabPosition" @tab-click="handleClick">
        <el-tab-pane name="order">
          <div slot="label" class="gd-ucenter-tabicon">采购订单</div>
          <purchaseOrder />
        </el-tab-pane>
        <el-tab-pane name="focus">
          <div slot="label" class="gd-ucenter-tabicon"> 我的关注</div>
          <myAttention />
        </el-tab-pane>
        <el-tab-pane name="invoice">
          <div slot="label" class="gd-ucenter-tabicon">计划货单</div>
          <planInvoice />
        </el-tab-pane>
        <el-tab-pane name="certification">
          <div slot="label" class="gd-ucenter-tabicon">用户设置及认证</div>
          4
        </el-tab-pane>
        <el-tab-pane name="seller">
          <div slot="label" class="gd-ucenter-tabicon">
            <router-link to="/user/home">卖家管理中心</router-link>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import purchaseOrder from '../../components/purchaseOrder/index.vue'
import planInvoice from '../../components/planInvoice/index.vue'
import myAttention from '../../components/myAttention/index.vue'
export default {
  components: {
    purchaseOrder,
    planInvoice,
    myAttention
  },
  data() {
    return {
      tabPosition: 'left',
      activeName: 'order'
    }
  },
  mounted() {
    // 设置背景单一样式
    document.querySelector('body').setAttribute('style', 'background-color:#FAFAFA; overflow-x: hidden;')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name)
    }
  }
}
</script>

<style lang="less">
	.gd-ucenter-main {
		width: 100%;
		height: 100%;
		background-color: #FAFAFA;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding-top: 40px;

		.gd-ucenter-block {
			width: 1200px;
		}

		.gd-ucenter-bottom {
			width: 1200px;
			height: auto;

			.gd-ucenter-tabicon {
				display: flex;
				align-items: center;
				text-align: center;
				width: 100%;

				a {
					text-decoration: none;
					color: #333;
					display: block;
					display: flex;
					align-items: center;
				}
			}

			.el-tabs__nav-scroll {
				background-color: #fff;

				.el-tabs__item {
					color: #333;
					display: flex;
					align-items: center;
				}

				.el-tabs__active-bar {
					background-color: transparent;
				}
			}
			.el-tabs__item.is-active{
				background-color:#EE7C51 ;
				color: #fff;
			}
		}

		.el-tabs__nav-wrap:after {
			background-color: transparent;
		}

		.el-tabs__content{
			background-color: #fff;
			height: 100vh;
		}

	}
</style>
