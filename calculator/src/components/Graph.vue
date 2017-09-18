<template>
  <div class="graph"> 
    <div class="graph-area" ref="graphArea" v-bind:style="{ height: graphDynamicHeight + 'px' }">
      <div v-for="point in specialPointsHover"v-bind:key="'hi' + point">
        <div v-tooltip="`(${('' + point[2]).substring(0,4)}, ${('' + point[3]).substring(0,4)})`" v-bind:style="{outline: 'none', position: 'absolute', left: point[0] - 5 + 'px', top: point[1] - 5 + 'px', borderRadius: 10 + 'px', width: 10 + 'px', height: 10 + 'px'}" ></div>
      </div>
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
      pidRight: null,
      graphDynamicHeight: 300,
      specialPointsHover: [
        [0, 0]
      ]
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

      if (this.$store.state.domainLeft === this.delayDomainLeft) {
        this.$store.commit('domainLeftIsZoomed')
      }

      if (!this.$store.state.isDomainLeftZoomed) {
        if (!this.pidLeft) {
          this.pidLeft = setInterval(function () {
            ctx.delayDomainLeft += 0.2 * (ctx.$store.state.domainLeft - ctx.delayDomainLeft)
            console.log('moving')
            if (Math.abs(ctx.$store.state.domainLeft - ctx.delayDomainLeft) < 0.4) {
              ctx.delayDomainLeft = ctx.$store.state.domainLeft
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
      if (this.$store.state.domainRight === this.delayDomainRight) {
        this.$store.commit('domainRightIsZoomed')
      }

      if (!this.$store.state.isDomainRightZoomed) {
        if (!this.pidRight) {
          this.pidRight = setInterval(function () {
            ctx.delayDomainRight += 0.2 * (ctx.$store.state.domainRight - ctx.delayDomainRight)
            console.log('moving')
            if (Math.abs(ctx.$store.state.domainRight - ctx.delayDomainRight) < 0.4) {
              ctx.delayDomainRight = ctx.$store.state.domainRight
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
      this.graphDynamicHeight = this.$refs.graphArea.getBoundingClientRect().width
      console.log
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
  position: relative;
  max-height: 600px;
}
</style>