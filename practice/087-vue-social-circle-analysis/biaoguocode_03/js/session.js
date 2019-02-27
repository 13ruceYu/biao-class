window.$user = null;
window.logout = logout;

boot();

function boot() {
  if (isLoggedIn())
    load();
  else
    onLoad();
}

function isLoggedIn() {
  return localStorage.getItem('user');
}

function load() {
  api('user/find', {
    id: isLoggedIn(),
    only: ['id', 'name', 'username']
  }, r => {
    if (!r.data)
      return;

    $user = r.data;
    onLoad()
  })
}

function onLoad() {
  if ($user) {
    navItemName.innerHTML = $user.username;
    tourist.hidden = true;
    loggedIn.hidden = false;
  } else {
    tourist.hidden = false;
    loggedIn.hidden = true;
  }
}

function logout() {
  localStorage.removeItem('user');
  location.href = './home.html'
}