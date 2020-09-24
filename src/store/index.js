import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from '@/store/modules/user'
import order from '@/store/modules/order'
import userOld from '@/store/modules/user-old'
import chat from '@/store/modules/chat'

// 插件
import createRongImPlugin from '@/store/plugin/rongImPlugin'
import rongIm from '@/store/modules/rongIm/index'
const RongIm = createRongImPlugin()
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    userOld,
    order,
	chat,
    rongIm
  },
  getters,
  plugins: [RongIm]
})

export default store
