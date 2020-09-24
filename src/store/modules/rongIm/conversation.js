import im from '@/common/rongIm'
import {
  SET_CONVERSATION_LIST,
  SET_SYSTEM_CONVERSATION_LIST,
  UPDATE_CONVERSATION_LIST,
  SWITCH_CONVERSATION, RONG_IM_API_READ
} from '@/store/mutationTypes/rongIm'

const conversation = {
  namespaced: true,
  state: {
    conversationUser: '',
    // 用户会话列表
    conversationList: [],
    // 系统会话列表
    systemConversationList: []
  },
  mutations: {

    // 设置会话列表
    [SET_CONVERSATION_LIST]: (state, list) => {
      state.conversationList = list
    },
    // 设置系统会话列表
    [SET_SYSTEM_CONVERSATION_LIST]: (state, list) => {
      state.systemConversationList = list
    },
    [SWITCH_CONVERSATION]: (state, targetId) => {
      state.conversationUser = targetId
    },
    [RONG_IM_API_READ]: (state, targetId) => {}
  },
  actions: {
    getConversationList ({ dispatch,commit }) {
      return new Promise((resolve, reject) => {
        im.Conversation.getList().then(function (conversationList) {
          console.log('获取会话列表成功', conversationList)
          // 区分会话类型
          if (conversationList.length) {
            const { conList, systemConList } = splitMessageType(conversationList)

            //消息列表
            commit(SET_CONVERSATION_LIST, conList)
            
            console.log('消息',conList)

            commit(SET_SYSTEM_CONVERSATION_LIST, systemConList)
          }
          resolve(conversationList)
        })
      })
    },

    getSendConversationList({commit},message) {
      const list=message

      commit(SET_CONVERSATION_LIST, list)
    },

    getRemoveConversationList ({dispatch,commit },targetId) {
      return new Promise((resolve, reject) => {
       var conversation = im.Conversation.get({
            targetId: targetId,
            type: RongIMLib.CONVERSATION_TYPE.PRIVATE
          });
          conversation.destory().then(function () {
            console.log('删除会话成功');
            dispatch('getConversationList',null)
          });
      })
    },
    getRemoveGroupList ({dispatch,commit },targetId) {
      return new Promise((resolve, reject) => {
       var conversation = im.Conversation.get({
            targetId: targetId,
            type: RongIMLib.CONVERSATION_TYPE.GROUP
          });
          conversation.destory().then(function () {
            console.log('删除会话成功群组');
            dispatch('getConversationList',null)
          });
      })
    },
    updateConversationList ({ dispatch, commit, state }, conversationList) {
      if (conversationList.length) {
        const targetIds = conversationList.map(item => {
          return item.targetId
        })
        dispatch('rongIm/user/getRongClourUserList', targetIds, { root: true })
        // 区分会话
        const { conList, systemConList } = splitMessageType(conversationList)
        dispatch('updateUserConversationList', conList)
        dispatch('upDateSystemConversationList', systemConList)
      }
    },
    updateUserConversationList ({ state, commit }, list) {
      console.log('geng',list)
      if (list.length) {
        const conTargetIds = list.map(item => {
          return item.targetId
        })
        // 找到更新的会话列表
        const findCon = state.conversationList.filter((item) => {
          return conTargetIds.includes(item.targetId)
        })
        // 排除更新的会话列表
        const filterCon = state.conversationList.filter((item) => {
          return !conTargetIds.includes(item.targetId)
        })
        const mergeList = []
        for (let i = 0; i < list.length; i++) {
          mergeList.push(Object.assign({}, findCon[i], list[i]))
        }
        console.log('dayle',mergeList)
        commit(SET_CONVERSATION_LIST, [...mergeList, ...filterCon])
      }
    },
    upDateSystemConversationList ({ state, commit }, list) {
      commit(SET_SYSTEM_CONVERSATION_LIST, [...list, ...state.systemConversationList])
    },
    switchConversation ({ commit }, targetId) {
      commit(SWITCH_CONVERSATION, targetId)
      commit(RONG_IM_API_READ, targetId)
    }
  }
}

function splitMessageType (conversationList) {
  // 区分消息类型
  const conList = conversationList.filter(item => {
    return item.type * 1 < 6
  })
  const systemConList = conversationList.filter(item => {
    return item.type * 1 === 6
  })

  return { conList, systemConList}
}

export default conversation
