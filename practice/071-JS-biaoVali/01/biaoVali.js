(function() {
  // 通过字符串规则快速验证，显示错误信息
  "use strict";

  // 基础验证规则
  let is = {
    numeric(value) {
      return !isNaN(parseFloat(value));
    },

    min(value, guide) {
      return value >= guide;
    },

    max(value, guide) {
      return value <= guide;
    },

    between(value, min, max) {
      return this.min(value, min) && this.max(value, max);
    },

    positive(value) {
      if (!this.numeric(value)) {
        return false;
      }
      return value > 0;
    },

    negative(value) {
      if (!this.numeric(value)) {
        return false;
      }
      return value < 0;
    },

    minLength(value, guide) {
      return value.length >= guide;
    },

    maxLength(value, guide) {
      return value.length <= guide;
    },

    lengthBetween(value, min, max) {
      return this.minLength(value, min) && this.maxLength(value, max);
    },

    startsWith(value, guide) {
      return value.startsWith(guide);
    },

    endsWith(value, guide) {
      return value.includes(guide);
    },

    /**
     * 在数组中
     * @param {mix} value
     * @param {Array} guide
     */
    in(value, guide) {
      return guide.indexOf(value) !== -1;
    },

    regex(value, reg) {
      if (typeof reg == "string") reg = new RegExp(reg);
      return reg.test(value);
    },

    email(value) {
      let re = /^\w+@\w+\.\w+$/;
      return re.test(value);
    },

    username(value) {
      let re = /^[a-zA-Z0-9]\w+$/;
      return re.test(value);
    },

    phone(value, country = "zh") {
      let re;
      switch (country) {
        case "zh":
          re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
          break;
      }
      return re.test(value);
    }
  };

  // 暴露接口
  window.biaoValee = {
    validate(value, strRule) {
      applyRules(value, parseRules(strRule));
    },
    is,
    applyRules
  };

  /**
   * 批量验证多条规则（一条数据，多种限制）
   * @param {*} value 验证的值
   * @param {Array} rules 解析好的规则对象
   */
  function applyRules(value, rules) {
    for (let key in rules) {
      let ru = rules[key];
      let a = is[key](value, ru);
      console.log(a);
    }
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
      let guide = itArr[1];
      let numRules = [
        "numeric",
        "min",
        "max",
        "between",
        "minLength",
        "maxLength"
      ];

      if (!guide) guide = true;
      else {
        if (numRules.indexOf(key)) guide = parseFloat(guide);
      }

      rule[key] = guide;
    });

    return rule;
  }
})();
