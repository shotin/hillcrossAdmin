export const state = () => ({
  redirect_url: null,
  user_details: null,
  pageTitle: "",
  pageViewData: {},
  pageShowData: {},
  pageType: null,
  pageData: null,
});

// getters
export const getters = {
  pageTitle: (state) => state.pageTitle,
  pageType: (state) => state.pageType,
  pageData: (state) => state.pageData,
  pageViewData: (state) => state.pageViewData,
  pageShowData: (state) => state.pageShowData,
};

// mutations
export const mutations = {
  SET_REDIRECT(state, url) {
    state.redirect_url = url;
  },
  SET_TITLE(state, title) {
    state.pageTitle = title;
  },
  SET_TYPE(state, type) {
    state.pageType = type;
  },
  SET_DATA(state, data) {
    state.pageData = data;
  },
  SET_VIEW_DATA(state, data) {
    state.pageViewData = data;
  },
  SET_SHOW_DATA(state, data) {
    state.pageShowData = data;
  },
  UPDATE_DATA(state, data) {
    let index = state.pageData.findIndex((d) => {
      return d.id === data.id;
    });
    state.pageData.splice(index, 1, data);
  },
  UPDATE_MULTIPLE_DATA(state, data) {
    data.forEach((element) => {
      let index = state.pageData.findIndex((d) => {
        return d.id === element.id;
      });
      state.pageData.splice(index, 1, element);
    });
  },
  ADD_DATA(state, data) {
    state.pageData.splice(0, 0, data);
  },
  REMOVE_DATA(state, data) {
    let index = state.pageData.findIndex((d) => {
      return d.id === data.id;
    });
    state.pageData.splice(index, 1);
  },
};

// actions
export const actions = {
  setTitle({ commit }, { title }) {
    commit("SET_TITLE", { title });
  },
  handleError({ dispatch }, { response }) {
    switch (response.status) {
      case 401: // Token expired 498
        dispatch("auth/logout", null, { root: true });
        break;
      case 498:
        dispatch("/auth/logout", null, { root: true });
      default:
    }
  },
};
