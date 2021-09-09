export const state = () => ({
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
  };