import store from './store'


function loggedIn() {
  return localStorage.getItem('sessionId');
}

function login(sessionId, user) {
  localStorage.setItem('sessionId', sessionId);
  store.set('user',user);
  location.href = '/';
}

function logout(redirect = '/') {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('user');
  location.href = redirect;
}

function user() {
  return store.get('user');
}

export default {
  user,
  login,
  logout,
  loggedIn,
}