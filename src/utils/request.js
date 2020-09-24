import Vue from 'vue'
import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import storage from 'store'
import router from '@/router'
import { ACCESS_TOKEN } from '@/store/mutation-types'

function getBaseURL() {
  const hostName = window.location.hostname
  let url
  if (hostName === '120.25.198.221') {
    url = 'http://120.25.198.221:7001'
  } else {
    url = 'http://192.168.101.128:7001'
    // url = 'http://192.168.101.16:7001'
  }
  return url
}

Vue.prototype.$WebUrl = process.env.VUE_APP_BASE_API // 测试
// baseURL: "http://47.114.147.111:7001",//正式
Vue.prototype.$UploadUrl = getBaseURL() + '/goods/pic/' // 图片预览地址

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url  测试
  // baseURL: "http://192.168.101.16:8090/api",//正式
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})
// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    console.log(error.response)
    // 从 localstorage 获取 token

    const data = error.response.data
    console.log(data)
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status >= 400 && error.response.status !== 401) {
      Notification.error({
        // title: error.response.status,
        message: data.message
      })
    }
    /* if (error.response.status === 403) {
      Notification.error({
        title: '错误',
        message: data.message
      })
    }*/
    if (error.response.status === 401) {
      Notification.error({
        title: '未授权',
        message: '授权验证失败'
      })
      console.log(error.response)
      if (token) {
        store.dispatch('user/Logout').then(() => {
          router.push({ name: 'Login' })
        }).finally(() => {
          router.push({ name: 'Login' })
        })
      } else {
        router.push({ name: 'Login' })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(
  config => {
    const token = storage.get(ACCESS_TOKEN)
    if (store.getters.token) {
      config.headers['Authorization'] = token
    }
    config.headers['AppType'] = '1'
    return config
  },
  errorHandler
)

// response interceptor
service.interceptors.response.use(
  response => {
    return new Promise((resolve, reject) => {
      if (response.data.code + '' === '200') {
        const token = response.headers.authorization
        if (token) {
          response.data.token = token
        }
        // console.log(response.data)
        return resolve(response.data)
      } else {
        Notification.error({
          title: '错误',
          message: (response.data && response.data.message) || '请求失败，请重试！'
        })
        new Error(response)
        reject(response && response.data)
      }
    })
  },
  errorHandler
)

export default service
