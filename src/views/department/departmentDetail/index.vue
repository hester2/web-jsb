<template>
  <div class="gd-depart-detail-main">
    <department />
    <div class="gd-depart-detail-w">

      <div class="gd-depart-detail-top"><span @click="handleRoute">首页</span>>物性科学院</div>
      <img src="../../../assets/img/bg-depart-detail-001.png" width="" alt="">
      <div class="gd-depart-detail-br">
        <span />
        <span>正在销售PA-77D的优质供应商</span>
      </div>
      <div class="gd-depart-detail-mar">
        <div class="gd-home-supplier">
          <img src="../../../assets/img/icon-home-009.png" alt="">
          <p>天津大故化工股份有限 公司</p>
          <p>主营材质：ABS、PS</p>
          <p>
            <el-rate v-model="value" disabled text-color="#EE7C51" />
          </p>
        </div>
        <div class="gd-home-supplier">
          <img src="../../../assets/img/icon-home-009.png" alt="">
          <p>天津大故化工股份有限 公司</p>
          <p>主营材质：ABS、PS</p>
          <p>
            <el-rate v-model="value" disabled text-color="#EE7C51" />
          </p>
        </div>
        <div class="gd-home-supplier">
          <img src="../../../assets/img/icon-home-009.png" alt="">
          <p>天津大故化工股份有限 公司</p>
          <p>主营材质：ABS、PS</p>
          <p>
            <el-rate v-model="value" disabled text-color="#EE7C51" />
          </p>
        </div>
        <div class="gd-home-supplier">
          <img src="../../../assets/img/icon-home-009.png" alt="">
          <p>天津大故化工股份有限 公司</p>
          <p>主营材质：ABS、PS</p>
          <p>
            <el-rate v-model="value" disabled text-color="#EE7C51" />
          </p>
        </div>
        <div class="gd-home-supplier">
          <img src="../../../assets/img/icon-home-009.png" alt="">
          <p>天津大故化工股份有限 公司</p>
          <p>主营材质：ABS、PS</p>
          <p>
            <el-rate v-model="value" disabled text-color="#EE7C51" />
          </p>
        </div>
      </div>
      <div class="gd-marke-cen">
        <table class="gd-marke-row">

          <tbody>
            <div v-for="(item,index) in tableData" :key="index" class="gd-marke-head">
              <div class="gd-marke-head-row">
                <li>{{ item.material }}</li>
                <li>{{ item.brand }}</li>
                <li>{{ item.manufacturer }}</li>
                <li>{{ item.price }}</li>
                <li>{{ item.supplier }}</li>
                <li>{{ item.address }}</li>
                <li>
                  <img
                    v-if="item.isshow==false"
                    class="gd-marke-fold"
                    src="../../../assets/img/icon-depart-detail-001.png"
                    alt=""
                    @click="onshow(index,item)"
                  >
                  <img
                    v-else-if="item.isshow==true"
                    class="gd-marke-fold"
                    src="../../../assets/img/icon-depart-detail-001.png"
                    alt=""
                    @click="onshow(index,item)"
                  >
                </li>

              </div>
              <div v-show="item.isshow" class="lx-main-role">
                <table class="gd-marke-row-nested" cellpadding="0" cellspacing="0">
                  <thead>
                    <tr>
                      <td>供应商</td>
                      <td>数量</td>
                      <td>当前报价</td>
                      <td>票据</td>
                      <td>货物所在地</td>
                      <td>交货方式</td>
                      <td>交货日期</td>
                      <td>更新时间</td>
                      <td>操作</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ item.custome }}</td>
                      <td>{{ item.num }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.paper }}</td>
                      <td>{{ item.address }}</td>
                      <td>{{ item.delivery }}</td>
                      <td>{{ item.dateTime }}</td>
                      <td>{{ item.newDate }}</td>
                      <td>
                        <el-button size="mini" @click="handleChart(index,item)">委托谈价</el-button>
                        <el-button size="mini" @click="handleOrder(index,item)">自主下单</el-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import department from '@/components/department/index.vue'
