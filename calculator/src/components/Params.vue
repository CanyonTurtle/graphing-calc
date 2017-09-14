<template>
  <div class="params">
    <h5>function</h5>
    <b-input-group left="f(x)=">
      <b-form-input placeholder="50 * sin(0.1 * x)"></b-form-input>
    </b-input-group>

    <h5>domain</h5>
    <b-row no-gutters>
      <b-col>
        <b-input-group left="x in [">
          <b-form-input v-model="domainInputLeft"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group left="," right="]">
          <b-form-input v-model="domainInputRight"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    </br>
    <b-form-checkbox id="radio1" @change="toggleDerivativeChecked" v-model="form.isDChecked">1st derivative</b-form-checkbox>
    <b-form-checkbox id="radio2" @change="toggleSecondDerivativeChecked" v-model="form.isDDChecked">2st derivative</b-form-checkbox>
  </div>
</template>

<script>
  export default {
    name: 'params',
    data () {
      return {
        form: {
          graphingFunction: '',
          isDerivativeChecked: false,
          isSecondDerivativeChecked: false,
          secret: 'S3CR3T',
          domainInputLeft: 0,
          domainInputRight: 0,
          isDChecked: false,
          isDDChecked: false
        }
      }
    },
    computed: {
      domainInputLeft: {
        get () {
          return this.$store.state.domainLeft
        },
        set (value) {
          value = value | 0
          this.$store.commit('setDomainLeft', value)
        }
      },
      domainInputRight: {
        get () {
          return this.$store.state.domainRight
        },
        set (value) {
          value = value | 0
          console.log(value)
          this.$store.commit('setDomainRight', value)
        }
      }
    },
    methods: {
      toggleDerivativeChecked () {
        this.$store.commit('toggleIsDerivativeChecked', this.form.isDChecked)
      },
      toggleSecondDerivativeChecked () {
        this.$store.commit('toggleIsSecondDerivativeChecked', this.form.isDDChecked)
      },
      graphHi () {
        this.$store.commit('increment')
      },
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      resetForm () {
        this.form = {
          graphingFunction: '',
          isDerivativeChecked: false,
          isSecondDerivativeChecked: false,
          secret: 'S3CR3T'
        }
      },
      colorText () {
        this.$d3.selectAll('.params').style('color', '#17ab28')
      }
    }
  }
</script>
<style scoped>
.params {
}

.setup-thing {
}
</style>
