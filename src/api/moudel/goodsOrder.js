import request from '@/utils/request'
import { HttpRequest } from '@/common/HttpRequest'
const apiAddr = 'order'
const httpRequest = new HttpRequest(apiAddr)

const getGoodsOrderList = function(userId, params) {
  return request({
    url: `/${apiAddr}/orderList/${userId}`,
    method: 'get',
    params
  })
}

const postGoodsOrder = function(data) {
  return request({
    url: `/${apiAddr}/create`,
    method: 'post',
    data
  })
}


export default {
  ...httpRequest,
  getGoodsOrderList,
  postGoodsOrder
}
