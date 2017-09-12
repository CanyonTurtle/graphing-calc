import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    hi: 1,
    domainLeft: -100,
    domainRight: 100,
    isDerivativeChecked: false,
    isSecondDerivativeChecked: false,
    needsRefreshedGraph: false
  },
  mutations: {
    increment (state) {
      state.hi++
    },
    setDomainLeft (state, dl) {
      if (Math.max(dl, -100)) {
        state.needsRefreshedGraph = true
        state.domainLeft = Math.max(dl, -100)
      }
    },
    setDomainRight (state, dr) {
      if (Math.min(dr, 100)) {
        state.domainRight = Math.min(dr, 100)
        state.needsRefreshedGraph = true
      }
    },
    toggleIsDerivativeChecked (state, val) {
      state.isDerivativeChecked = val
      state.needsRefreshedGraph = true
    },
    toggleIsSecondDerivativeChecked (state, val) {
      state.isSecondDerivativeChecked = val
      state.needsRefreshedGraph = true
    },
    refreshedGraph (state) {
      state.needsRefreshedGraph = false
    }
  }
})
