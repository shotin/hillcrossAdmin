export default async ({ store, redirect, query, route }) => {
    const user = store.getters['auth/user']
    if(user && user.role === 'Student' && !user.has_agreed) {
      return redirect('/auth/terms')
    }
  }