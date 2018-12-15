;
(function () {
  'use strict';

  // 用户列表，核心数据；整个程序都围绕它转
  let users = [{
      username: 'whh',
      email: 'whh@gmail.com',
      balance: 188,
    },
    {
      username: 'lsd',
      email: 'lsd@gmail.com',
      balance: 188,
    },
    {
      username: 'zks',
      email: 'zks@gmail.com',
      balance: 188,
    }
  ];

  // 公用元素对象
  let elForm = document.getElementById('user-form');
  let elTable = document.getElementById('user-table');
  let elTbody = elTable.tBodies[0];

  //为了便于管理，将四个input放到一个对象里
  let inputs = {
    index: elForm.querySelector('[name=index]'),
    username: elForm.querySelector('[name=username]'),
    email: elForm.querySelector('[name=email]'),
    balance: elForm.querySelector('[name=balance]'),
  }

  boot();

  function boot() {
    render();
    bindSubmit();
  }

  /**
   * 监听提交事件
   */
  function bindSubmit() {
    elForm.addEventListener('submit', e => {
      e.preventDefault();

      // 初始化数据；最后从表单中取到数据
      let row = {};

      // 获取<input name=index>的值
      // 这个值是判断当前提交 or 新增 or 更新的依据
      // 因为只有更新的数据有索引
      let index = inputs.index.value;

      // 取到其他<input>中的值
      row.username = inputs.username.value;
      row.email = inputs.email.value;
      row.balance = inputs.balance.value;

      // 是否是更新操作
      if (index) {
        users[index] = row;
      } else
        users.push(row);
      
      // 重置表单
      elForm.reset();
      //数据发生改变（无论是更新还是新增）
      // 都重新渲染表格
      render();
    })
  }

  /**
   * 渲染表格
   */
  function render() {
    // 清空前一次数据
    elTbody.innerHTML = '';

    //循环所有用户
    users.forEach((user, index) => {
      // 如果不存在则跳过
      // 如果删除用户数据会将数据设为null
      if (!user)
        return;

      // 获取tr元素
      let tr = document.createElement('tr');

      // 为当前行填充单元格
      tr.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.balance}</td>
      <td class="text-right operation">
        <button class="fill">更新</button>
        <button class="delete">删除</button>
      </td>
      `;

      // 选中最后的单元格
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