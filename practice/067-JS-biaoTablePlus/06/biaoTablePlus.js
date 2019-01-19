;
(function () {

  'use strict';

  let table, tHead, tBody, struct, data, ops;

  window.biaoTable = {
    boot,
    render,
  }


  function boot(tableSelector, tableStruct, tableData, operations) {
    table = document.querySelector(tableSelector);
    tHead = table.tHead;
    tBody = table.tBodies[0];
    struct = tableStruct;
    data = tableData;
    ops = operations;
    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  function renderHead() {
    tHead.innerHTML = '';
    let html = '';
    for (let key in struct) {
      html += `<th>${struct[key]}</th>`;
    }
    if (ops)
      html += `<th>操作</th>`;
    tHead.innerHTML = html;
  }

  function renderBody() {
    tBody.innerHTML = '';
    data.forEach((row, index) => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `<td>${row[key]}</td>`;
      };
      if (ops) {
        let btnHtml = '';
        ops.forEach(op => {
          btnHtml += `<button class="${op.class}">${op.name}</button>`;
        });
        html += `<td>${btnHtml}</td>`;
      }
      tr.innerHTML = html;
      tBody.appendChild(tr);
      if (ops) {
        ops.forEach(op => {
          tr.querySelector('.' + `${op.class}`).addEventListener('click', e => {
            // console.log(op.class);
            (op.function)(tr, index);
          })
        });
      }
    });
  }
})();