;(function () {
  window.biaoTable = {
    boot,
  }

  let form, thead, tbody, struct, data;

  function boot(table, structure, data) {
    table = document.querySelector('table');
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
      html += `<th>${struct[key]}</th>`;
    }
    thead.innerHTML = html;
  }

  function renderBody() {
    list.forEach(obj => {
      let tr = document.createElement('tr');
      let html = '';
      for (let key in struct) {
        html += `<td>${obj[key]}</td>`;
      }
      tr.innerHTML = html;
      tbody.appendChild(tr);
    });
  }
})();