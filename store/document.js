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
    pageType: (state) => state.pageType,
    pageData: (state) => state.pageData,
  };
  
  // mutations
  export const mutations = {
    SET_TYPE(state, type) {
      state.pageType = type;
    },
    SET_DATA(state, data) {
      state.pageData = data;
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
  