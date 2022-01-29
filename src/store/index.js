import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu:false,
    activePopup:false,
    candidats:[],
    entretiens:[],
    jobs:[]
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
    setCandidats(state, data){
      state.candidats = data
    },
    setEntretiens(state, data){
      state.entretiens = data
    },
    setJobs(state, data){
      state.jobs = data
    },
    appendJobs(state, data){
      state.jobs.push(data);
    },
    removeJob(state, id){
      let data = []
      state.jobs.forEach(elem => {
        if(elem.id != id){
          data.push(elem);
        }
      });

      state.jobs = data;
    },
    removeCandidat(state, id){
      let data = []
      state.candidats.forEach(elem => {
        if(elem.id != id){
          data.push(elem);
        }
      });

      state.candidats = data;
    }
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
    setCandidats({commit}, data){
      commit('setCandidats', data)
    },
    setEntretiens({commit}, data){
      commit('setEntretiens', data)
    },
    setJobs({commit}, data){
      commit('setJobs', data)
    },
    appendJobs({commit}, data){
      commit('appendJobs', data);
    },
    removeJob({commit}, id){
      commit("removeJob", id)
    },
    removeCandidat({commit}, id){
      commit("removeCandidat", id)
    }
  },
  modules: {
    
  }
})

