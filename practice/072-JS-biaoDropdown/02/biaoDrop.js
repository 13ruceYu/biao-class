;
(function () {

  'use strict';

  window.biaoDrop = {
    boot,
  }

  /**
   * 
   * @param {string} selector 插件容器的选择
   * @param {Array} list 用于渲染的数据
   * @param {Object} config 其他配置项
   */
  function boot(selector, list, config) {
    // 选中插件挂载点
    let container = document.querySelector(selector);
    // 缓存数据至 container 元素中
    container.$list = list;

    prepare(container); // 准备基础界面
    setListVisible(container, false); // 一开始（默认）隐藏 list
    bindFocus(container, config); // 绑定input聚焦事件
    bindClick(container); // 隐藏 list
    render(container, list, config); // 渲染 list
    bindSelect(container, config); // 绑定点击 list 事件
    bindSearch(container, config); // 绑定 input 输入事件
  }

  function prepare(container) {
    // 填充基础 html
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
   * 通过数据渲染列表
   * @param {HTMLElement} container 挂载点
   * @param {Array} list 用于渲染的数据列表
   * @param {Object} config 设置
   */
  function render(container, list, config) {
    // 拿到 list DOM
    let el = container._list;
    // 清空前一次渲染
    el.innerHTML = '';
    list.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('item');
      item.innerText = it[config.display];
      item.$data = it;
      el.appendChild(item);
    });
  }

  function setListVisible(container, visible = true) {
    container._list.hidden = !visible;
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


})();