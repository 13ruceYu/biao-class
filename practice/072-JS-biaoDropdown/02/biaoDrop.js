;
(function () {

  'use strict';

  window.biaoDrop = {
    boot,
  }

  function boot(selector, list, config) {
    let container = document.querySelector(selector);
    container.$list = list;

    prepare(container);
    setListVisible(container, false);
    bindFocus(container, config);
    bindClick(container);
    render(container, list, config);
    bindSelect(container, config);
    bindSearch(container, config);
  }

  function prepare(container) {
    container.innerHTML = `
    <div class="dropdown">
      <div class="filter">
        <input type="search">
      </div>
      <div class="list">
        
      </div>
    </div>
    `;

    container._list = container.querySelector('.list');
    container._input = container.querySelector('[type=search]');
  }

  function bindFocus(container, config) {
    container._input.addEventListener('focus', e => {
      setListVisible(container, true);
    })
  }

  function bindClick(container, config) {
    container.addEventListener('click', e => {
      if (e.target.closest('.dropdown'))
        return;
      setListVisible(container, false);
    })
  }

  function render(container, list, config) {
    let el = container._list;
    el.innerHTML = '';
    list.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('item');
      item.innerText = it[config.display];
      item.$data = it;
      el.appendChild(item);
    });
  }

  function bindSelect(container, config) {
    let input = container._input;
    container._list.addEventListener('click', e => {
      let item = e.target;
      let data = item.$data;
      setListVisible(container, false);
      input.value = data[config.display];
      if (config.onSelect)
        config.onSelect(data);
    })
  }

  function bindSearch(container, config) {
    let input = container._input;
    let list = container.$list;
    input.addEventListener('keyup', e => {
      setListVisible(container, true);
      let keyword = input.value;
      let filtered = list.filter(it => {
        return it[config.display].includes(keyword);
      })
      render(container, filtered, config);
    })
  }

  function setListVisible(container, visible = true) {
    container._list.hidden = !visible;
  }

})();