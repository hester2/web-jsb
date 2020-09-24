import Vue from 'vue'
import goods from '@/api/moudel/goods'
import search from '@/api/moudel/search'
import user from '@/api/user'
import goodsOrder from '@/api/moudel/goodsOrder'
import aliSTS from '@/api/moudel/aliSTS'
import rongCloud from '@/api/moudel/rongCloud'

const modules = {
  goods,
  search,
  user,
  goodsOrder,
  aliSTS,
  rongCloud
}

Vue.prototype.$ajax = {}
Object.keys(modules).forEach((item) => {
  Vue.prototype.$ajax[`${item}`] = modules[item]
})

