export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

export const actions = {
  login ({ commit }, { user, token }) {
    commit('setUser', user)
    commit('setToken', token)
  },
  logout ({ commit }) {
    commit('setUser', null)
    commit('setToken', null)
  }
}
