;
(function () {

  'use strict';

  window.biaoDrop = {
    boot,
  }

  let defaultConfig = {
    display: 'name',
  }

  /**
   * 启动
   * @param {String} selector 
   * @param {Array} list 用于渲染的数据
   * @param {object} config 其他配置项
   */
  function boot(selector, list, config) {
    // 将用户设置覆盖默认设置
    config = Object.assign({}, defaultConfig, config);

    // 选中插件的挂载点
    let container = document.querySelector(selector);

    // 将数据缓存值container元素中
    container.$list = list;

    prepare(container); // 准备基础界面
    setListVisible(container, false); // 一开始隐藏dropdown
    bindFocus(container); // 当search input被聚焦时显示dropdown
    bindClick(container); // 当dropdown 被点击时做什么
    render(container, list, config); // 渲染列表
    bindSelect(container, config); // 当dropdown 被选择时做什么
    bindSearch(container, config); // 当搜索（打字）时做什么
  }

  /**
   * 准备基础界面
   * @param container 
   */
  function prepare(container) {
    // 填充基础html
    container.innerHTML = `
    <div class="dropdown">
      <div class="filter">
        <input type="search">
      </div>
      <div class="list">
        
      </div>
    </div>
    `;

    // 缓存常用元素，方便之后调用
    container._list = container.querySelector('.list');
    container._input = container.querySelector('[type=search]');
  }

  /**
   * 当 search-input被聚焦时现实dropdown
   * @param container 
   */
  function bindFocus(container) {
    container._input.addEventListener('focus', e => {
      setListVisible(container, true);
    })
  }

  function bindClick(container) {
    container.addEventListener('click', e => {
      if (e.target.closest('.dropdown'))
        return;
      setListVisible(container, false);
    })
  }

  // function bindBlur(container) {
  //   container._input.addEventListener('blur', e => {
  //     setListVisible(container, false);
  //   })
  // }

  /**
   * 通过数据渲染 dropdown
   * @param {HTMLElement} container 挂载点
   * @param {Array} list 用于渲染的数据
   * @param {Object} config 设置
   */
  function render(container, list, config) {
    let el = container._list;
    el.innerHTML = '';

    list.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('item');
      item.$data = it;
      item.innerText = it[config.display];
      el.appendChild(item);
    });
  }

  /**
   * 当dropdown其中一项被选择时
   * @param {HTMLElement} container 
   * @param {Object} config 
   */
  function bindSelect(container, config) {
    let input = container._input;
    container._list.addEventListener('click', e => {
      let item = e.target;
      let data = item.$data;

      input.value = data[config.display];
      setListVisible(container, false);
      if (config.onSelect)
        config.onSelect(data);
    })
  }

  /**
   * 当搜索时（键入）
   * @param {HTMLElement} container 
   * @param {Object} config 
   */
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