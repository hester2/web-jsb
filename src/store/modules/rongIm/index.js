import im from '@/common/rongIm'
import user from '@/store/modules/rongIm/user'
import conversation from '@/store/modules/rongIm/conversation'
import message from '@/store/modules/rongIm/message'
import {
  SET_RONG_USER_ID
} from '@/store/mutationTypes/rongIm'

const rongIm = {
  namespaced: true,

  modules: {
    user,
    conversation,
    message
  },

  state: {},

  getters: {
    rongUser(state, getters, rootState, rootGetters) {
      return rootState.rongIm.user
    },
    rongMessage(state, getters, rootState, rootGetters) {
      return rootState.rongIm.message
    },
    rongConversation(state, getters, rootState, rootGetters) {
      return rootState.rongIm.conversation
    },
    conversationUser(state, getters, rootState, rootGetters) {
      return rootState.rongIm.conversation.conversationUser
    }
  },

  mutations: {},

  actions: {
    // 初始化
    Init({
      dispatch,
      commit
    }, userInfo) {
      const user = {
        token: userInfo.rcToken
      }
      im.connect(user).then((user) => {
        const id = user.id
        console.log('链接成功, 链接用户 id 为: ', user.id)
        // 设置融云id
        commit(`rongIm/user/${SET_RONG_USER_ID}`, id, {
          root: true
        })
        // 获取融云详情
        dispatch('rongIm/user/getRongCloudUser', id, {
          root: true
        })
        // 获取融云好友列表
        dispatch('rongIm/user/getFriendList', null, {
          root: true
        })
        // 获取群组列表
        dispatch('rongIm/user/getGroupList', id, {
          root: true
        })
        // 获取所有会话列表
        dispatch('rongIm/conversation/getConversationList', null, {
          root: true
        }).then(res => {
          if (res.length) {
            console.log('dd', res)
            const rcIds = res.map(item => {
              return item.targetId
            })

            // 获取融云用户信息
            dispatch('rongIm/user/getRongClourUserList', rcIds, {
              root: true
            })
          }
        })
        // 获取未读数
        dispatch('rongIm/message/getTotalUnreadCount', null, {
          root: true
        })
      }).catch(function(error) {
        console.log('链接失败: ', error)
      })
    }
  }
}

export default rongIm
