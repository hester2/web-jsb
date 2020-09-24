import storage from 'store'
import {
	login,
	qrLogin,
	logout,
	wxLogin,
	register,
	platformUserBind
} from '@/api/user'
import {
	ACCESS_TOKEN,
	USER_INFO
} from '@/store/mutation-types'
import {
	getAliSTSAuth
} from '@/api/moudel/aliSTS'

import appConfig from '@/config/appConfig'

const user = {
	namespaced: true,
	state: {
		token: storage.get(ACCESS_TOKEN) || '',
		userInfo: storage.get(USER_INFO) || {},
		aliSTSAuth: {
			region: 'oss-cn-shenzhen',
			bucket: appConfig.ali_oss_bucket
		},
		rongIM: localStorage.getItem('rc-appk'),
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_USER_INFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		SET_ALI_STS_AUTH: (state, aliSTSAuth) => {
			state.aliSTSAuth = Object.assign({}, state.aliSTSAuth, aliSTSAuth)
		},
		RC_APPK: (state, rongIM) => {
			state.rongIM = rongIM
		}
	},
	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(res => {
					// console.log(res.result.registerState)
					const registerState = res.result.registerState
					if (registerState * 1 === 0) {
						resolve(res)
					} else {
						storage.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)
						storage.set(USER_INFO, res.result)
						commit('SET_TOKEN', res.token)
						commit('SET_USER_INFO', res.result)
						resolve(res)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		//二维码扫码登录
		qrLogin({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				console.log('hgggg', userInfo)
				const registerState = userInfo.result.registerState
				if (registerState * 1 === 0) {
					resolve(userInfo)
				} else {
					console.log(userInfo.result)
					storage.set(ACCESS_TOKEN, userInfo.token, 7 * 24 * 60 * 60 * 1000)
					storage.set(USER_INFO, userInfo.result)
					commit('SET_TOKEN', userInfo.token)
					commit('SET_USER_INFO', userInfo.result)
					resolve(userInfo)
				}
			})
		},

		WxLogin({
			commit
		}, wxUserInfo) {
			return new Promise((resolve, reject) => {
				wxLogin(wxUserInfo).then(res => {
					console.log(res)
					if (res.result && res.result.bindState && res.result.bindState === 0) {
						resolve(res)
					} else {
						storage.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)
						storage.set(USER_INFO, res.result)
						commit('SET_TOKEN', res.token)
						commit('SET_USER_INFO', res.result)
						resolve(res)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		Logout({
			commit
		}, userInfo) {
			console.log('Logout')
			return new Promise((resolve, reject) => {
				storage.remove(ACCESS_TOKEN)
				storage.remove(USER_INFO)
				storage.remove('rcInfo')
				storage.remove('friendInfo')
				commit('SET_TOKEN', '')
				commit('SET_USER_INFO', {})
				logout(userInfo).then(res => {
					console.log(res)
          location.reload()
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 绑定手机号
		BindPhone({
			state,
			commit
		}, userInfo) {
			storage.set(USER_INFO, userInfo)
			commit('SET_USER_INFO', userInfo)
			return new Promise((resolve, reject) => {
				platformUserBind(userInfo).then(res => {
					console.log(res)
					// registerState
					storage.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)
					commit('SET_TOKEN', res.token)
					const userInfo = Object.assign({}, state.userInfo, res.result)
					storage.set(USER_INFO, userInfo)
					commit('SET_USER_INFO', userInfo)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		UpdateUserInfo({
			state,
			commit
		}, updateDate) {
			const userInfo = Object.assign({}, state.userInfo, updateDate)
			storage.set(USER_INFO, userInfo)
			commit('SET_USER_INFO', userInfo)
		},

		rcUserInfo({
			state,
			commit
		}, updateDate) {
			const userInfo = Object.assign({}, state.userInfo, updateDate)
			storage.set(USER_INFO, userInfo)
			commit('SET_USER_INFO', userInfo)
		},
		rcUserInfoState({
			state,
			commit
		}, updateDate) {
			const userInfo = Object.assign({}, state.userInfo, updateDate)
			storage.set(USER_INFO, userInfo)
			commit('SET_USER_INFO', userInfo)
		},
		// 授权
		AliSTSAuth({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				getAliSTSAuth().then((res) => {
					console.log(res)
					commit('SET_ALI_STS_AUTH', res.result)
					resolve(state.aliSTSAuth)
				}).catch((e) => {
					reject(e)
				})
			})
		},
		// 注册
		Register({
			commit
		}, userInfo) {
			console.log('register')
			return new Promise((resolve, reject) => {
				register(userInfo).then(res => {
					console.log(res)
					storage.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)
					storage.set(USER_INFO, res.result)
					commit('SET_TOKEN', res.token)
					commit('SET_USER_INFO', res.result)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user
