import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/element-variables.scss'
import store from './store/index'
import router from './router/index'
import '@/utils/filter'
import '@/api/index' // api
import '@/assets/iconfont/iconfont.css'
import '@/common/rongIm' //融云初始化
import '@/rongIm' // 链接融云

Vue.use(ElementUI)
Vue.config.productionTip = false
import VueResource from 'vue-resource'


// 融云
// var config = {
// 	appkey: 'cpj2xarlchk7n',
// };
// Vue.prototype.$WebIM = RongIMLib.init(config);
//

Vue.use(VueResource)

import App from './App.vue'

console.log('取值',store.state.user.rongIM)


// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
//  }

// 地图
import AMap from 'vue-amap'
Vue.use(AMap)

// 初始化vue-amap
AMap.initAMapApiLoader({
	// 高德key
	key: '9c1d3674ba851539faa1a9241de64ee4',
	// 插件集合 （插件按需引入）
	plugin: ['AMap.Geolocation']
})

// im
import websdk from 'easemob-websdk'
import webimconfig from '@/common/webim.config.js'

// 图表
import VCharts from 'v-charts'
Vue.use(VCharts)

//

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
