<template>
  <div class="gd-information-main">
    <div class="gd-information-banner">
      <img class="" src="../../assets/img/bg-information-001.png" alt="">
    </div>
    <div class="gd-information-w">
      <div class="gd-information-row">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="PP" name="first">
            <div class="gd-information-ce">
              <div class="gd-information-left">
                <el-tabs v-model="information" @tab-click="handleClick">
                  <el-tab-pane label="最新文章" name="1">
                    <div class="gd-information-article">
                      <img src="../../assets/img/bg-information-002.png" alt="">
                      <div class="gd-information-article-rl">
                        <p>PE市场口料-国产料价差对比表 (20200429)</p>
                        <p>日内美金报盘局部松动，从盘面价格看除低压注塑产品外，其余产品存一定套利机会。</p>
                        <p>
                          <span>小编：发布于：3天前</span>
                          <span>PE</span>
                        </p>
                      </div>
                    </div>
                    <div class="gd-information-article">
                      <img src="../../assets/img/bg-information-002.png" alt="">
                      <div class="gd-information-article-rl">
                        <p>PE市场口料-国产料价差对比表 (20200429)</p>
                        <p>日内美金报盘局部松动，从盘面价格看除低压注塑产品外，其余产品存一定套利机会。</p>
                        <p>
                          <span>小编：发布于：3天前</span>
                          <span>PE</span>
                        </p>
                      </div>
                    </div>
                    <div class="gd-information-article">
                      <img src="../../assets/img/bg-information-002.png" alt="">
                      <div class="gd-information-article-rl">
                        <p>PE市场口料-国产料价差对比表 (20200429)</p>
                        <p>日内美金报盘局部松动，从盘面价格看除低压注塑产品外，其余产品存一定套利机会。</p>
                        <p>
                          <span>小编：发布于：3天前</span>
                          <span>PE</span>
                        </p>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="行情早报" name="2">2</el-tab-pane>
                  <el-tab-pane label="上游动态" name="3">3</el-tab-pane>
                  <el-tab-pane label="市场快讯" name="4">4</el-tab-pane>
                  <el-tab-pane label="进出口数据" name="5">5</el-tab-pane>
                  <el-tab-pane label="外盘快讯" name="6">6</el-tab-pane>
                  <el-tab-pane label="分析报告" name="7">7</el-tab-pane>
                </el-tabs>
              </div>
              <div class="gd-information-right">
                <div class="gd-home-mark-bt">
                  <div class="gd-home-mark-blo">
                    <span>PE 市场快讯</span>
                    <span>进入快播室</span>
                  </div>
                  <div class="gd-home-market-line-br">
                    <el-timeline>
                      <el-timeline-item v-for="(activity, index) in activities" :key="index">
                        <p>{{ activity.today }}</p>
                        <p>{{ activity.timestamp.substring(0,7) }}</p>
                        {{ activity.content }}
                        <div class="gd-home-market-line-left">
                          <span class="gd-home-market-line-span">29</span>
                          {{ activity.timestamp.substring(5,10) }}
                          <p>PC</p>
                        </div>
                      </el-timeline-item>
                      <li class="el-timeline-item">
                        <div class="el-timeline-item__tail" />
                      </li>
                    </el-timeline>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="PE" name="second">2</el-tab-pane>
          <el-tab-pane label="PVC" name="third">3</el-tab-pane>
          <el-tab-pane label="PS" name="fourth">4</el-tab-pane>
          <el-tab-pane label="ABS" name="five">4</el-tab-pane>
          <el-tab-pane label="PC" name="six">4</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      information: '1',
      activities: [{
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2018-04-15',
        today: '周六'
      }, {
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2020-06-28',
        today: '周六'
      }, {
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2018-04-11',
        today: '周六'
      }, {
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2018-04-11',
        today: '周六'
      }]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less">
	.gd-information-row {
		display: flex;

		.el-tabs {
			width: 100%;
		}
	}

	.gd-information-tl {
		width: 100%;
	}

	.gd-information-ce {
		display: flex;
		justify-content: space-between;
		margin-top: 45px;
	}

	.gd-information-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}

	.gd-information-banner {
		width: 100%;
		display: block;
		height: 400px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.gd-information-w {
		width: 1200px;
		height: auto;

		.el-tabs__nav-scroll {
			display: flex;
			justify-content: center;
		}

		.el-tabs__item.is-active {
			color: #ED7B51;
		}

		.el-tabs__active-bar {
			background-color: #ED7B51;
		}

		.el-tabs__item:hover {
			color: #ED7B51;
		}

		.gd-information-left {
			width: 788px;

			.el-tabs__nav-scroll {
				justify-content: flex-start !important;
			}

			.el-tabs__nav-wrap:after {
				height: 1px;
				background-color: #ED7B51;
			}

			.el-tabs__active-bar {
				background-color: transparent !important;
			}
		}

		.gd-information-right {
			width: 363px;
			border: 1px solid #E6E6E6;
		}

		.gd-information-article {
			border-bottom: 1px dashed #E5E5E5;
			box-sizing: border-box;
			padding: 20px 0px;
			display: flex;

			img {
				width: 250px;
				height: 140px;
			}

			.gd-information-article-rl {
				width: 521px;
				margin: 0px 10px;

				p:nth-of-type(1) {
					font-size: 24px;
					color: #333333;
					text-align: left;
				}

				p:nth-of-type(2) {
					font-size: 23px;
					color: #999999;
					font-size: 12px;
					margin: 20px 0px;
					text-align: left;
				}

				p:nth-of-type(3) {
					display: flex;
					justify-content: space-between;
					font-size: 12px;
					border-top: 1px solid #E5E5E5;
					box-sizing: border-box;
					padding-top: 10px;
					color: #999999;
				}
			}
		}

		.gd-home-mark-bt {
			width: 365px;
			height: 791px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			box-sizing: border-box;
			padding: 10px 15px;
			border-right: 1px solid #E6E6E6;
		}

		.gd-home-market-line-points {
			width: 388px;

			ul {
				display: flex;
				width: 300px;
				font-size: 14px;

				li {
					width: 50px;
					border: 1px solid #eee;
					margin-right: 3px;
					cursor: pointer;
				}
			}
		}

		.gd-home-market-line-tr {
			width: 300px;
			display: flex;
			justify-content: space-between;
			font-size: 14px;
		}

		.auth_text {
			display: flex;
		}

		.gd-home-market-line-br {
			position: relative;
		}
	}

	.gd-home-market-line-br {
		margin-left: 73px;
		margin-top: 20px;
	}

	.gd-home-market-line-left {
		position: absolute;
		left: -75px;
		top: 0px;
		width: 64px;
		font-size: 12px;
		color: #EE7C51;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}

	.el-timeline-item__content {
		text-align: left;
		font-size: 13px;
    p{
      text-align: left;
    }
	}

	.gd-home-market-line-left p {
		border: 1px solid #EE7C51;
		width: 30px;
		font-size: 12px;
		height: 18px;
		line-height: 18px;
		text-align: center;
	}

	.gd-home-market-line-span {
		font-size: 25px;
		color: #EE7C51;
		font-weight: blod;
	}

	.gd-home-mark-blo {
		display: flex;
		width: 100%;
		justify-content: space-between;

		span:nth-of-type(1) {
			font-size: 18px;
			color: #EE7C51;
		}

		span:nth-of-type(2) {
			border: 1px solid #EE7C51;
			font-size: 12px;
			color: #EE7C51;
			width: 84px;

		}
	}
</style>
