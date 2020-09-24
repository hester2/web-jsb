<template>
  <div class="gd-goodsPre-main">
    <div class="gd-addGoods-bot">
      <!-- 图片放大镜,需要自定义图片的宽高在这里传入,组件有设置默认的宽高,不传也可以 -->
      <div class="gd-preview-row">
        <div class="gd-preview-mr">
          <div class="gd-preview-left">
            <magnifier v-if="flag" :img-list="imgList" :middle-img-height="300" :middle-img-width="300" />
            <p @click="handleCollect">
              <img v-show="!collect" src="../../../assets/icon-collect-001.png" alt="">
              <img v-show="collect" src="../../../assets/icon-collect-002.png" alt="">
              收藏关注</p>
          </div>
          <div class="gd-preview-center">
            <div class="gd-preview-center-title">
              <p>LLOPEDFDA-7042/中海壳牌 216.0吨</p>
              <div class="gd-preview-center-time">
                <div style="display: flex; align-items: center;color: #666;">距结束<p class="gd-preview-center-co"><span>{{ day }}</span>天
                  <span>{{ hour }}</span>时<span>{{ min }}</span>分<span>{{ second }}</span>秒</p>
                </div>
                <p class="gd-preview-center-price">当前价 1061,000 元 <span>出价人：117</span></p>
              </div>
              <div class="gd-preview-center-bgc">
                <p>出价</p>
                <p class="gd-preview-center-ing">正在进行</p>
                <div class="gd-preview-center-le">
                  <el-input-number v-model="num" :min="1" @change="handleChange" />
                  <div>
                    <el-button>报名交保证金</el-button>
                    <span class="gd-preview-center-re">报名必看</span>
                  </div>
                </div>
              </div>
              <div class="gd-preview-auction-ti">
                <p>金塑宝原料拍卖</p>
                <p><span>19人报名</span><span>100人设置提醒</span><span>2560人进行观看</span></p>
              </div>
              <div class="gd-preview-auction-bor">
                <ul>
                  <li>
                    <p>保证金：￥10000.00</p>
                    <p>起始价：￥200000.00</p>
                    <p>加价幅度：￥5000.00</p>
                  </li>
                  <li>
                    <p>评估价：￥350000.00</p>
                    <p>运 费：</p>
                    <p>加价幅度：￥5000.00</p>
                  </li>
                  <li>
                    <p>优先购买权人：无</p>
                    <p>竞价周期：1天</p>
                    <p>延时周期：15分钟</p>
                  </li>
                </ul>
                <p class="gd-preview-auction-m gd-preview-auction-s">尾款支付方式：通过金塑宝订单付款</p>
                <p class="gd-preview-auction-m">尾款线上支付截止：竞价结束后3个工作日内</p>
              </div>
            </div>
            <div class="gd-preview-certif">
              <p>金塑保障</p>
              <p><img src="../../../assets/img/icon-shopDetail-003.png" alt="">认证企业</p>
              <p><img src="../../../assets/img/icon-shopDetail-004.png" alt="">商会卖家</p>
              <p><img src="../../../assets/img/icon-shopDetail-005.png" alt="">质量赔付</p>
              <p><img src="../../../assets/img/icon-shopDetail-006.png" alt="">生产监控</p>
              <p><img src="../../../assets/img/icon-shopDetail-007.png" alt="">银企直连支付</p>
              <p><img src="../../../assets/img/icon-shopDetail-008.png" alt="">司法合同备案</p>
            </div>
          </div>
          <div class="gd-preview-right">
            <div class="gd-preview-col">

              <p>最高中标价: 6540.0元/吨</p>
            </div>
            <div class="gd-preview-col">

              <p>最低中标价： 6530.0元/吨</p>
            </div>
            <div class="gd-preview-col">

              <p>标的来源：中海壳牌石油化有限公司</p>
            </div>
            <div class="gd-preview-col">

              <p>结束时间：2021-08-09 11:17</p>
            </div>
          </div>
        </div>
        <img class="gd-preview-auction-img" src="../../../assets/bg-auction-001.png" alt="">
        <div class="gd-preview-bom">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in imgList" :key="item">
              <img :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="标的物介绍" name="first">
              <div class="gd-preview-plastic">
                <p>产品编号：00032</p>
                <p>注塑工艺：<span>制塑，注塑</span></p>
                <p>材质：塑料</p>
              </div>
              <div class="gd-preview-plastic">
                <p>产地：中国大陆</p>
                <p>单位：kg</p>
                <p>品牌：金塑</p>
              </div>
              <p class="gd-preview-overview">商品概述</p>
              <hr color="#E6E6E6">
              <p class="gd-preview-title">
                <img src="../../../assets/icon-auction-003.jpg" alt="">
              </p>
              <hr color="#E6E6E6">
            </el-tab-pane>
            <el-tab-pane label="竞买公告" name="second" disabled>2</el-tab-pane>
            <el-tab-pane label="竞买须知" name="third" disabled>3</el-tab-pane>
            <el-tab-pane label="竞买记录" name="four" disabled>3</el-tab-pane>
          </el-tabs>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Magnifier from '@/components/Magnifier'
