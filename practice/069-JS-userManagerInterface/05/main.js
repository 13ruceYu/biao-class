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

  let form = document.querySelector('form');
  let table = document.querySelector('table');
  let tBody = table.tBodies[0];

  boot();

  function boot() {
    getFormData();
    renderTable();
  }

  function getFormData() {
    bindSubmit();
  }

  function bindSubmit() {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let userInfo = {};
      userInfo.username = form.querySelector('[name=username]').value;
      userInfo.email = form.querySelector('[name=email]').value;
      userInfo.balance = +form.querySelector('[name=balance]').value;
      data.push(userInfo);
      renderTable();
    })
  }


  function renderTable() {
    tBody.innerHTML = '';
    data.forEach((user, index) => {
      let tr = document.createElement('tr');
      if (!user)
        return;
      let html = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.balance}</td>
      <td class="operations text-right">
        <button class="delete">删除</button>
        <button class="update">更新</button>
      </td>
      `;
      tr.innerHTML = html;
      tBody.appendChild(tr);

      let operations = tr.querySelector('.operations');
      operations.addEventListener('click', e => {
        let klass = e.target.classList;
        if (klass.contains('delete')) {
          tr.remove();
          data[index] = null;
          console.log(data);
        }
        if (klass.contains('update')) {
          let tds = tr.children;
          let i = 0;
          for (let key in user) {
            let td = tds[i];
            let val = user[key];
            td.innerHTML = `<input value="${user[key]}">`;
            let input = td.querySelector('input');
            input.addEventListener('keyup', e => {
              if (e.key != 'Enter')
                return;

              let newVal = input.value;
              user[key] = newVal;
              td.innerHTML = `${user[key]}`;
            })
            i++;
          }
        }
      })
    });
  }
})();