import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'questions',
        component: () => import(/* webpackChunkName: "questions" */ '../views/AllQuestions.vue')
      },
      {
        path: '/my-questions',
        name: 'my-questions',
        component: () => import(/* webpackChunkName: "my-questions" */ '../views/MyQuestions.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next()
          } else {
            store.state
              .Toast.fire({
                icon: 'error',
                title: 'You are not logged in'
              })
            next('/login')
          }
        }
      }
    ]
  },
  {
    path: '/ask-question',
    name: 'ask-question',
    component: () => import(/* webpackChunkName: "ask-question" */ '../views/AskQuestion.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        store.state
          .Toast.fire({
            icon: 'error',
            title: 'You are not logged in'
          })
        next('/login')
      }
    }
  },
  {
    path: '/update-question/:id',
    name: 'update-question',
    component: () => import(/* webpackChunkName: "update-question" */ '../views/UpdateQuestion.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        store.state
          .Toast.fire({
            icon: 'error',
            title: 'You are not logged in'
          })
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
