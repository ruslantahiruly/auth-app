export const state = () => ({
  users: [],
});

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  ADD_USER(state, newUser) {
    state.users.push(newUser);
  },
  UPDATE_USER(state, user) {
    const foundIndex = state.users.findIndex(x => x.id == user.id);
    state.users[foundIndex] = user;
  },
  DELETE_USER(state, user) {
    state.users = state.users.filter(item => item.id != user.id);
  }
};

export const actions = {
  async fetchUsers({commit}) {
    const users = await this.$axios.$get('/users');
    commit('SET_USERS', users);
  },
  async addUser({commit}, user) {
    const newUser = {
      id: Date.now(),
      admin: null,
      manager: null,
      name: user.name,
      password: user.password,
      email: user.email,
    } 
    commit('ADD_USER', newUser);
  },
  editUser({commit}, params) {
    const user = params;
    commit('UPDATE_USER', user);
  },
  deleteUser({commit}, params) {
    const user = params;
    commit('DELETE_USER', user);
  },
};

export const getters = {
  users: s => s.users,
};