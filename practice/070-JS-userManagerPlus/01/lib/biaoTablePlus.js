;
(function () {
  'use strict';

  window.biaoTable = function (...args) {
    boot(...args);
    return {render};
  };

  let table, thead, tbody, struct, list, ops;

  function boot(formSelector, structure, data, operations) {
    table = document.querySelector(formSelector);
    thead = table.tHead;
    tbody = table.tBodies[0];
    struct = structure;
    list = data;
    ops = operations;
    render();
  }

  function render() {
    renderHead();
    renderBody();
  };

  function renderHead() {
    thead.innerHTML = '';
    let html = '';
    for (let key in struct) {
      html += `
        <th>${struct[key]}</th>
      `;
    }

    if (ops) {
      html += `<th>操作</th>`;
    }
    thead.innerHTML = html;
  };

  function renderBody() {
    tbody.innerHTML = '';
    list.forEach((it, index) => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `
          <td>${it[key]}</td>
        `;
      }

      if (ops) {
        let btnHtml = '';
        for (let key in ops) {
          btnHtml += `<button class="${key}">${key}</button>`;
        }
        html += `<td>${btnHtml}</td>`;
      }
      tr.innerHTML = html;
      if (ops) {
        for (let key in ops) {
          tr.querySelector('.' + key).addEventListener('click', () => {
            ops[key](tr, index);
          })
        }
      }
      tbody.appendChild(tr);
    });
  };
})();