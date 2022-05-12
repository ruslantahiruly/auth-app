import Cookie from 'js-cookie';

export const state = () => ({
  token: null,
  currentUser: null,
  isAuthenticated: false,
});

export const mutations = {
  LOGOUT_USER(state) {
    state.token = null;
    state.currentUser = null;
    state.isAuthenticated = false;
    Cookie.remove('token');
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    state.isAuthenticated = true;
  }
};

export const actions = {
  logout({commit}) {
    commit('LOGOUT_USER');
  },
  setToken({commit}, token) {
    commit('SET_TOKEN', token);
    Cookie.set('token', token, { expires: 1, path: '/' });
  },
  async fetchUser({commit}) {
    const response = await this.$axios.$get('/sessions/user');
    commit('SET_CURRENT_USER', response.user);
  },
};

export const getters = {
  token: s => s.token,
  currentUser: s => s.currentUser,
  isAuthenticated: s => s.isAuthenticated,
};