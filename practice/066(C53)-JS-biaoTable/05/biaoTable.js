;
(function () {

  'use strict';

  window.biaoTable = {
    boot
  };

  let thead, tbody, struct, data;

  function boot(tabel, userStruct, userData) {
    thead = table.tHead;
    tbody = tabel.tBodies[0];
    struct = userStruct;
    data = userData;
    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  function renderHead() {
    for (let key in struct) {
      let th = document.createElement('th');
      th.innerHTML = `
    ${struct[key]}
    `;
      thead.appendChild(th);
    }
  }

  function renderBody() {
    data.forEach(item => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `
        <td>${item[key] || '-'}</td>
        `;
      }
      tr.innerHTML = html;
      tbody.appendChild(tr);
    });
  }
})();