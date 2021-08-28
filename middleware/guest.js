export default ({ store, redirect, query }) => {
    if (store.getters['auth/check']) {
      return redirect('/')
    }
  
    if (query.rt) {
      store.commit('app/SET_REDIRECT', query.rt)
    }
  }