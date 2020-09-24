<template>
  <div class="gd-marke-main">
    <div class="w">
      <div class="gd-home-mro gd-home-offer" style="background-color: #6BB3D3;">
        <img src="../../assets/img/icon-home-007.png" alt=""> <span>石化供应商</span></div>
      <div class="gd-home-market-s">
        <el-carousel style="height: 336px; width: 100%;">
          <el-carousel-item>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2595861158,1024309634&fm=26&gp=0.jpg"
                   alt="">
              <p>中耀化工</p>
              <p>主营材质：润滑剂</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4275513545,2528880683&fm=26&gp=0.jpg"
                   alt="">
              <p>塑料贸易中石化</p>
              <p>主营材质：ABS、PC</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2217115286,148460440&fm=26&gp=0.jpg"
                   alt="">
              <p>深圳志海中石化</p>
              <p>主营材质：热稳定剂</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1652125327,1040017481&fm=26&gp=0.jpg"
                   alt="">
              <p>华峰中石化</p>
              <p>主营材质：ABS、PS</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1522635471,790891594&fm=26&gp=0.jpg"
                   alt="">
              <p>路博泰中石化</p>
              <p>主营材质：ABS、PS</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
          </el-carousel-item>

          <el-carousel-item>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2146915826,4015353280&fm=26&gp=0.jpg"
                   alt="">
              <p>中耀化工</p>
              <p>主营材质：润滑剂</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3841123762,2447596395&fm=26&gp=0.jpg"
                   alt="">
              <p>塑料贸易中石化</p>
              <p>主营材质：ABS、PC</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2217115286,148460440&fm=26&gp=0.jpg"
                   alt="">
              <p>深圳志海中石化</p>
              <p>主营材质：热稳定剂</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1652125327,1040017481&fm=26&gp=0.jpg"
                   alt="">
              <p>华峰中石化</p>
              <p>主营材质：ABS、PS</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
            <div class="gd-home-supplier" @click="handleRoute">
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1522635471,790891594&fm=26&gp=0.jpg"
                   alt="">
              <p>路博泰中石化</p>
              <p>主营材质：ABS、PS</p>
              <p>
                <el-rate v-model="value" disabled text-color="#EE7C51"/>
              </p>
            </div>
          </el-carousel-item>

        </el-carousel>
      </div>
    </div>
    <div class="gd-marke-choose">
      <div class="gd-marke-top">
        <h3>塑性市场</h3>
        <div class="gd-marke-plastic">
          <p>共有{{result.total}}条塑料报价</p>
          <p>采购需求发布</p>
        </div>
      </div>

      <div class="gd-shop-row">
        <p>品种：</p>
        <select-raw-tags :options="material" is-select is-show-more
                         @change="(val,label)=>{queryParams.rawVarietyName = label,formInline.variety=label}"/>

      </div>
    </div>
    <div class="gd-marke-cen gd-el-form">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="品种">
          <el-input v-model="formInline.variety" placeholder="品种"></el-input>
        </el-form-item>
        <el-form-item label="牌号">
          <el-input v-model="formInline.mark" placeholder="牌号"></el-input>
        </el-form-item>
        <el-form-item label="厂家">
          <el-input v-model="formInline.vender" placeholder="厂家"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gd-marke-cen">
      <!--原料列表注释-->
            <table class="gd-marke-row" v-loading="loading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading">
              <thead >
                <div class="gd-marke-row-top">
                  <li />
                  <li>种类</li>
                  <li>品种</li>
                  <li>牌号</li>
                  <li>厂家</li>
                  <li>当前报价(元、吨)</li>
                  <li>供应商</li>
                  <li>操作</li>
                </div>
              </thead>
              <tbody >
                <p style="color: #666;font-size: 13px;" v-if="tableData.length==0">无数据</p>
                <div  v-for="(item,index) in tableData" class="gd-marke-head">
                  <div class="gd-marke-head-row">
                    <li>
                      <img v-if="item.isshow==false" class="gd-marke-fold" src="../../assets/img/icon-marke-001.png" alt=""
                        @click="handleDetail(0,item)">
                      <img v-else-if="item.isshow==true" class="gd-marke-fold" src="../../assets/img/icon-marke-002.png" alt=""
                        @click="handleDetail(1,item)">
                    </li>
                    <li>{{ item.rawCategoryName}}</li>
                    <li>{{ item.rawVarietyName}}</li>
                    <li>{{ item.rawCodeName}}</li>
                    <li>{{ item.rawProducerName}}</li>
                    <li>{{ item.minPrice }}</li>
                    <li>{{ item.providerNum }}</li>
                    <li>
                      <el-button v-if="item.isshow==false" size="mini" @click="handleDetail(0,item)">查看</el-button>
                      <el-button v-else-if="item.isshow==true" size="mini" @click="handleDetail(1,item)">收起</el-button>
                    </li>
                  </div>
                  <div v-show="item.isshow" class="lx-main-role">
                    <table class="gd-marke-row-nested" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <td>供应商</td>
                          <td>库存</td>
                          <td>当前报价</td>
                          <td>票据</td>
                          <td>货物所在地</td>
                          <td>交货方式</td>
                          <td>交货日期</td>
                          <td>更新时间</td>
                          <td>操作</td>
                        </tr>
                      </thead>
                      <tbody >
                        <tr v-for="row in rowInfo">
                          <td>{{ row.orgVo.name }}</td>
                          <td>{{ row.rawProvideInfoStockVo && row.rawProvideInfoStockVo.availableNum }}</td>
                          <td>{{ row.price }}</td>
                          <td>{{ row.paper }}</td>
                          <td>{{ row.rawProvideVo && row.rawProvideVo.rawProducerName }}</td>
                          <td>{{ row.deliveryTerm }}</td>
                          <td>{{ row.dateTime }}</td>
                          <td>{{ row.rawProvideVo && row.rawProvideVo.createTime | moment }}</td>
                          <td>
                            <el-button size="mini" @click="handleChart(index,row)">委托谈价</el-button>
                            <el-button size="mini" @click="handleOrder(index,row)">自主下单</el-button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </tbody>
            </table>

      <!--      -->
      <!-- 暂时循环详情 -->
