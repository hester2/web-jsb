import im from '@/common/rongIm'
import $ajaxRongCloud from '@/api/moudel/rongCloud'
import { SET_RONG_USER, SET_RONG_USER_ID, UPDATE_VUEX_USER_DATA,UPDATEFRIENDLIST,SET_GROUP_USER } from '@/store/mutationTypes/rongIm'
import {
	getFriendrecord,
	getFriendState,
	getFriends,

} from '@/api/table.js'

const user = {
  namespaced: true,
  state: {
    rongUserId: '',
    rongUser: {},
    // 用户通讯录 好友列表
    addressBook: [],
    // 用户通讯录 群组列表
    groupBook: [],
    // 用户数据库:{} 根据targetId存储数据
    vuexUserData: {}
  },
  getters: {
    userIdData: (state) => {
      return Object.keys(state.vuexUserData)
    }
  },
  mutations: {
    [SET_RONG_USER_ID]: (state, id) => {
      state.rongUserId = id
    },
    [SET_RONG_USER]: (state, userInfo) => {
      state.rongUser = userInfo
    },
    // 更新用户数据
    [UPDATE_VUEX_USER_DATA]: (state, list) => {
      const userList = {}
      if (list.length) {
        for (let i = 0; i < list.length; i++) {
          userList[`${list[i].rcId}`] = list[i]
        }
      }
      state.vuexUserData = Object.assign({}, state.vuexUserData, userList)
    },
    [UPDATEFRIENDLIST]:(state,addressBook)=>{
      state.addressBook=addressBook
    },
    [SET_GROUP_USER]:(state,groupBook)=>{
      state.groupBook=groupBook
    }
  },
  actions: {
    getRongCloudUser ({ commit }, id) {
      console.log('getRongCloudUser', id)
      return new Promise((resolve, reject) => {
        $ajaxRongCloud.getRongCloudUser(id).then((res) => {
          const { result } = res
          const user = Object.assign({}, result, { rcId: id }, { id, name: result.nickname, portrait: result.headAddr })
          commit(SET_RONG_USER, user)
          commit(UPDATE_VUEX_USER_DATA, [user])
        })
      })
    },
   //好友列表
    getFriendList ({ commit }) {
      return new Promise((resolve, reject) => {
        getFriends().then(res => {
          console.log('好友列表',res.result)
          const addressBook=res.result
          commit(UPDATEFRIENDLIST,addressBook)
        })
      })
    },

    //群组列表
     getGroupList ({ commit },id) {
       return new Promise((resolve, reject) => {
        $ajaxRongCloud.getGroupList(id).then((res) => {
          const groupBook = res.result
          commit(SET_GROUP_USER, groupBook)
        })
       })
     },

    getRongClourUserList ({ commit, getters }, rcIds,id) {
      const filterId = rcIds.filter((item) => {
        return !getters.userIdData.includes(item)
      })
      return new Promise((resolve, reject) => {
        if (filterId.length) {
          $ajaxRongCloud.getRongClourUserList({ rcIds }).then((res) => {
            const userList = res.result.map((item) => {
              return Object.assign({}, item, {
                id: item.rcId,
                userId: item.id,
                name: item.nickname,
                portrait: item.headAddr
              })
            })
            commit(UPDATE_VUEX_USER_DATA, userList)
            
            resolve(userList)
          })
        } else {
          resolve(true)
        }
      })
    }
  }
}

export default user
