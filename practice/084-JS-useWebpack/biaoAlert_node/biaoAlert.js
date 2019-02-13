class Alert {
  constructor(title, {
    desc,
    type = 'info',
    timeout,
    onClick,
    onOpen,
    onClose,
    containerClass = 'biao-alert-container',
  } = {}) {
    this.desc = desc;
    this.title = title;
    this.type = type;
    this.timeout = timeout;
    this.onClick = onClick;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.containerClass = containerClass;

    this.container = null;

    this.prepareEnv();
    this.render();
    this.open();
    this.bindClick();
  }

  prepareEnv() {
    this.container = this.getContainer();
    if (this.getContainer())
      return;

    this.container = document.createElement('div');
    this.container.classList.add(this.containerClass);
    document.body.appendChild(this.container);

  }

  getContainer() {
    return document.querySelector('.' + this.containerClass);
  }

  render() {
    let el = document.createElement('div');
    el.classList.add('biao-alert');
    el.innerHTML = `
    <div class="inner ${this.type}">
      <div class="title">${this.title}</div>
      ${this.desc ? `<div class="desc">${this.desc}</div>` : ''}
    </div>
    `;
    this.el = el;
  }

  open() {
    if (this.onOpen)
      this.onOpen();

    this.container.appendChild(this.el);

    if (!this.timeout)
      return;
    setTimeout($ => {
      close();
    }, this.timeout);
  }

  close() {
    if (this.onClose)
      this.onClose();

    this.el.remove();
  }

  bindClick() {
    this.el.addEventListener('click', e => {
      if (this.clickToClose)
        close();

      if (this.onClick) {
        this.onClick();
      }
    })
  }
}

export default Alert;