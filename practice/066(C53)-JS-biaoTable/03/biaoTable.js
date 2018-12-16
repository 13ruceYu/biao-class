;
(function () {
  'use strict';

  window.biaoTable = { boot };

  let table, thead, tbody, struct, list;

  function boot(formSelector, structure, data) {
    table = document.querySelector(formSelector);
    thead = table.tHead;
    tbody = table.tBodies[0];
    struct = structure;
    list = data;

    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  function renderHead() {
    let html = '';
    for (let key in struct) {
      html += `
      <th>${struct[key]}</th>
      `;
    }
    thead.innerHTML = html;
  }

  function renderBody() {
    list.forEach(it => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `
        <td>${it[key]}</td>
        `;
      }
      tr.innerHTML = html;
      tbody.appendChild(tr);
    });
  }
})();