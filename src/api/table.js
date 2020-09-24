import request from '@/utils/request'

export function getConversations(params) {
  return request({
    url: '/huanXin/getConversations',
    method: 'GET',
    params
  })
}
export function saveConversations(data) {
  return request({
    url: '/huanXin/saveConversations',
    method: 'POST',
    data
  })
}
export function deleteConversations(params) {
  return request({
    url: '/huanXin/deleteConversations',
    method: 'DELETE',
    params
  })
}
export function inserRawMaterialManufacturer(data) {
  return request({
    url: '/rawMaterialInformation/inserRawMaterialManufacturer',
    method: 'POST',
    data
  })
}
export function insertRawMaterialBazaar(data) {
  return request({
    url: '/rawMaterialInformation/insertRawMaterialBazaar',
    method: 'POST',
    data
  })
}
export function rawMaterialInformation(data) {
  return request({
    url: '/rawMaterialInformation/rawMaterialInformation',
    method: 'GET',
    data
  })
}
export function saveRawInformation(data) {
  return request({
    url: '/rawMaterialRelated/saveRawInformation',
    method: 'post',
    data
  })
}

export function getRawInformation(params) {
  return request({
    url: '/rawMaterialRelated/getRawInformation',
    method: 'get',
    params
  })
}

// 提交
export function insertGoodsInfo(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}

// 查询spu详情信息
export function getGoodsInfo(spuId) {
  return request({
    url: `/goods/${spuId}`,
    method: 'get'
  })
}

// 修改制品信息
export function updateGoodsInfo(data) {
  return request({
    url: '/goods',
    method: 'PUT',
    data
  })
}

// 修改制品状态
export function updateGoodsStatus(spuId,data) {
  return request({
    url: `/goods/${spuId}/state`,
    method: 'PUT',
    data
  })
}

export function updateRawReception(data) {
  return request({
    url: '/rawMaterialRelated/updateRawReception',
    method: 'POST',
    data
  })
}

// 新增提交地址
export function insertUserAddress(data) {
  return request({
    url: '/address',
    method: 'POST',
    data
  })
}

// 用户地址信息查询
export function obtainUserAddress(params) {
  return request({
    url:'/address',
    method: 'get',
    params
  })
}

// 编辑地址
export function updateUserAddress(addressId,data) {
  return request({
    url:`/address/${addressId}`,
    method: 'put',
    data
  })
}

// 删除地址
export function cancelUserAddress(addressId,params) {
  return request({
    url:`/address/${addressId}`,
    method: 'DELETE',
    params
  })
}

// 查询店铺接口
export function getShop(userId,params) {
  return request({
    url: `/shop/byUser`,
    method: 'GET',
    params
  })
}

// 通过手机号查询融云id
export function searchPhone(phone,params) {
  return request({
    url: `/rongCloud/search/phone/${phone}`,
    method: 'GET',
    params
  })
}

// web生成二维码接口
export function soleLogo(params) {
  return request({
    url:'/qrLoginId',
    method: 'GET',
    params
  })
}

//合同路径
export function postGoodsSignUrl(orderId) {
  return request({
    url:`/contract/${orderId}/buyerSignUrl`,
    method: 'GET'
  })
}

//生成订单合同
export function createContract(data) {
  return request({
    url:`/contract`,
    method: 'POST',
    data
  })
}

// 修改合同状态
export function postGoodsSignState(orderId) {
  return request({
    url:`/goodsOrder/order/${orderId}/signState`,
    method: 'PUT',
  })
}


// 买家签署结果查询接口
export function postGoodsSignfdd(orderId) {
  return request({
    url:`/fdd/sign/${orderId}/result`,
    method: 'GET'
  })
}

// 添加好友接口
export function getAddFriends(data) {
  return request({
    url:'/friend',
    method: 'post',
		data
  })
}

// 查询好友请求记录
export function getFriendrecord(params) {
  return request({
    url:'/rongCloud/friend/record',
    method: 'GET',
		params
  })
}

// 修改好友请求状态
export function getFriendState(data) {
  return request({
    url:'/friend',
    method: 'PUT',
		data
  })
}

// 查询好友列表接口
export function getFriends() {
  return request({
    url:'/rongCloud/friend',
    method: 'GET',
  })
}
export function getGroupInfoList(rcGroupId) {
  return request({
    url:`/rongCloud/group/${rcGroupId}/member`,
    method: 'GET',
  })
}
export function getRowDetail(rawProvideId) {
  return request({
    url: `/rawProvide/${rawProvideId}/info`,
    method: 'GET'
  })
}


// 查询原料分类列表
export function getCategoryList() {
  return request({
    url:'/raw/category/list',
    method: 'GET',
  })
}
