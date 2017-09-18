<template>
  <div class="hello">
    <div class="top">
      <h3 class="title">Graphing Calculator</h3>
    </div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col class="upper-col" md="6">
          <graph></graph>
        </b-col>
        <b-col class="upper-col" md="4">
          <params></params>
        </b-col>
        <b-col class="upper-col" md="2">
          <point-table></point-table>
        </b-col>
      </b-row>
      </br>
      <b-row>
        <b-col> 
          <credits></credits>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Graph from './Graph.vue'
import Params from './Params.vue'
import Credits from './Credits.vue'
import PointTable from './PointTable.vue'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Graph,
    Params,
    Credits,
    PointTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.upper-col {
  margin-top: 20px;
}

.bv-example-row {
  /* background-color: #ff00ff; */
}

.top {
  background-color: #39CCCC;
  padding: 10px;
  color: #000000;
}

.title {
  padding-top: 10px;
}
</style>
