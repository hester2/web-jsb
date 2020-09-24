import im from '@/common/rongIm'
import $ajaxRongCloud from '@/api/moudel/rongCloud'
import {
  RONG_IM_API_READ,
  SEND_MESSAGE,
  SET_RONG_USER_ID,
  UPDATE_MESSAGE,
  UPDATE_MESSAGE_DATA
} from '@/store/mutationTypes/rongIm'

const messageType = []
Object.keys(RongIMLib.MESSAGE_TYPE).forEach(k => {
  messageType.push(RongIMLib.MESSAGE_TYPE[k])
})
const message = {
  namespaced: true,
  state: {
    messageType,
    // 收发消息
    enteringData: {},
    // 未读消息数
    unreadMessageCount: 0,
    // 消息数据
    messageData: {},
    //指定会话
    targetCount:0,
    targetCounts:0,
    //
    newMsg:0,
  },
  mutations: {
    // 历史消息
    [UPDATE_MESSAGE_DATA]: (state, list) => {
      const { targetId } = list
      const stateList = state.messageData[targetId]
      let messageList = []
      if (stateList && stateList.length > 0) {
        messageList = [...list.messageList, ...stateList]
      } else {
        messageList = list.messageList
      }
      state.messageData = Object.assign({}, state.messageData, { [`${targetId}`]: messageList })
    },

    //未读总数
    UNREADCOUNTTOTAL:(state,unreadMessageCount)=>{
      state.unreadMessageCount=unreadMessageCount
    },
    [UPDATE_MESSAGE]: (state, messageObj) => {
      console.log('gg',messageObj)
      const { targetId, message } = messageObj
      const stateList = state.messageData[targetId]
      stateList.push(message)

    },
    //指定会话
    UPSPECIFIEDCOUNT:(state,{newMsg,targetCount})=>{
      state.targetCount=targetCount
      state.newMsg=newMsg
    },
    //清除指定会话
    REMOVESPECIFIEDCOUNT:(state,targetCounts)=>{
      state.targetCounts=targetCounts
    },
    // 发送消息
    [SEND_MESSAGE]: (state, { target, message }) => {
      const { messageData } = state
      console.log('gg',target)
      const targetList = messageData[`${target.targetId}`]
      targetList.push(Object.assign({}, target, message, { senderUserId: message.content.user.id }))
      console.log(Object.assign({}, target, message, { senderUserId: message.content.user.id }))
      state.messageData = Object.assign({}, state.messageData, { [`${target.targetId}`]: targetList })
    },
  },
  actions: {
    getTotalUnreadCount ({ commit },unreadMessageCount) {
      im.Conversation.getTotalUnreadCount().then(function (totalUnreadCount) {
        console.log('获取未读总数成功', totalUnreadCount)
        commit('UNREADCOUNTTOTAL',totalUnreadCount)
      })
    },
    //指定未读会话
    getTotalSpecifiedCount ({ commit },targetId) {
      return new Promise((resolve, reject) => {
       let conversation = im.Conversation.get({
        targetId:targetId,
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
       });
       console.log('mm',targetId)
       conversation.getUnreadCount().then(function(count) {
        console.log('获取指定会话未读数成功', count);
        commit('UPSPECIFIEDCOUNT',{
          newMsg:targetId,
          targetCount:count})
       })
      })
    },

    //清除指定未读会话
    removeSpecifiedCount({ commit },targetId){
      return new Promise((resolve, reject) => {
      var conversation = im.Conversation.get({
        targetId:targetId,
        type: RongIMLib.CONVERSATION_TYPE.PRIVATE
      });
      conversation.read().then(function(){
        console.log('清除未读数成功'); // im.watch conversation 将被触发
        commit('UPSPECIFIEDCOUNT',{
          newMsg:targetId,
          targetCount:0})
      });
      })
    },


    // 获取消息列表
    getMessage ({ commit }, { targetId, params }) {
      return new Promise((resolve, reject) => {
        const conversation = im.Conversation.get({
          targetId: targetId,
          type: RongIMLib.CONVERSATION_TYPE.PRIVATE
        })
        conversation.getMessages(params).then(function (result) {
          commit(UPDATE_MESSAGE_DATA, {
            targetId,
            messageList: result.list
          })
          resolve(result)
          console.log('获取历史消息成功', result)
        })
      })
    },

    // 获取群消息列表
    getGroupMessage ({ commit }, { targetId, params }) {
      return new Promise((resolve, reject) => {
        const conversation = im.Conversation.get({
          targetId:targetId,
          type:RongIMLib.CONVERSATION_TYPE.GROUP
        })
        conversation.getMessages(params).then(function (result) {
          commit(UPDATE_MESSAGE_DATA, {
            targetId,
            messageList: result.list
          })
          resolve(result)
          console.log('获取群组历史消息成功', result)
        })
      })
    },


    // 发送消息
    sendMessage ({ commit }, { target, message }) {
      // console.log(target, message)
      return new Promise((resolve, reject) => {
        console.log('oo',target, message)
        commit(SEND_MESSAGE, { target, message })
        resolve(true)
      })
    },
    // 接收消息
    receiveMessages ({ state, commit, rootState, rootGetters }, message) {
      console.log(rootGetters['rongIm/conversationUser'])
      const { messageType } = message
      if (state.messageType.includes(messageType)) {
        const targetId = message.targetId
        commit(UPDATE_MESSAGE, {
          targetId,
          message
        })
        if (targetId === rootGetters['rongIm/conversationUser']) {
          commit(`rongIm/conversation/${RONG_IM_API_READ}`, targetId, { root: true })
        }
      }
    }
  }
}

export default message
