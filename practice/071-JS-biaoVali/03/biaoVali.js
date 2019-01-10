;
(function () {
  "use strict";

  // 基础核心验证规则
  let is = {
    numeric(value) {
      if (!/^\d+$/.test(value.toString()))
        throw '不是合法的数字';
    },

    positive(value) {
      if (value <= 0)
        throw '不可小于0';
    },

    negative(value) {
      if (value >= 0)
        throw '不可大于0';
    },

    min(value, guide) {
      if (value < guide)
        throw '不可小于' + guide;
    },

    max(value, guide) {
      if (value > guide)
        throw '不可大于' + guide;
    },

    between(value, min, max) {
      if (!this.min(value, min) || !this.max(value, max))
        throw '必须大于' + min + '且大于' + max;
    },

    minLength(value, guide) {
      if (value.length < guide)
        throw '长度不可小于' + guide;
    },

    maxLength(value, guide) {
      if (value.length > guide)
        throw '长度不可大于' + guide;
    },

    lengthBetween(value, min, max) {
      if (!this.minLength(value.length, min) || !this.maxLength(value.length, max))
        throw '长度须介于' + min + '至' + max + '之间';
    },

    startsWith(value, guide) {
      if (!value.startsWith(guide))
        throw '必须与' + guide + '开头';
    },

    endsWith(value, guide) {
      if (!value.endsWith(guide))
        throw '必须与' + guide + '结束';
    },

    includes(value, guide) {
      if (!value.includes(guide))
        throw '必须包含“' + guide + '”';
    },

    /**
     * @param {input.value} value 
     * @param {Array} guide 
     */
    in (value, guide) {
      if (guide.indexOf(value) === -1)
        throw '必须在' + guide + '之中';
    },

    regex(value, reg) {
      if (typeof reg == 'string')
        reg = new RegExp(reg);

      if (!reg.test(value))
        throw '不合法的模式';
    },

    email(value) {
      let re = /^\w+@\w+\.\w+\w+$/;
      if (!re.test(value))
        throw '不合法的邮箱';
    },

    phone(value) {
      let re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
      if (!re.test(value))
        throw '不合法的手机号';
    },

    username(value) {
      let re = /^\w{4,12}$/;
      if (!re.test(value))
        throw '不合法的用户名';
    }

  };

  // 暴露接口
  window.biaoVali = {
    is,
    validate,
    applyRules,
    boot,
  }

  /**
   * 选择验证 form or input
   * @param {String} selector 
   */
  function boot(selector) {
    let el = document.querySelector(selector)
    if (el.nodeName == 'FORM') {
      bindSubmit(el);
      bindFormKeyup(el);
    } else {
      bindInputKeyup(el);
    }
  }

  /**
   * 绑定input键盘事件
   * @param {HTMLElement} input 
   */
  function bindInputKeyup(input) {
    input.addEventListener('keyup', e => {
      let errors = validateInput(input);
      showInputErrors(input, errors);
    })
  }

  /**
   * 绑定form键盘事件
   * @param {HTMLFormElement} form 
   */
  function bindFormKeyup(form) {
    form.addEventListener('keyup', e => {
      validateForm(form);
    })
  }

  function bindSubmit(form) {
    let values = [];
    form.addEventListener('submit', e => {
      e.preventDefault();
      validateForm(form);
    })
  }

  function validateInput(input) {
    let rules = input.dataset.rule;
    let value = input.value;
    let errors = validate(value, rules);
    return errors;
  }

  function validateForm(form) {
    let submit = form.querySelector('[type=submit]');
    console.log(submit);
    let inputs = form.querySelectorAll('[data-rule]');
    let errorsExist = [];
    inputs.forEach(input => {
      let errors = validateInput(input);
      errorsExist.push(errors)

      showInputErrors(input, errors);
    });
    if (!errorsExist.length) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  }

  function showInputErrors(input, errors) {
    if (!errors.length) {
      if (input.$errorContainer)
        input.$errorContainer.hidden = true;
      return;
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
    input.$errorContainer.hidden = false;
  }

  /**
   * 将最原始的字符串规则转化为规则对象
   * @param {String} str ruleString
   * @returns {Object} ruleObject
   */
  function parseRules(str) {
    let rules = {};
    let rulesArr = str.split('|');
    let numRules = ['min', 'max', 'between', 'minLength', 'maxLength'];
    rulesArr.forEach(it => {
      let itArr = it.split(':');
      if (!itArr[1])
        itArr[1] = true;
      if (itArr[0] == 'in')
        itArr[1] = itArr[1].split(',');
      if (numRules.indexOf(itArr[0]) != -1)
        itArr[1] = parseFloat(itArr[1]);
      rules[itArr[0]] = itArr[1];
    });

    return rules;
  }

  /**
   * 
   * @param {*} value 从form or input里取到的值
   * @param {*} str 原始的规则字符串
   * @returns {Object} errors 验证产生的错误
   */
  function applyRules(value, str) {
    let rules = parseRules(str);
    let errors = [];
    for (let key in rules) {
      try {
        is[key](value, rules[key]);
      } catch (error) {
        errors.push(error);
      }
    }
    return errors;
  }

  function validate(value, strRule) {
    return applyRules(value, strRule);
  }

})();

//