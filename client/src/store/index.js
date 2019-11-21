import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/myaxios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    myQuestions: [],
    question: {
      title: '',
      desc: '',
      tags: []
    },
    Toast: Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_MY_QUESTIONS (state, payload) {
      state.myQuestions = payload
    },
    SET_QUESTION (state, payload) {
      state.question.title = payload.title
      state.question.desc = payload.desc
      state.question.tags = payload.tags
    }
  },
  actions: {
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    register ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/register',
          data: {
            name: payload.name,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchQuestions ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let keyword = payload ? payload.keyword : ''
        axios({
          method: 'GET',
          url: `/questions?keyword=${keyword}`
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchQuestionId ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/questions/${payload.id}`
        })
          .then(({ data }) => {
            commit('SET_QUESTION', {
              title: data.title,
              desc: data.desc,
              tags: data.tags
            })
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchMyQuestions ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/questions/personal',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    addQuestion ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/questions',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            desc: payload.desc,
            tags: payload.tags
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    updateQuestion({ commit }, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: `/questions/update/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            desc: payload.desc,
            tags: payload.tags
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    }
  },
  modules: {
  }
})
