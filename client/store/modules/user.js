const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {}
};

const getters = {
  isLoggedIn: state => !!state.token,
  authToken: state => state.token,
  userData: state => state.user
};

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  logoutUser({ commit }) {
    commit('logout');
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  logout(state) {
    state.status = '';
    state.token = '';
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
