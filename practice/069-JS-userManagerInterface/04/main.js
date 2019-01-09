;
(function () {

  'use strict';

  let data = [{
      username: 'whh',
      email: 'whh@yo.com',
      balance: 12,
    },
    {
      username: 'zks',
      email: 'zks@yo.com',
      balance: 16,
    },
  ];
  let form = document.getElementById('user-form');
  let table = document.getElementById('user-table');
  console.log(form, table);

  boot(form, table);

  function boot(form, table) {
    getData(form);
  }

  function getData(form) {
    let inputs = form.querySelectorAll('input');
    let submitBtn = document.querySelector('[type=submit]');
    form.addEventListener('keyup', e => {
      let result = false;
      inputs.forEach(input => {
        if (!input.value)
          result = true;
        // console.log(typeof (input.value));
      });
      submitBtn.disabled = result;
    })

    form.addEventListener('submit', e => {
      e.preventDefault();
      let user = {};
      inputs.forEach(input => {
        user[input.name] = input.value;
      });
      data.push(user);
      fillTable(table, data);
    })
  }

  function fillTable(table, data) {
    let tbody = table.tBodies[0];
    tbody.innerHTML = '';
    data.forEach((item, index) => {
      let tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${item.username}</td>
      <td>${item.email}</td>
      <td>${item.balance}</td>
      <td class="text-right operation">
      <button class="update">更新</button>
      <button class="delete">删除</button>
      </td>
      `;
      tbody.appendChild(tr);
      tr.querySelector('.operation').addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('delete')) {
          tr.remove();
          data[index] = null;
        }
        if (target.classList.contains('update')) {
          // 更新部分暂留
        }
      })
    });
  }

})();