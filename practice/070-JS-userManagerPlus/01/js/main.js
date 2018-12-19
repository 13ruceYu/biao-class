;
(function () {
  'use strict';

  let struct = {
    username: '用户名',
    email: '邮箱',
    balance: '余额',
  }

  let users = [{
      username: 'whh',
      email: 'whh@gmail.com',
      balance: 12,
    },
    {
      username: 'yjj',
      email: 'yjj@gmail.com',
      balance: 12,
    },
  ];



  let bf, bt;
  let form = document.querySelector('form');

  boot();

  function boot() {
    prepareForm();
    prepareTable();
  }

  function prepareForm() {
    bf = biaoForm('#user-form', onSubmit);
  }

  function prepareTable() {
    let ops = {
      delete(tr, i) {
        tr.remove();
        users[i] = null;
      },
      update(tr, i) {
        form.querySelector('[name=index]').value = i;
        bf.setData(users[i]);
      },
    };
    bt = biaoTable('table', struct, users, ops);
  }

  function onSubmit(data) {
    if (!data.index && data.index != 0)
      users.push(data);
    else
      users[data.index] = data;
    bt.render();
  }

})();