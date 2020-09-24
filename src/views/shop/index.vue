<template>
  <div class="gd-shop-main">
    <div class="gd-shop-w">
      <div class="gd-shop-h3">
        <h3>所有类目</h3>
        <p>
          <el-button v-if="false" @click="handleSend">
            我要发布
          </el-button>
          共 <span> &nbsp; {{ result.total || 0 }} &nbsp;</span> 件相关产品<img
            v-if="!showAll"
            src="../../assets/img/icon-shop-001.png"
            alt=""
            @click="handleAll"
          >
          <img v-if="showAll" src="../../assets/img/icon-shop-004.png" alt="" @click="handleAll">
        </p>
      </div>
      <div class="gd-shop-top">
        <div class="gd-shop-row">
          <p>特性级别：</p>
          <select-tags
            v-model="queryParams.characterLevel"
            :options="features"
            is-select
            is-show-more
            @change="getGoodsList"
          />
        </div>
        <div class="gd-shop-row">
          <p>类型：</p>
          <select-tags v-model="queryParams.materialType" :options="product" is-select @change="getGoodsList" />
        </div>
        <div class="gd-shop-row">
          <p>加工级别：</p>
          <select-tags v-model="queryParams.craftType" :options="level" is-select is-show-more @change="getGoodsList" />
        </div>
        <div class="gd-shop-row">
          <p>分类：</p>
          <select-tags v-model="queryParams.rawCategoryType" :options="classification" @change="getGoodsList" />
        </div>
      </div>
      <div class="gd-shop-cr">
        <p>综合</p>
        <p @click="handlePrice">价格
          <img v-if="!showPrice" src="../../assets/img/icon-shop-002.png" alt="" @click="upchange">
          <img v-if="showPrice" src="../../assets/img/icon-shop-005.png" alt="" @click="downchange">
        </p>
        <div class="gd-shop-price">
          <el-input v-model="queryParams.minPrice" style="width: auto" size="mini" type="text" placeholder="¥ 最低价" />
          <span>--</span>
          <el-input v-model="queryParams.maxPrice" style="width: auto" size="mini" type="text" placeholder="¥ 最高价" />
          <span>起订量</span>
          <el-input v-model="queryParams.minPurchaseNum" style="width: auto" size="mini" type="text" />
          <span>以下</span>

          <p class="gd-shop-btn" @click="getGoodsList">提交</p>
        </div>
        <div class="gd-shop-city" @click.stop="handleAdress">
          发货地<img src="../../assets/img/icon-shop-002.png" alt="">
          <!-- <div v-if="showAdress" class="gd-shop-fed">
            <el-cascader-panel v-model="addressValue" :options="options" @change="handleChange" />
          </div> -->
        </div>
      </div>
      <div
        v-loading="loading"
        class="gd-shop-card"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <goods-item v-for="(item,index) in result.list" :key="index" :record="item" @handleDetail="handleDetail" />
      </div>
      <div style="margin-top: 36px;text-align: center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="result.total"
          :page-size="queryParams.pageSize || 20"
          :current-page.sync="queryParams.pageNum"
          @current-change="getGoodsList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {
  Debounce
} from '../../utils/FnUtils.js'
import {
  getShop
} from '@/api/table.js'
import GoodsItem from './components/GoodsItem'
import selectTags from '@/components/tags/selectTags'
import {
  mapGetters
} from 'vuex'
import {
  features,
  level,
  product,
  classification
} from './data'

