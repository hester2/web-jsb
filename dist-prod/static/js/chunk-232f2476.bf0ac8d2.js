(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-232f2476"],{1594:function(t,n,e){"use strict";var s=e("93cd"),a=e.n(s);a.a},"3f27":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"gd-payment-main"},[s("img",{attrs:{src:e("bd55"),alt:""}}),s("h4",[t._v("订单支付完成")]),s("p",[t._v("￥"+t._s(t.result.totalPrice))]),s("p",[t._v("仓库正在备货中")]),s("el-button",{staticClass:"gd-payment-btn",on:{click:t.handleClick}},[t._v("返回订单列表")])],1)},a=[],c={data:function(){},methods:{handleClick:function(){this.$router.push({name:"PurchaseOrder"})}},created:function(){console.log(this.$route.params),this.result=this.$route.params}},i=c,r=(e("1594"),e("2877")),u=Object(r["a"])(i,s,a,!1,null,null,null);n["default"]=u.exports},"93cd":function(t,n,e){},bd55:function(t,n,e){t.exports=e.p+"static/img/payment.8d2616e4.jpg"}}]);