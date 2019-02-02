class Alert {
  constructor (title, { desc, onClick, onOpen, onClose, type = 'info', timeout = 3000, containerClass = 'biao-alert-container' } = {}) {
    // 加载设置
    this.title          = title;
    this.type           = type;
    this.desc           = desc;
    this.timeout        = timeout;
    this.onClick        = onClick;
    this.onOpen         = onOpen;
    this.onClose        = onClose;
    this.containerClass = containerClass;

    this.container = null;

    this.prepareEnv();
    this.render();
    this.open();
    this.bindClick();
  }

  /**
   * 准备环境
   *
   * 所有提醒都在一个容器内
   * 有就用，没有就造一个
   */
  prepareEnv () {
    this.container =
      this.getContainer();

    // 有就用
    if (this.getContainer())
      return;

    // 没有就造一个
    let container = this.container = document.createElement('div');
    container.classList.add(this.containerClass);
    document.body.appendChild(container);
  }

  /**
   * 获取容器
   * @return {Element}
   */
  getContainer () {
    return document.querySelector('.' + this.containerClass);
  }

  /**
   * 渲染提醒
   */
  render () {
    let el = document.createElement('div');
    el.classList.add('biao-alert');

    // 不同类型不同颜色
    // 所以加个类方便控制样式
    el.classList.add(this.type);

    el.innerHTML = `
  <div class="inner">
    <div class="title">${this.title}</div>
    ${this.desc ? `<div class="desc">${this.desc}</div>` : ''}
  </div>`;

    // 缓存下来后面用
    this.el = el;
  }

  /**
   * 显示提醒
   */
  open () {
    // 如果有回调的话就叫一下回调
    this.onOpen && this.onOpen();

    this.container.appendChild(this.el);

    // 如果没有期限，就让它一直显示吧
    if (!this.timeout)
      return;

    // 如果有期限
    setTimeout($ => {
      // 到了那个时间就隐藏
      this.close(this);
    }, this.timeout);
  }

  /**
   * 关闭提醒
   */
  close () {
    // 如果有回调的话就叫一下回调
    this.onClose && this.onClose(this);

    this.el.remove();
  }

  /**
   * 当被点击时...
   */
  bindClick () {
    this.el.addEventListener('click', e => {
      // 如果点击就关闭，那就关闭
      if (this.clickToClose)
        close(this);

      // 如果有回调的话就叫一下回调
      this.onClick && this.onClick(this);
    });
  }
}