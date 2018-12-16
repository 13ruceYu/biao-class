;(function () {
  'use strict';
  
  window.biaoTable = {boot};
  
  let table, thead, tbody, structure, list;

  /**
   * 
   * @param {string} tableSelector 
   * @param {Object} struct 
   * @param {Array} list 
   */
  function boot(tableSelector, struct, arr) {
    table = document.querySelector(tableSelector);
    thead = table.tHead;
    tbody = table.tBodies[0];
    structure = struct;
    list = arr;
    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  function renderHead() {
    let html = '';
    for (let key in structure) {
      html += `<th>${structure[key]}</th>`;
      thead.innerHTML = html;
    }
  }

  function renderBody() {
    list.forEach(it => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in structure) {
        html += `<td>${it[key] || '-'}</td>`;
      };
      tr.innerHTML = html;
      tbody.appendChild(tr);
    });
  }
  
  
})();