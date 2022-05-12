export default ({ store, redirect }) => {
  const user = store.getters['auth/currentUser'];
  if (user && !user.manager) {
    redirect('/');
  }
}