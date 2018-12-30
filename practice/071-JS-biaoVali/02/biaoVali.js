;
(function () {
  'use strict';

  // 核心基础验证规则
  let is = {
    numeric(value) {
      if (!/^\d+$/.test(value.toString())) {
        throw '不是合法的数字';
      }
    },

    min(value, guide) {
      this.numeric(value);
      if (value < guide) {
        throw '数字不可小于' + guide;
      }
    },

    max(value, guide) {
      if (value > guide) {
        throw '数字不可大于' + guide;
      }
    },

    between(value, min, max) {
      if (!this.min(value, min) || !this.max(value, max)) {
        throw '必须小于' + max + '且大于' + min;
      }
    },

    positive(value) {
      if (!this.numeric(value))
        return false;

      if (value < 0) {
        throw '不可小于0';
      }
    },

    negative(value) {
      if (!this.numeric(value))
        return false;

      if (value > 0) {
        throw '不可大于0';
      }
    },

    minLength(value, guide) {
      if (value.length < guide) {
        throw '长度不可小于' + guide;
      }
    },

    maxLength(value, guide) {
      if (value.length > guide) {
        throw '长度不可大于' + guide;
      }
    },

    lengthBetween(value, min, max) {
      if (!this.minLength(value, min) || !this.maxLength(value, max)) {
        throw '长度须介于' + min + '至' + 'max' + '之间';
      }
    },

    startsWith(value, guide) {
      if (!value.startsWith(guide)) {
        throw '必须以' + guide + '开头';
      }
    },

    endsWith(value, guide) {
      if (!value.endsWith(guide)) {
        throw '必须以' + guide + '结束';
      }
    },

    includes(value, guide) {
      if (!value.includes(guide)) {
        throw '必须包含' + guide;
      }
    },

    in (value, guide) {
      if (guide.indexOf(value) == -1) {
        throw '必须在' + guide + '之中';
      }
    },

    regex(value, reg) {
      if (typeof reg == 'string')
        reg = new RegExp(reg);

      if (!reg.test(value)) {
        throw '不合法的格式';
      }
    },

    email(value) {
      let re = /^\w+@\w+\.\w+\w$/;
      if (!re.test(value)) {
        throw '不合法的邮箱';
      }
    },

    username(value) {
      let re = /^[a-zA-Z0-9]\w+$/;
      if (!re.test(value)) {
        throw '不合法的用户名';
      }
    },

    phone(value, country = 'zh') {
      let re;
      switch (country) {
        case 'zh':
          re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
          break;
      }

      if (!re.test(value)) {
        throw '不合法的手机号';
      }
    },
  };

  // 暴露接口
  window.valee = {
    validate,
    is,
    applyRules,
    boot,
  }

  /**
   * @param {String} selector 选择想要验证的form或input
   */
  function boot(selector) {
    let el = document.querySelector(selector);
    if (el.nodeName == 'FORM') {
      bindSubmit(el);
      bindFormKeyup(el);
    } else {
      bindInputKeyup(el)
    }
  }

  /**
   * 通过字符串验证规则
   * @param {*} value value of input: 'whh'
   * @param {string} strRule data-rule: username|min:3
   * @return {Array} 错误信息 ['用户名格式有误','长度不可超过12为']
   */
  function validate(value, strRule) {
    return applyRules(value, parseRules(strRule));
  };

  /**
   * 为input绑定键盘事件
   * @param {HTMLElement} input 
   */
  function bindInputKeyup(input) {
    input.addEventListener('keyup', e => {
      let errors = validateInput(input);

      showInputError(input, errors);
    })
  }

  /**
   * 验证单个input
   * @param {HTMLElement} input 
   * @returns {Array} 返回错误
   */
  function validateInput(input) {
    let rule = input.dataset.rule;
    let value = input.value;
    let errors = validate(value, rule);
    return errors;
  }

  /**
   * 验证表单
   * @param {HTMLFormElement} form 选择的表单
   */
  function validateForm(form) {
    let submit = form.querySelector('[type=submit]');
    let inputs = form.querySelectorAll('[data-rule]');
    inputs.forEach(input => {
      let errors = validateInput(input)

      if (!errors.length) {
        submit.disable = false;

      } else {
        submit.disable = true;
      }

      showInputError(input, errors);

    });
  }

  /**
   * 绑定表单中的键盘事件
   * @param {HTMLFormElement} form 
   */
  function bindFormKeyup(form) {
    form.addEventListener('keyup', e => {
      validateForm(form);
    })
  }

  /**
   * 绑定表单提交事件
   * @param {HTMLElement} form 
   */
  function bindSubmit(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
    })
  }

  /**
   * 显示单个input的错误信息
   * @param {HTMLElement} input 输入组件
   * @param {Array} errors 错误信息
   */
  function showInputError(input, errors) {
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

    errors.forEach(err => {
      html += `<div>${err}</div>`;
    });

    input.$errorContainer.innerHTML = html;
    input.$errorContainer.hidden = false;

  }

  /**
   * 验证input里的value，一个value对应多条验证规则
   * @param {*} value 验证的值，input.value
   * @param {Array} rules 解析好的对象：{numeric:true, min:3, max:12}
   * @returns {Array} 返回保存了错误的数组['不是合法的数字', '最小不能小于3', '最大不能大于12']
   */
  function applyRules(value, rules) {
    let errors = [];

    for (let key in rules) {
      let ru = rules[key];
      try {
        is[key](value, ru);
      } catch (e) {
        errors.push(e);
      }
    }

    return errors;
  };

  /**
   * 解析data-rule里的规则
   * @param {String} str 原始规则字符串 data-rule: 'numeric|min:3|max:12'
   * @returns {Array} 解析好的规则对象: {numeric: trur, min: 3, max: 12}
   */
  function parseRules(str) {
    let rule = {};
    let ruleArr = str.split('|');

    ruleArr.forEach(it => {
      let itArr = it.split(':');
      let key = itArr[0];
      let guide = itArr[1];
      let numRules = ['numeric', 'min', 'max', 'between', 'minLength', 'maxLength']

      if (!guide) {
        guide = true;
      } else {
        if (numRules.indexOf(key) != -1)
          guide = parseFloat(guide);
        if (key == 'in') {
          guide = guide.split(',');
        }
      }
      rule[key] = guide;
    });

    return rule;
  };

})();