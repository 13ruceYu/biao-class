;
(function () {
  'use strict';

  window.biaoTable = {
    boot
  };

  let table, thead, tbody, structrue, list, operations;

  /**
   * 
   * @param {string} tableSelector 选择需要操作的表单
   * @param {Object} struct 根据传入的Object确定表单结构
   * @param {Array} data 使用已有的数据根据表单结构填入
   * @param {Object} ops 为自定义操作拿到必要的数据
   */
  function boot(tableSelector, struct, data, ops) {
    table = document.querySelector(tableSelector);
    thead = table.tHead;
    tbody = table.tBodies[0];
    structrue = struct;
    list = data;
    operations = ops;
    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  function renderHead() {
    thead.innerHTML = '';
    let html = '';
    for (let key in structrue) {
      html += `<th>${structrue[key]}</th>`;
    }

    if (operations) {
      html += '<th>操作</th>';
    }

    thead.innerHTML = html;
  }

  function renderBody() {
    tbody.innerHTML = '';

    list.forEach((it, index) => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in structrue) {
        html += `<td>${it[key] || '-'}</td>`;
      }

      if (operations) {
        let btnHtml = '';

        for (let action in operations) {
          btnHtml += `<button class="${action}">${action}</button>`;
        }

        html += `<td>${btnHtml}</td>`;
      }
      tr.innerHTML = html;

      if (operations) {
        for (let key in operations) {
          tr.querySelector('.' + key).addEventListener('click', () => {
            operations[key](tr, index);
          })
        }
      }

      tbody.appendChild(tr);
    });
  }
})()