<template>
  <div class="gd-shopHome-main-t">
    <div class="gd-shopHome-block">
      <el-carousel height="328px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--<div style="height: 328px;width: 100%;position: relative;">
      <video
        ref="videoPlayer"
        controls
        src="https://video.4i-edu.com/sv/3e54d89e-170aa375adf/3e54d89e-170aa375adf.mp4"
        poster="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1034309747,803078780&fm=26&gp=0.jpg"
        controlslist="nodownload"
        style="width: 100%; height: 100%; object-fit: fill"
      />
      <li v-show="hidden" class="gd-shopHome-play" @click="toPlay"><span class="icon iconfont">&#xe62d;</span></li>
    </div>-->
    <div class="gd-shop-card">
      <goods-item
        v-for="(item,index) in result.list"
        :key="index"
        :record="item"
        :show-factory="false"
        @handleDetail="handleDetail"
      />
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
    <product-title :product-item="product" />
  </div>
</template>

<script>
import {
  Debounce
} from '@/utils/FnUtils.js'
import GoodsItem from '@/views/shop/components/GoodsItem.vue'
import productTitle from '@/components/productTitle'

export default {
  components: {
    GoodsItem,
    productTitle
  },
  data() {
    return {
      queryParams: {
        pageSize: 20,
        pageNum: 1
      },
      result: {},
      loading: false,
      hidden: true,
      product: [{
        'name': 'PP',
        'children': [{
          'title': '7042'
        }, {
          'title': '7041'
        }, {
          'title': '7040'
        }]
      }, {
        'name': 'PE',
        'children': [{
          'title': '7042'
        }, {
          'title': '7041'
        }, {
          'title': '7040'
        }]
      }, {
        'name': 'ABS',
        'children': [{
          'title': '7042'
        }, {
          'title': '7041'
        }, {
          'title': '7040'
        }]
      }]
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList: Debounce(async function() {
      this.loading = true
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
    toPlay() {
      this.$refs.videoPlayer.play()
      if (this.$refs.videoPlayer.paused == true) {
        this.hidden = true
      } else {
        this.hidden = false
      }
    }
  }
}
</script>

<style lang="less">
  .gd-shopHome-main-t {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    .gd-shopHome-block {
      height: 328px;
    }

    .gd-shopHome-block {
      width: 100%;
    }

    .gd-shop-card {
      width: 1200px;
      display: flex;
      flex-wrap: wrap;

    }

    .gd-shopHome-play span {
      font-size: 50px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 50%;
      transform: translateX(-50%);
      color: #F3DBCA;
    }
  }
</style>
