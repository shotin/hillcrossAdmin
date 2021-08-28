import Swal from 'sweetalert2'
import { notify } from '@/assets/js/utility'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({ $axios, app, store, redirect, route }) => {
  $axios.setBaseURL(process.env.apiUrl)

  // Request interceptor
  $axios.onRequest((request) => {
    request.baseURL = process.env.apiUrl

    let token = store.getters['auth/token']
    // console.log('Axios token:', token)
    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete request.headers.common.Authorization
    }

    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }

    request.headers.common['Accept'] = 'application/json'
    request.headers.common['Content-Type'] = 'application/json'
    return request
  })

  if (process.server) {
    return
  }

  // Response interceptor
  $axios.onError((error) => {
    const { status } = error.response || {}
    if (status >= 500) {
      notify('Something went wrong! Please try again.', 'error')
    }

    if (status === 401 && !store.getters['auth/check']) {
      notify(error.response.data.message, 'error')
    }

    if (status === 401 && store.getters['auth/check']) {

      store.dispatch('auth/logout')
      Swal.fire({
        position: 'top-end',
        type: 'warning',
        html: 'Please log in again to continue.',
        toast: true,
        // background: background,
        timer: timer,
        customClass: {header: 'd-none', popup: 'popup-notice '+type},
        showConfirmButton: false,
        allowOutsideClick: false,
      }).then(() => {
        redirect({ name: 'login' })
      })
    }

    return Promise.reject(error)
  })
}
