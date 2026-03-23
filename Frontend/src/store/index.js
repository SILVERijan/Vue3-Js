import { createStore } from 'vuex'
import api from '../api/axios'

const store = createStore({
  state: {
    count: 0,
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    notifications: [],
    isLoggedIn: !!sessionStorage.getItem('auth_token')
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    isAuthenticated: (state) => state.isLoggedIn,
    notificationCount: (state) => state.notifications.length,
    currentUser: (state) => state.user,
    allNotifications: (state) => state.notifications
  },
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    DECREMENT(state) {
      state.count--
    },
    RESET_COUNT(state) {
      state.count = 0
    },
    SET_USER(state, user) {
      state.user = user
      state.isLoggedIn = true
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    SET_TOKEN(state, token) {
      sessionStorage.setItem('auth_token', token)
    },
    LOGOUT(state) {
      state.user = null
      state.isLoggedIn = false
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('user')
    },
    ADD_NOTIFICATION(state, message) {
      state.notifications.push({
        id: Date.now(),
        text: message
      })
    },
    CLEAR_NOTIFICATIONS(state) {
      state.notifications = []
    }
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    },
    decrement({ commit }) {
      commit('DECREMENT')
    },
    resetCount({ commit }) {
      commit('RESET_COUNT')
    },
    async loginUser({ commit }, credentials) {
      const response = await api.post('/login', credentials)
      const { user, token } = response.data.data
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
      commit('ADD_NOTIFICATION', `Welcome back, ${user.name}!`)
      return response.data.data
    },
    async registerUser({ commit }, userData) {
      const response = await api.post('/register', userData)
      const { user, token } = response.data.data
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
      commit('ADD_NOTIFICATION', `Account created successfully. Welcome, ${user.name}!`)
      return response.data.data
    },
    async logout({ commit }) {
      try {
        await api.post('/logout')
      } catch (error) {
        console.error('Logout API call failed:', error)
      } finally {
        commit('LOGOUT')
        commit('ADD_NOTIFICATION', 'You have been logged out.')
      }
    },
    clearNotifications({ commit }) {
      commit('CLEAR_NOTIFICATIONS')
    }
  }
})

export default store
