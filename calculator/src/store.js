import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

var isNum = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    hi: 1,
    domainLeft: -100,
    domainRight: 100,
    isDerivativeChecked: false,
    isSecondDerivativeChecked: false,
    needsRefreshedGraph: false,
    isDomainLeftZoomed: true,
    isDomainRightZoomed: true,
    coolPoints: [
      { name: 'absolute max', x: 10, y: 10 },
      { name: 'absolute min', x: 0, y: -10 }
    ]
  },
  mutations: {
    increment (state) {
      state.hi++
    },
    setDomainLeft (state, dl) {
      if (dl === '' || dl == null) {
        dl = 0
      } else if (dl === '-') {
        dl = 0
      } else if (!isNum(dl)) {
        dl = 0
      }
      state.needsRefreshedGraph = true
      state.isDomainLeftZoomed = false
      state.domainLeft = Math.max(dl, -1000000)
      console.log('domainLeft set to ' + state.domainLeft)
    },
    setDomainRight (state, dr) {
      if (dr === '' || dr == null) {
        dr = 0
      } else if (dr === '-') {
        dr = 0
      } else if (!isNum(dr)) {
        dr = 0
      }

      state.domainRight = Math.min(dr, 1000000)
      state.isDomainRightZoomed = false
      state.needsRefreshedGraph = true
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
    },
    domainLeftIsZoomed (state) {
      state.isDomainLeftZoomed = true
    },
    domainRightIsZoomed (state) {
      state.isDomainRightZoomed = true
    }
  }
})
