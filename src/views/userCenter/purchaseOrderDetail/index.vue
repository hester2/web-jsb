<template>
  <div class="gd-pur-detail">
    <div class="gd-pur-detail-main">
      <div class="gd-pur-detail-card">
        <div class="gd-pur-detail-card-l">
          <p>订单号：{{result.orderNumber}}</p>
          <h3>{{orderState}}</h3>
        </div>
        <div class="gd-pur-detail-card-r">
          <el-steps :active="active" align-center>
            <el-step title="提交订单" :description="result.createTime | moment">
              <template slot="icon">
                <i class="icon iconfont" style="font-size: 40px;">&#xe613;</i>
              </template>
            </el-step>
            <el-step title="付款成功">
              <template slot="icon">
                <i class="icon iconfont" style="font-size: 40px;">&#xe60f;</i>
              </template>
            </el-step>
            <el-step title="商品出库">
              <template slot="icon">
                <i class="icon iconfont" style="font-size: 40px;">&#xe610;</i>
              </template>
            </el-step>
            <el-step title="等待收货">
              <template slot="icon">
                <i class="icon iconfont" style="font-size: 40px;">&#xe611;</i>
              </template>
            </el-step>
            <el-step title="完成">
              <template slot="icon">
                <i class="icon iconfont" style="font-size: 40px;">&#xe612;</i>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
      <div class="gd-pur-detail-card gd-pur-detail-card-t" style="margin-top: 15px;">
        <h3>物流跟踪</h3>
        <el-timeline :reverse="reverse">
          <el-timeline-item v-for="(activity, index) in activities" :color="activity.color" :key="index">
            <p v-if="activity.state==1">
              <span>已下单</span>
              <span>温馨提示：您的订单预计8月24日09:00-15:00送达您手中</span>
              <span>您的订单预计2020-08-23 17:48开始处理，请您耐心等待</span>
              <span>您的订单已经进入金塑宝厦门仓库准备出库</span>
            </p>
            <p v-if="activity.state==2">
              <span>仓库处理中</span>
              <span>扫描完成</span>
              <span>拣货完成</span>
            </p>
            <p v-if="activity.state==3">
              <span>运输中</span>
              <span>您的订单已到达金塑宝【厦门前埔营业部】</span>
              <span>您的订单在金塑宝【厦门分拣中心】分拣完成</span>
            </p>
            <p v-if="activity.state==4">
              <span>派送中</span>
              <span>您的订单正在配送途中（快递员：雷绍彬，电话：13063040587），请您耐心等待。</span>
            </p>
            <p v-if="activity.state==5">
              <span>已签收</span>
              <span>您的订单已由本人签收。如有疑问您可以联系配送员【雷绍彬，13063040587】确认。感谢您在金塑宝购物，欢迎再次光临。</span>
            </p>
            <div class="gd-home-market-line-left">
              {{ activity.timestamp }}
            </div>
          </el-timeline-item>
          <li class="el-timeline-item">
            <div class="el-timeline-item__tail" />
          </li>
        </el-timeline>
    </div>
    <div class="gd-pur-detail-card gd-pur-detail-card-t" style="margin-top: 15px;">
      <h3>订单信息</h3>
      <div style="display: flex;">
        <div class="gd-pur-detail-s">
          <p>收货姓名：{{receivingAddressVo.contact}}</p>
          <p>收货电话：{{receivingAddressVo.phone}}</p>
          <p>收货地址：{{receivingAddressVo.provinceName}}{{receivingAddressVo.cityName}}{{receivingAddressVo.areaName}}{{receivingAddressVo.address}}</p>
          <p>运送方式：金塑宝物流</p>
        </div>
        <div class="gd-pur-detail-s">
          <p>订单编号：{{result.orderNumber}}</p>
          <p>银联交易号：</p>
          <p>订单创建日期：{{result.createTime | moment}}</p>
          <p>付款时间：</p>
          <p>发货时间</p>
          <p>完成时间</p>
        </div>
      </div>
    </div>
    <div class="gd-pur-detail-card gd-pur-detail-card-t gd-pur-detail-card-ts" style="margin-top: 15px;">
        <order-goods-table :table-data="orderGoods" :buyerSignState="result.buyerSignState" :id="id" />
        <p>运费：20元</p>
    </div>
  </div>
  </div>
