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

    UPDATE_USER_INFO(state, data) {
      state.pageData = data
    }
  };