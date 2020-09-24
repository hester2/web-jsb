<template>
	<div class="gd-logistics-main">
		<div class="gd-logistics-top">
			<img class="gd-logistics-img" src="../../assets/img/bg-logistics-001.png" alt="">
			<div class="gd-logistics-from">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="装货点">
						<el-input v-model="form.name" />
					</el-form-item>
					<el-form-item label="卸货点">
						<el-input v-model="form.unload" />
					</el-form-item>
					<el-form-item label="货物形态">
						<el-input v-model="form.elv" />
					</el-form-item>
					<el-form-item class="gd-logistics-toe">
						<el-button type="primary" @click="onSubmit">查运价</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="gd-logistics-search">
				<div class="gd-logistics-search-col"><img src="../../assets/img/icon-logistics-001.png" alt=""> 物流查询</div>
				<div class="gd-header-col"><input type="text" placeholder="请输入牌号进行搜索">
					<el-button type="primary" size="small">查找</el-button>
				</div>
			</div>
		</div>
		<div class="gd-logistics-w">
			<div class="gd-logistics-w-left">
				<div class="gd-logistics-w-top">
					<p><span /><span>实时货源</span></p>
					<p>成本优势/保障安全/快捷省心</p>
				</div>
				<div class="gd-logistics-w-bottom">
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column prop="address" label="装货点-卸货点" width="250" />
						<el-table-column prop="name" label="货物" width="130" />
						<el-table-column prop="num" label="数量" width="80" />
						<el-table-column prop="freight" label="运费" width="100" />
						<el-table-column prop="date" label="发布日期" width="108" />
						<el-table-column label="操作" width="80">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="handleClick(scope.row)">接单</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="gd-marke-block gd-logistics-block">
						<el-pagination :current-page="currentPage" :page-size="10" layout=" prev, pager, next, jumper,total" :total="1000"
						 @size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</div>
				</div>
			</div>
			<div class="gd-logistics-w-right">
				<div class="gd-logistics-w-top">
					<p><span /><span>实时数据</span></p>
					<p />
				</div>
				<div class="gd-logistics-w-bottom">
					<div class="gd-logistics-w-row">
						<p><span>广东省，广州市,天河区->福建省，厦门市，思明区</span><span>2020-01-25</span></p>
						<p><span>10000吨</span><span>已发货</span></p>
					</div>
					<div class="gd-logistics-w-row">
						<p><span>广东省，广州市,天河区->福建省，厦门市，思明区</span><span>2020-01-25</span></p>
						<p><span>10000吨</span><span>已发货</span></p>
					</div>
					<div class="gd-logistics-w-row">
						<p><span>广东省，广州市,天河区->福建省，厦门市，思明区</span><span>2020-01-25</span></p>
						<p><span>10000吨</span><span>已发货</span></p>
					</div>
					<div class="gd-logistics-w-row">
						<p><span>广东省，广州市,天河区->福建省，厦门市，思明区</span><span>2020-01-25</span></p>
						<p><span>10000吨</span><span>已发货</span></p>
					</div>
				</div>
			</div>
		</div>

		<div class="gd-logistics-cr">
			<div class="gd-logistics-cr-row">
				<div class="gd-logistics-cr-col">
					<img src="../../assets/img/icon-logistics-002.png" alt="">
					<h4>省时</h4>
					<p>当天下单当天派车</p>
					<p>10分钟内响应您的物流</p>
				</div>
				<div class="gd-logistics-cr-col">
					<img src="../../assets/img/icon-logistics-003.png" alt="">
					<h4>省心</h4>
					<p>全程跟踪、短信通知</p>
					<p>专业物流服务确保货物安全送达</p>
				</div>
				<div class="gd-logistics-cr-col">
					<img src="../../assets/img/icon-logistics-004.png" alt="">
					<h4>省力</h4>
					<p>塑料专车、起运数量无限制</p>
					<p>让你的货说走就走</p>
				</div>
				<div class="gd-logistics-cr-col">
					<img src="../../assets/img/icon-logistics-005.png" alt="">
					<h4>省钱</h4>
					<p>丰富的物流配送方式、回程车</p>
					<p>安全快捷、帮您节约每一分成本 </p>
				</div>
			</div>
		</div>
		<div class="gd-logistics-b">
			<img style="margin-top: 20px;" src="../../assets/img/bg-logistics-002.png" alt="">
		</div>
		<div class="gd-logistics-ml">
			<div class="gd-logistics-ml-ce">
				<div class="gd-logistics-vl">
					<img src="../../assets/img/icon-logistics-006.png" alt="">
					<p>15759230988</p>
				</div>
				<div class="gd-logistics-vr">
					<img src="../../assets/img/icon-logistics-007.png" alt="">
					<p>173280999</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: 4,
				form: {
					name: '',
					unload: '',
					elv: ''
				},
				tableData: [{
					address: '广东省，广州市->福建省，厦门市',
					name: '香港石化-SR600',
					num: '5',
					freight: '1300',
					date: '2020-11-13'
				}, {
					address: '广东省，广州市->福建省，厦门市',
					name: '香港石化-SR600',
					num: '5',
					freight: '1300',
					date: '2020-11-13'
				}, {
					address: '广东省，广州市->福建省，厦门市',
					name: '香港石化-SR600',
					num: '5',
					freight: '1300',
					date: '2020-11-13'
				}, {
					address: '广东省，广州市->福建省，厦门市',
					name: '香港石化-SR600',
					num: '5',
					freight: '1300',
					date: '2020-11-13'
				}]
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!')
			},
			handleClick(row) {
				console.log(row)
			},
			// 分页
			handleCurrentChange(currentPage) {
				// currentPage 当前点击的页数
				this.currentPage = currentPage
				console.log('vv' + currentPage)
			},
			handleSizeChange() {
				console.log('gg')
			}
		}
	}
