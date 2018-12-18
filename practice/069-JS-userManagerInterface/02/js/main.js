;
(function () {

  'use strict';

  // 用户列表，核心数据；与data配合，整个程序都围绕着它转
  let users = [{
      username: 'yjj',
      email: 'yjj@yomail.com',
      balance: '2',
    },
    {
      username: 'xhh',
      email: 'xhh@yomail.com',
      balance: '3',
    },
  ];

  let elForm = document.querySelector('#user-form');
  let elTable = document.querySelector('#user-table');
  let elTbody = elTable.tBodies[0];

  let inputs = {
    index: elForm.querySelector('[name=index]'),
    username: elForm.querySelector('[name=username]'),
    email: elForm.querySelector('[name=email]'),
    balance: elForm.querySelector('[name=balance]'),
  }

  boot();

  function boot() {
    bindSubmit();
    render();
  }

  /**
   * @msg: 监听提交事件，拿到data，并判断此data是新增的还是被修改的，
   *       如果是新增的则推入users内，如果是修改，则替换users里被修改的那一项
   */
  function bindSubmit() {
    elForm.addEventListener('submit', e => {
      e.preventDefault();

      let data = {};

      let index = inputs.index.value;

      data.username = inputs.username.value;
      data.email = inputs.email.value;
      data.balance = inputs.balance.value;

      if (index) {
        users[index] = data;
      } else
        users.push(data);
      elForm.reset();
      render();
    })
  }

  /**
   * 将form里的数据渲染到table中，添加operation
   */
  function render() {
    elTbody.innerHTML = '';

    users.forEach((user, index) => {
      if (!user)
        return;

      let tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.balance}</td>
      <td class="text-right operation">
        <button class="fill">更新</button>
        <button class="delete">删除</button>
      </td>
      `;

      let q = tr.querySelector.bind(tr);

      q('.operation').addEventListener('click', e => {
        let klass = e.target.classList;
        if (klass.contains('delete')) {
          users[index] = null;
          tr.remove();
        }

        if (klass.contains('fill')) {
          inputs.index.value = index;
          inputs.username.value = user.username;
          inputs.email.value = user.email;
          inputs.balance.value = user.balance;
        }
      })

      elTbody.appendChild(tr);
    });
  }
})();