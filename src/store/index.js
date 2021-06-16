import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: [],
    token: ''
  },
  mutations: {
    addUserInfo(state, userInfo) {
      state.userInfo.push(userInfo)
    },
    addToken(state, token) {
      state.token = token
    },
    resetState(state) {
      
    }
  },
  actions: {
  },
  modules: {
  }
})
