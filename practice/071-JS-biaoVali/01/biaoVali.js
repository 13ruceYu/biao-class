(function () {
  // 通过字符串规则快速验证，显示错误信息
  "use strict";

  // 基础验证规则
  let is = {
    numeric(value) {
      if (!/^\d+$/.test(value.toString()))
        throw '不是合法的数字';
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
        throw '必须小于' + max + '且大于' + min;
    },

    positive(value) {
      if (!this.numeric(value)) {
        return false;
      }
      if (value <= 0)
        throw '不可小于0';
    },

    negative(value) {
      if (!this.numeric(value)) {
        return false;
      }
      if (value >= 0)
        throw '不可大于0';
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
      if (!this.minLength(value, min) || !this.maxLength(value, max))
        throw '长度须介于' + min + '和' + max + '之间';
    },

    startsWith(value, guide) {
      if (!value.startsWith(guide))
        throw '必须以' + guide + '开头';
    },

    endsWith(value, guide) {
      if (!value.endsWith(guide))
        throw '必须以' + guide + '结束';
    },

    includes(value, guide) {
      if (!value.includes(guide))
        throw '必须包含:' + guide;
    },

    /**
     * 在数组中
     * @param {mix} value
     * @param {Array} guide
     */
    in (value, guide) {
      if (guide.indexOf(value) === -1)
        throw '必须在' + guide + '之中';
    },

    regex(value, reg) {
      if (typeof reg == "string") reg = new RegExp(reg);
      if (!re.test(value))
        throw '不合法的格式';
    },

    email(value) {
      let re = /^\w+@\w+\.\w+$/;
      if (!re.test(value))
        throw '不合法的邮箱';
    },

    username(value) {
      let re = /^[a-zA-Z0-9]\w+$/;
      if (!re.test(value))
        throw '不合法的用户名';
    },

    phone(value, country = "zh") {
      let re;
      switch (country) {
        case "zh":
          re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
          break;
      }
      if (!re.test(value))
        throw '不合法的手机号';
    }
  };

  // 暴露接口
  window.biaoValee = {
    validate,
    is,
    applyRules,
    boot,
  };

  /**
   * 通过字符串规则验证
   * @param {*} value 输入的值，需要验证的值
   * @param {string} strRule 输入值所在的input的验证规则
   */
  function validate(value, strRule) {
    return applyRules(value, parseRules(strRule));
  };

  /**
   * 先择要验证input还是form
   * @param {*} selector 
   */
  function boot(selector) {
    let el = document.querySelector(selector);

    if (el.nodeName == 'FORM') {
      bindSubmit(el);
      bindFormKeyup(el);
    } else {
      bindInputKeyup(el);
    }
  }

  /**
   * 绑定键盘事件，每次输入都重新验证所有input
   * @param {HTMLElement} input 
   */
  function bindInputKeyup(input) {
    input.addEventListener('keyup', e => {
      let errors = validateInput(input);
      showInputError(input, errors);
    })
  }

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
   * 验证单个input
   * @param {HTMLElement} input 
   */
  function validateInput(input) {
    let rule = input.dataset.rule;
    let value = input.value;
    let errors = validate(value, rule);

    return errors;
  }

  /**
   * 验证表单
   * @param {HTMLFormElement} form 
   */
  function validateForm(form) {
    let submit = form.querySelector('[type=submit]');
    let inputs = form.querySelectorAll('[data-rule]');
    inputs.forEach(input => {
      let errors = validateInput(input);

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
   * @param {HTMLFormElemnent} form 
   */
  function bindFormKeyup(form) {
    form.addEventListener('keyup', e => {
      validateForm(form);
    })
  }

  /**
   * 绑定提交事件
   * @param {HTMLFormElement} form 
   */
  function bindSubmit(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      validateForm(form);
    })
  }

  /**
   * 批量验证多条规则（一条数据，多种限制）
   * @param {*} value 验证的值
   * @param {Array} rules 解析好的规则对象
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
  }

  /**
   * 解析规则
   * @param {string} str 原始字符串规则
   */
  function parseRules(str) {
    let ruleArr = str.split("|");
    let rule = {};

    ruleArr.forEach(it => {
      let itArr = it.split(":");
      let key = itArr[0];
      let comparison = itArr[1];
      let numRules = [
        "numeric",
        "min",
        "max",
        "between",
        "minLength",
        "maxLength"
      ];

      if (!comparison) {
        if (key == 'phone' || 'username')
          comparison = true;
      } else {
        if (numRules.indexOf(key) != -1) {
          comparison = parseFloat(comparison);
        }
        if (key == 'in') {
          comparison = comparison.split(',');
        }
      }

      rule[key] = comparison;
    });

    return rule;
  }
})();