<template>
  <div id="ask-question">
    <div class="container is-fluid" style="margin: 50px 20px;">
      <p style="font-size: 20px;">Ask a public question</p>
      <div class="card">
        <div class="card-content" style="text-align: left">
          <form @submit.prevent="submitQuestion">
            <b-field label="Title">
              <b-input
                v-model="title"
                type="text"
                placeholder="e.g. Is there an R function for finding the index of an element in vector?">
              </b-input>
            </b-field>
            <b-field label="Body">
              <quill v-model="desc" :config="config" output="html"></quill>
            </b-field>
            <b-field label="Tags">
              <b-taginput
                  v-model="tags"
                  ellipsis
                  icon="label"
                  placeholder="e.g. (spring sql-server python)">
              </b-taginput>
            </b-field>
            <input class="button is-info" type="submit" value="Publish question">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AskQuestion',
  data () {
    return {
      title: '',
      desc: '',
      tags: [],
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
  methods: {
    submitQuestion () {
      const loading = this.$buefy.loading.open()
      this.$store
        .dispatch('addQuestion', {
          title: this.title,
          desc: this.desc,
          tags: this.tags
        })
        .then(result => {
          this.title = ''
          this.desc = ''
          this.tags = []
          this.$router.push({ path: '/' })
          this.$store.state
            .Toast.fire({
              icon: 'success',
              title: 'successfully publish your question'
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
.card {
  margin: 50px 0;
  width: 70vw;
  border-radius: 4px;
  box-shadow: 2px 2px 10px gray;
}
.ql-container {
  min-height: 200px;
}
</style>
