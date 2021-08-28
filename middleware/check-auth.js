export default async ({ store }) => {
    const token = store.getters['auth/token']
  
    if (!store.getters['auth/check'] && token) {
      return await store.dispatch('auth/fetchUser')
    }
  }