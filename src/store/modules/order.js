import storage from 'store'
const order = {
  namespaced: true,
  state: {
    orderDetails: storage.get('order-details'),
    markeDetails:storage.get('marke-details'),
  },
  mutations: {
    SET_ORDER_DETAILS: (state, orderDetails) => {
      state.orderDetails = orderDetails
    },
    SET_MARKE_DETAILS: (state, markeDetails) => {
      state.markeDetails = markeDetails
    }

  },
  actions: {
    // 订单
    setOrderDetails({ commit }, details) {
      commit('SET_ORDER_DETAILS', details)
      storage.set('order-details', details)
    },
    //原料订单
    setMarkeDetails({ commit }, details) {
      commit('SET_MARKE_DETAILS', details)
      storage.set('marke-details', details)
    }
  }
}

export default order
