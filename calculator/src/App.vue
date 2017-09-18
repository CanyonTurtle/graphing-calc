<template>
  <div id="app">
    <head>
      <meta name="viewport" content="width=device-width">
    </head>
    <hello v-bind:style="{ backgroundColor: bgCol }"></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Theme from './themes'

export default {
  name: 'app',
  components: {
    Hello
  },
  data () {
    return {
      bgCol: Theme.backgroundColor
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

#app {
}
</style>
