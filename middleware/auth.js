export default ({ store, redirect, query, route }) => {
  // set redirect route
  if (query.rt) {
    store.commit("app/SET_REDIRECT", query.rt);
  }
  // no session
  if (!store.getters["auth/check"]) {
    store.dispatch("auth/logout");
    const redirect_url = route.path !== "/" ? "?rt=" + route.fullPath : "";
    return redirect("/auth/login" + redirect_url);
  }
};
