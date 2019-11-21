<template>
  <div id="login">
    <div class="login-container container">
      <div style="font-size: 50px; margin-top: 40px; margin-bottom: 10px;">
        <i class="fab fa-stack-overflow"></i>
      </div>
      <div class="card">
        <div class="card-content" style="text-align: left">
          <form @submit.prevent="submitLogin">
            <b-field label="Email">
              <b-input v-model="email" type="email"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input v-model="password" type="password" password-reveal></b-input>
            </b-field>
            <input class="button is-info" type="submit" value="Log in" style="width: 100%;">
          </form>
        </div>
      </div>
      <div class="columns">
        <div style="font-size: 13px; width: 100%;">
          <span>
            No account ?
            <router-link id="linkregister" to="/register">
              <b>Create an account</b>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitLogin () {
      const loading = this.$buefy.loading.open()
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(result => {
          localStorage.setItem('token', result.token)
          localStorage.setItem('name', result.name)
          localStorage.setItem('email', result.email)
          this.email = ''
          this.password = ''
          this.$store.commit('SET_LOGIN', true)
          this.$router.push({ path: '/' })
          this.$store.state
            .Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
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

<style>
#login {
  text-align: center;
}
.login-container {
  align-items: center;
  width: 24vw;
}
.card {
  margin: 50px 0;
  border-radius: 6px;
}
</style>
