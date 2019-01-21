;
(function () {
  "use strict";

  window.$is = {
    min(value, comparison) {
      if (value < comparison)
        throw '不可小于' + comparison;
    },
    max(value, comparison) {
      if (value > comparison)
        throw '不可大于' + comparison;
    },
    numeric(value) {
      if (!/^\d+$/.test(value.toString())) {
        throw '不是合法的数字';
      }
    },
    minLength(value, comparison) {
      if (value.length < comparison) {
        throw '长度不可小于' + comparison;
      }
    },
    maxLength(value, comparison) {
      if (value.length > comparison) {
        throw '长度不可大于' + comparison;
      }
    },

    in(value, comparison) {
      if (comparison.indexOf(value) === -1)
      throw '必须在' + comparison + '之中';
    },

    username(value) {
      let re = /^\w{3,12}/;
      if (!re.test(value))
        throw '不合法的用户名';
    },
    email(value) {
      let re = /^\w+@\w+\.\w+$/;
      if (!re.test(value)) {
        throw '不合法的邮箱';
      }
    },
    phone(value) {
      let re = /^(?:\+?(?:86))?(\s|-)?1\d{10}$/;
      if (!re.test(value))
        throw '不合法的手机号码';
    },
  }

})();

//