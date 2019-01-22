;
(function () {

  'use strict';

  window.biaoVali = {
    boot
  };

  function boot(selector) {
    let el = document.querySelector(selector);
    if (el.nodeName == 'FORM')
      bindFormSubmit(el);
    if (el.nodeName == 'INPUT') {
      bindInputSubmit(el);
    }
  }

  function bindFormSubmit(el) {
    el.addEventListener('submit', e => {
      e.preventDefault();
      validateForm(el);
    })
  }

  function validateForm(el) {
    let inputs = el.querySelectorAll('[data-rule]');
    inputs.forEach(input => {
      validateInput(input);
    });
  }

  function bindInputSubmit(input) {
    input.addEventListener('keyup', e => {
      if (e.key == 'Enter') {
        validateInput(input);
      }
    })
  }

  function validateInput(input) {
    let val = input.value;
    let rules = input.dataset.rule;
    let rulesArr = rules.split('|');
    let errors = [];
    rulesArr.forEach(it => {
      let rule = it.split(':');
      if (!rule[1])
        rule[1] = true;
      if (rule[1] == 'in')
        rule[1] = rule[1].split(',');
      try {
        $is[rule[0]](val, rule[1])
      } catch (error) {
        errors.push(error);
      }
    });
    if (!errors.length && input.nextElementSibling.classList.contains('error')) {
      input.$errorContainer.remove();
    }
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error')) {
      let ec = input.$errorContainer = document.createElement('div');
      ec.classList.add('error');
      input.insertAdjacentElement('afterend', ec);
    }

    let html = '';
    errors.forEach(error => {
      html += `<div>${error}</div>`;
    });
    input.$errorContainer.innerHTML = html;
  }

})();