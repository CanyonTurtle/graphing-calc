<template>
  <div class="hello">
    <div class="top">
      <h3 class="title">Graphing Calculator</h3>
    </div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col md="4">
          <params></params>
        </b-col>
        <b-col md="8">
          <graph></graph>
        </b-col>
      </b-row>
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
    Credits
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

.bv-example-row {
  /* background-color: #ff00ff; */
}

.top {
  background-color: #000000;
  color: #ffffff;
  padding: 10px;
}

.title {
  padding-top: 10px;
}
</style>
