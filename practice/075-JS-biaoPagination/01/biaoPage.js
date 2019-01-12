;
(function () {
  'use strict';

  // 暴露接口
  window.biaoPage = {
    boot,
    render,
  };

  // 默认配置
  const DEFAULT_CONFIG = {
    limit: 10,
    currentPage: 1,
  };

  /**
   * 启动
   * @param {Object} setting 
   *    selector 选择器
   *    amount 总条目数
   *    limit 每页条目数
   *    currentPage 当前页
   *    onChange() 翻页时的回调函数
   */
  function boot(setting) {
    // 让用户设置覆盖默认设置
    let config = {
      ...DEFAULT_CONFIG,
      ...setting,
    };

    // 将插件的所有状态存到 state 中，这样就可以通过函数传递
    // 从而做到多个插件并行运行
    // 其状态可以在翻页时打印查看
    let state = {
      config,
    };

    // 代理用户设置，方便后续调用
    state.currentPage = config.currentPage;

    prepare(state);
    render(state);
    bindEvents(state);

  };

  /**
   * @description: 准备初始化插件结构
   * @param {Object} 
   */
  function prepare(state) {

    // 创造插件容器
    let el = document.createElement('div');

    // 添加插件类
    el.classList.add('biao-page');

    // 填充基础结构
    el.innerHTML = `
    <span class="shortcuts">
      <button class="prev">上一页</button>
      <button class="first">第一页</button>
    </span>

    <span class="page-list"></span>

    <span class="shortcuts">
      <button class="last">最后一页</button>
      <button class="next">下一页</button>
    </span>`;

    // 代理一些常用元素，方便后续使用

    // 插件本身
    state.el = el;

    // 插件挂载点
    state.root = document.querySelector(state.config.selector);

    // 数字按钮容器
    state.pageList = el.querySelector('.page-list');

    // 挂载插件
    state.root.appendChild(el);
  }

  /**
   * @description: 渲染页码
   * @param state
   */
  function render(state) {
    // 页码总数 = 向上取整(条目总数 / 每页条目数)
    let pageAmount =
      state.pageCount =
      Math.ceil(state.config.amount / state.config.limit);

    // 拿到数字页码容器
    let list = state.pageList;

    // 清空上次渲染的内容
    list.innerHTML = '';

    // 基于页码总数创造按钮
    for (let i = 0; i < pageAmount; i++) {
      // 从0开始，所以加1
      let page = i + 1;

      // 创造按钮
      let button = document.createElement('button');

      // 加插件类
      button.classList.add('biao-page-item');

      // 如果刚好等于当前页就直接高亮
      if (state.currentPage === page)
        button.classList.add('active');

      // 设置按钮的数字
      button.innerText = page;

      // 直接在按钮对象上记录当前页的页码
      button.$page = page;

      // 追加按钮
      state.pageList.appendChild(button);
    }

    // 代理所有按钮，方便后续使用
    state.buttons = state.pageList.querySelectorAll('.biao-page-item');
  }

  /**
   * @description: 绑定必要事件
   * @param state
   */
  function bindEvents(state) {
    state.el.addEventListener('click', e => {
      let target = e.target;
      let page = target.$page;
      let klass = target.classList;

      if (page)
        setCurrentPage(state, page);

      if (klass.contains('next'))
        setCurrentPage(state, state.currentPage + 1);

      if (klass.contains('prev'))
        setCurrentPage(state, state.currentPage - 1);

      if (klass.contains('first'))
        setCurrentPage(state, 1);

      if (klass.contains('last'))
        setCurrentPage(state, state.pageCount);
    });
  }

  /**
   * @description: 切换页面
   * @param state
   * @param {number} page 切换到哪一页
   */
  function setCurrentPage(state, page) {

    if (page < 1)
      return setCurrentPage(state, 1);

    if (page > state.pageCount)
      return setCurrentPage(state, state.pageCount);

    state.currentPage = page;

    let onChange = state.config.onChange;
    onChange && onChange(page, state);

    state.buttons.forEach(it => {
      if (it.$page != page) {
        it.classList.remove('active');
        return;
      }

      it.classList.add('active');
    });
  }



})();