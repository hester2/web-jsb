<template>
  <div class="gd-supply-main">
    <div class="gd-supply-top">
      <div class="gd-supply-bgc">
        <li><a href="#zqsx">账期授信</a></li>
        <li><a href="#rzzl">融资租赁</a></li>
        <li><a href="#cdzy">仓单质押</a></li>
        <li><a href="#dcdx">代采代销</a></li>
      </div>
    </div>
    <div class="gd-supply-w">
      <div id="zqsx" class="gd-supply-row">
        <div class="gd-supply-left">
          <p>金融<span>01</span></p>
        </div>
        <div class="gd-supply-right" />
        <div class="gd-supply-fied">
          <div class="gd-supply-payment">
            <p>[ 账期授信 ]</p>
            <p>以客户公司的信誉作为担保，为客户 提供先货后款的一种金融服务方式。</p>
            <p class="gd-supply-btn gd-supply-btn-co1">立即申请</p>
          </div>
          <div class="gd-supply-payment-rl" />
        </div>
      </div>
      <div id="rzzl" class="gd-supply-row">
        <div class="gd-supply-right" />
        <div class="gd-supply-left">
          <p>金融<span>02</span></p>
        </div>
        <div class="gd-supply-fied" style="left: 0px;">

          <div class="gd-supply-payment-rl gd-supply-payment-rl2" />
          <div class="gd-supply-payment gd-supply-paymentw">
            <p>[ 融资租赁 ]</p>
            <p>有效解决工厂企业采购设备融资问题 缓解企业转型升级装备改造资金问题</p>
            <p class="gd-supply-btn gd-supply-btn-co2">立即申请</p>
          </div>
        </div>
      </div>
      <div id="cdzy" class="gd-supply-row">
        <div class="gd-supply-left">
          <p>金融<span>03</span></p>
        </div>
        <div class="gd-supply-right" />
        <div class="gd-supply-fied">
          <div class="gd-supply-payment gd-left-bg3">
            <p>[ 仓单质押 ]</p>
            <p>货物质押贷款，提供原材料库存押金 融资服务，缓解库存挤压的资金压力 </p>
            <p class="gd-supply-btn gd-supply-btn-co3">立即申请</p>
          </div>
          <div class="gd-supply-payment-rl gd-right-bg3" />
        </div>
      </div>
      <div id="dcdx" class="gd-supply-row">
        <div class="gd-supply-right" />
        <div class="gd-supply-left">
          <p>金融<span>04</span></p>
        </div>
        <div class="gd-supply-fied" style="left: 0px;">
          <div class="gd-supply-payment-rl gd-left-bg4" />
          <div class="gd-supply-payment gd-right-bg4">
            <p>[ 采代采销 ]</p>
            <p>服务于工厂采购原材料业务， 增加企业现金流</p>
            <p class="gd-supply-btn gd-supply-btn-co4">立即申请</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less">
	.gd-supply-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding-top: 30px;

		.gd-supply-top {
			width: 100%;
			height: 380px;
			background-image: url(../../assets/img/bg-supply-001.png);
			background-position: center;
			display: flex;
			justify-content: center;
			box-sizing: border-box;
			padding-bottom: 20px;
			align-items: flex-end;

			.gd-supply-bgc {
				height: 120px;
				width: 880px;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;

				li {
					width: 25%;
					font-size: 26px;
					a{
						text-decoration: none;
					}
				}

				li:nth-of-type(1) a {
					color: #E75064;
				}

				li:nth-of-type(2) a{
					color: #E9BA5E;
				}

				li:nth-of-type(3) a{
					color: #6BB3D4;
				}

				li:nth-of-type(4) a{
					color: #EE7C51;
				}
			}
		}

		.gd-supply-w {
			width: 1200px;
			height: auto;
		}

		.gd-supply-row {
			height: 510px;
			width: 1200px;
			display: flex;
			position: relative;
			margin-top: 20px;

			.gd-supply-fied {
				position: absolute;
				right: 0px;
				bottom: 0px;
				width: 1131px;
				height: 422px;
				display: flex;
			}
		}

		.gd-supply-left {
			width: 295px;
			height: 510px;
			background: #D2D2D2;
			display: flex;
			justify-content: center;

			p {
				margin-top: 25px;
				color: rgba(231, 80, 100, 1);
				font-size: 19px;

				span {
					font-size: 25px;
					margin-left: 15px;
				}
			}
		}

		.gd-supply-right {
			width: 905px;
			height: 510px;
			background: rgba(238, 238, 238, 1);
		}

		.gd-supply-payment {
			width: 330px;
			height: 422px;
			background-image: url(../../assets/img/bg-supply-002.png);
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			box-sizing: border-box;
			padding-bottom: 50px;

			p:nth-of-type(1) {
				color: #fff;
				font-size: 20px;
			}

			p:nth-of-type(2) {
				width: 255px;
				color: #fff;
				font-size: 14px;
				margin: 20px 0px;
			}
		}

		.gd-supply-payment-rl {
			width: 801px;
			height: 422px;
			background-image: url(../../assets/img/bg-supply-003.png);
		}

		.gd-supply-btn {
			width: 150px;
			height: 40px;
			line-height: 40px;
			background-color: #fff;
			color: #E75064;
			text-align: center;
			border-radius: 5px;
			cursor: pointer;
		}

		.gd-supply-payment-rl2 {
			background-image: url(../../assets/img/bg-supply-004.png);
		}

		.gd-supply-paymentw {
			background-image: url(../../assets/img/bg-supply-007.png);
		}

		.gd-left-bg3 {
			background-image: url(../../assets/img/bg-supply-009.png);
		}

		.gd-right-bg3 {
			background-image: url(../../assets/img/bg-supply-005.png);
		}

		.gd-left-bg4 {
			background-image: url(../../assets/img/bg-supply-006.png);
		}

		.gd-right-bg4 {
			background-image: url(../../assets/img/bg-supply-008.png);
		}
		.gd-supply-btn-co2{
			color:#E9BA5E ;
		}
		.gd-supply-btn-co3{
			color:#6BB3D4 ;
		}
		.gd-supply-btn-co4{
			color:#EE7C51 ;
		}
	}
</style>
