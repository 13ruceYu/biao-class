import store from './store';


function login(sessionId, user, redirect = '/') {
  localStorage.setItem('sessionId', sessionId);
  store.set('user', user); // 如果是 admin， 就给他一个admin标签

  if (!redirect)
    return;
  location.href = redirect;
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

function isAdmin() {
  return user().IS_ADMIN;
}

export default {
  login,
  logout,
  loggedIn,
  user,
  isAdmin,
};