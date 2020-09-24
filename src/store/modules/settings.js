import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  profitNav: 0
}

// 同步修改
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  PROFIT_NAV(state, num) {
    state.profitNav = num
  }
}

// 异步修改
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  profitNavActions({ commit }, num) {
    // commit调用同步方法
    commit('PROFIT_NAV', num)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

