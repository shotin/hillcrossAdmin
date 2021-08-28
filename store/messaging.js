export const state = () => ({
  messages: [],
  type: null,
});

// getters
export const getters = {
  type: (state) => state.type,
  messages: (state) => state.messages,
};

// mutations
export const mutations = {
  SET_TYPE(state, type) {
    state.type = type;
  },
  SET_DATA(state, data) {
    state.messages = data;
  },
  ADD_DATA(state, data) {
    state.messages.push(data);
  },
};
