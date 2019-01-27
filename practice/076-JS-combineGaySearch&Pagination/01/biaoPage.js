;
(function () {

  'use strict';
  let DEFAULT_CONFIG = {
    perPage: 12,
    currentPage: 2,
  }

  window.biaoPage = {
    boot,
  }

  function boot(setting) {
    let config = {
      ...DEFAULT_CONFIG,
      ...setting,
    };
    let state = {
      config
    }
    state.currentPage = config.currentPage;
    render(state);
    bindEvents(state);
  };

  function render(state) {
    let mountPoint = document.querySelector(state.config.selector);
    mountPoint.innerHTML = '';
    let biaoPage = document.createElement('div');
    biaoPage.classList.add('biao-page');
    biaoPage.innerHTML = `
    <span class="shortcut">
      <button class="first">第一页</button>
      <button class="prev">上一页</button>
    </span>

    <span class="page-list">

    </span>
    
    <span class="shortcut">
      <button class="last">最后一页</button>
      <button class="next">下一页</button>
    </span>
    `;

    let pageList = biaoPage.querySelector('.page-list');
    pageList.innerHTML = '';
    let pageCount = state.pageCount = Math.ceil(state.config.itemAmount / state.config.perPage);
    for (let i = 1; i <= pageCount; i++) {
      let button = document.createElement('button');
      let page = i;
      button.innerText = page;
      pageList.appendChild(button);
      button.classList.add('biao-page-item');
      button.$page = page;
      if (state.config.currentPage === page)
        button.classList.add('active');
    }
    mountPoint.appendChild(biaoPage);

    state.biaoPage = biaoPage;
    state.buttons = biaoPage.querySelectorAll('.biao-page-item');
  };

  function bindEvents(state) {
    state.biaoPage.addEventListener('click', e => {
      let target = e.target;
      let klass = target.classList;
      let currentPage = target.$page;
      if (currentPage) {
        setCurrentPage(state, currentPage)
      }

      if (klass.contains('prev')) {
        setCurrentPage(state, state.currentPage - 1);
      };
      if (klass.contains('next')) {
        setCurrentPage(state, state.currentPage + 1);
      };
      if (klass.contains('first')) {
        setCurrentPage(state, 1);
      }
      if (klass.contains('last')) {
        setCurrentPage(state, state.pageCount);
      }
    })
  }

  function setCurrentPage(state, currentPage) {
    if (currentPage < 1)
      currentPage = 1;
    if (currentPage > state.pageCount)
      currentPage = state.pageCount;
    state.currentPage = currentPage;
    state.config.onChange && state.config.onChange(currentPage, state);

    state.buttons.forEach(button => {
      if (button.$page != currentPage) {
        button.classList.remove('active');
      } else {
        button.classList.add('active');
      }
    });
  };

})();