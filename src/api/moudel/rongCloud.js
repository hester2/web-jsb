import request from '@/utils/request'
const api = '/rongCloud/user'

const getRongCloudUser = function (rcId) {
  return request({
    url: `${api}/${rcId}`,
    method: 'get'
  })
}

// 通过融云id数组获取用户信息数组
const getRongClourUserList = function (params) {
  return request({
    url: `${api}`,
    method: 'get',
    params
  })
}

// 通过融云id数组获取用户信息数组
const createGroup = function (data) {
  return request({
    url:'/rongCloud/group/create',
    method: 'POST',
    data
  })
}

// 获取群组列表
const getGroupList = function (rcId) {
  return request({
    url:`/rongCloud/user/${rcId}/group`,
    method: 'GET',
  })
}

// 获取群组人员信息
const getGroupInfoList = function (rcGroupId) {
  return request({
    url:`/rongCloud/group/${rcGroupId}/member`,
    method: 'GET',
  })
}


export default {
  getRongCloudUser,
  getRongClourUserList,
  createGroup,
  getGroupList,
  getGroupInfoList
}
