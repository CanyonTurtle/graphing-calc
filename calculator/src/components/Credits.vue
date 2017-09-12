<template>
  <div class="credits-block">
    <b-container>
      <h4>Credits</h4>
      <b-row>
        <b-col class="credits-list">
          <p>Frontend Technology</p>
          <ul>
            <a href="https://vuejs.org">Vue.js</a>
            <a href="https://bootstrap-vue.org">Vue Bootstrap</a>
          </ul>
        </b-col>
        <b-col class="credits-list">
          <p>Research</p>
          <ul>
            <a href="https://vuejs.org">Vue.js</a>
            <a href="https://bootstrap-vue.org">Vue Bootstrap</a>
            </br>
            <p>Hi: {{hiVal}} </p>
          </ul>
        </b-col>
      </b-row>
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
.credits-block {
  margin-top: 20px;
}
.credits-list {
  /* text-align: center; */
}
</style>
