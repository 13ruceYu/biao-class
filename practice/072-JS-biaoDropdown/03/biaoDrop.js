;
(function () {

  'use strict';

  window.biaoDrop = {
    boot,
  }

  function boot(selector, list, config) {
    let container = document.querySelector(selector);
    prepareContainer(container);
    renderList(container, list, config);
    setListVisible(container, false);
    bindFocus(container);
    bindBlur(container);
    bindClickList(container, config);
    bindSearch(container, list, config);
  }

  function prepareContainer(container) {
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
    container._input = container.querySelector('input');
  }

  function renderList(container, list, config) {
    container._list.innerHTML = '';
    list.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('item');
      item.innerText = it[config.dropKey];
      container._list.appendChild(item);
      item.$list = it;
    });
  }

  function bindClickList(container, config) {
    container._list.addEventListener('click', e => {
      let target = e.target;
      if (config.onSelect)
        config.onSelect(target.$list);

      container._input.value = target.$list[config.dropKey];
      setListVisible(container, false);
    })
  }

  function setListVisible(container, visible = true) {
    container._list.hidden = !visible;
  }

  function bindSearch(container, list, config) {
    container._input.addEventListener('keyup', e => {
      let keyword = e.target.value;
      let newList = list.filter(item => {
        return item[config.dropKey].includes(keyword);
      });
      renderList(container, newList, config);
    })
  }

  function bindFocus(container) {
    container._input.addEventListener('focus', e => {
      setListVisible(container, true);
    })
  }

  function bindBlur(container) {
    document.addEventListener('click', e => {
      if (!e.target.closest('.dropdown'))
        setListVisible(container, false);
    })
  }

})();