<!--      <div class="gd-box-card">-->
<!--        <el-card class="" v-for="item in rowMomentInfo">-->
<!--          <img :src="item.rawProvideImgVos[0] && item.rawProvideImgVos[0].url" alt="">-->
<!--          <div class="gd-box-card-title">-->
<!--            <p>{{item.title}}</p>-->
<!--            <p>{{item.profiles}}</p>-->
<!--            <p><span>发布人：{{item.orgVo && item.orgVo.name}}</span><span>发布时间：{{item.rawProvideVo && item.rawProvideVo.createTime | moment}}</span>-->
<!--            </p>-->
<!--          </div>-->
<!--          <div class="gd-box-card-btn">-->
<!--            <el-button style="float: right; padding: 3px 0" type="text">-->
<!--              <router-link to="/user/login">会员免费发布</router-link>-->
<!--            </el-button>-->
<!--            <p>非会员2元发布</p>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </div>-->
      <div class="gd-marke-block">
        <el-pagination background layout="prev, pager, next" :total="result.total"
                       :page-size="queryParams.pageSize || 20"
                       :current-page.sync="queryParams.pageNum" @current-change="getGoodsList"/>
      </div>

    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {
    material
  } from './data'
  import {
  getRowDetail,
    getCategoryList
  }
  from
  '@/api/table.js'
  import {
    Debounce
  } from '../../utils/FnUtils.js'
  import selectRawTags from '@/components/tags/selectRawTags'

  export default {
    components: {
      selectRawTags
    },
    watch: {},
    data() {
      return {
          activeCant: false,
          rowIdx: '',
          currentPage: 1,
          current: false,
          currentMa: false,
          value: 3.7,
          loading: false,
          result: {},
          rowInfo: {},
          orgVo: {},
          rawProvideInfoStockVo: {},
          rawProvideVo: {},
          formInline: {
            variety: '',
            mark: '',
            vender: ''
          },
          queryParams: {
            pageSize: 10,
            pageNum: 1,
            rawCodeName: '',
            rawProducerName: '',
            rawVarietyName: ''
          },
          tableData: [],
          //常用原料
          material,
          row: [],
          rowId: 1,
      rowMomentInfo:[],
      orderId: 0
    }
    },
    created() {
      this.handleCategoryList()
      this.getGoodsList()
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#fff;  overflow-x: hidden;')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    },
    watch: {
      queryParams: {
        handler: function () {
          this.$nextTick(() => {
            this.getGoodsList()
          })
        },
        deep: true
      },
    },
    methods: {
      getGoodsList: Debounce(async function () {
        this.loading = true
        try {
          if (this.queryParams.rawVarietyName == '全部') {
            this.queryParams = {
              pageSize: 10,
              pageNum: 1,
              rawCodeName: '',
              rawProducerName: '',
              rawVarietyName: ''
            }
          }
          const res = await this.$ajax.goods.querySearchRowPage(this.queryParams)
          //暂时
          // var items = {}
          // res.result.list.map(item => {
          //   getRowDetail(item.id).then(data => {
          //     this.rowMomentInfo.push(data.result[0])
          //   })
          // })
          this.result = res.result
          this.tableData = res.result.list
          this.loading = false
          return this.tableData.map(item => {
              this.$set(item, 'isshow', false)
              return item
            })
        } catch (e) {
          this.loading = false
        }
      }),
      onSubmit() {
        this.queryParams = {
          pageSize: 10,
          pageNum: 1,
          rawCodeName: this.formInline.mark,
          rawProducerName: this.formInline.vender,
          rawVarietyName: this.formInline.variety,
        }
        this.getGoodsList()
      },
      handleMore() {
        $('.gd-shop-flex0').toggleClass('open')
        this.showFeatures = !this.showFeatures
      },
      handleChange(val, label) {
        console.log(label)
      },
      handleCategoryList() {

      },
      // 查看详情
      async handleDetail(val,item) {
        this.tableData.map(o=>{
          if(o.id==item.id){
            o.isshow=!o.isshow
          }else {
            o.isshow=false
          }
        })

        this.orderId = item.id
        const res = await this.$ajax.goods.getRowDetail(item.id)
        this.rowInfo = res.result
        this.orgVo = res.result.orgVo
        this.rawProvideInfoStockVo = res.result.rawProvideInfoStockVo
        this.rawProvideVo = res.result.rawProvideVo
      },
      // 委托聊天
      handleChart(o, v) {
        console.log(o)
      },
      // 自主下单
      handleOrder(o, v) {
        var id = v.id
        this.$router.push({
          name: 'MarkeDetail',
          params: {
            id
          }
        })
      },
      // 分页
      handleCurrentChange(currentPage) {
        // currentPage 当前点击的页数
        this.currentPage = currentPage
        console.log('vv' + currentPage)
      },
      handleSizeChange() {
        console.log('gg')
      },
      // 点击高亮
      handleActive: function (index) {
        this.current = index
      },
      bindActive: function (index) {
        this.currentMa = index
      },
      handleRoute() {
        this.$router.push({
          name: 'SupplierDetail'
        })
      }
    }
  }
</script>

<style lang="less">
  .open {
    height: auto !important;
  }

  .gd-marke-choose-fied {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .gd-marke-main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 30px;

    .gd-marke-choose {
      width: 1200px;
      height: auto;
    }

    .el-pager li.active {
      color: #FF9A75 !important;
    }

    .gd-marke-choose-flex {
      width: 1120px;
      height: 40px;
      box-sizing: border-box;
      padding: 0px 20px;
      margin-top: 20px;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: hidden;
      position: relative;
    }

    .gd-shop-row {
      height: auto;
      border-bottom: 1px solid #E6E6E6;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      box-sizing: border-box;

      p {
        flex-shrink: 0;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #989898;
        background-color: #F4F4F4;
      }
    }

    .gd-marke-choose-tr {
      display: flex;
      height: 50px;
      align-items: center;
      text-align: center;
      border-top: 1px solid #ED7B51;
      border-bottom: 1px solid #E5E5E5;
    }

    .gd-marke-choose-tr p {
      width: 80px;
      text-align: center;
      height: 51px;
      line-height: 51px;
      font-size: 14px;
      color: #989898;
      background-color: #F4F4F4;
    }

    .gd-marke-choose-tr li {
      box-sizing: border-box;
      width: 50px;
      height: 30px;
      line-height: 30px;
      margin-right: 30px;
      font-size: 13px;
      color: #666;
      cursor: pointer;
      text-align: center;
    }

    .gd-marke-choose-br {
      display: flex;
      height: auto;
      align-items: flex-start;
      text-align: center;
    }

    .gd-marke-choose-br li {
      width: 50px;
      height: 32px;
      line-height: 32px;
      margin-right: 30px;
      font-size: 13px;
      color: #666;
      cursor: pointer;
    }

    .gd-marke-choose-br p {
      width: 80px;
      text-align: center;
      height: 67px;
      line-height: 67px;
      font-size: 14px;
      color: #989898;
      background-color: #F4F4F4;

    }

    .bgcActive {
      color: #fff !important;
      background-color: #ED7B51 !important;
      font-weight: bold;
    }

    .gd-home-mro {
      width: 1200px;
      height: 80px;
      display: flex;
      align-items: center;
      border-radius: 10px 10px 0px 0px;
      color: #fff;
      background: rgba(231, 80, 100, 1);
      margin-top: 30px;

      img {
        width: 28px;
        height: 28px;
        display: block;
        margin-left: 20px;
        margin-right: 10px;
      }

      span {
        font-size: 28px;
        display: block;
      }
    }

    .gd-home-offer {
      background: rgba(233, 186, 94, 1);
    }

  }

  .gd-home-market-s {
    display: flex;
    height: auto;
    background-color: #fff;

    .el-carousel__item {
      display: flex;
    }
  }

  .gd-home-supplier {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #E6E6E6;
    border-bottom: 1px solid #E6E6E6;
    height: 294px;
    width: 239px;

    &:first-of-type {
      border-left: 1px solid #E6E6E6;
    }

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


  .gd-marke-cen {
    width: 1200px;
    height: auto;
    margin-top: 30px;
  }

  .gd-marke-fold {
    display: block;
    width: 23px;
    height: 23px;
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

    img {
      margin-top: 10px;
    }
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
    font-size: 13px;
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

  .gd-marke-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 24px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 49px;
    }

    .gd-marke-plastic {
      display: flex;

      p:nth-of-type(1) {
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
      }

      p:nth-of-type(2) {
        font-size: 13px;
        width: 159px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: rgba(237, 123, 81, 1);
        border-radius: 4px;
        text-align: center;
      }
    }

    .el-carousel {
      width: 100% !important;
    }

    .el-carousel__container {
      height: 300px !important;
    }
  }

  .gd-el-form {
    .el-form {
      display: flex;
      justify-content: flex-start;
    }

    .el-button {
      padding: 5px 10px;
    }

    .el-form-item {
      margin-right: 50px;
    }
  }

  //暂时样式
  .gd-box-card {
    .el-card {
      margin-bottom: 20px;
    }

    .el-card__body {
      display: flex;
      justify-content: flex-start;

      img {
        flex: 1;
        width: 80px;
        height: 50px;
      }

      .gd-box-card-title {
        display: flex;
        flex: 10;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 15px;

        p:nth-of-type(2) {
          font-size: 13px;
        }

        p:nth-of-type(3) {
          span {
            font-size: 12px;
            color: #666;
          }
        }
      }

      .gd-box-card-btn {
        display: flex;
        flex-direction: column;

        .el-button {
          flex: 1;

          a {
            color: #ED7B51;
            text-decoration: none;
          }
        }

        p {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
</style>
