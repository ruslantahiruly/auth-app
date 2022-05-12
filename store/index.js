const cookieFromRequest = (request, key) => {
  if (!request.headers.cookie) {
    return;
  }
  const cookie = request.headers.cookie.split(';').find(
    c => c.trim().startsWith(`${key}=`)
  );
  if (cookie) {
    return cookie.split('=')[1];
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const token = cookieFromRequest(req, 'token');

    if (token) {
      commit('auth/SET_TOKEN', token);
    }
  }
};