</template>

<script>
  import OrderGoodsTable from '@/views/userCenter/components/OrderGoodsTable'
  export default {
    components:{
      OrderGoodsTable
    },
    data() {
      return {
        id:0,
        reverse: true,
        active: 1,
        orderGoods:[],
        result:[],
        orderState:'提交订单',
        receivingAddressVo:{},
        activities: [{
          state: 1,
          timestamp: '2018-04-15',
          color: '#EE7C51'
        }, {
          state: 2,
          timestamp: '2020-06-28',
          color: '#EE7C51'
        }, {
          state: 3,
          timestamp: '2018-04-11',
          color: '#EE7C51'
        }, {
          state: 4,
          timestamp: '2018-04-12',
          color: '#EE7C51'

        }, {
          state: 5,
          timestamp: '2018-04-13',
          color: '#EE7C51'
        }],
      }
    },
    methods: {
     async handleDetail(){
       try{
        var res= await this.$ajax.goods.getOrderInfo(this.id)
        this.orderGoods=res.result.orderItemVos
        this.receivingAddressVo=res.result.receivingAddressVo
        this.result=res.result
       }catch(e){

       }
      }
    },
    mounted() {
      // 设置背景单一样式
       this.id=this.$route.params.id
       this.handleDetail()
      document.querySelector('body').setAttribute('style', 'background-color:#FAFAFA; overflow-x: hidden;')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    },
  }
</script>

<style lang="less">
  .gd-pur-detail {
    display: flex;
    align-items: center;
    flex-direction: column;

    .gd-pur-detail-main {
      width: 1200px;
      margin-top: 15px;

      .gd-pur-detail-card {
        height: auto;
        background-color: #fff;
        display: flex;
        box-sizing: border-box;
        padding: 20px 20px;
      }

      .gd-pur-detail-card-t {
        display: flex;
        flex-direction: column;

        h3 {
          text-align: left;
          font-size: 16px;
          font-weight: normal;
          box-sizing: border-box;
          padding-left: 50px;
        }
      }

      .gd-pur-detail-card-l {
        width: 20%;
        border-right: 1px solid #eee;
        height: 170px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          font-size: 12px;
          color: #333333;
        }

        h3 {
          color: #EE7C51;
          margin: 20px 0px;
        }
      }

      .gd-pur-detail-card-r {
        width: 80%;
        display: flex;
        align-items: center;

        .el-step {
          i {
            font-size: 20px;
          }
        }

        .el-steps {
          width: 100%;
        }

        .el-step__icon.is-text {
          border: none;
        }

        .is-finish {
          color: #EE7C51;
          border-color: #EE7C51;
        }
      }

      .gd-home-market-lines {
        width: 388px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
        p {
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
    }

    .el-timeline .el-timeline-item:first-child .el-timeline-item__tail {
      display: none;
    }

    .el-timeline .el-timeline-item:last-child .el-timeline-item__tail {
      display: block;
    }

    .el-timeline-item__content p {
      span {
        display: block;
        text-align: left;
        color: #666;
      }
    }

    .el-timeline {
      margin-left: 130px;
    }

    .gd-pur-detail-s {
      width: 50%;
      border-right: 1px solid #eee;
      box-sizing: border-box;
      padding-left: 50px;

      p {
        text-align: left;
        font-size: 13px;
        color: #666;
      }
    }
    .gd-pur-detail-card-ts{
      p{
       text-align: right;
       color: #666;
       font-size: 13px;
      }
    }
  }
</style>
