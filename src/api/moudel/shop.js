import request from '@/utils/request'
import { HttpRequest } from '@/common/HttpRequest'

const goods = new HttpRequest('shop')

export function rawMaterialInformation(data) {
  return request({
    url: '/rawMaterialInformation/rawMaterialInformation',
    method: 'GET',
    data
  })
}
export default {
  ...goods,
  rawMaterialInformation
}
