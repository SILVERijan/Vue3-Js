import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Day1 from '../views/Day1.vue'
import Day2 from '../views/Day2.vue'
import Day3 from '../views/Day3.vue'
import Day4 from '../views/Day4.vue'
import Day5 from '../views/Day5.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PageHome from '../views/pages/PageHome.vue'
import PageAbout from '../views/pages/PageAbout.vue'

const routes = [
  { path: '/', redirect: '/day1' },
  { path: '/day1', component: Day1 },
  { path: '/day2', component: Day2 },
  {
    path: '/day3',
    component: Day3,
    children: [
      { path: '', redirect: '/day3/home' },
      { path: 'home', component: PageHome },
      { path: 'about', component: PageAbout }
    ]
  },
  { path: '/day4', component: Day4 },
  { path: '/day5', component: Day5, meta: { requiresAuth: true } },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    next('/day1')
  } else {
    next()
  }
})

export default router
