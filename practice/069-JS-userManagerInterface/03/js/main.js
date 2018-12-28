;
(function () {
  // 拿到公用DOM
  let form = document.querySelector('#user-form');
  let table = document.querySelector('#user-table');
  let tbody = table.tBodies[0];

  // 核心数据，由用户data转变而来
  let users = [{
      username: 'whh',
      email: 'whh@yo.com',
      balance: 12,
    },
    {
      username: 'zks',
      email: 'zks@yo.com',
      balance: 14,
    },
    {
      username: 'lsd',
      email: 'lsd@yo.com',
      balance: 16,
    },
  ];

  boot();

  function boot() {
    bindSubmit();
    render();
  }

  let inputs = {
    index: document.querySelector('[name=index]'),
    username: document.querySelector('[name=username]'),
    email: document.querySelector('[name=email]'),
    balance: document.querySelector('[name=balance]'),
  }

  /**
   * @description: 绑定提交事件，拿到用户data，推入核心数据
   */
  function bindSubmit() {
    form.addEventListener('submit', e => {
      e.preventDefault();

      let data = {};
      data.username = inputs.username.value;
      data.email = inputs.email.value;
      data.balance = inputs.balance.value;
      
      // 以index为是否是更新 or 新添加数据的依据来进行不同的操作
      let index = inputs.index.value;
      if (index) {
        users[index] = data;
      } else {
        users.push(data);
      }
      form.reset();
      render();
    })
  }

  function render() {
    tbody.innerHTML = '';
    users.forEach((user, index) => {
      let tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.balance}</td>
        <td class="text-right operation">
          <button class="delete">删除</button>
          <button class="update">更新</button>
        </td>
      `;

      let operation = tr.querySelector('.operation');
      operation.addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
          tr.remove();
          users[index] = null;
        }
        
        // 将数据重新填入表单供修改
        if (e.target.classList.contains('update')) {
          // index为判断修改 or 新添加提供依据
          inputs.index.value = index;
          inputs.username.value = user.username;
          inputs.email.value = user.email;
          inputs.balance.value = user.balance;
        }
      })

      tbody.appendChild(tr);
    });
  }
})();