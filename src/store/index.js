import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: 0,
    menu: false
  },
  getters: {
    loading: state => state.loading,
    menu: state => state.menu,
  },
  mutations: {
    SET_LOADING: (state, data) => {
      state.loading = data
    },
    SET_MENU: (state, data) => {
      state.menu = data
    },
  },
  actions: {
    setLoading({ commit }, data) {
      commit('SET_LOADING', data)
    },
    setMenu({ commit }, data) {
      commit('SET_MENU', data)
    },
  },
  modules: {
  }
})