export default {
  components: {
    department
  },
  data() {
    return {
      value: 3.7,
      tableData: [{
        id: 0,
        material: 'PA-757',
        brand: '台湾奇美',
        manufacturer: '20',
        price: '华东华南配送',
        supplier: '现货',
        custome: '上海市供应商1',
        num: '999',
        paper: '其它商业数据',
        address: '东莞',
        delivery: '仓库自提',
        dateTime: '现货',
        newDate: '2020-3-20'
      }, {
        id: 1,
        material: 'PA-757',
        brand: '台湾奇美',
        manufacturer: '20',
        price: '华东华南配送',
        supplier: '现货',
        custome: '上海市供应商1',
        num: '999',
        paper: '其它商业数据',
        address: '东莞',
        delivery: '仓库自提',
        dateTime: '现货',
        newDate: '2020-3-20'
      }, {
        id: 2,
        material: 'PA-757',
        brand: '台湾奇美',
        manufacturer: '20',
        price: '华东华南配送',
        supplier: '现货',
        custome: '上海市供应商1',
        num: '999',
        paper: '其它商业数据',
        address: '东莞',
        delivery: '仓库自提',
        dateTime: '现货',
        newDate: '2020-3-20'
      }, {
        id: 3,
        material: 'PA-757',
        brand: '台湾奇美',
        manufacturer: '20',
        price: '华东华南配送',
        supplier: '现货',
        custome: '上海市供应商1',
        num: '999',
        paper: '其它商业数据',
        address: '东莞',
        delivery: '仓库自提',
        dateTime: '现货',
        newDate: '2020-3-20'
      }]
    }
  },
  created() {
    return this.tableData.map(item => {
      this.$set(item, 'isshow', false)
      return item
    })
  },
  methods: {
    // 查看详情
    onshow(o, v) {
      console.log(v)
      const nowStatu = v.isshow
      v.isshow = !nowStatu
      console.log(nowStatu)
    },
    // 委托聊天
    handleChart(o, v) {
      console.log(o)
    },
    // 自主下单
    handleOrder(o, v) {
      console.log(o)
    },
    // 跳转首页
    handleRoute() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
	.gd-depart-detail-main {
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		.gd-depart-detail-w {
			width: 1200px;
			height: auto;
		}

		.gd-depart-detail-top {
			width: 100%;
			font-size: 16px;
			text-align: left;
			margin-top: 50px;
			margin-bottom: 30px;
			span:nth-of-type(1){
				cursor: pointer;
			}
		}

		.gd-depart-detail-br {
			width: 100%;
			display: flex;
			margin-top: 50px;

			span:nth-of-type(1) {
				width: 3px;
				height: 18px;
				background: rgba(238, 124, 81, 1);
				display: block;
				margin-right: 10px;
			}

			span:nth-of-type(2) {
				color: #000;
				height: 18px;
				line-height: 18px;
				font-size: 14px;
				display: block;
				text-align: left;
			}
		}

		.gd-depart-detail-mar {
			width: 100%;
			display: flex;
			margin-top: 25px;
		}

		.gd-home-supplier {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 1px solid #E6E6E6;
			height: 326px;
			margin-left: -1px;
			width: 239px;

			img {
				width: 117px;
				height: 117px;
				display: block;
			}

			p {
				font-size: 13px;
				color: #000;
				height: 25px;
				line-height: 25px;
				margin-top: 15px;
			}

			p:nth-of-type(2) {
				display: flex;
				color: #999999;
			}
		}
		//底部
			.gd-marke-cen {
			width: 1200px;
			height: auto;
			margin-top: 30px;
		}

		.gd-marke-fold {
			display: block;
			width: 8px;
			height: 8px;
		}

		.gd-marke-block {
			display: flex;
			justify-content: flex-end;
		}

		.gd-marke-row {
			width: 1200px;
		}

		.gd-marke-head {
			width: 1200px;

			.el-button {
				padding: 0px 15px;
			}
		}

		.gd-marke-head-row {
			display: flex;
			width: 1200px;
		}

		.gd-marke-row .gd-marke-row-top {
			display: flex;
			width: 1200px;
			border-bottom: 1px solid #e6e6e6;
			background-color: #E5E5E5;
		}

		.gd-marke-row .gd-marke-row-top li {
			font-weight: bold;
			width: 201px !important;
			height: 30px !important;
			padding: 0px;
			color: #666;
			font-size: 14px;
		}

		.gd-marke-row .gd-marke-row-top li:first-of-type {
			width: 50px !important;
		}

		.gd-marke-row .gd-marke-row-top li:last-of-type {
			width: 120px !important;
			max-width: 80px;
		}

		.gd-marke-row .gd-marke-head li {
			width: 201px !important;
			height: 40px !important;
			line-height: 40px;
			padding: 0px;
			color: #666;
			font-size: 14px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.gd-marke-head li:nth-of-type(3) {
			color: #ED7B51;
		}

		.gd-marke-head li:nth-of-type(5) {
			color: #ED7B51;
		}

		.gd-marke-row .gd-marke-head li:last-of-type {
			width: 120px !important;
			max-width: 80px;
		}

		.gd-marke-row .gd-marke-head li:first-of-type {
			width: 50px !important;
		}

		.gd-marke-head {
			width: 100%;
			border-bottom: 1px solid #e6e6e6;
		}

		.gd-marke-row-nested {
			width: 1200px;
			border: 1px solid #E6E6E6;
			margin-top: -1px;
		}

		.gd-marke-row-nested tr td {
			width: 124px;
			font-size: 14px;
			color: #707070;
		}

		.gd-marke-row-nested thead {
			background-color: #FBEDE7;
		}

		.gd-marke-row-nested thead tr td {
			font-weight: bold;
		}

		.el-button:focus,
		.el-button:hover {
			color: #ED7B51;
			border-color: #FBEDE7;
			background-color: #FBEDE7;
		}

		.gd-marke-row-nested tr td:last-of-type {
			width: auto;
			height: 40px;
		}
	}
</style>