import $ from 'jquery'
import {
  Message
} from 'element-ui'
import {
  getGoodsInfo,
  updateGoodsStatus
} from '@/api/table.js'

export default {
  components: {
    // 商品放大镜图
    Magnifier
  },
  props: {
    infos: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      activeName: 'first',
      flag: true,
      collect: false,
      num: 1600,
      curStartTime: '2019-07-31 08:00:00',
      day: '0',
      hour: '00',
      min: '00',
      second: '00',
      imgList: [
        'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2110179554,1589878397&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3359308876,3887647198&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1552329045,1412181116&fm=26&gp=0.jpg'
      ]
    }
  },
  created() {
    this.curStartTime = '2021-08-09 11:17'
    this.countTime()
  },
  mounted() {

  },
  methods: {
    handleBack() {

    },
    handleCollect() {
      this.collect = !this.collect
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChange(o) {

    },
    // 倒计时
    countTime() {
      // 获取当前时间
      const date = new Date()
      const now = date.getTime()
      // 设置截止时间
      const endDate = new Date(this.curStartTime) // this.curStartTime需要倒计时的日期
      const end = endDate.getTime()
      // 时间差
      const leftTime = end - now
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        // 时
        const h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
        this.hour = h < 10 ? '0' + h : h
        // 分
        const m = Math.floor(leftTime / 1000 / 60 % 60)
        this.min = m < 10 ? '0' + m : m
        // 秒
        const s = Math.floor(leftTime / 1000 % 60)
        this.second = s < 10 ? '0' + s : s
      } else {
        this.day = 0
        this.hour = '00'
        this.min = '00'
        this.second = '00'
      }
      // 等于0的时候不调用
      if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) === 0) {
        return
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000)
      }
    }
  }
}
</script>

