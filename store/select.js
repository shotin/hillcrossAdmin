// state
export const state = () => ({
  select: null
})

// getters
export const getters = {
  select: state => state.select
}

// mutations
export const mutations = {
  SET_SELECT (state, select) {
    state.select = select
  }
}

// actions
export const actions = {
  async fetchSelect ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/selectable')
      commit('SET_SELECT', data)
    } catch (e) {
      console.log(e)
    }
  }
}