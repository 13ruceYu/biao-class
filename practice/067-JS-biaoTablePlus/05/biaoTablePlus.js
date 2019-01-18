;
(function () {

  'use strict';

  window.biaoTable = {
    boot,
    render,
  }

  let table, thead, tbody, struct, data, operations;

  function boot(tableSelector, tableStruct, tableData, tableOperations) {
    table = document.querySelector(tableSelector);
    thead = table.tHead;
    tbody = table.tBodies[0];
    struct = tableStruct;
    data = tableData;
    operations = tableOperations;

    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  function renderHead() {
    thead.innerHTML = '';
    let html = '';
    for (let key in struct) {
      html += `<th>${struct[key]}</th>`;
    }
    if (operations) {
      html += `<th>操作</th>`;
    }
    thead.innerHTML = html;
  }

  function renderBody() {
    tbody.innerHTML = '';
    let innerHTML = '';
    data.forEach((row, index) => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `<td>${row[key]}</td>`;
      }
      if (operations) {
        let htmlBtn = '';
        for (let key in operations) {
          htmlBtn += `<button class="${key}">${key}</button>`;
        }
        html += `<td>${htmlBtn}</td>`;
      }
      tr.innerHTML = html;
      tbody.appendChild(tr);

      if (operations) {
        for (let key in operations) {
          tr.querySelector('.' + key).addEventListener('click', e => {
            operations[key](tr, index);
          });
        }
      }
    });
  }

})();