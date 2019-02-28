function login(key, user) {
  sessionStorage.setItem(key, user.id);
  sessionStorage.setItem('user', JSON.stringify(user));
  location.href = '/';
}

function loginOrNot(key) {
  return sessionStorage.getItem(key);
}

function logout() {
  sessionStorage.removeItem('sessionId');
  sessionStorage.removeItem('user');
  location.href = '/';
}

function getUser(key) {
  let json = sessionStorage.getItem(key);
  if (!json)
    return null;

  return JSON.parse(json);
}

export default {
  login,
  loginOrNot,
  getUser,
  logout
};