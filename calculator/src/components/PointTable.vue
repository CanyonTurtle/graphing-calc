<template>
  <div class="point-table">
    <h4>Notable Points</h4>
    <b-table striped hover :items="coolPoints"></b-table>
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
        return this.$store.state.coolPoints
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

