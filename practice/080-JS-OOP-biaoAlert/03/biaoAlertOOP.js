;
(function () {

  'use strict';

  class Alert {
    constructor({
      title,
      desc,
      type,
      timeout,
      onClick,
      onOpen,
      onClose
    }, alertContainer) {
      this.title = title;
      this.desc = desc;
      this.type = type;
      this.timeout = timeout;
      this.onClick = onClick;
      this.onOpen = onOpen;
      this.onClose = onClose;

      this.alertContainer = null;

      this.prepareEnv();
      this.render();
      this.show();
      this.bindAlertClick();
    }

    prepareEnv() {
      this.alertContainer = document.querySelector('.alert-container');
      if (this.alertContainer)
        return;
      else {
        this.alertContainer = document.createElement('div');
        this.alertContainer.classList.add('alert-container');
        document.body.appendChild(this.alertContainer);
      }
    }

    render() {
      let alert = document.createElement('div');
      alert.classList.add('biao-alert');
      alert.innerHTML = `
      <div class="inner ${this.type}">
        <div class="title">${this.title}</div>
        ${this.desc ? `<div class="desc">${this.desc}</div>` : ''}
      </div>
      `;
      this.alert = alert;
    }

    show() {
      this.alertContainer.appendChild(this.alert);
      this.onOpen && this.onOpen(this);

      if (!this.timeout)
        return;
      setTimeout(() => {
        alertClose(this);
      }, this.timeout);
    }

    alertClose() {
      this.onClose && this.onClose(this);
      this.alert.remove();
    }

    bindAlertClick() {
      this.alert.addEventListener('click', e => {
        if (this.clickToClose)
          alertClose(this);
        if (this.onClick)
          this.onClick(this);
      })
    }
  }

  window.Alert = Alert;

})();