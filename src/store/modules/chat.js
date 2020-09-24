import storage from 'store'
const chat = {
  namespaced: true,
  state: {
    rcInfo: storage.get('RcInfo'),
		friendInfo:storage.get('friendInfo'),
  },
  mutations: {
    SET_RCINFO: (state, rcInfo) => {
      state.rcInfo = rcInfo
    },
		SET_FRIENDINFO:(state, friendInfo) => {
      state.friendInfo = friendInfo
    },

  },
  actions: {
    // 订单
    setChatList({ commit }, rcInfo) {
      commit('SET_RCINFO', rcInfo)
      storage.set('rcInfo', rcInfo)
    },
		//好友信息
		 setChatInfoList({ commit }, friendInfo) {
		  commit('SET_FRIENDINFO', friendInfo)
		  storage.set('friendInfo', friendInfo)
		},
  }
}

export default chat
