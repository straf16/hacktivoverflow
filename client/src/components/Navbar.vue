<template>
  <b-navbar fixed-top style="padding: 0 30px;">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <p>
          <i class="fab fa-stack-overflow"></i>
          H8<strong>overflow</strong>
        </p>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="" style="color: grey;">
        Questions
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-field>
          <form @submit.prevent="searchQuestions">
            <b-input
              v-model="keyword"
              placeholder="Search..."
              type="search"
              icon="magnify"
              icon-clickable
              @icon-click="searchQuestions"
              style="width: 60vw;">
            </b-input>
          </form>
        </b-field>
      </b-navbar-item>
    </template>
    <template v-if="!isLogin" slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button type="is-primary" outlined>
            <router-link to="/login">
              Log in
            </router-link>
          </b-button>
          <router-link to="/register">
            <b-button type="is-primary">
              Sign up
            </b-button>
          </router-link>
        </div>
      </b-navbar-item>
    </template>
    <template v-if="isLogin" slot="end">
      <b-navbar-item @click="logout" style="color: grey;">
        Log out
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapState([ 'isLogin' ])
  },
  methods: {
    searchQuestions () {
      const loading = this.$buefy.loading.open()
      this.$store
        .dispatch('fetchQuestions', {
          keyword: this.keyword
        })
        .then(async result => {
          await this.$store.commit('SET_QUESTIONS', result)
          if (this.$route.path !== '/') {
            this.$router.push({ path: '/' })
          }
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
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      this.$store.commit('SET_LOGIN', false)
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' })
      }
      this.$store.state
        .Toast.fire({
          icon: 'success',
          title: 'Logout success'
        })
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #FAFAFB;
  box-shadow: 0 4px 2px -2px #D6D9DC;
}
</style>
