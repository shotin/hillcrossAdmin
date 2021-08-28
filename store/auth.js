import Cookies from 'js-cookie'

// state
export const state = () => ({
  user: null,
  token: null
})

// getters
export const getters = {
  user: state => state.user,
  check: state => state.user !== null,
  token: state => state.token,
}

// mutations
export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },

  FETCH_USER_SUCCESS (state, user) {
    state.user = user
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
  },

  LOGOUT (state) {
    state.user = null
    state.user_id = null
    state.token = null
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, { token, user_id, remember = null }) {
    commit('SET_TOKEN', token)

    Cookies.set('token', token, { expires: remember })
  },

  async fetchUser ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/me')
      commit('FETCH_USER_SUCCESS', data.data)
    } catch (e) {
      Cookies.remove('token')
      commit('FETCH_USER_FAILURE')
    }
  },

  async logout ({ commit }) {
    try {
      await this.$axios.get('/logout')
    } catch (e) { }

    Cookies.remove('token')
    Cookies.remove('user')
    window.localStorage.removeItem('selectable')

    commit('LOGOUT')
    window.location.href = '/auth/login'
  }
}
