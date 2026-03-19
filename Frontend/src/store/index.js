import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0,
    user: null,
    notifications: [],
    isLoggedIn: false
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
    },
    LOGOUT(state) {
      state.user = null
      state.isLoggedIn = false
    },
    ADD_NOTIFICATION(state, message) {
      state.notifications.push(message)
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
    async loginUser({ commit, state }, payload) {
      // Simulate async API call
      await new Promise(resolve => setTimeout(resolve, 800))
      commit('SET_USER', payload)
      commit('ADD_NOTIFICATION', `Welcome back, ${payload.name}!`)
    },
    logout({ commit }) {
      commit('LOGOUT')
      commit('ADD_NOTIFICATION', 'You have been logged out.')
    },
    clearNotifications({ commit }) {
      commit('CLEAR_NOTIFICATIONS')
    }
  }
})

export default store
