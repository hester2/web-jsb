<template>
  <div class="gd-order-pay">
    <div class="gd-orderPay-w gd-orderPay-ws">
      <div>
        <p>订单提交成功，请尽快付款！订单号：<span style="color: #ff5722;">{{result.serialNumber}}</span></p>
        <p style="margin-top: 15px;">请您在23时50分34秒 内完成支付，否则订单会被自动取消</p>
      </div>
      <p style="font-size: 14px;"><span style="color: #ff5722;font-size: 25px;margin-right: 10px;">{{result.totalPrice}}</span>元</p>
    </div>
    <div class="gd-orderPay-w">
      <div class="gd-orderPay-radio">
        <el-radio-group v-model="radio1" @change="handleChange">
          <el-radio label="1" border>
            <p style="color: #666;display: flex;align-items: center;"><img src="../../../assets/pinan.png" alt="">银企直联</p>
            <p v-if="payShow" class="gd-orderPay-radio-p">
              <span style="color: #666; margin-left: 100px;">企业|企业</span>
              <span style="color: #666;">支付<span style="font-size: 16px;color: #ff5722;">{{result.totalPrice}}</span>元</span>
            </p>
          </el-radio>
          <el-radio label="2" border>
            <p style="color: #666;display: flex; align-items: center;"><img src="../../../assets/yinlian.jpg" alt="">银联支付</p>
            <p v-if="payShowt" class="gd-orderPay-radio-p">
              <span style="color: #666; margin-left: 100px;">企业|企业</span>
              <span style="color: #666;">支付<span style="font-size: 16px;color: #ff5722;">{{result.totalPrice}}</span>元</span>
            </p>
          </el-radio>
        </el-radio-group>
        <div class="gd-orderPay-btn">
          <el-button @click="handleSend">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        radio1: '1',
        result: {},
        payShow: true,
        payShowt: false,
      }
    },
    created() {
      console.log(this.$route.params)
      this.result = this.$route.params
    },
    computed: {

    },
    methods: {
      handleSend(){
        var link=this.radio1
        this.$router.push({
          name:'Payment',
          params:{
            totalPrice:this.result.totalPrice
          }
        })
      },
      handleChange(value) {
        console.log(value)
        if (value == 1) {
          this.payShow = true
          this.payShowt = false
        } else if (value == 2) {
          this.payShowt = true
          this.payShow = false
        }
      }
    }
  }
</script>

<style lang="less">
  .gd-order-pay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 0px;

    .gd-orderPay-w {
      border-radius: 6px;
      margin-top: 30px;
      width: 1200px;
      box-sizing: border-box;
      padding: 20px 0px;
      box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .gd-orderPay-radio {
      width: 900px;
      display: flex;
      flex-direction: column;

      .el-radio {
        margin: 20px 0px;
        width: 900px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .el-radio__label {
          display: flex;
          justify-content: flex-start;
          width: 100%;
        }

        img {
          width: 30px;
          height: 30px;
        }

        .gd-orderPay-radio-p {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .el-radio.is-bordered {
        padding: 0px 20px 0 10px;
      }

      .el-radio.is-bordered+.el-radio.is-bordered {
        margin: 0px;
      }
    }

    .gd-orderPay-ws {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 25px 150px;

      p {
        text-align: left;
        color: #666;
        font-size: 13px;
      }
    }

    .gd-orderPay-btn {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      margin-top: 20px;
      .el-button{
        padding:3px 15px;
        background-color: #EE7C51;
        color: #fff;
        border: none;
      }
    }
  }
</style>
