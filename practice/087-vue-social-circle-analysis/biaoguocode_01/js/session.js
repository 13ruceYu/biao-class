window.$user = null;
window.logout = logout;

boot();

function boot() {
  if (isLoggedIn())
    load();
  else
    render();
}

function isLoggedIn() {
  return localStorage.getItem('session');
}

function load() {
  api(
    'user/find', {
      id: isLoggedIn(),
      only: ['id', 'name', 'username']
    },
    r => {
      if (!r.data)
        return;

      $user = r.data;
      render()
    }
  )
}

function render() {
  if ($user) {
    navItemName.innerHTML = $user.name || $user.username;
    tourist.hidden = !(loggedIn.hidden = false);
  } else {
    tourist.hidden = !(loggedIn.hidden = true);
  }
}

function logout() {
  localStorage.removeItem('session');
  location.reload();
}