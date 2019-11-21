<template>
  <div class="container">
    <div id="header-content" class="columns">
      <h1>{{ question.title }}</h1>
    </div>
    <div id="content" class="columns">
      <div class="column is-1" style="display: flex; font-size: 12px; color: grey;">
      </div>
      <div class="column">
        <div id="detail">
          <div v-html="question.desc"></div>
          <div style="margin-top: 20px;">
            <b-taglist>
              <span class="tag is-link is-light" v-for="(tag, i) in question.tags" :key="i">{{ tag }}</span>
            </b-taglist>
          </div>
        </div>
      </div>
    </div>
    <div id="content" class="columns" v-for="answer in question.answers" :key="answer._id">
      <div class="column is-1" style="display: flex; font-size: 12px; color: grey;">
        <!-- <div style="padding: 8px; text-align: center;">
          <p class="px-1 text-muted" style="margin: 0;">{{ answer.upvotes - answer.downvotes }}</p>
          <p>votes</p>
        </div>
        <div style="padding: 8px; text-align: center;">
          <p class="px-1 text-muted" style="margin: 0;">{{ question.answers.length }}</p>
          <p>answers</p>
        </div>
        <div style="padding: 8px; text-align: center;">
          <p class="px-1 text-muted" style="margin: 0;">1</p>
          <p>views</p>
        </div> -->
      </div>
      <div class="column">
        <div id="detail">
          <div v-html="answer.desc"></div>
          <div style="font-size: 10px; color: #0077CC; text-align: right;">
            <p>{{ answer.owner ? answer.owner.name : 'unknown' }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="content" class="columns" style="min-height: 300px;">
      <div id="form-answer" class="column">
        <form>
          <b-field label="Your Answer">
            <quill v-model="desc" :config="config" output="html" style="min-height: 200px; height: 200px;"></quill>
          </b-field>
          <input class="button is-info" type="submit" value="Post your answer" style="margin-top: 50px;">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data () {
    return {
      desc: '',
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic'],
            ['link', 'blockquote', 'code-block', 'image'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }]
          ]
        },
        theme: 'snow'
      }
    }
  },
  computed: {
    question () {
      return this.$store.state.question
    }
  },
  methods: {
    getQuestion (id) {
      const loading = this.$buefy.loading.open()
      this.$store
        .dispatch('fetchQuestionId', { id })
        .then(result => {
          this.$store
            .commit('SET_QUESTION', {
              title: result.title,
              desc: result.desc,
              tags: result.tags,
              answers: result.answers
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
  },
  created () {
    this.getQuestion(this.$route.params.id)
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
  border-bottom: 1px #D6D9DC solid;
}
#content {
  border-bottom: 1px #D6D9DC solid;
}
#detail {
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#form-answer {
  padding: 20px 30px;
  width: 100%;
}
.tag {
  cursor: pointer;
}
</style>
