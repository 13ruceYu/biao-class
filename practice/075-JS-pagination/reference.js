/*
|--------------------------------------------------------------------------
| biaoPage翻页插件
|--------------------------------------------------------------------------
*/

;
(function () {
  'use strict';
  // 暴露接口
  window.biaoPage = {
    boot,
    render,
  };

  // 默认设置
  const DEFAULT_CONFIG = {
    limit: 10,
    currentPage: 1,
  };

  /**
   * 启动
   * @param {Object} settings
   *    selector 选择器
   *    amount 总条目数（不是页数）
   *    limit 每页条目数（最终的页数可以通过 amount / limit 算出来）
   *    currentPage 当前页
   *    onChange() 翻页时的回调函数
   */
  function boot(settings) {
    // 合并默认设置和用户设置
    let config = { ...DEFAULT_CONFIG,
      ...settings
    };

    // 将插件的所有状态存在此对象中，这样就可以通过函数传递
    // 从而做到多个插件并行运行
    // 其中的状态可以在翻页时打印查看
    let state = {
      config
    };

    // 代理用户设置，方便后续调用
    state.currentPage = config.currentPage;

    prepare(state);
    render(state);
    bindEvents(state);
  }

  /**
   * 准备初始插件结构
   * @param state
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
   * 渲染页码
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
   * 绑定必要初始事件
   * @param state
   */
  function bindEvents(state) {
    // 当插件被点击时（不管点哪里）
    state.el.addEventListener('click', e => {
      // 缓存
      let target = e.target;
      let page = target.$page;
      let klass = target.classList;

      // 如果是数字按钮，就跳到对应的页
      if (page)
        setCurrentPage(state, page);

      // 如果点的是"下一页"
      if (klass.contains('next'))
        setCurrentPage(state, state.currentPage + 1);

      // 如果点的是"上一页"
      if (klass.contains('prev'))
        setCurrentPage(state, state.currentPage - 1);

      // 如果点的是"第一页"
      if (klass.contains('first'))
        setCurrentPage(state, 1);

      // 如果点的是"最末页"
      if (klass.contains('last'))
        setCurrentPage(state, state.pageCount);
    });
  }

  /**
   * 切换页面
   * @param state
   * @param {number} page 切换到哪一页
   */
  function setCurrentPage(state, page) {
    // 如果小于最小页，就去最小页（第一页）
    if (page < 1)
      return setCurrentPage(state, 1);

    // 如果大于最大页，就去最大页（最后一页）
    if (page > state.pageCount)
      return setCurrentPage(state, state.pageCount);

    // 记录当前页
    state.currentPage = page;

    // 如果下游传了回调函数，就触发；
    // 通知下游页面改变了
    let onChange = state.config.onChange;
    onChange && onChange(page, state);

    // 更新高亮按钮
    state.buttons.forEach(it => {
      // 只要不是当前页的按钮通通取消.active类
      if (it.$page != page) {
        it.classList.remove('active');
        return;
      }

      // 否则加.active类
      it.classList.add('active');
    });
  }
})();

/*
|--------------------------------------------------------------------------
| 测试
|--------------------------------------------------------------------------
*/

biaoPage.boot({
  selector: '.footer',
  amount: 1000,
  limit: 10,
  currentPage: 2,
  onChange(page, state) {
    console.log(page);
  },
});

biaoPage.boot({
  selector: '#a',
  amount: 100,
  limit: 15,
  currentPage: 3,
  onChange(page, state) {
    console.log(page);
  },
});

biaoPage.boot({
  selector: '#b',
  amount: 100,
  limit: 20,
  currentPage: 1,
  onChange(page, state) {
    console.log(page);
  },
});


// biaoPage.render();