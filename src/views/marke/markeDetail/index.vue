<template>
  <div class="gd-preview-main">
    <!-- 图片放大镜,需要自定义图片的宽高在这里传入,组件有设置默认的宽高,不传也可以 -->
    <div class="gd-preview-row">
      <div class="gd-preview-mr">
        <div class="gd-preview-left">
          <magnifier v-if="flag" :img-list="imgList" :middle-img-height="300" :middle-img-width="300" />
        </div>
        <div class="gd-preview-center">
          <h4>{{ goodsDetails.title }}</h4>
          <div class="gd-preview-price">
            <p>价格</p>
            <p>
              <span>¥ {{ goodsDetails.price }}</span>
              <span>库存数量 ¥{{ rawProvideInfoStockVo.availableNum }}</span>
            </p>
            <p>本品采购数量为{{ rawProvideInfoStockVo.availableNum }}只</p>
          </div>
          <div class="gd-preview-logistics">
            <p class="gd-preview-logistics-p">物流</p>
            <div class="gd-preview-lo-ress">
              <p>
                <el-cascader v-model="sendArea" filterable disabled placeholder="无" :options="options" clearable />
              </p>至
              <p>
                <el-cascader :options="options" clearable />
              </p>
            </div>
            <p>物流运费预估：¥6</p>
          </div>
          <div style="display: flex;align-items: center;margin-top: 20px;">
            <p class="gd-preview-cxl" style="margin-right: 15px;">数量</p>
              <div class="gd-preview-num">
                <el-input-number v-model="goodsDetails.orderAmount" size="mini" :step="1" :min="0" :max="rawProvideInfoStockVo.availableNum*1"
                  label="描述文字" @change="handleChange(goodsDetails.orderAmount)" />
              </div>
          </div>
          <div class="gd-preview-btn">
            <el-button @click="handleBuy">一键采购</el-button>
            <el-button>加入货单</el-button>
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
          <p style=" width:100%; text-align: left;font-size: 14px; margin-bottom: 10px;">热销商品</p>
          <el-carousel height="549px">
            <el-carousel-item>
              <div class="gd-preview-col">
                <img src="../../../assets/img/bg-depart-detail-002.png" width="140" height="140" alt="">
                <p>¥60</p>
              </div>
              <div class="gd-preview-col">
                <img src="../../../assets/img/bg-depart-detail-002.png" width="140" height="140" alt="">
                <p>¥60</p>
              </div>
              <div class="gd-preview-col">
                <img src="../../../assets/img/bg-depart-detail-002.png" width="140" height="140" alt="">
                <p>¥60</p>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <h3 class="small">2</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="gd-preview-bom">
        <div class="gd-preview-ler">
          <p class="gd-preview-pty">商品分类</p>
          <el-collapse @change="handleFication">
            <el-collapse-item title="pp">
              <p class="gd-ufin-ellipsis">7042</p>
              <p class="gd-ufin-ellipsis">1500</p>
            </el-collapse-item>
            <el-collapse-item title="PE">
              <p class="gd-ufin-ellipsis">7042</p>
              <p class="gd-ufin-ellipsis">1500</p>
            </el-collapse-item>
            <el-collapse-item title="ABS">
              <p class="gd-ufin-ellipsis">7042</p>
              <p class="gd-ufin-ellipsis">7042</p>
              <p class="gd-ufin-ellipsis">7042</p>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="gd-preview-rle">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in imgList" :key="item">
              <img :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="详细信息" name="first">
              <div class="gd-preview-plastic">
                <p>品牌：{{ rawProvideVo.rawVarietyName }}</p>
                <p>种类：{{ rawProvideVo.rawCategoryName }}</p>
                <p>交货方式：{{ goodsDetails.deliveryTerm }}</p>
              </div>
              <div class="gd-preview-plastic">
                <p>产地：{{ rawProvideVo.rawProducerName }}</p>
                <p>牌号：{{ rawProvideVo.rawCodeName }}</p>
                <p>单位：{{ goodsDetails.unit }}</p>
              </div>
              <p class="gd-preview-overview">商品概述</p>
              <hr color="#E6E6E6">
              <p class="gd-preview-title">{{ goodsDetails.profiles }}</p>
              <hr color="#E6E6E6">
              <div v-html="detailHtml" style="text-align: center;" />
            </el-tab-pane>
            <el-tab-pane label="历史成交(0)" name="second">2</el-tab-pane>
            <el-tab-pane label="商品说明" name="third">3</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <login-dialog ref="loginDialog" />

  </div>
</template>

