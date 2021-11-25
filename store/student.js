export const state = () => ({
    pageData: null
  });
  
  // getters
  export const getters = {
    pageData: (state) => state.pageData,
  };
  
  // mutations
  export const mutations = {
    SET_DATA(state, data) {
      state.pageData = data;
    },
  };