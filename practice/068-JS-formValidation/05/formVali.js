;
(function () {

  'use strict';

  window.vali = {
    between,
    lengthBetween,
    isUsername,
    isEmail,
    isPhone,
    isPassword,
  }

  function between(value, min, max) {
    return value >= min && value < max;
  }

  function lengthBetween(value, min, max) {
    return between(value.length, min, max);
  }

  function isUsername(value) {
    if (!lengthBetween(value, 4, 6) || value.includes('bitch'))
      return false;
    return true;
  }

  function isEmail(value) {
    if (!value.includes('@'))
      return false;
    return true;
  }

  function isPhone(value) {
    if ((value.length != 11 && value.length != 13 && value.length != 14) || !value.startsWith('1'))
      return false;
    return true;
  }

  function isPassword(value) {
    if (!lengthBetween(value, 6, 64))
    return false;
    return true;
  }
  
})();