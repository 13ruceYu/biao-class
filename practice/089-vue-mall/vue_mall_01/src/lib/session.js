import store from './store'


function loggedIn() {
  return localStorage.getItem('sessionId');
}

function login(sessionId, user, redirect = '/') {
  localStorage.setItem('sessionId', sessionId);
  store.set('user',user);
  location.href = redirect;
}

function logout(redirect = '/') {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('user');
  location.href = redirect;
}

function user() {
  return store.get('user');
}

function isAdmin() {
  return this.user().IS_ADMIN;
}

export default {
  user,
  login,
  logout,
  loggedIn,
  isAdmin,
}