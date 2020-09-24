import {
  login,
  logout,
  getInfo,
  platformUserLogin
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import request from '@/utils/request'
import {
  resetRouter
} from '@/router'

import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'

const getDefaultState = () => {
  return {
    token: localStorage.getItem('token'),
    phone: localStorage.getItem('phone'),
    openId: localStorage.getItem('openid'),
    hxUserName: localStorage.getItem('hxUserName'),
    hxPassWord: localStorage.getItem('hxPassWord'),
    name: '',
    avatar: '',
    nickname: localStorage.getItem('nickname')
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_STATE: (state, registerState) => {
    state.registerState = registerState
  },
  SET_USERID: (state, openId) => {
    state.openId = openId
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_HXNAME: (state, hxUserName) => {
    state.hxUserName = hxUserName
  },
  SET_HXPWD: (state, hxPassWord) => {
    state.hxPassWord = hxPassWord
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  }
}

const actions = {
  Login({ commit }, userInfo) {

  },
  // user login  登录
  login({
    commit
  }, userInfo) {
    const {
      name,
      code,
      weburl
    } = userInfo
    axios({
      method: 'post',
      url: weburl + '/login',
      data: {
        phone: name,
        verifyCode: code,
        loginType: 1,
        appType: 1
      }
    }).then(function(response) {
      Message({
        message: response.data.message || 'success',
        type: 'success',
        duration: 5 * 2000
      })
      // setTimeout(location.reload(), 500);
      console.log(response.data)
      var token = response.headers.authorization
      localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
      var data = response.data.result
      var openId = data.userId
      var phone = data.phone
      var hxUserName = data.hxUserName
      var hxPassWord = data.hxPassWord
      var nickname = data.nickName
      localStorage.setItem('phone', phone)
      localStorage.setItem('openid', openId)
      localStorage.setItem('hxUserName', hxUserName.toLowerCase())
      localStorage.setItem('hxPassWord', hxPassWord)
      localStorage.setItem('nickname', nickname)
      console.log(phone)
      commit('SET_PHONE', phone)
      commit('SET_USERID', openId)
      commit('SET_HXNAME', hxUserName)
      commit('SET_HXPWD', hxPassWord)
      commit('SET_NICKNAME', nickname)
      setToken(token)
    })
  },

  // 微信授权
  getWxlogin({
    commit
  }, wxForm) {
    const {
      userId,
      openId,
      hxPassWord,
      hxUserName,
      orgVerifyState,
      personVerifyState,
      nickname,
      phone,
      token
    } = wxForm
		
    localStorage.setItem('phone', phone)
    localStorage.setItem('openid', userId)
    localStorage.setItem('hxUserName', hxUserName.toLowerCase())
    localStorage.setItem('hxPassWord', hxPassWord)
    localStorage.setItem('nickname', nickname)

    localStorage.setItem('token', token)
    commit('SET_TOKEN', token)
    console.log(phone)
    commit('SET_PHONE', phone)
    commit('SET_USERID', userId)
    commit('SET_HXNAME', hxUserName)
    commit('SET_HXPWD', hxPassWord)
    commit('SET_NICKNAME', nickname)
  },

  // user logout
  logout({
    commit
  }) {
    removeToken()
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      localStorage.clear()
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
