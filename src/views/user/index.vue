<template>
  <div class="gd-manage-main">
    <el-container>
      <el-aside>
        <el-row class="gd-manage-top">
          <img src="../../assets/img/icon-manage-001.png" alt="">
          <router-link to="/">电商管理后台</router-link>
        </el-row>
        <el-row>
          <el-col>
            <el-menu
              :default-active="activeMenu"
              class="el-menu-vertical-demo"
              background-color="#00152A"
              text-color="#B3B3B3"
              active-text-color="#fff"
              mode="vertical"
              router
            >
              <el-menu-item-group index="1">
                <el-menu-item index="/user/home">
                  <div class="gd-manage-tabicon">
                    <img src="../../assets/img/user/icon-home.png" alt="">
                    <span>首页</span>
                  </div>
                </el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-product.png" alt="">
                    <span>产品管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user/productTable/product">产品类表</el-menu-item>
                  <el-menu-item index="/user/productTable/brand">品牌管理</el-menu-item>
                  <el-menu-item index="/user/productTable/classification">分类管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-picture.png" alt="">
                    <span>图片管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user/picture/ficationManage">广告管理</el-menu-item>
                  <el-menu-item index="/user/picture/advertising">分类管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-transaction.png" alt="">
                    <span>交易管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user/trading/information">交易信息</el-menu-item>
                  <el-menu-item index="/user/trading/contract">合同签署</el-menu-item>
                  <el-menu-item index="/user/trading/order">订单管理</el-menu-item>
                  <el-menu-item index="/user/trading/transaction">交易金额</el-menu-item>
                  <el-menu-item index="/user/trading/orderDeal">订单处理</el-menu-item>
                  <el-menu-item index="/user/trading/management">退款管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-payment.png" alt="">
                    <span>支付管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="">支付记录</el-menu-item>
                  <el-menu-item index="1-2">支付方式</el-menu-item>
                  <el-menu-item index="1-2">合同配置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-vip.png" alt="">
                    <span>会员管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="">用户列表</el-menu-item>
                  <el-menu-item index="1-2">用户管理</el-menu-item>
                  <el-menu-item index="1-2">记录管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="7">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-shop.png" alt="">
                    <span>店铺管理</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="">上架列表</el-menu-item>
                  <el-menu-item index="1-2">店铺审核</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="8">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-new.png" alt="">
                    <span>消息管理</span>
                  </div>
                </template>
              </el-submenu>
              <el-submenu index="9">
                <template slot="title">
                  <div class="gd-manage-icon">
                    <img src="../../assets/img/user/icon-system.png" alt="">
                    <span>系统管理</span>
                  </div>
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <div class="gd-manage-mainted">
          <div class="gd-manage-left">
            <img src="../../assets/img/user/icon-back.png" alt="">
            <router-link to="/userCenter">返回个人中心</router-link>
          </div>
          <div class="gd-manage-right">
            <p class="gd-manage-date">
              <el-badge :value="3" class="item">
                <i class="el-icon-s-comment" />
              </el-badge>
            </p>
            <p class="gd-manage-date">
              2020年07月27日
            </p>
            <div class="gd-manage-out">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <img src="../../assets/img/icon-manage-001.png" alt="">
                  <span class="gd-manage-me">
                    <span>欢迎您！</span>
                    <span>兴得铭贸易</span>
                  </span>
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <router-view />

      </el-main>

    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    // 我们使用计算属性来获取到当前点击的菜单的路由路径，然后设置default-active中的值
    // 使得菜单在载入时就能对应高亮
    activeMenu() {
      const route = this.$route
      const {
        meta,
        path
      } = route
      // 可以在路由配置文件中设置自定义的路由路径到meta.activeMenu属性中，来控制菜单自定义高亮显示
      if (meta.htactiveMenu) {
        return meta.htactiveMenu
      }
      return path
    }
  },
  created() {

  },
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command)
    }
  }
}
</script>

<style scoped lang="less">
	.gd-manage-main {
		.el-aside {
			width: 200px !important;
			background-color: rgb(0, 21, 42);
		}

		.el-container {
			height: 100vh;
		}

		.el-menu {
			border: none;
		}

		.gd-manage-top {
			width: 199px;
			height: 66px;
			line-height: 66px;
			background-color: #002140;
			font-size: 16px;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;

			a {
				text-decoration: none;
				color: #fff;
			}

			img {
				width: 38px;
				height: 30px;
				margin-right: 6px;
			}
		}

		.el-submenu__title {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.gd-manage-tabicon {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 56px;

			img {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
		}

		.gd-manage-icon {
			display: flex;
			height: 56px;
			justify-content: flex-start;
			align-items: center;

			img {
				display: block;
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
		}

		.gd-manage-mainted {
			height: 60px;
			z-index: 9999999;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 4px 4px 0px rgba(169, 169, 169, 0.25);
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0px 20px;
		}

		.gd-manage-out {
			width: 150px;
			cursor: pointer;
			display: flex;
			align-items: center;

			.gd-manage-me {
				display: flex;
				flex-direction: column;
			}

			.el-dropdown-link {
				display: flex;
				align-items: center;
			}

			img {
				margin-right: 10px;
			}

			span {
				display: block;
				font-size: 12px;

				span:nth-of-type(2) {
					color: #FF7138;
				}
			}
		}

		.gd-manage-date {
			color: #212121;
			font-size: 12px;
			line-height: 60px;
			margin-right: 10px;
			border-right: 1px solid #EFEFEF;
			box-sizing: border-box;
			padding: 0px 25px;
			font-weight: bold;

			[class*=" el-icon-"],
			[class^=el-icon-] {
				font-size: 28px;
			}
		}

		.gd-manage-left {
			flex: 3;
			display: flex;
			align-items: center;

			a {

				font-size: 12px;
				font-weight: bold;
				text-decoration: none;
				color: #333;
			}

			img {
				width: 14px;
				height: 14px;
				margin-right: 10px;
			}

		}

		.gd-manage-right {
			flex: 9;
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
