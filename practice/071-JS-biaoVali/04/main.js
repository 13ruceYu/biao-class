;
(function () {

  'use strict';

  window.biaoVali = {
    boot
  };

  function boot(selector) {
    let el = document.querySelector(selector);
    bindSubmit(el);
  }

  function bindSubmit(el) {
    el.addEventListener('submit', e => {
      e.preventDefault();
      validate(el);
    })
  }

  function validate(el) {
    let inputs = el.querySelectorAll('[data-rule]');
    inputs.forEach(input => {
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
      if (!errors.length)
        return;
      if (!input.nextElementSibling.classList.contains('error')){
        let ec = input.$errorContainer = document.createElement('div');
        ec.classList.add('error');
        input.insertAdjacentElement('afterend', ec);
      }
      
      let html = '';
      errors.forEach(error => {
        html += `<div>${error}</div>`;
      });
      input.$errorContainer.innerHTML = html;
    });
  }



})();