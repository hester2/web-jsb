<template>
	<div class="gd-supplierDetail-main">
		<img class="gd-supplierDetail-img" src="../../../assets/bg-make.png"
		 alt="">
		<div class="w gd-supplierDetail-bgc">
			<div class="gd-supplierDetail-left">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="公司简介" name="first">
						<div style="display: flex;">
							<img src="../../../assets/bg-make-jianjie.png" width="210" height="157"
							 alt="">
							<p style="font-size: 13px;margin-left: 15px;">中国石油华南化工销售公司负责中国石油化工产品在广东、福建、广西、海南四省（区）的市场营销业务。主营合成树脂、合成橡胶、合成纤维原料、有机化工产品和无机化工产品共五个大类石油化工产品，年销售规模超过250万吨，年销售收入超过200亿元。 公司总部位于广州，在厦门、深圳、南宁、海口、汕头设有销售分公司；在福州、珠海、湛江设有代表处。
</p>
						</div>
					</el-tab-pane>
					<el-tab-pane label="公司相册" name="second">
						<el-carousel height="157px">
							<el-carousel-item>
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOEQqABMCkAASabELT9LI448.jpg" alt="">
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOERGAdscpAAQ4zY1qYcY245.JPG" alt="">
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOEReAa6rEAAI8u5T9eqc330.jpg" alt="">
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOER2AbiKtAAePPzIoRDQ556.JPG" alt="">
							</el-carousel-item>
							<el-carousel-item>
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOEQqABMCkAASabELT9LI448.jpg" alt="">
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOERGAdscpAAQ4zY1qYcY245.JPG" alt="">
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOEReAa6rEAAI8u5T9eqc330.jpg" alt="">
								<img src="https://img.es1688.com/group1/M00/02/03/Cg1Dp1wOER2AbiKtAAePPzIoRDQ556.JPG" alt="">
							</el-carousel-item>
						</el-carousel>
					</el-tab-pane>
				</el-tabs>
			</div>
			<div class="gd-supplierDetail-right">
				<p>中国石油天然气股份有限公司华南化工销售分公司</p>
				<p><img src="http://s.es-jia.net/kz/ui/common/img/contact.png" alt="">王先生</p>
				<p><img src="http://s.es-jia.net/kz/ui/common/img/phone.png" alt="">020-38931326</p>
				<p><img src="http://s.es-jia.net/kz/ui/common/img/location.png" alt=""><span>广州市天河区黄埔大道中199号广州中国石油大厦21层</span></p>
			</div>
		</div>
		<div class="w gd-supplierDetail-type">
			<p>全部产品</p>
			<el-table :data="tableData">
				<el-table-column prop="type" label="分类" width="100">
				</el-table-column>
				<el-table-column prop="mark" label="牌号" width="100">
				</el-table-column>
				<el-table-column prop="firm" label="厂商" width="100">
				</el-table-column>
				<el-table-column prop="price" label="价格">
				</el-table-column>
				<el-table-column prop="num" label="数量" >
				</el-table-column>
				<el-table-column prop="address" label="产地">
				</el-table-column>
				<el-table-column prop="sendare" label="发货地" >
				</el-table-column>
				</el-table-column>
				<el-table-column prop="logistics" label="物流">
				</el-table-column>
				<el-table-column label="咨询" width="200">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">洽谈</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">详情</el-button>
					</template>
				</el-table-column>
				
			</el-table>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="5">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				tableData: [{
					type: '黑色母',
					mark: 'NB9089',
					firm: '泉州中石化',
					price: '电议',
					num: '50',
					address: '中国',
					sendare: '泉州',
					logistics: '配送'
				}, {
					type: '黑色母',
					mark: 'NB9089',
					firm: '泉州中石化',
					price: '电议',
					num: '50',
					address: '中国',
					sendare: '泉州',
					logistics: '配送'
				}, {
					type: '黑色母',
					mark: 'NB9089',
					firm: '泉州中石化',
					price: '电议',
					num: '50',
					address: '中国',
					sendare: '泉州',
					logistics: '配送'
				}, {
					type: '黑色母',
					mark: 'NB9089',
					firm: '泉州中石化',
					price: '电议',
					num: '50',
					address: '中国',
					sendare: '泉州',
					logistics: '配送'
				}]
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}
	};
</script>

<style lang="less">
	.gd-supplierDetail-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.gd-supplierDetail-img {
			width: 100%;
			height: 444px;
		}

		.w {
			width: 1200px;
			background-color: #fff;
		}

		.gd-supplierDetail-bgc {
			background-color: #fff;
			border: 1px solid #ccc;
			display: flex;
			width: 980px;
			margin-top: 80px;
			box-sizing: border-box;
			padding: 0px 15px;
		}

		.gd-supplierDetail-left {
			width: 759px;
			margin: 15px 0px;
		}

		.gd-supplierDetail-right {
			width: 235px;
			border-left: 1px solid #ccc;
			box-sizing: border-box;
			padding: 5px 15px;

			p:nth-of-type(1) {
				white-space: pre-wrap;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				text-align: center;
				font-weight: bold;
				-webkit-box-orient: vertical;
				overflow: hidden;
				margin-top: 20px;
				height: 42px;
			}

			p {
				font-size: 13px;
				margin-top: 10px;
				display: flex;

				img {
					margin-left: 20px;
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				span {
					display: block;
				}
			}

			p:nth-of-type(2) {
				img {
					width: 20px;
				}
			}
		}

		.el-tabs__nav-wrap::after {
			background-color: transparent;
		}

		.el-carousel__item {
			display: flex;

			img {
				width: 200px;
				height: 150px;
				margin-right: 10px;
			}
		}
		.gd-supplierDetail-type{
			width: 980px;
			margin-top:50px;
			border: 1px solid #ccc;
			box-sizing: border-box;
			padding: 20px 0px;
			p{
				margin-left: 20px;
				margin-bottom: 10px;
				color: #666;
			}
			.el-button{
				background-color: #F6F6F6;
				color: #333;
				border: 1px solid #eee;
			}
			.el-table .cell{
				text-align: center;
			}
			.el-table__row td:nth-of-type(2){
				color: #f39700;
			}
			.el-table__row td:nth-of-type(3){
				color: #333;
				font-weight: bold;
			}
			.el-table__row td:nth-of-type(4){
				color: red;
			}
			.el-table td, .el-table th.is-leaf{
				border: none;
			}
			.el-table th{
				background-color:#EFEFEF ;
				border:1px solid #ccc
			}
		}
		.el-pagination{
			display: flex;
    justify-content: flex-end;
		}
	}
</style>
