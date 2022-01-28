import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu:false,
    activePopup:false,
  },
  mutations: {
    setShowMenu(state){
      state.showMenu = !state.showMenu
    },
    enablePopup(state){
      state.activePopup = true
    },
    disablePopup(state){
      state.activePopup = false
    },
  },
  actions: {
    setShowMenu({commit}){
      commit('setShowMenu')
    },
    openPopup({commit}){
      commit('enablePopup')
    },
    closePopup({commit}){
      commit('disablePopup')
    },
  },
  modules: {
    
  }
})

