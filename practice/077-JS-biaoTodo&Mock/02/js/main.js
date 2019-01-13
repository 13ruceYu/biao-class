;
(function () {

  'use strict';

  // 全文视图
  const form = document.getElementById('todo-form');
  let input = form.querySelector('[name=title]');
  let list = document.getElementById('todo-list');

  // 全文数据
  let $list;
  let currentId;

  boot();

  function boot() {
    read();
    bindEvents();
  }

  /**
   * 绑定提交事件
   */
  function bindEvents() {
    // 当表单提交时
    form.addEventListener('submit', e => {
      e.preventDefault();

      // 拿到数据
      let title = input.value;

      // 通过id判断是新增 or 更新
      if (currentId)
        update(currentId ,{title});
      else
        create({title});
    })
  }

  /**
   * 新增一条待办事项
   * @param row 
   */
  function create(row) {
    api('todo/create', row, r => {
      if (r.success) {
        read();
        form.reset();
      }
    });
  }

  /**
   * 更新一条待办事项
   * @param {number} id 
   * @param {object} row 更新的数据
   */
  function update(id ,row) {
    api('todo/update', {id, ...row}, r => {
      if (r.success) {
        currentId = null;
        read();
        form.reset();
      }
    })
  }

  /**
   * 从服务器读取数据
   */
  function read() {
    api('todo/read', null, r => {
      $list = r.data;
      // console.log($list);
      render();
    })
  }

  /**
   * 设置checkbox的状态
   * @param {number} id 
   * @param {boolean} completed 
   */
  function setCompleted(id, completed) {
    api('todo/update', {
      id,
      completed,
    }, r => {
      read();
    })
  }

  /**
   * 删除一条数据
   * @param {number} id 
   */
  function remove(id) {
    api('todo/delete', {
      id: id,
    }, r => {
      read();
    });
  }

  /**
   * 渲染清单列表
   */
  function render() {
    list.innerHTML = '';
    $list.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('todo-item');
      item.innerHTML = `
        <div class="checkbox">
          <input class="completed" type="checkbox" ${it.completed ? 'checked' : ''}>
        </div>
        <div class="title">
          ${it.title}
        </div>
        <div class="operations">
          <button class="fill">更新</button>
          <button class="delete">删除</button>
        </div>
      `;
      let checkbox = item.querySelector('.completed');
      let operations = item.querySelector('.operations');

      checkbox.addEventListener('change', e => {
        setCompleted(it.id, checkbox.checked);
      })

      operations.addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('delete'))
          remove(it.id);

        if (target.classList.contains('fill')) {
          currentId = it.id;
          input.value = it.title;
          console.log(it);
          console.log(currentId);
        }
      })

      list.appendChild(item);
    });
  }


})();