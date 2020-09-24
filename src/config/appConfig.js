const appConfig = {}

if (process.env.VUE_APP_API_BASE_URL === '/pro-api') {
  appConfig.ali_oss_bucket = 'jinsubao-prod'
} else {
  appConfig.ali_oss_bucket = 'jinsubao-test'
}
// 缓存
// cache_level:none vuex local
if (process.env.VUE_APP_API_BASE_URL === '/pro-api') {
  appConfig.modular_cache_level = 'none'
  appConfig.modular_time =  5 * 1000
} else {
  appConfig.modular_cache_level = 'none'
  appConfig.modular_time =  0
}

console.log(appConfig)
export default appConfig