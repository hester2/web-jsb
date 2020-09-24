import Vue from 'vue'

const options = {
  appkey: 'cpj2xarlchk7n',
  debug: true
}
//融云初始化
const im = RongIMLib.init(options)
// 表情初始化
RongIMLib.RongIMEmoji.init()

Vue.prototype.$rongIm = im
export default im