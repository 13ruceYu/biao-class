;
(function () {
  'use strict';

  // 全文视图
  let todoForm = document.getElementById('todo-form');
  let todoInput = todoForm.querySelector('[name=title]');
  let todoList = document.getElementById('todo-list');

  let catForm = document.getElementById('cat-form');
  let catInput = catForm.querySelector('[name=name]');
  let catList = document.getElementById('cat-list');
  let addCat = document.getElementById('add-cat');

  // 全文数据
  let $updatingTodoId = null;
  let $updatingCatId = null;
  let $currentCatId = null;
  let $todoList;
  let $catList;

  boot();

  /**
   * 启动
   */
  function boot() {
    readTodo();
    readCat();
    bindEvents();
  }

  /**
   * 绑定必要事件
   */
  function bindEvents() {
    bindTodoSubmit();
    bindToggleCatForm();
    bindClickCatForm();
    bindCatSubmit();
  }

  /**
   * 监听打开或关闭分类表单
   */
  function bindToggleCatForm() {
    // 添加分类按钮被点击时
    addCat.addEventListener('click', e => {
      // 显示分类表单
      setCatFormVisible(true);
    });
  }

  /**
   * 分类表单作为整体被点击时...
   */
  function bindClickCatForm() {
    catForm.addEventListener('click', e => {
      let target = e.target;

      // 如果点击的是取消，就隐藏表单
      if (target.classList.contains('cancel'))
        setCatFormVisible(false);

    });
  }

  /**
   * 当分类表单提交时...
   */
  function bindCatSubmit() {
    catForm.addEventListener('submit', e => {
      e.preventDefault();
      // 取到分类名
      let name = catInput.value;

      // 如果记录了当前更新分类id
      if ($updatingCatId)
        updateCat($updatingCatId, {
          name
        }); // 就更新分类
      else
        createCat({
          name
        }); // 否则就是新增分类
    });
  }

  /**
   * 设置分类表单是否可见
   *
   * 其中还包含一系列连锁反应
   * @param visible
   */
  function setCatFormVisible(visible = true) {
    catForm.hidden = !visible;
    addCat.hidden = !catForm.hidden;

    // 如果隐藏了
    if (catForm.hidden) {
      // 就清掉当前更新分类的id
      $updatingCatId = null;
      // 重置表单
      catForm.reset();
    } else
      catInput.focus(); // 否则就聚焦input，省的再点一次
  }

  /**
   * 创建分类
   * @param row
   */
  function createCat(row) {
    api('cat/create', row, r => {
      if (r.success) {
        readCat();
        setCatFormVisible(false);
      }
    });
  }

  /**
   * 更新分类
   * @param id
   * @param row
   */
  function updateCat(id, row) {
    api('cat/update', {
      id,
      ...row
    }, r => {
      if (r.success) {
        readCat();
        setCatFormVisible(false);
      }
    });
  }

  /**
   * 读取分类
   */
  function readCat() {
    api('cat/read', null, r => {
      $catList = r.data || [];
      renderCat();
    });
  }

  /**
   * 删除分类
   * @param id
   */
  function removeCat(id) {
    api('cat/delete', {
      id
    }, r => {
      readCat();
    });
  }

  /**
   * 高亮选中分类
   */
  function highlightCurrentCat() {
    let items = catList.children;
    for (let i = 0; i < items.length; i++) {
      let it = items[i];

      if (it.$id == $currentCatId)
        it.classList.add('active');
      else
        it.classList.remove('active');
    }
  }

  /**
   * 渲染分类
   */
  function renderCat() {
    catList.innerHTML = '';

    $catList.forEach(it => {
      let item = document.createElement('div');
      item.$id = it.id;
      item.classList.add('item');
      // item.innerText = it.name;
      item.innerHTML = `
      <span class="name">${it.name}</span>
      <span class="operations">
      <button class="fill">更新</button>
      <button class="delete">删除</button>
      </span>
      `;
      catList.appendChild(item);

      // 当前分类作为整体被点击时
      item.addEventListener('click', e => {
        let klass = e.target.classList;
        // 是否是删除按钮
        if (klass.contains('delete'))
          return removeCat(it.id);

        // 是否是更新按钮
        if (klass.contains('fill')) {
          // 设置当前更新分类id为it.id
          $updatingCatId = it.id;
          // 显示表单
          setCatFormVisible(true);
          catInput.value = it.name;
          return;
        }

        // 如果是其他位置
        $currentCatId = it.id;
        highlightCurrentCat();
        readTodo();
      });
    });
  }

  /**
   * 设置完成与否
   * @param id
   * @param completed
   */
  function setCompleted(id, completed) {
    api('todo/update', {
      id,
      completed
    }, r => {
      readTodo();
    });
  }

  /**
   * 渲染清单列表
   */
  function renderTodo() {
    todoList.innerHTML = '';

    // 循环事项列表
    $todoList.forEach(it => {
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
      let checkbox = item.querySelector('.completed');
      // 选中每一项的操作容器，后面删除或更新填充要用到
      let operations = item.querySelector('.operations');

      // 当复选框被点击时，打开或关闭完成状态
      checkbox.addEventListener('change', e => {
        setCompleted(it.id, checkbox.checked);
      });

      // 当操作容器被点击时
      operations.addEventListener('click', e => {
        let target = e.target;

        // 如果事件源是.delete按钮，就执行删除操作
        if (target.classList.contains('delete'))
          removeTodo(it.id);

        // 如果事件源是.fill按钮，就填充表单
        if (target.classList.contains('fill')) {
          $updatingTodoId = it.id;
          todoInput.value = it.title;
        }
      });

      // 将渲染好的事项追加至列表中
      todoList.appendChild(item);
    });
  }

  function bindTodoSubmit() {
    // 当表单提交时
    todoForm.addEventListener('submit', e => {
      e.preventDefault();
      let title = todoInput.value;

      // 如果有记录当前id就说明是更新
      if ($updatingTodoId)
        updateTodo($updatingTodoId, {
          title
        });
      else // 否则就是新增
        createTodo({
          title
        });
    });
  }

  /**
   * 创建一条代办事项
   * @param row
   */
  function createTodo(row) {
    row.cat_id = $currentCatId;

    api('todo/create', row, r => {
      if (r.success) {
        readTodo();
        todoForm.reset();
      }
    });
  }

  /**
   * 更新
   * @param {number} id 更新哪一条事项
   * @param {Object} row 更新的数据
   */
  function updateTodo(id, row) {
    api('todo/update', {
      id,
      ...row
    }, r => {
      if (r.success) {
        $updatingTodoId = null;
        readTodo();
        todoForm.reset();
      }
    });
  }

  /**
   * 获取事项列表
   */
  function readTodo(params) {
    params = params || {};

    // params.where = {
    //   and : {
    //     cat_id : $currentCatId,
    //   },
    // };

    params.query = `where("cat_id" = "${$currentCatId}")`;

    api('todo/read', params, r => {
      $todoList = r.data || [];
      renderTodo();
    });
  }

  /**
   * 删除一条事项
   * @param {number} id 删除哪一条
   */
  function removeTodo(id) {
    api('todo/delete', {
      id
    }, r => {
      readTodo();
    });
  }
})();