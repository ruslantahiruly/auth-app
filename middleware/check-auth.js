import axios from 'axios'

export default async ({ store, req }) => {
  const token = store.getters['auth/token'];

  if (!store.getters['auth/currentUser'] && token) {
    await store.dispatch('auth/fetchUser');
  }
}