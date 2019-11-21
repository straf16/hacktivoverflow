<template>
  <div id="register">
    <div class="container">
      <div style="font-size: 30px; margin-top: 40px; margin-bottom: 10px;">
        <h3>Create account</h3>
      </div>
      <div class="card">
        <div class="card-content" style="text-align: left">
          <form @submit.prevent="submitRegister">
            <b-field label="Display Name">
              <b-input v-model="name" type="text"></b-input>
            </b-field>

            <b-field label="Email">
              <b-input v-model="email" type="email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input v-model="password" type="password" password-reveal></b-input>
            </b-field>
            <input class="button is-info" type="submit" value="Create account" style="width: 100%;">
          </form>
        </div>
      </div>
      <div class="columns">
        <div style="font-size: 13px; width: 100%;">
          <span>
            Already have account ?
            <router-link to="/login">
              <b>Log in</b>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitRegister () {
      const loading = this.$buefy.loading.open()
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(result => {
          this.name = ''
          this.email = ''
          this.password = ''
          this.$router.push({ path: '/login' })
          this.$store.state
            .Toast.fire({
              icon: 'success',
              title: 'Success create account'
            })
        })
        .catch(err => {
          err.data.message.forEach(error => {
            this.$store.state
              .Toast.fire({
                icon: 'error',
                title: error
              })
          })
        })
        .finally(() => loading.close())
    }
  }
}
</script>

<style scoped>
#register {
  text-align: center;
}
.container {
  align-items: center;
  width: 24vw;
}
.card {
  margin: 50px 0;
  border-radius: 6px;
}
</style>
