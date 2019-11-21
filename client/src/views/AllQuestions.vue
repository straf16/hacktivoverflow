<template>
  <div class="container">
    <div id="header-content" class="columns">
      <h1>All Questions</h1>
      <b-button type="is-info">Ask Question</b-button>
    </div>
    <div id="content" class="columns" v-for="question in questions" :key="question._id">
      <div class="column is-2" style="display: flex; font-size: 12px; color: grey;">
        <div style="padding: 8px; text-align: center;">
          <p class="px-1 text-muted" style="margin: 0;">1</p>
          <p>votes</p>
        </div>
        <div style="padding: 8px; text-align: center;">
          <p class="px-1 text-muted" style="margin: 0;">1</p>
          <p>answers</p>
        </div>
        <div style="padding: 8px; text-align: center;">
          <p class="px-1 text-muted" style="margin: 0;">1</p>
          <p>views</p>
        </div>
      </div>
      <div class="column">
        <div id="title">
          <h4>{{ question.title }}</h4>
        </div>
        <div id="detail" style="">
          <div>
            <b-taglist>
              <span class="tag is-link is-light" v-for="(tag, i) in question.tags" :key="i">{{ tag }}</span>
            </b-taglist>
          </div>
          <div style="font-size: 10px; color: #0077CC">
            <p>Fernando Rocha</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  computed: {
    questions () {
      return this.$store.state.questions
    }
  },
  methods: {
    getQuestions () {
      const loading = this.$buefy.loading.open()
      this.$store
        .dispatch('fetchQuestions')
        .then(result => {
          this.$store.commit('SET_QUESTIONS', result)
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
  },
  created () {
    this.getQuestions()
  }
}
</script>

<style scoped>
h1 {
  font-size: 25px;
}
#header-content {
  display: flex;
  justify-content: space-between;
  padding: 40px 20px;
}
#content {
  border-top: 1px #D6D9DC solid;
}
#title {
  margin-top: 5px;
  margin-left: 26px;
  color: #0077CC;
}
#title h4 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  width: 70%;
}
#title h4:hover {
  color: rgb(74, 180, 255);
}
#detail {
  margin-left: 25px;
  display: flex;
  justify-content: space-between;
}
.tag {
  cursor: pointer;
}
</style>