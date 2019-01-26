// biaoPage 翻页插件

;
(function () {

  'use strict';

  const DEAFAULT_CONFIG = {
    limit: 10,
    currentPage: 1,
  }

  window.biaoPage = {
    boot,
    render
  }

  function boot(settings) {
    let config = { ...DEAFAULT_CONFIG,
      ...settings
    };
    let state = {
      config
    };
    state.currentPage = config.currentPage;

    prepare(state);
    render(state);
    bindEvents(state);
  };

  function prepare(state) {
    let el = document.createElement('div');
    el.classList.add('biao-page');
    el.innerHTML = `
      <span class="shortcuts">
        <button class="biao-first">第一页</button>
        <button class="biao-prev">上一页</button>
      </span>

      <span class="page-list">
        
      </span>

      <span class="shortcuts">
        <button class="biao-next">下一页</button>
        <button class="biao-last">最后一页</button>
      </span>
    `;

    state.root = document.querySelector(state.config.selector);
    state.el = el;
    state.pageList = el.querySelector('.page-list');
    state.prev = el.querySelector('.biao-prev');
    state.next = el.querySelector('.biao-next');
    state.root.appendChild(el);
  };

  function render(state) {
    let amount = state.pageCount = Math.ceil(state.config.amount / state.config.limit);

    state.pageList.innerHTML = '';
    for (let i = 1; i <= amount; i++) {
      let page = i;
      let button = document.createElement('button');
      button.innerText = page;
      button.classList.add('biao-page-item');
      if (state.currentPage === page)
        button.classList.add('active');
      button.$page = page;
      state.pageList.appendChild(button);
    }

    state.buttons = state.el.querySelectorAll('.biao-page-item');
  };

  function bindEvents(state) {
    state.el.addEventListener('click', e => {
      let target = e.target;
      let klass = target.classList;
      let page = target.$page;
      if (page) {
        setCurrentPage(state, page);
      }

      if (klass.contains('biao-next'))
        setCurrentPage(state, state.currentPage + 1);
      if (klass.contains('biao-prev'))
        setCurrentPage(state, state.currentPage - 1);
      if (klass.contains('biao-first'))
        setCurrentPage(state, 1);
      if (klass.contains('biao-last'))
        setCurrentPage(state, state.pageCount);
    })
  };

  function setCurrentPage(state, page) {
    if (page < 1)
      return setCurrentPage(state, 1);

    if (page > state.pageCount)
      return setCurrentPage(state, state.pageCount);

    state.currentPage = page;
    let onChange = state.config.onChange;
    if (onChange) {
      onChange(page, state);
    }
    state.buttons.forEach(button => {
      if (button.$page != page) {
        button.classList.remove('active');
        return;
      }
      button.classList.add('active');
    });
  };

})();