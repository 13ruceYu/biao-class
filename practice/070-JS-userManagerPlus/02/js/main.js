;
(function () {

  'use strict';

  let struct = {
    username: '用户名',
    email: '邮箱',
    balance: '余额',
  };

  let users = [{
      username: 'whh',
      email: 'whh@yo.com',
      balance: 12,
    },
    {
      username: 'zdd',
      email: 'zdd@yo.com',
      balance: 12,
    },
  ];

  let bt, bf;

  boot();

  let form = document.querySelector('form');
  valee.boot('form');

  function boot() {
    prepareForm();
    prepareTable();
  }

  function prepareForm() {
    bf = biaoForm('form', onSubmit);
  }

  function prepareTable() {
    let options = {
      Delete(tr, i) {
        tr.remove();
        users[i] = null;
      },
      Update(tr, i) {
        bf.setData(users[i]);
        form.querySelector('[name=index]').value = i;
      }
    };
    bt = biaoTable('table', struct, users, options);
  }

  function onSubmit(data) {
    console.log(data.index);
    if (!data.index && data.index !== 0)
      users.push(data);
    users[data.index] = data;
    bt.render();
  }

})();