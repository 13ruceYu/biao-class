let id = localStorage.getItem('session');
let user;

boot();

function boot() {
  if (id)
    logged(id);
  else
    notLogged();

}

function logged(id) {
  getUser(id);
  tourist.hidden = true;
  loggedIn.hidden = false;
}

function notLogged() {
  tourist.hidden = false;
  loggedIn.hidden = true;
}

function getUser(id) {
  api('user/find',{id}, r => {
    if (r.success) {
      console.log(r);
      user=r.data;
      navUsername.innerHTML = user.username;
    }
  })
}

function logout() {
  localStorage.removeItem('session');
  location.href = './home.html';
}