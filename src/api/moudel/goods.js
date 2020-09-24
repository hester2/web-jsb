// import request from '@/utils/request'
import {
  HttpRequest
} from '@/common/HttpRequest'
import request from '@/utils/request'

const api = 'goods'

const goods = new HttpRequest('goods')

function querySearchPage(params) {
  return request({
    url: `/${api}/querySearchPage`,
    method: 'GET',
    params
  })
}
//获取发布原料列表
function querySearchRowPage(params) {
  return request({
    url: `/rawProvide/list`,
    method: 'GET',
    params
  })
}
//获取发布原料供应信息
function getRowDetail(rawProvideId) {
  return request({
    url: `/rawProvide/${rawProvideId}/info`,
    method: 'GET'
  })
}

//获取发布原料供应信息
function getRawProvideDetail(rawProvideInfoId) {
  return request({
    url: `/rawProvide/${rawProvideInfoId}/details`,
    method: 'GET'
  })
}

// 原料求购查询接口/
function querySearchRowbuyInfo(id) {
  return request({
    url: `/raw/${id}/buyInfo`,
    method: 'GET'
  })
}

// 查询订单信息接口/
function getOrderInfo(orderId) {
  return request({
    url: `/order/${orderId}/item`,
    method: 'GET'
  })
}

// 获取下载合同和查看合同接口
function getOrderContract(orderId) {
  return request({
    url: `/contract/${orderId}/url`,
    method: 'GET'
  })
}


export default {
  ...goods,
  querySearchPage,
  querySearchRowPage,
  querySearchRowbuyInfo,
  getRowDetail,
  getRawProvideDetail,
  getOrderInfo,
  getOrderContract
}
