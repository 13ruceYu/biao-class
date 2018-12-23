;(function () {
  'use strict';
  
  window.biaoTable = {
    boot,
  }

  let table, thead, tbody, struct, list, opt;

  function boot(tableSelector, structure, data, options) {
    table = document.querySelector(tableSelector);
    thead = table.tHead;
    tbody = table.tBodies[0];
    struct = structure;
    list = data;
    opt = options;

    render();
  }

  function render() {
    renderHead();
    renderBody();
  }

  function renderHead() {
    let html = '';
    for (let key in struct) {
      html += `<th>${struct[key]}</th>`;
    }
    if (opt) {
      html += `<th>操作</th>`
    }
    thead.innerHTML = html;
  }

  function renderBody() {
    list.forEach((item, index) => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `<td>${item[key]}</td>`;
      }
      // console.log(html);
      if (opt) {
        let btnhtml = '';
        for (let key in opt) {
          btnhtml += `<button class="${key}">${key}</button>`;
        }
        html += `<td>${btnhtml}</td>`;
      }
      tr.innerHTML = html;
      if (opt) {
        for (let key in opt) {
          tr.querySelector('.' + key).addEventListener('click', () => {
            opt[key](tr, index);
          })
        }
      }
      tbody.appendChild(tr);
    });
  }
})();