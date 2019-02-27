let user = null;
let id = localStorage.getItem('session');

boot()

function boot() {
  if (isLogged()) {
    api('user/find', {
      id
    }, r => {
      user = r.data;
      render(user);
    })
  } else
    render(user);
}

function isLogged() {
  return id;
}

function render(user) {
  if (user) {
    tourist.hidden = true;
    loggedIn.hidden = false;
    navUsername.innerHTML = user.username;
  } else {
    tourist.hidden = false;
    loggedIn.hidden = true;
  }
}

function logout() {
  localStorage.removeItem('session');
  location.href = './home.html'
}