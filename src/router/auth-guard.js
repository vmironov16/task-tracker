import store from '../store';

export default function (to, from, next) {
  if (!store.getters.isUserLoggedIn) {
    next('/login?loginError=true');
  } else {
    next();
  }
}