<style lang="less">
  .gd-goodsPre-main {
    height: 100%;
    box-sizing: border-box;
    padding: 0px 25px;
    display: flex;
    flex-direction: column;

    .gd-goodsPre-title {
      font-size: 12px;
      color: #999999;
      display: flex;
      justify-content: flex-start;
      text-align: left;
      margin-top: 30px;
      margin-bottom: 20px;

      a {
        text-decoration: none;
      }

      span {
        color: #999999;
        margin-left: 4px;
      }

      .gd-goodsPre-cor {
        color: #333 !important;
      }
    }

    .gd-addGoods-bot {
      box-sizing: border-box;
      padding-bottom: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .gd-preview-row {
      width: 1200px;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 20px 20px;
      box-sizing: border-box;
      padding-bottom: 50px;

      .gd-preview-mr {
        display: flex;
        width: 1200px;
        height: auto;
      }

      .gd-preview-left {
        width: 300px;
        height: 420px;

        p {
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-left: 20px;
          font-size: 12px;
          color: #666;

          img {
            width: 20px;
            height: 19px;
            margin-right: 6px;
          }
        }
      }

      .gd-preview-center {
        width: 606px;
        height: auto;
        box-sizing: border-box;
        padding: 0px 20px;

        h4 {
          text-align: left;
          margin: 0px;
          margin-bottom: 10px;
        }
      }

      .gd-preview-center-title {
        p {
          font-size: 13px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000;
          margin: 10px 0px;
        }

        .gd-preview-center-time {
          margin: 20px 20px;
          font-size: 13px;

          .gd-preview-center-price {
            color: #666;

            span {
              border: 1px solid #ccc;
              font-size: 13px;
              box-sizing: border-box;
              padding: 2px 5px;
              margin-left: 20px;
              color: #999;
            }
          }
        }

        .gd-preview-center-co {
          width: 277px;
          background-color: #F1F1F1;
          box-sizing: border-box;
          padding: 5px 15px;
          margin-left: 10px;
          color: #666;
          border-radius: 4px;
          display: flex;
          align-items: center;

          span {
            color: #EE7C51;
            background-color: #fff;
            display: block;
            height: 30px;
            padding: 0px 8px;
            line-height: 30px;
            border-radius: 10px;
            margin: 0px 5px;
          }
        }

        .gd-preview-center-bgc {
          background-color: #F2F2F2;
          border-radius: 8px;
          width: 400px;
          display: flex;
          box-sizing: border-box;
          padding: 20px 10px;
          position: relative;

          .gd-preview-center-ing {
            position: absolute;
            right: 0px;
            top: -10px;
            background-color: #EE7C51;
            color: #fff;
            font-size: 10px;
            width: 55px;
            border-radius: 0px 0px 0px 5px;

          }

          p {
            width: 100px;
            text-align: center;
            font-size: 13px;
            color: #999;
          }

          .gd-preview-center-le {
            display: flex;
            flex-direction: column;
          }
        }

        .el-button {
          width: 180px;
          padding: 5px 0px;
          margin-top: 20px;
          background-color: #EE7C51;
          color: #fff;
        }

        .gd-preview-center-re {
          color: #666;
          font-size: 13px;
          margin-left: 15px;
        }
      }

      .gd-preview-auction-ti {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 500px;
        margin-top: 20px;

        p:nth-of-type(1) {
          font-size: 12px;
        }

        p:nth-of-type(2) {
          font-size: 12px;
          display: flex;

          span {
            display: block;
            width: 110px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            border-right: 1px solid #ccc;
            color: #999;
          }
        }
      }

      .gd-preview-auction-bor {
        width: 500px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 15px 15px;

        ul {
          display: flex;

          li {
            width: 186px;
            border-right: 1px solid #ccc;
            margin-right: 20px;
            height: 96px;

            &:last-of-type {
              margin-right: 0px;
              border: none;
            }

            p {
              font-size: 12px;
              color: #666;
              margin: 0px;
              height: 35px;
              line-height: 35px;
            }
          }
        }

        .gd-preview-auction-m {
          font-size: 12px;
          color: #666;
        }

        .gd-preview-auction-s {
          margin-top: 20px;
        }
      }

      .gd-preview-auction-img {
        margin: 30px;
        margin-left: 0px;
      }

      .el-input-number__decrease,
      .el-input-number__increase {
        height: 38px;
        line-height: 38px;
      }

      .gd-preview-certif {
        width: 450px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;

        p {
          margin: 0px 5px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          font-size: 10px;
          color: #999999;
        }

        img {
          display: block;
          width: 14px;
          height: 16px;
          margin-right: 3px;
        }
      }

      .gd-preview-price {
        background-color: #EFECF0;
        box-sizing: border-box;
        padding: 0px 10px;
        height: 68px;
        display: flex;
        align-items: flex-start;

        p:nth-of-type(1) {
          flex: 1;
          font-size: 12px;
          color: #999999;
          line-height: 30px;
        }

        p:nth-of-type(2) {
          flex: 8;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          height: 68px;
          box-sizing: border-box;
          padding-left: 20px;

          span {
            display: block;
          }

          span:nth-of-type(1) {
            font-size: 18px;
            font-weight: bold;
            color: rgba(238, 126, 54, 1);
          }

          span:nth-of-type(2) {
            font-size: 12px;
            color: #999;
          }
        }

        p:nth-of-type(3) {
          flex: 4;
          font-size: 12px;
          color: #999;
          margin-top: 40px;
        }
      }

      .gd-preview-logistics {
        height: 42px;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        display: flex;

        .gd-preview-logistics-p {
          width: 50px;
          font-size: 12px;
          color: #999999;
          line-height: 42px;
        }

        .gd-preview-lo-ress {
          width: auto;
          font-size: 12px;
          color: #999;
          display: flex;
          line-height: 42px;

          p {
            font-size: 12px;
            color: #999;
            line-height: 42px;
            margin-right: 7px;
          }

          .el-cascader {
            width: auto;
          }

          .el-input__inner {
            font-size: 12px;
            border: none;
            padding: 0px;
          }
        }

        p:nth-of-type(2) {
          font-size: 12px;
          color: #999;
          line-height: 42px;
          margin-left: 20px;
        }
      }

      .gd-preview-cxl {
        line-height: 20px;
        font-size: 15px;
        color: #666;
        text-align: left;
        margin: 10px 0px;
      }

      .gd-preview-specifications {
        height: 86px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(230, 230, 230, 1);

        img {
          width: 38px;
          height: 38px;
          display: block;
        }

        .gd-preview-bm {
          width: 100px;
          font-size: 12px;
          text-align: center;
          color: #999;
          line-height: 86px;
        }

        .gd-preview-bg {
          width: 100px;
          font-size: 12px;
          text-align: center;
          color: #999;
          line-height: 86px;
        }

        .gd-preview-inv {
          width: 130px;
          font-size: 12px;
          text-align: center;
          color: #999;
          line-height: 86px;
        }

        .gd-preview-num {
          height: 86px;
          display: flex;
          align-items: center;

          .el-input-number__decrease,
          .el-input-number__increase {
            height: 26px;
            line-height: 26px;
          }
        }
      }

      .gd-preview-cirm {
        position: relative;
        height: 174px;
        overflow: hidden;
      }

      .openDetail {
        height: auto !important;
      }

      .gd-preview-mo {
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
      }

      .gd-preview-right {
        width: 230px;
        border-left: 1px solid #E6E6E6;
        box-sizing: border-box;
        padding: 0px 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .el-carousel {
          width: 200px;
          height: auto;

          // background-color: #ccc;
          .el-carousel__button {
            background-color: rgba(0, 0, 0, 0.3);
          }

          .el-carousel__indicator.is-active button {
            background-color: #EE7C51;
          }
        }
      }

      .gd-preview-col {
        height: 155;
        width: 200px;

        p {
          text-align: left;
          font-size: 12px;
          color: #666;
          height: 35px;
          line-height: 35px;
        }
      }

      .gd-preview-bom {
        margin-top: 20px;
        width: 907px;
        height: auto;

        .el-carousel__item {
          width: 907px;

          img {
            width: 100%;
          }
        }

        .el-tabs {
          margin-top: 20px;
          width: 100%;
        }

        .el-tabs__item.is-active {
          color: #EE7C51;
        }

        .el-tabs__active-bar {
          background-color: #EE7C51;
        }

        .gd-preview-plastic {
          margin-top: 20px;
          display: flex;

          P {
            width: 150px;
            font-size: 12px;
            color: #666666;
            text-align: left;
          }
        }

        .gd-preview-overview {
          margin: 20px 0px;
          margin-bottom: 0px;
          text-align: left;
        }
      }

      .gd-preview-title {
        font-size: 12px;
        color: #999;
        text-align: center;
        box-sizing: border-box;
        padding: 0px 20px;

        img {
          width: 100%;
        }
      }

    }

    .gd-preview-fied {
      position: fixed;
      bottom: 0px;
      height: 80px;
      width: 100%;
      background-color: #fff;
      z-index: 999999;
      border-top: 1px solid #EE7C51;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-button {
        padding: 5px 10px;

        a {
          text-decoration: none;
          color: #606266;
        }
      }
    }
  }
</style>
