<template>
  <div class="gd-uhome-main">
    <p class="gd-uhome-title">首页</p>
    <div class="gd-uhome-welcome">
      <p><img src="../../../assets/img/user/icon-uhome-001.png" alt="">欢迎使用金塑宝后台管理系统，你本次登录时间为2020年07月27日13分，登录IP：192.168.1.110.</p>
      <img src="../../../assets/img/user/icon-del.png" alt="">
    </div>
    <el-row :gutter="18" style="margin-top: 20px;">
      <el-col :span="8">
        <div class="grid-content bg-purple grid-content-user">
          <div class="gd-uhome-small-icon">
            <img src="../../../assets/img/user/icon-user.png" alt="">
          </div>
          <div class="gd-uhome-small-num">
            <p>4522</p>
            <p>商城用户</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple grid-content-user">
          <div class="gd-uhome-small-icon">
            <img src="../../../assets/img/user/icon-order.png" alt="">
          </div>
          <div class="gd-uhome-small-num">
            <p>4522</p>
            <p>商城用户</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple grid-content-user">
          <div class="gd-uhome-small-icon">
            <img src="../../../assets/img/user/icon-transaction-001.png" alt="">
          </div>
          <div class="gd-uhome-small-num">
            <p>4522</p>
            <p>商城用户</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="18" style="margin-top: 20px;">
      <el-col :span="8">
        <div class="grid-content bg-purple grid-content-order">
          <div class="gd-uhome-order-top">订单统计信息</div>
          <div class="gd-uhome-order-bottom">
            <p>
              <span>未处理订单：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>待发货订单：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>待结算订单：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>已成交订单数：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>交易失败：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple grid-content-order">
          <div class="gd-uhome-order-top">订单统计信息</div>
          <div class="gd-uhome-order-bottom">
            <p>
              <span>商品总数：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>回收站商品：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>上架商品：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>下架商品：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
            <p>
              <span>商品评论：</span>
              <span><span style="color:#FF7138 ;">0</span> 个</span>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple grid-content-order">
          <div class="gd-uhome-order-top">最新消息</div>
          <div class="gd-uhome-order-bottom">
            <p class="gd-uhome-row">
              <span class="gd-uhome-order-red" /><span class="gd-uhome-order-eon">A后台系统找那个是开通 了dddddd</span>
            </p>
            <p class="gd-uhome-row">
              <span class="gd-uhome-order-red" /><span class="gd-uhome-order-eon">A后台系统找那个是开通 了dddddd</span>
            </p>
            <p class="gd-uhome-row">
              <span class="gd-uhome-order-red" /><span class="gd-uhome-order-eon">A后台系统找那个是开通 了dddddd</span>
            </p>
            <p class="gd-uhome-row">
              <span class="gd-uhome-order-red" /><span class="gd-uhome-order-eon">A后台系统找那个是开通 了dddddd</span>
            </p>
            <p class="gd-uhome-row">
              <span class="gd-uhome-order-red" /><span class="gd-uhome-order-eon">A后台系统找那个是开通 了dddddd</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="gd-uhome-order-ml">
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="grid-content bg-purple grid-content-edit">
            <img src="../../../assets/img/user/icon-uhome-002.png" alt="">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="../../../assets/img/user/icon-uhome-003.png" alt="">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="../../../assets/img/user/icon-uhome-004.png" alt="">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="../../../assets/img/user/icon-uhome-005.png" alt="">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="../../../assets/img/user/icon-uhome-006.png" alt="">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="../../../assets/img/user/icon-uhome-007.png" alt="">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less">
	.gd-uhome-main {
		height: 100vh-10;
		box-sizing: border-box;
		padding: 0px 25px;
		display: flex;
		flex-direction: column;

		.gd-uhome-title {
			font-size: 12px;
			color: #999999;
			text-align: left;
			margin-top: 30px;
			margin-bottom: 20px;
		}

		.gd-uhome-welcome {
			background-color: #FFEAE2;
			height: 50px;
			background: rgba(255, 234, 226, 1);
			border: 1 solid rgba(255, 113, 56, 1);
			border-radius: 4px;
			display: flex;
			align-items: center;

			p {
				width: 80%;
				height: 42px;
				display: flex;
				justify-content: center;
				font-size: 12px;
				color: #FF7138;
				align-items: center;

				img {
					width: 17px;
					height: 17px;
					margin-right: 10px;
				}
			}

			img {
				width: 18px;
				height: 18px;
				float: right;
			}
		}

		.grid-content-user {
			display: flex;
			height: 160px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);

			.gd-uhome-small-icon {
				width: 25%;
				background-color: #F5F7FA;
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 40px;
					height: 46px;
				}
			}

			.gd-uhome-small-num {
				width: 75%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				box-sizing: border-box;
				padding: 0px 25px;

				p:nth-of-type(1) {
					font-size: 30px;
				}

				p:nth-of-type(2) {
					font-size: 12;
					margin-top: 10px;
				}
			}
		}

		.grid-content-order {
			box-sizing: border-box;
			padding: 0px 20px;
			display: flex;
			flex-direction: column;
			height: 311px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 4px 15px 1px rgba(32, 39, 57, 0.1);

			.gd-uhome-order-top {
				height: 49px;
				line-height: 49px;
				font-size: 13px;
				width: 100%;
				border-bottom: 1px solid rgba(227, 227, 230, 1);
				font-weight: bold;
				text-align: left;
			}
		}

		.gd-uhome-order-bottom {
			.gd-uhome-row {
				justify-content: flex-start;
			}

			p {
				display: flex;
				justify-content: space-between;
				height: 50px;
				align-items: center;
				font-weight: bold;

				span {
					font-size: 12px;
				}

				.gd-uhome-order-eon {
					width: 165px;
					height: 20px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.gd-uhome-order-red {
					width: 12px;
					height: 12px;
					display: block;
					background: rgba(255, 73, 0, 1);
					border-radius: 50%;
					margin-right: 5px;
				}
			}
		}

		.gd-uhome-order-ml {
			margin-top: 20px;
			.el-row{
				display: flex;
				justify-content: center;
			}
			.grid-content-edit{
				width: 145px;
				height: 110px;
			}

		}
	}
</style>
