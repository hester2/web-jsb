<template>
  <div class="gd-payment-main">
    <img src="../../../assets/payment.jpg" alt="">
    <h4>订单支付完成</h4>
    <p>￥{{result.totalPrice}}</p>
    <p>仓库正在备货中</p>
    <el-button class="gd-payment-btn" @click="handleClick">返回订单列表</el-button>
  </div>
</template>

<script>
  export default{
    data(){
      result:{}
    },
    methods:{
      handleClick(){
        this.$router.push({
          name:'PurchaseOrder'
        })
      }
    },
    created() {
      console.log(this.$route.params)
      this.result=this.$route.params
    }
  }
</script>

<style lang="less">
  .gd-payment-main{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    img{
      width: 300px;
      height: 300px;
    }
    p:nth-of-type(1){
      font-size: 30px;
      color: #000;
    }
    p:nth-of-type(2){
      font-size: 14px;
      color: #666;
      margin-top: 20px;
    }
    .gd-payment-btn{
      padding: 10px 10px;
      margin-top: 30px;
      background-color:#EE7C51;
      border: none;
      color: #fff;
    }
  }
</style>
