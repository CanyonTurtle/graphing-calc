<template>
  <div class="point-table">
    <h4>Notable Points</h4>
    <b-table striped hover :items="coolPoints"></b-table>
    <!-- {{ coolPoints }} -->
  </div>
</template>

<script>
  export default {
    name: 'point-table',
    data () {
      return {

      }
    },
    computed: {
      hiVal () {
        return this.$store.state.hi
      },
      coolPoints () {
        let ctx = this
        return (
          (function () {
            let table = []
            let coolPoints = ctx.$store.state.coolPoints
            // console.log(coolPoints)
            for (let i in coolPoints) {
              table.push({
                x: ('' + coolPoints[i].x).substring(0, 4),
                y: ('' + coolPoints[i].y).substring(0, 4),
                scaledX: coolPoints[i].scaledX,
                scaledY: coolPoints[i].scaledY
                // name: coolPoints[i].name
              })
            }
            return table
          })()
        )
      }
    },
    methods: {
      handleOk (e) {
        e.cancel()
      }
    }
  }
</script>

<style scoped>
h4 {
  text-align: center;
}
.point-table {
  text-align: left;
}
</style>

