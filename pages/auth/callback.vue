<template>
  <Loader fullscreen />
</template>

<script>
import Cookies from 'js-cookie'
import { cookieFromRequest } from '~/utils'
import Loader from '~/components/Loader'

export default {
  layout: 'blank',
  head () {
    return {
      title: 'Logining you in...'
    }
  },
  components: {
    Loader
  },

  asyncData({ store, req, redirect, route }) {
    const params = { ...route.params, ...route.query }
    const passReset = (!!params.id && !!params.expires && !!params.signature)
    const user = store.state.auth.user
    let redirectTo = ''
    // Allow relative paths only - strip protocol/host/port if they exist.
    redirectTo = redirectTo.replace( /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '')
    redirectTo = (redirectTo.startsWith('/') ? '' : '/') + redirectTo
    return {
      user,
      redirectTo,
      passReset
    }
  },

  data: () => ({
    user: null,
    redirectTo: '/',
    passReset: false
  }),

  methods: {
    async resolveLogin () {
      // temporary login
      const uri = this.$route.fullPath
      const request = await this.$axios.get(uri)
      let user = request.data
      // store user session
      if (request.status === 200) {
        // Save the token.
        await this.$store.dispatch('auth/saveToken', {
          token: user.access_token,
          remember: Date.parse(user.expires_at),
        })
        // store user data
        this.$store.dispatch('auth/fetchUser')
      } else {
        this.$router.push('/auth/login')
      }
    }
  },

  async mounted () {
    this.$store.commit('app/SET_TITLE', this.title)
    //if (this.passReset && !this.user) return this.resolveLogin()
    // decide
    if (this.user) {
      window.location = '/'
      //this.$router.push(this.redirectTo || '/')
    } else {
      this.$router.push('/auth/login')
    }
  }
}
</script>