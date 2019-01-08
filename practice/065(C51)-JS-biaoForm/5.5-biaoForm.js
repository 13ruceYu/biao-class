// 将biaoForm暴露出去
window.biaoForm = {
  getData,
  setData,
}

/**
 * @description: 取值，解析表单数据
 * @param {HTMLElementForm} form 选择要解析的表单 
 * @return {Object} 解析完成的数据
 */
function getData(form) {
  let data = {};
  let inputs = document.querySelectorAll('[name]');

  inputs.forEach(input => {
    switch (input.type) {
      case 'number':
        data[input.name] = +input.value;
        break;
      case 'radio':
        if (!input.checked)
          return;
        data[input.name] = input.value;
        break;
      case 'checkbox':
        if (!Array.isArray(data[input.name]))
          data[input.name] = [];
        if (!input.checked)
          return;
        data[input.name].push(input.value);
        break;
      case 'date':
      case 'time':
      case 'week':
      case 'month':
      case 'datetime':
      case 'datetime-local':
        data[input.name] = input.valueAsDate;
        break;
      default:
        data[input.name] = input.value;
    }
  });

  return data;
}

/**
 * @description: 存值，填充表单
 * @param {HTMLElementForm} form 选择要填充的表单
 * @param {Object} data 填充表单的数据
 */
function setData(form, data) {
  for (let key in data) {
    let input = document.querySelector(`[name=${key}]`);

    switch (input.type) {
      case 'radio':
        let radio = document.querySelector(`[type=radio][name=${key}][value=${data[key]}]`);
        radio && (radio.checked = true);
        break;
      case 'checkbox':
        data[key].forEach(val => {
          let checkbox = document.querySelector(`[type=checkbox][name=${key}][value=${val}]`);
          checkbox && (checkbox.checked = true);
        });
        break;
      default:
        input.value = data[key];
    }
  }
}