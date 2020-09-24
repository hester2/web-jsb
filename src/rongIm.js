import router from './router'
import store from './store'

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  /* has token */
  if (whiteList.includes(to.name)) {
    // 在免登录白名单，直接进入
    next()
  } else {
    const userInfo = store.getters.userInfo
    const rongUserId = store.getters.rongUserId
    if (userInfo.rcToken && !rongUserId) {
      console.log(userInfo)
      store.dispatch('rongIm/Init', userInfo)
    }
    next()
  }
})
