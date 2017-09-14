<template>
  <div class="credits-block">
    <b-container>
      <h4>Credits</h4>
          <p> Created by Cannon Tuttle for AP Calculus BC 2017-2018.</p>
          <p class="cred-header">Frontend Technology:</p>
            <a href="https://vuejs.org">Vue.js</a></br>
            <a href="https://bootstrap-vue.org">Vue Bootstrap</a>
          <p class="cred-header">Research:</p>
            <a href="https://vuejs.org">Vue.js</a></br>
            <a href="https://bootstrap-vue.org">Vue Bootstrap</a>
            </br>
            <p>Hi: {{hiVal}} </p>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'credits-modal',
    data () {
      return {

      }
    },
    computed: {
      hiVal () {
        return this.$store.state.hi
      }
    },
    methods: {
      handleOk (e) {
        e.cancel()
      }
    }
  }
</script>

<!-- modal.vue -->
<style scoped>
.credits-list {
  /* text-align: center; */
}
.cred-header {
  margin-bottom: 5px;
  margin-top: 10px;
}
</style>
