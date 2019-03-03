import store from './store';


function login(sessionId, user) {
  localStorage.setItem('sessionId', sessionId);
  store.set('user', user);
  location.href = '/';
}

function logout() {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('user');
  location.href = '/#/login';
  location.reload();
}

function loggedIn() {
  return localStorage.getItem('sessionId');
}

function user() {
  return store.get('user');
}

export default {
  login,
  logout,
  loggedIn,
  user,
};
