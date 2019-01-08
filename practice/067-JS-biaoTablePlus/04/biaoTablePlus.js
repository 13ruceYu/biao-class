;
(function () {

  'use strict';

  window.biaoTable = {
    boot,
    render,
  };

  // 全文变量备用
  let thead, tbody, struct, data, operations;

  /**
   * @description 启动
   * @param {HTMLElementTable} table 已选择好的表格
   * @param {Object} userStruct 用户想要显示的数据的结构，有哪些项（th）
   * @param {Array} userData 现实的数据
   * @param {Object} userOperation 对数据的自定义操作
   */
  function boot(table, userStruct, userData, userOperation) {
    thead = table.tHead;
    tbody = table.tBodies[0];
    struct = userStruct;
    data = userData;
    operations = userOperation;

    // 直接渲染
    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  /**
   * @description 根据userStruct渲染table head
   */
  function renderHead() {
    let html = '';
    for (let key in struct) {
      html += `<th>${struct[key]}</th>`;
    }
    if (operations) {
      html += '<th>操作</th>'
    }
    thead.innerHTML = html;
  }

  /**
   * @description 结合userStruct和userData动态渲染table body
   */
  function renderBody() {
    tbody.innerHTML = '';
    data.forEach((item, index) => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `<td>${item[key] || '-'}</td>`;
      }
      
      // 看用户是否传入自定义操作，如果有，则渲染按钮
      if (operations) {
        let btnHtml = '';
        for (let key in operations) {
          btnHtml += `<button class="${key}">${key}</button>`
        }
        html += `<td>${btnHtml}</td>`;
      }
      tr.innerHTML = html;
      tbody.appendChild(tr);

      // 给按钮绑定事件，通过回调将必要的信息传给用户
      if (operations) {
        for (let key in operations) {
          tr.querySelector('.' + key).addEventListener('click', e => {
            operations[key](tr, index);
          })
        }
      }
    });
  }

})();