;
(function () {

  'use strict';

  let form = document.querySelector('form');
  let input = form.querySelector('[type=search]');
  let userList = document.getElementById('user-list');
  let perPage = 15;
  let currentPage = 1;

  boot();

  function boot() {
    bindEvents();
  };

  function bindEvents() {
    form.addEventListener('submit', e => {
      e.preventDefault();

      let keyword = input.value;

      search(keyword);
    })
  };

  function search(keyword, page) {
    let http = new XMLHttpRequest();
    http.open('get', `https://api.github.com/search/users?q=${keyword}&page=${page}&per_page=${perPage}`);
    http.send();

    http.addEventListener('load', e => {
      let data = JSON.parse(http.responseText);
      render(data);
      biaoPage.boot({
        selector: '.footer',
        itemAmount: data.total_count,
        perPage,
        currentPage,
        onChange(page, state) {
          if (page == currentPage)
            return;
          currentPage = page;
          search(keyword, currentPage);
        }
      })
    })
  }

  function render(data) {
    userList.innerHTML = '';
    data.items.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
      <div class="avatar">
        <img src=${it.avatar_url}>
      </div>
      <div class="detail">
        <div>Username: <strong>${it.login}</strong></div>
        <div>Homepage: <a href="${it.html_url}" target="_blank">${it.html_url}</a></div>
      </div>
      `;
      userList.appendChild(item);
    });
  };

})();