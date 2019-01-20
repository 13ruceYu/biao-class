;
(function () {

  'use strict';

  window.vali = {
    isUsername,
    isEmail,
    isPhone,
    isPassword,
  }

  function isUsername(value) {
    return value.length > 3 && value.length < 12;
  }

  function isEmail(value) {
    return value.includes('@');
  }

  function isPhone(value) {
    return value.startsWith('1') && value.length == 11;
  }

  function isPassword(value) {
    return value.length >= 6 && value.length <= 64;
  }

})();