<script>
  import Magnifier from '@/components/Magnifier'
  import $ from 'jquery'
  import LoginDialog from '@/views/user/components/LoginDialog'
  import {
    mapActions
  } from 'vuex'
  import userInfoMixins from '@/Mixins/userInfoMixins'

  export default {
    components: {
      // 商品放大镜图
      Magnifier,
      LoginDialog
    },
    mixins: [userInfoMixins],
    props: {
    },
    computed: {

    },
    data() {
      return {
        orderAmount:0,
        // 商品详情
        goodsDetails: {
          orderAmount:0
        },
        imgList: [], // 图片列表
        rawProvideVo: {},
        orgVo: {},
        rawProvideInfoStockVo: {},
        goodsBuyDetails: [],
        selectGoods: 1,
        // 登录
        activeName: 'first',
        flag: false,
        sendArea: '',
        nums: '',
        code: '',
        producingArea: '',
        profiles: '',
        detailHtml: '',
        list: [],
        options: [],
        address: [],
        showSize: false,
        querId: '',
        dataform: '',
        order: [],
        orders: '',
      }
    },
    created() {
      this.$http.get('/citylist.json').then(function(response) {
          const data = response.data
          this.options = data
        })
        .catch(function(error) {
          console.log('出错喽：' + error)
        })
    },
    mounted() {
      this.getGoodsDetail(this.$route.params.id)
    },
    methods: {
      ...mapActions('order', ['setMarkeDetails']),
      handleBuy() {
        // 一键采购
        var goodsBuyDetails = this.goodsDetails
        if (this.$store.getters.token) {
          this.setMarkeDetails(goodsBuyDetails)
          this.$router.push('/marke/markePlaceOrder')
        } else {
          this.$message.success('请先登录')
          this.$refs.loginDialog.show()
        }
      },
      handleChange(num) {
        console.log(num,this.goodsDetails)
      },
      async getGoodsDetail(id) {
        var that=this
        var res = await this.$ajax.goods.getRawProvideDetail(id)
        this.goodsDetails = res.result
        this.$set(this.goodsDetails,'orderAmount',1)
        var rawProvideVo=res.result.rawProvideVo
        var rawType=rawProvideVo.rawCategoryName+'/'+rawProvideVo.rawCodeName+'/'+rawProvideVo.rawProducerName+'/'+rawProvideVo.rawVarietyName
        this.$set(this.goodsDetails,'rawType',rawType)
        this.flag = true
        Object.assign(this, res.result)
        this.imgList = res.result.rawProvideImgVos.map((item) => {
          return item.url
        })
        this.detailHtml = res.result.detail
        this.rawProvideVo = res.result.rawProvideVo
        this.orgVo = res.result.orgVo
        this.rawProvideInfoStockVo = res.result.rawProvideInfoStockVo
        var provinceId = res.result.provinceId.toString()
        var cityId = res.result.cityId.toString()
        if(res.result.areaId){
          var areaId = res.result.areaId.toString()
          var city = [provinceId, cityId,areaId]
        }else {
          var city = [provinceId, cityId]
        }
        this.sendArea = city
      },
      handleFication(val) {
        console.log(val)
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleShow() {
        $('.gd-preview-cirm').toggleClass('openDetail')
        this.showSize = !this.showSize
      }
    }
  }
</script>

<style lang="less">
  .gd-preview-main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
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
        justify-content: space-between;
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
          margin-bottom: 12px;
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

        .el-input.is-disabled .el-input__inner {
          background-color: transparent;
          color: #333;
        }

        .el-input__suffix-inner {
          display: none;
        }

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
        line-height: 18px;
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

      p {
        font-size: 12px;
        color: #666;
      }
    }

    .gd-preview-bom {
      margin-top: 20px;
      width: 907px;
      height: auto;
      display: flex;

      .gd-preview-ler {
        width: 20%;
        border: 1px solid rgba(230, 230, 230, 1);

        .gd-preview-pty {
          background-color: #EE7C51;
          color: #fff;
          text-align: left;
          height: 45px;
          line-height: 45px;
          font-size: 14px;
          box-sizing: border-box;
          padding: 0px 10px;
        }

        .el-collapse-item {
          .el-collapse-item__header {
            background-color: #F8F8F8;
            box-sizing: border-box;
            padding: 0px 10px;
          }
        }

        .el-collapse-item__content {
          p {
            text-align: left;
            box-sizing: border-box;
            padding-left: 10px;
          }

          p:hover {
            color: #EE7C51;
            cursor: pointer;
          }
        }
      }

      .gd-preview-rle {
        width: 80%;
        margin-left: 10px;
      }

      .el-carousel__item {
        width: 907px;

        img {
          width: 100%;
        }
      }

      .el-tabs {
        margin-top: 20px;
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
      text-align: left;
      box-sizing: border-box;
      padding: 0px 20px;
    }

    .gd-preview-btn {
      display: flex;
      margin-top: 25px;

      .el-button {
        padding: 5px 30px;
      }

      .el-button:nth-of-type(1) {
        background-color: #EE7C51;
        color: #fff;
      }

      .el-button:nth-of-type(2) {
        background-color: #F3E5D0;
        color: #EE7C51;
        border: 1px solid rgba(243, 229, 208, 1);
      }
    }

  }
</style>
