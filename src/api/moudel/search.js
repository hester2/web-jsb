import request from '@/utils/request'
// import { HttpRequest } from '@/common/HttpRequest'
const api = {
  querySearchPage: '/search/querySearchPage'
}

function querySearchPage(params) {
  return request({
    url: api.querySearchPage,
    method: 'GET',
    params
  })
}

function querySearchRowPage(id) {
  return request({
    url:`/raw/${id}/material`,
    method: 'GET'
  })
}

export default {
  querySearchPage,
	querySearchRowPage
}
