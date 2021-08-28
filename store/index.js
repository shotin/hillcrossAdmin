import Cookies from 'js-cookie'
import { cookieFromRequest } from '~/utils'

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    const token = cookieFromRequest(req, 'token')
    if (token) {
      await commit('auth/SET_TOKEN', token)
    }

    const user = cookieFromRequest(req, 'user_id')
    if (user) {
      await commit('auth/SET_USER_ID', user.trim())
    }

    const locale = cookieFromRequest(req, 'locale')
    if (locale) {
      await commit('lang/SET_LOCALE', { locale })
    }
  },

  async nuxtClientInit ({ commit }) {
    const token = Cookies.get('token')
    if (token) {
      await commit('auth/SET_TOKEN', token)
    }

    const user = Cookies.get('user_id')
    if (user) {
      await commit('auth/SET_USER_ID', user.trim())
    }

    const locale = Cookies.get('locale')
    if (locale) {
      await commit('lang/SET_LOCALE', { locale })
    }
  }
}
