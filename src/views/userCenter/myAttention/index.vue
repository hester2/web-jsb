<template>
  <div class="gd-myAttention-main">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="关注商品" name="1">
        <div class="gd-myAttention-type">
          <p>分类：</p>
          <select-raw-tags :options="material" is-select is-show-more />
        </div>
        <div class="gd-myAttention-shop">
          <div class="gd-myAttention-wrap">
            <li class="gd-myAttention-wrap-img">
              <img src="../../../assets/bg-make-jianjie.png" alt="">
              <p class="gd-myAttention-wrap-b">
                <span>进入店铺</span>
                <span>找相似</span>
              </p>
            </li>
            <li class="gd-myAttention-wrap-title">薄膜塑料杯定制，超亮超薄超结实eeeeeeeeeeeeee</li>
            <li class="gd-myAttention-wrap-price"><span>￥30.00</span> <del>￥38.02</del></li>
            <li class="gd-myAttention-wrap-btn">
              <p><i class="icon iconfont" style="font-size: 16px;color:#EE7C51 ;">&#xe615;</i>加入购物车</p>
              <p>30人购买</p>
            </li>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注店铺" name="2">2</el-tab-pane>
    </el-tabs>
    <p class="gd-myAttention-search">
      <el-input v-model="searchName"></el-input>
      <el-button>搜索</el-button>
    </p>
  </div>
</template>

<script>
  import selectRawTags from '@/components/tags/selectRawTags'
  import {
    material
  } from '../../marke/data.js'
  export default {
    components: {
      selectRawTags
    },
    data() {
      return {
        activeName: '1',
        searchName: '',
        material
      }
    },
    methods: {
      handleClick() {

      }
    }
  }
</script>

<style lang="less">
  .gd-myAttention-main {
    position: relative;

    .el-tabs__header {
      background-color: #fff;
      box-sizing: border-box;
      padding: 0px 15px;
    }

    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }

    .el-tabs {
      position: relative;
    }

    .gd-myAttention-search {
      position: absolute;
      top: 0px;
      right: 15px;
      height: 40px;
      display: flex;
      align-items: center;

      .el-input {
        height: 30px;
      }

      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }

      .el-button {
        height: 30px;
        padding: 0px 15px;
        background-color: #EE7C51;
        border: none;
        color: #fff;
        margin-left: 20px;
      }
    }

    .gd-myAttention-type {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0px 10px;
      font-size: 13px;
      color: #333;
      background-color: #fff;

      p {
        width: 50px;
      }
    }

    .gd-myAttention-shop {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-top: 20px;

    }

    .gd-myAttention-wrap {
      width: 232px;
      background-color: #fff;
      margin: 10px 15px 0px 0px;
      border-radius: 10px;

      .gd-myAttention-wrap-img {
        width: 232px;
        height: 232px;
        position: relative;

        img {
          width: 232px;
          height: 232px;
        }

        .gd-myAttention-wrap-b {
          position: absolute;
          bottom: 0px;
          display: flex;
          width: 100%;

          span {
            display: block;
            width: 50%;
            line-height: 34px;
            background-color: rgba(0, 0, 0, 0.3);
            font-size: 13px;
            color: #fff;
          }

          span:nth-of-type(1) {
            background-color: #EE7C51;
          }
        }
      }

      .gd-myAttention-wrap-title {
        color: #333333;
        font-size: 12px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        padding: 0px 10px;
        margin: 10px 0px;
      }

      .gd-myAttention-wrap-price {
        font-size: 13px;

        span {
          color: #EE7C51;
        }

        del {
          color: #999999;
        }
      }

      .gd-myAttention-wrap-btn {
        display: flex;
        background-color: #E4E4E4;
        margin-top: 7px;
        box-sizing: border-box;
        padding: 3px 0px;
        cursor: pointer;

        p {
          width: 50%;
          line-height: 28px;
          color: #666666;
          font-size: 15px;
        }

        p:nth-of-type(1) {
          color: #EE7C51;
          border-right: 1px solid #fff;
        }
      }
    }
  }
</style>
