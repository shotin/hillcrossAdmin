export const state = () => ({
    pageViewData: {},
    pageData: null,
  });
  
  // getters
  export const getters = {
    pageData: (state) => state.pageData,
    pageViewData: (state) => state.pageViewData,
  };
  
  // mutations
  export const mutations = {
    SET_DATA(state, data) {
      state.pageData = data;
    },
    SET_VIEW_DATA(state, data) {
      state.pageViewData = data;
    },
    UPDATE_VIEW_DATA(state, data) {
      let index = state.pageViewData.findIndex((d) => {
        return d.id === data.id;
      });
      state.pageViewData.splice(index, 1, data);
    },
    ADD_VIEW_DATA(state, data) {
      state.pageViewData.splice(0, 0, data);
    },
    UPDATE_DATA(state, data) {
      let index = state.pageData.findIndex((d) => {
        return d.id === data.id;
      });
      state.pageData.splice(index, 1, data);
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
  