const shopChat = [
  	{
    path: '/chat/message',
    name: 'Chats',
    component: () => import('@/views/chat'),
    meta:{
     keepAlive: false,
      icon:'icon iconfont icon-xiaoxi1',
      title: '好友'
    }
  },{
    path: '/chat/chatList',
    name: 'ChatList',
    component: () => import('@/views/chat/chatList'),
    meta: {
      keepAlive: false,
      icon:'icon iconfont icon-lianxiren',
	  title: '通讯录'
    }
  }
]
export default shopChat
