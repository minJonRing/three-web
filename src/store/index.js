import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: 0,
    menuList: [],
    menu: false,
    softwareId: sessionStorage.getItem("softwareId")
  },
  getters: {
    loading: state => state.loading,
    menuList: state => state.menuList,
    menu: state => state.menu,
    softwareId: state => state.softwareId,
  },
  mutations: {
    SET_LOADING: (state, data) => {
      state.loading = data
    },
    SET_MENU_LIST: (state, data) => {
      state.menuList = data
    },
    SET_MENU: (state, data) => {
      state.menu = data
    },
    SET_SOFTWARE_ID: (state, data) => {
      sessionStorage.setItem("softwareId", data)
      state.softwareId = data
    },
  },
  actions: {
    setLoading({ commit }, data) {
      commit('SET_LOADING', data)
    },
    setMenuList({ commit }, data) {
      commit('SET_MENU_LIST', data)
    },
    setMenu({ commit }, data) {
      commit('SET_MENU', data)
    },
    setSoftwareId({ commit }, data) {
      commit('SET_SOFTWARE_ID', data)
    },
  },
  modules: {
  }
})
