;
(function () {

  'use strict';

  let form = document.getElementById('search-form');
  let input = form.querySelector('[name=keyword]');
  let userList = document.querySelector('.user-list');
  let limit = 10;
  let currentPage = 1;

  boot();

  function boot() {
    bindEvents();
  }

  function bindEvents() {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let keyword = input.value;

      search(keyword);
    })
  }

  function search(keyword, page) {
    let http = new XMLHttpRequest();
    http.open('get', `https://api.github.com/search/users?q=${keyword}&page=${page}&per_page=${limit}`);
    http.send();
    http.addEventListener('load', $ => {
      let data = JSON.parse(http.responseText);
      let pagination = document.querySelector('#page-container');
      // pagination.innerHTML = '';
      biaoPage.boot({
        selector: '#page-container',
        limit,
        currentPage,
        amount: data.total_count,
        onChange(page) {
          if (currentPage === page)
            return;
          
          currentPage = page;
          search(keyword, page);
        }
      })
      render(data);
    })
  }

  function render(data) {
    userList.innerHTML = '';
    data.items.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
        <div class="avatar">
          <img src="${it.avatar_url}">
        </div>
        <div class="detail">
          <strong>${it.login}</strong>
          <div><a target="_blank" href="${it.html_url}">${it.html_url}</a></div>
        </div>
      `;

      userList.appendChild(item);
    });
  }

})();