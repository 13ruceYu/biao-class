;
(function () {

  'use strict';

  // 默认设置
  const DEFAULT_CONFIG = {
    limit: 10,
    currentPage: 1,
  }

  window.biaoPage = {
    boot,
    render,
  }

  /**
   * 
   * @param {Object} setting 用户设置
   */
  function boot(setting) {
    // config = Object.assign({}, DEFAULT_CONFIG, setting);
    // 用 用户设置覆盖插件设置，保存为一个新的状态
    let config = {
      ...DEFAULT_CONFIG,
      ...setting
    };
    let state = {
      config
    };
    state.currentPage = config.currentPage;


    // 准备 pagination
    prepare(state);
    // 渲染 pagination
    render(state);
    // 绑定事件
    bindEvents(state);
  }

  /**
   * @description: 准备 pagination container
   * @param {object} 
   */
  function prepare(state) {
    let el = document.createElement('div');
    // 给插件添加样式
    el.classList.add('biao-page');
    // 填充基础结构
    el.innerHTML = `
    <span class="shortcuts">
      <button class="biao-first">第一页</button>
      <button class="biao-prev">Prev</button>
    </span>

    <span class="page-list">
      
    </span>

    <span class="shortcuts">
      <button class="biao-next">Next</button>
      <button class="biao-last">最后一页</button>
    </span>
    `;

    // 选择pagination的挂载点
    state.root = document.querySelector(state.config.selector);
    // 插件本身
    state.el = el;
    // 数字按钮容器
    state.pageList = el.querySelector('.page-list');
    // 挂载插件
    state.root.innerHTML = '';
    state.root.appendChild(el);
  }

  /**
   * @description: 渲染页码
   * @param state
   */
  function render(state) {
    // 页码总数
    state.pageCount = Math.ceil(state.config.amount / state.config.limit);

    // 清空上次渲染内容
    state.pageList.innerHTML = '';

    // 基于页码总数创造按钮
    for (let i = 0; i < state.pageCount; i++) {
      let page = i + 1;
      let button = document.createElement('button');

      // 添加插件样式
      button.classList.add('biao-page-item');

      button.innerText = page;
      // 直接在按钮对象记录当前的页码
      button.$page = page;
      if (state.currentPage === page)
        button.classList.add('active');
      state.pageList.appendChild(button);
    }

    // 代理所有按钮，方便后续使用
    state.buttons = state.pageList.querySelectorAll('.biao-page-item');
  }

  function bindEvents(state) {
    state.el.addEventListener('click', e => {
      let target = e.target;
      let klass = target.classList;
      let page = target.$page;
      if (page) {
        setCurrentPage(state, page);
      }

      if (klass.contains('biao-prev'))
        setCurrentPage(state, state.currentPage - 1);
      if (klass.contains('biao-next'))
        setCurrentPage(state, state.currentPage + 1);
      if (klass.contains('biao-first'))
        setCurrentPage(state, 1);
      if (klass.contains('biao-last'))
        setCurrentPage(state, state.pageCount);
    })
  }

  function setCurrentPage(state, page) {
    if (page < 1) {
      setCurrentPage(state, 1);
      return;
    }

    if (page > state.pageCount) {
      setCurrentPage(state, state.pageCount);
      return;
    }

    state.currentPage = page;
    state.buttons.forEach(it => {
      if (it.$page != page) {
        it.classList.remove('active');
        return;
      }
      it.classList.add('active');
    });

    // 给用户回传数据
    let onChange = state.config.onChange;
    onChange && onChange(page, state);
  }

})();