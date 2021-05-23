const state = {
  status: '',
  token: '',
  user: {}
};

const getters = {
  isLoggedIn: state => !!state.token,
  authToken: state => state.token,
  userData: state => state.user,
  isAdmin: state => state.user.admin
};

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  logoutUser({ commit }) {
    commit('logout');
  },
  saveUserData({ commit }, userData) {
    commit('saveUserData', userData);
  },
  deleteUser({ commit }) {
    commit('deleteUser');
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  logout(state) {
    state.status = '';
    state.token = '';
  },
  saveUserData(state, userData) {
    state.user = userData;
  },
  deleteUser(state) {
    state.status = '';
    state.token = '';
    state.user = {}
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
