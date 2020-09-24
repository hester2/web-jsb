import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/login',
		method: 'post',
		data
	})
}

export function wxLogin(params) {
	return request({
		url: '/wxLogin',
		method: 'post',
		params
	})
}

export function platformUserBind(data) {
	return request({
		url: '/platformUserBind',
		method: 'post',
		data
	})
}
// 注册
export function register(data) {
	return request({
		url: '/register',
		method: 'POST',
		data
	})
}

export function loginCode(params) {
	return request({
		url: '/sendSms',
		method: 'GET',
		params
	})
}

export function getInfo(token) {
	return request({
		url: '/vue-admin-template/user/info',
		method: 'get',
		params: {
			token
		}
	})
}

export function logout(data) {
	return request({
		url: '/logout',
		method: 'post',
		data
	})
}

// 通过融云id获取用户信息
export function rongCloud(rcId) {
	return request({
		url: `/rongCloud/${rcId}`,
		method: 'get'
	})
}

// 快速二维码登录
export function qrLogin(data) {
	return request({
		url: '/qrLogin',
		method: 'POST',
		data
	})
}


export default {
	login,
	wxLogin,
	platformUserBind,
	register,
	loginCode,
	getInfo,
	logout,
	rongCloud,
	qrLogin
}
