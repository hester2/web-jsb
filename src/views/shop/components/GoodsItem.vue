<template>
  <div class="gd-goods-item">
    <div class="gd-shop-card-col">
      <div @click="handleDetail">
        <img :src="localRecord.mainImg || '' " alt="">
        <p>{{ record.title }}</p>
        <p>{{ record.subTitle }}</p>
        <p><span>满3000减30</span><span>交期保障</span></p>
        <p>¥ {{ (record.skuList && record.skuList[0].perPrice) || 0 }}</p>
      </div>
      <p v-if="showFactory" class="gd-shop-col-br" style="margin: 0">
<!--        <span>源头工厂</span>-->
        <span @click.stop="handleShop(record.shopId)">{{ record.shopName }}</span>
        <img src="../../../assets/img/icon-shop-003.png" alt="">
      </p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'GoodsItem',

  components: {},

  mixins: [],

  props: {
    // eslint-disable-next-line vue/require-default-prop
    record: Object,
    showFactory: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      localRecord: {},
      uplode: 'http://120.25.198.221:8090/goods/pic/'
    }
  },

  computed: {},

  watch: {
    record(val) {
      this.localRecord = val
    }
  },

  created() {
    this.localRecord = this.record
  },

  mounted() {
  },

  destroyed() {
  },

  methods: {
    handleDetail() {
      this.$emit('handleDetail', this.record.id)
    },
    handleShop(id) {
      this.$router.push({
        name: 'ShopHome',
        params: { id }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .gd-goods-item {
    margin-right: 20px;
    &:nth-child(5n+5){
      margin-right: 0px;
    }

    .gd-shop-card-col {
      width: 222px;
      height: auto;
      margin-top: 20px;
      border: 1px solid #E6E6E6;
      display: flex;
      flex-direction: column;

      img {
        width: 223px;
        height: 228px;
        margin-bottom: 10px;
      }

      p:nth-of-type(1) {
        font-size: 12px;
        color: #333333;
        margin: 0px 10px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }

      p:nth-of-type(2) {
        font-size: 12px;
        color: #999999;
        margin: 0px 10px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }

      p:nth-of-type(3) {
        display: flex;
        margin: 0px 10px;
        font-size: 12px;
        text-align: center;

        span:nth-of-type(1) {
          width: 72px;
          height: 18px;
          line-height: 18px;
          border: 1px solid rgba(238, 124, 81, 1);
          color: #FF7301;
          border-radius: 2px;
          display: block;
        }

        span:nth-of-type(2) {
          width: 56px;
          height: 18px;
          line-height: 18px;
          border: 1px solid #6278C8;
          color: #6278C8;
          border-radius: 2px;
          display: block;
          margin-left: 10px;

        }
      }

      p:nth-of-type(4) {
        text-align: left;
        font-size: 22px;
        color: #FF7301;
        margin: 10px 10px;
      }

      .gd-shop-col-br {
        margin: 0;
        border-top: 1px solid #E6E6E6;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0px 10px;
        width: 222px;
        height: 40px;
        text-align: center;

        span:nth-of-type(1) {
          text-align: center;
          background-color: #FF6C03;
          width: 60px;
          color: #fff;
          font-size: 12px;
          height: 16px;
          display: block;
          line-height: 16px;
          margin-right: 10px;
        }

        span:nth-of-type(2) {
          width: 100px;
          overflow: hidden;
          display: block;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 16px;
          line-height: 16px;
          cursor: pointer;
        }

        img {
          width: 16px;
          height: 16px;
          display: block;
          margin: 0px;
          margin-left: 10px;
        }
      }
    }
  }
</style>
