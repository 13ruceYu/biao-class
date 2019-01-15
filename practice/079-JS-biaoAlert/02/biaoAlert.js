;
(function () {

  'use strict';

  window.biaoAlert = biaoAlert;

  let container;

  const defaultConfig = {
    type: 'info',
    timeout: false,
    containerClass: 'biao-alert-container',
    clickToClose: true,
  }

  function prepareEnv(config) {
    container = getContainer(config);
    if (getContainer(config))
      return;

    container = document.createElement('div');
    container.classList.add(config.containerClass);
    document.body.appendChild(container);

  }

  function getContainer(config) {
    return document.querySelector('.' + config.containerClass);
  }

  function biaoAlert(title, config) {
    config = {
      ...defaultConfig,
      ...config,
      title
    };

    prepareEnv(config);
    render(config);
    open(config);
    bindClick(config);
  }

  function render(config) {
    let el = document.createElement('div');
    el.classList.add('biao-alert');
    // el.classList.add(config.type);
    el.innerHTML = `
    <div class="inner ${config.type}">
      <div class="title">${config.title}</div>
      ${config.desc ? `<div class="desc">${config.desc}</div>` : ''}
    </div>
    `;
    config.el = el;
  }

  function open(config) {
    if (config.onOpen)
      config.onOpen(config);

    container.appendChild(config.el);

    if (!config.timeout)
      return;
    setTimeout($ => {
      close(config);
    }, config.timeout);
  }

  function close(config) {
    if (config.onClose)
      config.onClose(config);

    config.el.remove();
  }



  function bindClick(config) {
    config.el.addEventListener('click', e => {
      if (config.clickToClose)
        close(config);

      if (config.onClick) {
        config.onClick(config);
      }
    })
  }

})();