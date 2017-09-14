<template>
  <div class="graph"> 
    <div class="graph-area">
    </div>
    <p v-show="false">updated: {{dummyData}}</p>
  </div>
</template>

<script>
import graphFunc from '../calc/graph.js'

export default {
  name: 'graph',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      delayDomainRight: 100,
      delayDomainLeft: -100,
      pidLeft: null,
      pidRight: null
    }
  },
  computed: {
    dummyData () {
      if (this.$store.state.needsRefreshedGraph) {
        this.setupGraph()
        this.$store.commit('refreshedGraph')
      }

      // left domain anim.
      var ctx = this

      if (Math.abs(this.$store.state.domainLeft - this.delayDomainLeft) < 0.1) {
        this.$store.commit('domainLeftIsZoomed')
      }

      if (!this.$store.state.isDomainLeftZoomed) {
        if (!this.pidLeft) {
          this.pidLeft = setInterval(function () {
            ctx.delayDomainLeft += 0.3 * (ctx.$store.state.domainLeft - ctx.delayDomainLeft)
            console.log('moving')
            if (Math.abs(ctx.$store.state.domainLeft - ctx.delayDomainLeft) < 0.1) {
              console.log('done')
              ctx.$store.commit('domainLeftIsZoomed')
            }
            ctx.setupGraph()
          }, 50)
        }
      } else {
        if (this.pidLeft) {
          clearInterval(this.pidLeft)
          this.pidLeft = null
        }
      }

      // right domain anim.
      if (Math.abs(this.$store.state.domainRight - this.delayDomainRight) < 0.1) {
        this.$store.commit('domainRightIsZoomed')
      }

      if (!this.$store.state.isDomainRightZoomed) {
        if (!this.pidRight) {
          this.pidRight = setInterval(function () {
            ctx.delayDomainRight += 0.5 * (ctx.$store.state.domainRight - ctx.delayDomainRight)
            console.log('moving')
            if (Math.abs(ctx.$store.state.domainRight - ctx.delayDomainRight) < 0.01) {
              console.log('done')
              ctx.$store.commit('domainRightIsZoomed')
            }
            ctx.setupGraph()
          }, 50)
        }
      } else {
        if (this.pidRight) {
          clearInterval(this.pidRight)
          this.pidRight = null
        }
      }
      return true
    }
  },
  methods: {
    setupGraph () {
      graphFunc(null, this.delayDomainLeft, this.delayDomainRight, this)
    }
  },
  mounted: function () {
    this.setupGraph()
    window.addEventListener('resize', this.setupGraph)
  }
}

</script>

<style scoped>
.graph-area {
  /* background-color: #00ffff; */
  width: inherit;
  height: 400px;
}
</style>