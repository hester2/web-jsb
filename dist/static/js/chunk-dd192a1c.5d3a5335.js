(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd192a1c"],{"51e0":function(t,e,l){},"5c87":function(t,e,l){"use strict";var a=l("51e0"),i=l.n(a);i.a},b0be:function(t,e,l){"use strict";l.r(e);var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"gd-from-main"},[l("div",{staticClass:"gd-from-row"},[l("h3",[t._v("表单提交")]),l("el-tabs",{staticStyle:{height:"500px"},attrs:{"tab-position":t.tabPosition}},[l("el-tab-pane",{attrs:{label:"市场"}},[l("el-form",{ref:"raw",attrs:{model:t.raw}},[l("p",[t._v("市场")]),l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{model:{value:t.raw.name,callback:function(e){t.$set(t.raw,"name",e)},expression:"raw.name"}})],1),l("el-form-item",{attrs:{label:"经度"}},[l("div",{on:{click:function(e){t.dialogVisible=!0}}},[l("el-input",{model:{value:t.raw.longitude,callback:function(e){t.$set(t.raw,"longitude",e)},expression:"raw.longitude"}})],1)]),l("el-form-item",{attrs:{label:"纬度"}},[l("div",{on:{click:function(e){t.dialogVisible=!0}}},[l("el-input",{model:{value:t.raw.latitude,callback:function(e){t.$set(t.raw,"latitude",e)},expression:"raw.latitude"}})],1)]),l("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit1}},[t._v("提交")])],1)],1),l("el-tab-pane",{attrs:{label:"原料生产商"}},[l("el-form",{ref:"form",attrs:{model:t.form}},[l("p",[t._v("原料生产商")]),l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"经度"}},[l("div",{on:{click:function(e){t.dialogVisible=!0}}},[l("el-input",{model:{value:t.form.longitude,callback:function(e){t.$set(t.form,"longitude",e)},expression:"form.longitude"}})],1)]),l("el-form-item",{attrs:{label:"纬度"}},[l("div",{on:{click:function(e){t.dialogVisible=!0}}},[l("el-input",{model:{value:t.form.latitude,callback:function(e){t.$set(t.form,"latitude",e)},expression:"form.latitude"}})],1)]),l("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("提交")])],1)],1),l("el-tab-pane",{attrs:{label:"自定义"}},[l("el-form",{ref:"form",attrs:{model:t.custom}},[l("p",[t._v("自定义")]),l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{model:{value:t.custom.name,callback:function(e){t.$set(t.custom,"name",e)},expression:"custom.name"}})],1),l("el-form-item",{attrs:{label:"经度"}},[l("div",{on:{click:function(e){t.dialogVisible=!0}}},[l("el-input",{model:{value:t.custom.longitude,callback:function(e){t.$set(t.custom,"longitude",e)},expression:"custom.longitude"}})],1)]),l("el-form-item",{attrs:{label:"纬度"}},[l("div",{on:{click:function(e){t.dialogVisible=!0}}},[l("el-input",{model:{value:t.custom.latitude,callback:function(e){t.$set(t.custom,"latitude",e)},expression:"custom.latitude"}})],1)]),l("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit2}},[t._v("提交")])],1)],1)],1)],1),l("el-dialog",{attrs:{title:"选择地址",visible:t.dialogVisible,width:"35%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[l("div",{staticStyle:{height:"400px"}},[l("div",{staticClass:"amap-page-container"},[l("el-amap-search-box",{staticClass:"search-box",attrs:{"search-option":t.searchOption,"on-search-result":t.onSearchResult}},[t._v("hhhhhhhhh")]),l("el-amap",{ref:"map",staticClass:"amap-demo",attrs:{vid:"amapDemo",center:t.center,zoom:t.zoom,events:t.events}},[l("el-amap-marker",{attrs:{position:t.markers}})],1)],1)]),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},i=[],o=(l("4160"),l("d81d"),l("b0c0"),l("159b"),l("ad8f")),n=l("5c96"),s={data:function(){var t=this;return{tabPosition:"left",dialogVisible:!1,form:{name:"",longitude:"",latitude:""},raw:{name:"",longitude:"",latitude:""},custom:{name:""},zoom:1,markers:[0,0],center:[0,0],searchOption:{city:"中国",citylimit:!0},events:{init:function(e){console.log(e.getCenter()),console.log(t.$refs.map.$$getInstance()),e.getCity((function(t){console.log(t)}))},moveend:function(){},zoomchange:function(){},click:function(e){console.log(e.lnglat),t.form.longitude=e.lnglat.lng,t.form.latitude=e.lnglat.lat,t.raw.longitude=e.lnglat.lng,t.raw.latitude=e.lnglat.lat,t.custom.longitude=e.lnglat.lng,t.custom.latitude=e.lnglat.lat,t.dialogVisible=!1}}}},methods:{onSearchResult:function(t){var e=this,l=0,a=0;if(t.length>0){t.forEach((function(t){var i=t.lng,o=t.lat;a+=i,l+=o,e.markers=[t.lng,t.lat]}));var i={lng:a/t.length,lat:l/t.length};this.center=[i.lng,i.lat]}},onSubmit:function(){var t=this;Object(o["k"])({latitude:this.form.latitude,longitude:this.form.longitude,name:this.form.name}).then((function(e){Object(n["Message"])({message:"提交成功",type:"success",duration:800}),t.$refs[form].resetFields()}))},onSubmit1:function(){var t=this;Object(o["m"])({latitude:this.raw.latitude,longitude:this.raw.longitude,name:this.raw.name}).then((function(e){Object(n["Message"])({message:"提交成功",type:"success",duration:800}),t.$refs[raw].resetFields()}))},onSubmit2:function(){},getMap:function(){},handleClose:function(t){this.$confirm("确认关闭？").then((function(e){t()})).catch((function(t){}))}}},r=s,c=(l("5c87"),l("2877")),u=Object(c["a"])(r,a,i,!1,null,null,null);e["default"]=u.exports}}]);