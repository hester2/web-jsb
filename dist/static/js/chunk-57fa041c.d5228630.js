(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57fa041c"],{"72b8":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"amap-page-container"},[i("div",{style:{width:"100%",height:"900px"}},[i("el-amap",{staticClass:"amap-demo",attrs:{vid:"amapDemo",zoom:t.zoom,center:t.center}},[t._l(t.markers,(function(t,e){return i("el-amap-marker",{key:e,attrs:{position:t.position,content:t.content,events:t.events}})})),t._l(t.material,(function(t,e){return i("el-amap-marker",{key:e+"r",attrs:{position:t.position,content:t.content,events:t.events,visible:t.visible}})}))],2)],1)])])},a=[],r=(i("d81d"),i("b0c0"),i("ad8f")),o={data:function(){return{zoom:5,zooms:[5,5],center:[121.5273285,31.21515044],markers:[],material:[]}},created:function(){var t=this;Object(r["r"])({}).then((function(e){var i="https://img-blog.csdnimg.cn/20200708112407149.png";e.result.manufacturerInformationList.map((function(t){t.position=[JSON.parse(t.longitude),JSON.parse(t.latitude)],t.radius=20,t.fillOpacity=1,t.content='<div style="display: flex;width: auto;justify-content: center; height:50px ; align-items: center;"><img  src='+i+' width="15" height="18" alt="" style="margin-right:5px"><div style="text-align:center;color:#fff; background:rgba(238,124,81,1); height: 25px;line-height:25px; width: 54px; font-size:12px;  border-radius: 5px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;">'+t.name+"</div></div>",t.fillColor="rgba(0,136,221,1)"})),e.result.rawMaterialInformationList.map((function(t){t.position=[JSON.parse(t.longitude),JSON.parse(t.latitude)],t.radius=20,t.fillOpacity=1,t.visible=!0,t.content='<div style="text-align:center;color:#fff; background:rgba(238,124,81,0.6); height: 54px;line-height:54px; width: 54px;font-size:12px;  border-radius:50%; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;">'+t.name+"</div>\t",t.fillColor="rgba(0,136,221,1)"})),t.markers=e.result.manufacturerInformationList,t.material=e.result.rawMaterialInformationList}))},methods:{}},s=o,l=(i("84de"),i("2877")),c=Object(l["a"])(s,n,a,!1,null,"527fda8c",null);e["default"]=c.exports},"84de":function(t,e,i){"use strict";var n=i("c3b3"),a=i.n(n);a.a},c3b3:function(t,e,i){}}]);