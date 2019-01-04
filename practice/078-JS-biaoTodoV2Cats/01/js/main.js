;
(function () {

  'use stric';

  // 全文视图
  let form = document.getElementById('todo-form');
  let input = form.querySelector('[name=title]');
  let list = document.getElementById('todo-list');

  // 全文数据
  let $currentId = null;
  let $list;

  boot();

  /**
   * 启动
   */
  function boot() {
    read();
    bindEvents();
  }

  /**
   * 绑定必要事件
   */
  function bindEvents() {
    // 当表单提交时
    form.addEventListener('submit', e => {
      e.preventDefault();
      let title = input.value;

      // 如果有记录当前id就说明是更新
      if ($currentId)
        update($currentId, {
          title
        });
      // 否则就是新增
      else
        create({
          title
        })
    })
  }

  /**
   * 更新
   * @param {number} id 更新哪一条事项
   * @param {Object} row 更新的数据
   */
  function update(id, row) {
    api('todo/create', row, r => {
      api('todo/update', {
        id,
        ...row,
      }, r => {
        if (r.success) {
          $currentId = null;
          read();
          form.reset();
        }
      })
    })
  }

  /**
   * 创建一条新的待办事项
   * @param row 
   */
  function create(row) {
    api('todo/creat', row, r => {
      if (r.success) {
        read();
      }
    });
  }

  /**
   * 获取事项列表
   */
  function read() {
    api('todo/read', null, r => {
      $list = r.data;
      render();
    })
  }

  /**
   * 删除一条事项
   * @param {number} id 删除哪一条
   */
  function remove(id) {
    api('todo/delete', {
      id
    }, r => {
      read();
    });
  }

  /**
   * 设置完成与否
   * @param {number} id 
   * @param {*} completed 
   */
  function setCompleted(id, completed) {
    api('todo/update', {
      id,
      completed,
    }, r => {
      read();
    })
  }

  function render() {
    list.innerHTML = '';

    // 循环事项列表
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

      // 选中每一项的复选框，后面设置完成与否要用到
      let checkbox = it.item.querySelector('.complete');
      // 选中每一项的操作容器，后面删除或更新填充用
      let operations = item.querySelector('.poerations');

      // 当复选框被点击时，打开或关闭完成状态
      checkbox.addEventListener('change', e => {
        setCompleted(it.id, checkbox.checked);
      });

      operations.addEventListener('clikc', e => {
        let target = e.target;

        // 如果事件源是 .delete按钮，就执行删除操作
        if (target.classList.contains('delete'))
        remove(it.id);

        // 如果事件源是 .fill就填充表单
        if (target.classList.contains('fill')) {
          $currentId = it.id;
          input.value = it.title;
        }
      });

      // 讲渲染好的事项追加至列表中
      list.appendChild(item);
    });
  }
  
})();