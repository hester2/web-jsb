import im from '@/common/rongIm'
// vue插件
import { mapMutations } from 'vuex'
import {
  SEND_MESSAGE,
  UPDATE_CONVERSATION_LIST,
  UPDATE_MESSAGE,
  SWITCH_CONVERSATION, RONG_IM_API_READ
} from '@/store/mutationTypes/rongIm'

const rongMessage = 'rongIm/message'
const rongConversation = 'rongIm/conversation'
const rongUser = 'rongIm/user'
const mutation = { ...mapMutations('rongIm', ['SET_RONGIM_STATUS']) }

export default function createRongImPlugin () {
  return store => {
    console.log('mutation', mutation)
    im.watch({
      conversation: function (event) {
        const updatedConversationList = event.updatedConversationList  // 更新的会话列表
        console.log('更新会话汇总:', updatedConversationList)
        store.dispatch(`${rongConversation}/updateConversationList`, updatedConversationList)
      },
      message: function (event) {
        const message = event.message
        console.log('收到新消息:', message)
        console.log('收到',message.targetId)
        store.dispatch(`${rongMessage}/receiveMessages`, message)
        store.dispatch(`${rongMessage}/getTotalSpecifiedCount`, message.targetId)
      },
      status: function (event) {
        const status = event.status
        // store.commit('rongIm/SET_RONGIM_STATUS',status)
        console.log('连接状态码:', status)
      },
      chatroom: function (event) {
        var updatedEntries = event.updatedEntries
        console.log('聊天室 KV 存储监听更新:', updatedEntries)
        /*
          [{
            "key": "name",
            "value": "我是小融融",
            "timestamp": 1597591258338,
            "chatroomId": "z002",
            // 1: 更新（ 含:修改和新增 ）、2: 删除
            "type": 1
         }]
         */
      }
    })
    store.subscribe(mutation => {
      // 发送消息
      if (mutation.type === `${rongMessage}/${SEND_MESSAGE}`) {
        const { target, message } = mutation.payload
        const conversation = im.Conversation.get(target)
        console.log(message)
        conversation.send(message).then(function (message) {
          console.log('发送消息成功', message)
        })
      }


      if (mutation.type === `${rongConversation}/${RONG_IM_API_READ}`) {
        const id = mutation.payload
        const conversation = im.Conversation.get({
          targetId: id,
          type: RongIMLib.CONVERSATION_TYPE.PRIVATE
        })
        conversation.read().then(function () {
          console.log('清除未读数成功') // im.watch conversation 将被触发
        })
      }
      // 切换用户 > 清空用户未读信息

    })
    /*socket.on('data', data => {
      store.commit('receiveData', data)
    })
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })*/
  }
}
