;
(function () {
  'use strict';

  window.biaoAlert = biaoAlert;

  let container;

  // 默认设置
  const defaultConfig = {
    type: 'info', // 设置alert的类型 {info|warn|danger|success}
    timeout: 2000, // 显示时长
    contanierClass: 'biao-alert-container', // 显示容器，以显示多个alert
    clickToClose: true,
  }

  /**
   * @description: 启动
   * @param {string} title alert的标题
   * @param {Object} config 设置
   */
  function biaoAlert(title, config) {
    // 合并设置
    config = {
      ...defaultConfig,
      ...config,
      title,
    };

    perpareEnv(config)
    render(config);
    open(config);
    bindClick(config);
  }

   /**
    * 准备环境
    * 所有提醒都在一个容器内
    * @param  config 
    */
  function perpareEnv(config) {
    container = getContainer();
    if (getContainer())
      return;
    container = document.createElement('div');
    container.classList.add(config.contanierClass);
    document.body.appendChild(container);
  }

  function getContainer() {
    return document.querySelector('.biao-alert-container');
  }

  /**
   * 渲染alert
   * @param config 
   */
  function render(config) {
    let el = document.createElement('div');
    el.classList.add('biao-alert');
    // 不同类型的添加不同的颜色
    el.classList.add(config.type);
    el.innerHTML = `
    <div class="inner">
      <div class="title">${config.title}</div>
      ${config.desc ? `<div class="desc">${config.desc}</div>` : ''}
    </div>
    `;

    // 缓存，方便之后调用
    config.el = el;
  }

  /**
   * 显示提醒
   * @param config 
   */
  function open(config) {
    // 如果有回调就叫一下回调
    config.onOpen && config.onOpen(config);

    container.appendChild(config.el);

    // 如果没有期限就一直显示
    if (!config.timeout)
      return;
    
    // 有期限有设置退出时间
    setTimeout(() => {
      close(config);
    }, config.timeout);
  }

  /**
   * 关闭提醒
   * @param config 
   */
  function close(config) {
    config.onClose && config.onClose(config);
    config.el.remove();
  }

  // 绑定点击事件
  function bindClick(config) {
    config.el.addEventListener('click', e => {
      // 如果设置关闭，就关闭
      if (config.clickToClose)
        close(config);

      // 如果设置了其他事件，就回调
      if (config.onClick)
        config.onClick(config);
    })
  }

})();