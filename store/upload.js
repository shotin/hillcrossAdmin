// import Cookies from 'js-cookie'

// state
export const state = () => ({
  session: null,
  file: null,
  file_name: null,
  file_type: "",
  files: [],
});

// getters
export const getters = {
  files: (state) => state.files,
  file: (state) => state.file,
  file_name: (state) => state.file_name,
  file_type: (state) => state.file_type,
};

// mutations
export const mutations = {
  SET_FILE(state, file) {
    state.file = file;
  },

  SET_FILE_NAME(state, file_name) {
    state.file_name = file_name;
  },
  
  SET_FILES(state, files) {
    state.files = files;
  },

  ADD_FILE(state, data) {
    state.files.splice(0, 0, data);
  },

  REMOVE_FILE(state, data) {
    let index = state.files.findIndex((d) => {
      return d.id === data.id;
    });
    state.files.splice(index, 1);
  },

  SET_FILE_TYPE(state, type) {
    state.file_type = type;
  },

  SET_SESSION(state, session) {
    state.session = session;
    localStorage.setItem("upload_session", session, { expires: 365 });
  },
};
