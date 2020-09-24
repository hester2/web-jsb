import request from '@/utils/request'
import OSS from 'ali-oss'
import Store from '@/store'

let client

export function getAliSTSAuth() {
  return request({
    url: '/aliSTSAuth',
    method: 'GET'
  })
}

export function put(dir, name, File) {
  try {
    return new Promise((resolve, reject) => {
      if (!Store.getters.aliSTSAuth.securityToken) {
        return Store.dispatch('user/AliSTSAuth').then(result => {
          resolve(result)
        })
      } else {
        resolve(Store.getters.aliSTSAuth)
      }
    }).then(async(stsInfo) => {
      console.log(stsInfo)
      try {
        client = new OSS({
          region: stsInfo.region,
          accessKeyId: stsInfo.accessKeyId,
          accessKeySecret: stsInfo.accesskeySecret,
          bucket: stsInfo.bucket,
          stsToken: stsInfo.securityToken
        })
        const res = await client.put((dir + name), File)
        if (res) {
          return res
        }
      } catch (e) {
        console.error(e)
      }
    })
  } catch (e) {
    console.log(e)
  }
}

export default {
  put
}
