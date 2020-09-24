<template>
  <div class="gd-planInvoice-main">
    <p class="gd-planInvoice-title">全部商品</p>
    <div class="gd-planInvoice-table-head">
      <ul>
        <li>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
        </li>
        <li>商品</li>
        <li>属性</li>
        <li>数量</li>
        <li>单价</li>
        <li>小计</li>
        <li>操作</li>
      </ul>
    </div>
    <div style="margin: 8px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <div class="gd-planInvoice-card" v-for="(item,index) in cities">
        <el-checkbox :label="item.id" v-model="item.checked" @change="handleCheckAllPreChange(item)" class="gd-el-checkbox">{{item.title}}<i
            class="icon iconfont" style="color:#EE7C51;margin: 4px 0px 0px 10px;">&#xe61c;</i>
        </el-checkbox>
        <div class="gd-planInvoice-card-list" v-for="detail in item.children">
          <ul>
            <li>
              <el-checkbox v-model="detail.checked" :label="item.id" @change="handleCheckedPreChange(item)"></el-checkbox>
            </li>
            <li  @mouseover="changeActive(detail)" @mouseout="removeActive(detail)">
              <img :src="detail.picUrl" alt="">
              <p>
                <span>{{detail.name}}</span>
                <span>相似产品</span>
              </p>
              <div class="gd-planInvoice-card-b" v-show="detail.similarityShow">
                <el-carousel height="150px">
                  <el-carousel-item>
                    <div class="gd-carousel-item-li">
                      <img src="" alt="">
                      <p>薄膜塑料杯制</p>
                      <p>已有60人购买</p>
                      <p>￥52</p>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </li>
            <li>
              <span style="width: 100%; text-align: center;">{{detail.sku}}</span>
            </li>
            <li class="gd-purOrder-title">
              <el-input-number v-model="detail.orderAmount" size="mini" :step="1" :min="0" label="" @change="handleChangeNum" />
            </li>
            <li>
              <span style="width: 100%; text-align: center;">￥{{detail.price}}</span>
            </li>
            <li>
              <span>￥{{detail.perPrice}}</span>
              <span>比加时降￥{{detail.decline}}</span>
            </li>
            <li>
              <p style="width: 100%; text-align: center;">
                <el-button type="text">删除</el-button>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </el-checkbox-group>

    <!-- 多选 -->
    <div class="gd-planInvoice-footer">
      <div class="gd-planInvoice-footer-left">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button type="text">删除</el-button>
        <el-button type="text">分享</el-button>
      </div>
      <div class="gd-planInvoice-footer-right">
        <p>已选择2件</p>
        <p>合计<span>￥3620.30</span></p>
        {{checkedCities.length}}
        <el-button :disabled="!checkedCities.length ||checkedPreCities>=1">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  const cityOptions = [{
      title: '泉州中石化',
      id: 0,
      children: [{
          id: 0,
          picUrl: require('../../../assets/bg-make-jianjie.png'),
          name: '1薄膜塑料杯定制，超亮超薄超结实！薄膜塑料杯定制',
          sku: '10cm薄膜',
          orderAmount: '1',
          price: '0.08',
          perPrice: '30.00',
          decline: '0.12',
        },
        {
          id: 1,
          picUrl: require('../../../assets/bg-make-jianjie.png'),
          name: '2薄膜塑料杯定制，超亮超薄超结实！薄膜塑料杯定制',
          sku: '10cm薄膜',
          orderAmount: '1',
          price: '0.08',
          perPrice: '30.00',
          decline: '0.12',
        },
      ]
    },
    {
      title: '福州中石化',
      id: 1,
      children: [{
        id: 2,
        picUrl: require('../../../assets/bg-make-jianjie.png'),
        name: '薄膜塑料杯定制，超亮超薄超结实！薄膜塑料杯定制',
        sku: '10cm薄膜',
        orderAmount: '1',
        price: '0.08',
        perPrice: '30.00',
        decline: '0.12',
      }]
    },
    {
      title: '宁德中石化',
      id: 2,
      children: [{
        id: 3,
        picUrl: require('../../../assets/bg-make-jianjie.png'),
        name: '薄膜塑料杯定制，超亮超薄超结实！薄膜塑料杯定制',
        sku: '10cm薄膜',
        orderAmount: '1',
        price: '0.08',
        perPrice: '30.00',
        decline: '0.12',
      }]
    },
  ]
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        orderAmount: 0,
        checkedPreAll: false,
        checkedPreCities: [],
        citiePres: ['1', '2', '3', '4'],
        //
        disabled: true,
        checkedAll: [],
      };
    },
    created() {
      return this.cities.map(item => {
        this.$set(item, 'checked', false)
        item.children.map(o => {
          this.$set(o, 'checked', false)
          this.$set(o, 'similarityShow', false)
          return item
        })
        return item
      })
      console.log('gg', this.cities)
    },
    methods: {
      handleChangeNum() {

      },
      changeActive(val) {
        console.log(val)
        this.cities.map(item => {
          item.children.map(o => {
            if (o.id == val.id) {
              this.$set(o, 'similarityShow', true)
            }
          })
        })
      },
      removeActive(val) {
        this.cities.map(item => {
          item.children.map(o => {
            if (o.id == val.id) {
              this.$set(o, 'similarityShow', false)
            }
          })
        })
      },
      handleCheckAllChange(val) {
        this.checkedCities = val
        this.checkedPreCities = val
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        console.log('gg', value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckAllPreChange(val) {
        this.checkedPreCities = val.checked
        if (val.checked == false) {
          this.cities.map(item => {
            if (item.title == val.title) {
              this.$set(item, 'checked', true)
              item.children.map(o => {
                this.$set(o, 'checked', true)
                return o
              })
              return item
            }
          })
        } else {
          this.cities.map(item => {
            if (item.title == val.title) {
              this.$set(item, 'checked', false)
              item.children.map(o => {
                this.$set(o, 'checked', false)
                return item
              })
            }
          })
        }
        console.log(this.cities)
      },
      handleCheckedPreChange(val) {
        this.cities.map(item => {
          if (item.title == val.title) {
            item.children.map(o => {
              if (o.id == val.id) {
                this.$set(o, 'checked', true)
                return item
              }
            })
          }
        })
      }
    }
  };
</script>

<style lang="less">
  .gd-planInvoice-main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 15px 15px;
    position: relative;
    background-color: #fff;

    .el-checkbox {
      text-align: left;
    }

    .gd-planInvoice-card {
      box-shadow: 0px 1px 6px 0px rgba(25, 8, 15, 0.17);
      margin-bottom: 15px;
      box-sizing: border-box;
      padding: 15px 15px;
      border-radius: 8px;
      background-color: #fff;
    }

    .gd-planInvoice-title {
      font-size: 14px;
      color: #EE7C51;
      line-height: 30px;
      text-align: left;
      margin-bottom: 10px;
    }

    .gd-planInvoice-table-head {
      ul {
        width: 100%;
        display: flex;
        background-color: #F5F5F5;
        box-sizing: border-box;
        padding: 5px 15px;

        li {
          font-size: 12px;
          color: #333333;
          width: 140px;
        }

        li:nth-of-type(1) {
          width: 50px;
          display: flex;
          align-items: center;
        }

        li:nth-of-type(2) {
          width: 240px;
        }
      }

      .el-checkbox {
        display: flex;
        align-items: center;
      }
    }

    .gd-el-checkbox {
      border-bottom: 1px solid #eee;
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 0px;
    }

    .el-checkbox {
      width: 100%;
    }

    .el-checkbox__label {
      text-align: left;
    }

    .gd-planInvoice-card-list {
      position: relative;

      ul {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 10px 0px;

        li {
          font-size: 12px;
          color: #333333;
          width: 140px;
          display: flex;
          align-items: center;

          img {
            width: 50px;
            height: 60px;
          }
        }

        li:nth-of-type(1) {
          width: 25px;
          display: flex;
          align-items: center;
        }

        li:nth-of-type(6) {
          display: flex;
          flex-direction: column;
          justify-content: center;

          span {
            display: block;
          }
        }

        li:nth-of-type(2) {
          width: 240px;
          display: flex;
          font-size: 12px;

          p {
            margin-left: 5px;

            span {
              text-align: left;
              display: block;
            }

            span:nth-of-type(2) {
              color: #999999;
            }
          }
        }
      }

      .gd-planInvoice-card-b {
        position: absolute;
        z-index: 2000;
        top: 80px;
        left: 80px;
        width: 800px;
        background-color: #fff;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
        .el-carousel__item{
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          box-sizing: border-box;
          padding: 10px 15px;
          .gd-carousel-item-li{
            width:90px;
            display: flex;
            flex-direction: column;
            img{
              width: 80px;
              height: 68px;
            }
            p{
              font-size: 13px;
              text-align: left;
            }
            p:nth-of-type(2){
              font-size: 12px;
              color: #ccc;
            }
            p:nth-of-type(3){
              font-size: 14px;
              color: #EE7C51;
            }
          }
        }
      }
    }

    .el-button {
      color: #EE7C51;
    }

    .gd-planInvoice-footer {
      height: 60px;
      box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.16);
      display: flex;
      align-items: center;
      width: 1000px;
      background-color: #fff;
      justify-content: space-between;
      position: fixed;
      z-index: 2000;
      bottom: 0px;
      border-radius: 5px;
      box-sizing: border-box;
      padding-left: 15px;
    }

    .gd-planInvoice-footer-left {
      width: 300px;
      font-size: 13px;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .el-checkbox {
        width: 80px;
      }
    }

    .gd-planInvoice-footer-right {
      width: 300px;
      font-size: 13px;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;

      p:nth-of-type(2) {
        margin: 0px 15px;

        span {
          color: #EE7C51;
          font-size: 18px;
        }
      }

      .el-button {
        background-color: #EE7C51;
        border: none;
        color: #fff;
        height: 100%;
        border-radius: 0px 5px 5px 0px;
      }
    }
  }
</style>
