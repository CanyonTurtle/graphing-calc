<template>
  <div class="graph"> 
    <div class="graph-area" ref="graphArea" v-bind:style="{ height: graphDynamicHeight + 'px' }">
      <div v-for="point in points" v-bind:key="'' + point">
        <div v-text="`${point.name} (${('' + point.x).substring(0,4)}, ${('' + point.y).substring(0,4)})`" v-bind:style="{outline: 'none', position: 'absolute', left: point.scaledX - 5 + 'px', top: point.scaledY - 5 + 'px', borderRadius: 10 + 'px', width: 10 + 'px', height: 10 + 'px' }" ></div>
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
      points: [
      //   {
      //     x: 0,
      //     y: 0,
      //     scaledX: 10,
      //     scaledY: 10,
      //     name: 'endpoint'
      //   }
      ]
    }
  },
  computed: {
    isDomainValid () {
      return (this.delayDomainLeft < this.delayDomainRight)
    },
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
          var leftI = 0
          var leftICap = 0.03
          this.pidLeft = setInterval(function () {
            leftI += 0.005 * (ctx.$store.state.domainLeft - ctx.delayDomainLeft)
            leftI = Math.max(leftI, leftICap)
            leftI = Math.min(leftI, leftICap * -1)
            ctx.delayDomainLeft += 0.2 * (ctx.$store.state.domainLeft - ctx.delayDomainLeft) + leftI
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
          var rightI = 0
          var rightICap = 0.03
          this.pidRight = setInterval(function () {
            rightI += 0.005 * (ctx.$store.state.domainRight - ctx.delayDomainRight)
            rightI = Math.max(rightI, rightICap)
            rightI = Math.min(rightI, rightICap * -1)
            ctx.delayDomainRight += 0.3 * (ctx.$store.state.domainRight - ctx.delayDomainRight) + rightI
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
      if (this.$refs.graphArea) {
        this.graphDynamicHeight = this.$refs.graphArea.getBoundingClientRect().width
      }
      console.log
      if (this.isDomainValid) {
        this.points = this.$store.state.coolPoints
        graphFunc(null, this.delayDomainLeft, this.delayDomainRight, this)
      }
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