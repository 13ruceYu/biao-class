;
(function () {

  'use stric';

  window.biaoAlert = biaoAlert;

  let defaultConfig = {
    timeout: '3000',
    type: 'info',
    clickToClose: true,
  }

  let alertContainer;

  function biaoAlert(config) {
    config = { ...defaultConfig,
      ...config
    };

    prepareEnv();
    render(config);
    show(config);
    bindAlertClick(config);
  }

  function prepareEnv() {
    alertContainer = document.querySelector('.alert-container');
    if (alertContainer)
      return;
    else {
      alertContainer = document.createElement('div');
      alertContainer.classList.add('alert-container');
      document.body.appendChild(alertContainer);
    }
  }

  function render(config) {
    let alert = document.createElement('div');
    alert.classList.add('biao-alert');
    alert.innerHTML = `
    <div class="inner ${config.type}">
      <div class="title">${config.title}</div>
      <div class="desc">${config.desc}</div>
    </div>
    `;
    config.alert = alert;
  }

  function show(config) {
    alertContainer.appendChild(config.alert);
    config.onOpen && config.onOpen(config);

    if (!config.timeout)
      return;
    setTimeout(() => {
      alertClose(config);
    }, config.timeout);
  }

  function alertClose(config) {
    config.alert.remove();
    config.onClose && config.onClose(config);
  }

  function bindAlertClick(config) {
    config.alert.addEventListener('click', e => {
      if (config.clickToClose)
        alertClose(config);
      if (config.onClick)
        config.onClick(config);
    })
  }

})();