</script>

<style lang="less">
	.gd-logistics-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.gd-logistics-img {
			width: 100%;
			height: 400px;
		}

		.gd-logistics-top {
			height: 680px;
			width: 100%;
			position: relative;
			display: flex;

			.gd-logistics-from {
				position: absolute;
				width: 380px;
				height: 282px;
				bottom: 110px;
				left: 504px;
				background-color: #333333;
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;

				.el-button {
					width: 202px !important;
				}

				.el-form-item__label {
					color: #fff;
				}

				.el-form {
					height: 240px;
				}

				.el-button--primary:focus,
				.el-button--primary:hover {
					background: #EE7C51;
					border-color: #EE7C51;
					color: #fff;
				}
			}

			.gd-logistics-search {
				position: absolute;
				bottom: 164px;
				left: 1053px;
				width: 314px;
				height: 77px;

				.gd-logistics-search-col {
					display: flex;
					font-size: 14px;
					margin-bottom: 15px;

					img {
						width: 28px;
						height: 28px;
						margin-right: 10px;
					}
				}

				.gd-header-col {
					display: flex;
					justify-content: flex-start;
				}

				.gd-header-col .el-button {
					padding: 0px 10px;
					border-radius: 0px 3px 3px 0px;
				}

				.gd-header-col input {
					height: 35px;
					line-height: 35px;
					box-sizing: border-box;
					padding: 0px 20px;
					border: none;
					border: 1px solid #ccc;
					border-radius: 5px 0px 0px 5px;
					width: 180px;

					outline: none;
				}
			}

			.gd-logistics-toe .el-form-item__content {
				margin-left: 50px;
			}
		}

		.gd-logistics-cr {
			height: 585px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #F5F5F5;
		}

		.gd-logistics-cr-row {
			width: 1200px;
			height: 428px;
			display: flex;

			.gd-logistics-cr-col {
				width: 25%;
				height: 428px;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-right: 10px;

				&:last-of-type {
					margin-right: 0px;
				}

				img {
					width: 105px;
					height: 104px;
					display: block;
				}

				h4 {
					color: rgba(51, 51, 51, 1);
					font-size: 16px;
					margin: 10px 0px;
					margin-top: 30px;
				}

				p {
					font-size: 12px;
					color: #999999;
				}
			}
		}

		.gd-logistics-w {
			width: 1200px;
			display: flex;
			justify-content: space-between;
			height: auto;
		}

		.gd-logistics-w-left {
			width: 750px;
			height: 400px;
			margin-top: 30px;

			.el-table--border td,
			.el-table--border th,
			.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
				border-right: 0px solid #ebeef5;
				text-align: center;
			}

			.el-table--border,
			.el-table--group {
				border: none
			}

			.el-table--border:after,
			.el-table--group:after,
			.el-table:before {
				background-color: transparent;
			}

			.el-table thead {
				background-color: #F8F8F8;
			}

			.el-table th,
			.el-table tr {
				background-color: transparent;
			}

			.el-table td,
			.el-table th {
				padding: 9px 0px;
			}

			.el-table tr td:last-of-type .cell button {
				background-color: #EE7C51;
				width: 60px;
				height: 24px;
				line-height: 24px;
				display: block;

				span {
					display: block;
					width: 60px;
					height: 24px;
					line-height: 5px;
					color: #fff;
				}
			}

			.gd-marke-block {
				display: flex;
				justify-content: flex-end;
			}

			.gd-logistics-block {
				margin-top: 10px;
			}

			.el-pager li.active {
				color: #EE7C51;
			}
		}

		.gd-logistics-w-right {
			width: 380px;
			height: 400px;
			margin-top: 30px;

			.gd-logistics-w-row {
				width: 380px;
				height: 64px;
				border-bottom: 1px solid #E6E6E6;
				box-sizing: border-box;
				padding: 10px 0px;
				display: flex;
				justify-content: space-between;

				p:nth-of-type(1) {
					flex: 10;
					text-align: left;

					span {
						display: block;
					}

					span:nth-of-type(1) {
						font-size: 14px;
						color: #000;
					}

					span:nth-of-type(2) {
						font-size: 13px;
						color: #999999;
					}
				}

				p:nth-of-type(2) {
					text-align: right;
					flex: 2;

					span {
						display: block;
					}

					span:nth-of-type(1) {
						font-size: 14px;
						color: #000;
					}

					span:nth-of-type(2) {
						font-size: 13px;
						color: #EE7C51;
					}
				}
			}
		}

		.gd-logistics-w-top {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 15px;

			p:nth-of-type(1) {
				display: flex;

				span:nth-of-type(1) {
					width: 3px;
					height: 18px;
					display: block;
					background: rgba(238, 124, 81, 1);
					margin-right: 8px;
				}

				span:nth-of-type(2) {
					height: 18px;
					line-height: 18px;
					font-size: 15px;
				}
			}

			p:nth-of-type(2) {
				font-size: 13px;
				color: #666666;
			}
		}

		.gd-logistics-w-bottom {
			height: 360px;
			width: 100%;
		}

		.gd-logistics-b {
			width: 803px;
			height: 283;
			margin-bottom: 70px;
		}

		.gd-logistics-ml {
			width: 100%;
			height: 585px;
			background-image: url(../../assets/img/bg-logistics-003.png);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.gd-logistics-ml-ce {
			width: 800px;
			height: 300px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.gd-logistics-vl {
			width: 50%;
			height: 180px;
			border-right: 1px solid #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			img {
				width: 69px;
				height: 60px;
			}

			p {
				color: #fff;
				margin-top: 10px;
			}
		}

		.gd-logistics-vr {
			width: 50%;
			height: 180px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			img {
				width: 69px;
				height: 60px;
			}

			p {
				color: #fff;
				margin-top: 10px;
			}
		}
	}
</style>
