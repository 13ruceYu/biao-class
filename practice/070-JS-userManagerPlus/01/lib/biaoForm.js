;
(function () {
  'use strict';

  let form;

  window.biaoForm = function (selector, onSubmit) {
    form = document.querySelector(selector);
    form.addEventListener('submit', e => {
      e.preventDefault();
      onSubmit(getData());
      form.reset();
    })
    return {
      getData, // getData: getData
      setData, // setData: setData
    };
  }

  /**
   * @msg: 拿到指定表单的数据
   * @param {HTMLFormElement} formSelector 想要提取数据的表单 
   * @return: {Object}
   */
  function getData() {
    let data = {};
    let inputs = form.querySelectorAll('[name]');
    inputs.forEach(input => {
      // 判断input的类型，根据不同的类型将存值
      switch (input.type) {
        case 'number':
          data[input.name] = parseFloat(input.value);
          break;
        case 'radio':
          if (!input.checked)
            return;
          data[input.name] = input.value;
          break;
        case 'checkbox':
          // 如果是checkbox，则将数据存为数组
          if (!Array.isArray(data[input.name]))
            data[input.name] = [];
          if (input.checked)
            data[input.name].push(input.value);
          break;
        default:
          data[input.name] = input.value;
      }
    });
    return data;
  }
  // console.log(getData(document.querySelector('#a')));

  /**
   * @msg: 给指定的表单填充指定的数据
   * @param {object} data 想要往表单里填充的数据 
   * @param {HTMLFormElement} form 指定的表单 
   */
  function setData(data) {
    for (let key in data) {
      let input = form.querySelector(`[name = ${key}]`);
      switch (input.type) {
        case 'radio':
          let radio = form.querySelector(`[type=radio][name=${key}][value=${data[key]}]`);
          radio.checked = true;
          break;
        case 'checkbox':
          (data[key]).forEach(opt => {
            let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${opt}]`);
            checkbox.checked = true;
          });
        default:
          input.value = data[key];
      }
    }
  }
})();