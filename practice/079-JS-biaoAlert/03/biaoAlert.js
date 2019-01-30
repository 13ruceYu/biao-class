;
(function () {

  'use strict';

  window.biaoAlert = biaoAlert;

  let defaultConfig = {
    type: 'info',
    timeout: '2000',
    clickToClose: true,
  }

  let alertContainer;

  function biaoAlert(config) {
    config = {
      ...defaultConfig,
      ...config
    };

    prepareEnv();
    render(config);
    show(config);
    bindClick(config);
  };

  function prepareEnv() {
    alertContainer = document.querySelector('.alert-container');
    if (alertContainer)
      return
    else {
      alertContainer = document.createElement('div');
      alertContainer.classList.add('alert-container');
      document.body.appendChild(alertContainer);
    }
  }

  function render(config) {
    let el = document.createElement('div');
    el.classList.add('biao-alert');
    el.innerHTML = `
    <div class="inner ${config.type}">
      <div class="title">${config.title}</div>
      ${config.desc ? `<div class="desc">${config.desc}</div>` : ''}
    </div>
    `;

    config.el = el;
  }

  function show(config) {
    alertContainer.appendChild(config.el);
    if (!config.timeout)
      return;
    setTimeout(() => {
      config.el.remove();
    }, config.timeout);
  }

  function bindClick(config) {
    config.el.addEventListener('click', e => {
      if (config.clickToClose)
        config.el.remove();
      config.onClick && config.onClick(config);
    })
  }

})();