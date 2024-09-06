import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: 0
  },
  getters: {
    loading: state => state.loading
  },
  mutations: {
    SET_LOADING: (state, data) => {
      state.loading = data
    },
  },
  actions: {
    setLoading({ commit }, data) {
      console.log(data)
      commit('SET_LOADING', data)
    },
  },
  modules: {
  }
})