export default {
  components: {
    GoodsItem,
    selectTags
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: [String, Number]
  },
  data() {
    return {
      loading: true,
      queryParams: {
        pageSize: 20,
        pageNum: 1
      },
      result: {},
      features,
      product,
      level,
      classification,
      showAdress: false,
      showAll: false, // 分类所有
      showFeatures: false, // 特性级别
      showType: false, // 类型
      showProce: false, // 加工级别
      showFication: false, // 分类
      showPrice: false, // 价格
      current: 0,
      currentOne: 0,
      currentTwo: 0,
      currentThree: 0,
      options: [],
      addressValue: '',
      shopStatus: '',
      shopInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.$http.get('/citylist.json').then(function(response) {
      const data = response.data
      this.options = data
    })
      .catch(function(error) {
        console.log('出错喽：' + error)
      })
    if (this.userInfo.userId) {
      getShop(this.userInfo.userId).then(res => {
        if (res.result) {
          this.shopStatus = res.result.shopStatus
          this.shopInfo = res.result
          if (this.shopStatus == 1) {
            this.$store.dispatch('user/UpdateUserInfo', this.shopInfo)
          }
        }
      })
    }
  },
  mounted() {
    this.getGoodsList()
  },
  methods: {
    // 发布
    handleSend() {
      var that = this
      if (that.userInfo.userId) {
        console.log(that.shopStatus)
        if (this.userInfo.shopStatus * 1 === 1) {
          this.$message('后台管理正在开发中...')
        } else {
          this.$message('请前往手机端认证')
        }
      } else {
        this.$message('请前往登录')
      }
    },
    getGoodsList: Debounce(async function() {
      this.loading = true
      console.log('getGoodsList')
      try {
        const res = await this.$ajax.goods.querySearchPage(this.queryParams)
        this.result = res.result
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }),
    handleDetail(id) {
      this.$router.push({
        name: 'ShopDetail',
        params: {
          id
        }
      })
    },
    search() {
      this.$nextTick(() => {
        this.getGoodsList()
      })
    },
    upchange() {
      // 价格升序
      this.result.list.sort((a, b) => {
        // 排序基于的数据
        return b.perPrice - a.perPrice
      })
    },
    downchange() {
      // 价格降序
      this.result.list.sort((a, b) => {
        // 排序基于的数据
        return a.perPrice - b.perPrice
      })
    },
    // 地址选择
    handleChange(value) {
      console.log(value)
      console.log(this.addressValue)
    },
    handleAdress() {
      this.showAdress = true
    },
    // 点击高亮
    handleActive: function(index, o) {
      // this.current = index;
      switch (o) {
        case 0:
          this.current = index
          break
        case 1:
          this.currentOne = index
          break
        case 2:
          this.currentTwo = index
          break
        case 3:
          this.currentThree = index
          break
      }
    },
    // 所有分类折叠事件
    handleAll() {
      $('.gd-shop-top').toggleClass('gd-shop-fold')
      this.showAll = !this.showAll
    },
    // 价格
    handlePrice() {
      this.showPrice = !this.showPrice
    },
    // 点击折叠
    handleShow(o) {
      switch (o) {
        case 0:
          $('.gd-shop-flex0').toggleClass('open')
          this.showFeatures = !this.showFeatures
          break
        case 1:
          $('.gd-shop-flex1').toggleClass('open1')
          this.showType = !this.showType
          break
        case 2:
          $('.gd-shop-flex2').toggleClass('open2')
          this.showProce = !this.showProce
          break
        case 3:
          $('.gd-shop-flex3').toggleClass('open3')
          this.showFication = !this.showFication
          break
      }
    }
  }
}
</script>

<style lang="less">
  .gd-shop-main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .gd-shop-w {
      width: 1200px;
      height: auto;
    }

    .gd-shop-h3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0px 0px;
      margin-top: 10px;

      .el-button {
        width: 88px;
        background: rgba(238, 124, 81, 1);
        height: 34px;
        line-height: 34px;
        display: block;
        padding: 0px;
        text-align: center;
        border: none;
        margin-right: 30px;

        a {
          color: #fff !important;
          text-decoration: none;
        }
      }

      h3 {
        color: #EE7C51;
        font-size: 28px;
      }

      p {
        display: flex;
        align-items: center;
        font-size: 13px;

        .el-button {
          span {
            color: #fff;
            padding: 0 3px;
          }
        }

        span {
          color: #EE7C51;
        }

        img {
          width: 20px;
          height: 20px;
          margin-left: 10px;
        }
      }
    }

    .gd-shop-top {
      overflow: hidden;
      width: 1200px;
      border: 1px solid #E6E6E6;
      margin: 20px 0px;
      margin-top: 0px;
    }

    .gd-shop-fold {
      height: 45px;
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
        text-align: right;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: #666666;
      }
    }

    .open {
      height: 80px !important;
    }

    .open1 {
      height: 80px !important;
    }

    .open2 {
      height: 80px !important;
    }

    .open3 {
      height: 80px !important;
    }

    .gd-shop-flex {
      width: 960px;
      height: 35px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0px 0px;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;

      li {
        box-sizing: border-box;
        width: 50px;
        height: 30px;
        line-height: 30px;
        margin-right: 30px;
        font-size: 13px;
        cursor: pointer;
        color: #666666;
      }
    }

    .bgcActive {
      color: #ED7B51 !important;
      font-weight: bold;
    }

    .gd-shop-m {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;

      img {
        display: block;
        margin-left: 5px;
      }
    }

    .gd-shop-cr {
      height: 50px;
      width: 100%;
      background-color: #E6E6E6;
      margin: 20px 0px;
      display: flex;
      align-items: center;
      position: relative;

      p:nth-of-type(1) {
        background-color: #EE7C51;
        line-height: 50px;
        width: 88px;
        color: #fff;
        text-align: center;
        font-size: 12px;
        border-right: 1px solid #ccc;
      }

      p:nth-of-type(2) {
        line-height: 50px;
        width: 88px;
        color: #666666;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #ccc;
      }

      .gd-shop-city {
        position: relative;
        line-height: 50px;
        width: 88px;
        color: #666666;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #ccc;

        .gd-shop-fed {
          position: absolute;
          top: 49px;
          left: 0px;
          width: 500px;
          background-color: #fff;
          height: auto;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          flex-direction: row;
          flex-wrap: wrap;
          box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);

          p {

            width: 66px;
            line-height: 25px;
            background-color: transparent;
            color: #333;
            border: none;
          }
        }
      }

      .gd-shop-price {
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0px 10px;
        height: 50px;

        input {
          width: 80px;
        }

        span {
          font-size: 12px;
          margin: 0px 10px;
        }
      }

      ::-webkit-input-placeholder {
        color: #999;
        text-align: center;
        font-size: 12px;
      }

      .gd-shop-btn {
        width: 50px !important;
        background-color: #EE7C51;
        color: #fff;
        line-height: 30px !important;
        line-height: 30px;
        margin-left: 10px;
        border-radius: 8px;
        cursor: pointer;
      }
    }

    .gd-shop-card {
      width: 1200px;
      height: auto;
      display: flex;
      display: -webkit-flex;
      align-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;

    }
  }
</style>
