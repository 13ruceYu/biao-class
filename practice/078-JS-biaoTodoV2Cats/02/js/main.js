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
  let $todoList;
  let $catList;
  let currentTodoId;
  let currentCatId;

  boot();

  function boot() {
    readTodo();
    bindEvents();
    readCat();
  }

  /**
   * 绑定提交事件
   */
  function bindEvents() {
    bindTodoSubmit();
    bindToggleCatForm();
    bindClickCatForm();
    bindCatSubmit();
  }

  function bindToggleCatForm() {
    addCat.addEventListener('click', e => {
      addCat.hidden = !(catForm.hidden = false);
      catInput.focus();
    })
  }

  function bindClickCatForm() {
    catForm.addEventListener('click', e => {
      let target = e.target;

      if (target.classList.contains('cancel')) {
        catForm.hidden = true;
        addCat.hidden = false;
      }
    })
  }
  // function setCatFormVisible() {}

  function bindCatSubmit() {
    catForm.addEventListener('submit', e => {
      e.preventDefault();

      let name = catInput.value;

      if (currentCatId)
        updateCat(currentCatId, {
          name
        });
      else
        createCat({
          name
        });
    })
  }

  function createCat(row) {
    api('cat/create', row, r => {
      if (r.success) {
        readCat();
        catForm.reset();
      }
    });
  }

  function readCat() {
    api('cat/read', null, r => {
      $catList = r.data;
      // console.log($list);
      renderCat();
    })
  }

  function renderCat() {
    catList.innerHTML = '';
    $catList.forEach(it => {
      let item = document.createElement('div');
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

      item.addEventListener('click', e => {
        let klass = e.target.classList;
        if (klass.contains('delete'))
          removeCat(it.id);
        if (klass.contains('fill')) {
          addCat.hidden = !(catForm.hidden = false);
          currentCatId = it.id;
          catInput.value = it.name;
        }
        if (klass.contains('name')) {
          
        }
      })
    });
  }

  function removeCat(id) {
    api('cat/delete', {
      id: id,
    }, r => {
      readCat();
    });
  }

  function updateCat(id, row) {
    api('cat/update', {
      id,
      ...row
    }, r => {
      if (r.success) {
        currentCatId = null;
        readCat();
        catForm.reset();
      }
    })
  }

  // ----------------------------------------------------------------

  /**
   * 绑定表单提交事件
   */
  function bindTodoSubmit() {
    // 当表单提交时
    todoForm.addEventListener('submit', e => {
      e.preventDefault();

      // 拿到数据
      let title = todoInput.value;

      // 通过id判断是新增 or 更新
      if (currentTodoId)
        updateTodo(currentTodoId, {
          title
        });
      else
        createTodo({
          title
        });
    })
  }

  /**
   * 新增一条待办事项
   * @param row 
   */
  function createTodo(row) {
    api('todo/create', row, r => {
      if (r.success) {
        readTodo();
        todoForm.reset();
      }
    });
  }

  /**
   * 更新一条待办事项
   * @param {number} id 
   * @param {object} row 更新的数据
   */
  function updateTodo(id, row) {
    api('todo/update', {
      id,
      ...row
    }, r => {
      if (r.success) {
        currentTodoId = null;
        readTodo();
        todoForm.reset();
      }
    })
  }

  /**
   * 从服务器读取数据
   */
  function readTodo() {
    api('todo/read', null, r => {
      $todoList = r.data;
      // console.log($list);
      renderTodo();
    })
  }

  /**
   * 设置checkbox的状态
   * @param {number} id 
   * @param {boolean} completed 
   */
  function setCompletedTodo(id, completed) {
    api('todo/update', {
      id,
      completed,
    }, r => {
      readTodo();
    })
  }

  /**
   * 删除一条数据
   * @param {number} id 
   */
  function removeTodo(id) {
    api('todo/delete', {
      id: id,
    }, r => {
      readTodo();
    });
  }

  /**
   * 渲染清单列表
   */
  function renderTodo() {
    todoList.innerHTML = '';
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
      let checkbox = item.querySelector('.completed');
      let operations = item.querySelector('.operations');

      checkbox.addEventListener('change', e => {
        setCompletedTodo(it.id, checkbox.checked);
      })

      operations.addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('delete'))
          removeTodo(it.id);

        if (target.classList.contains('fill')) {
          currentTodoId = it.id;
          todoInput.value = it.title;
          console.log(it);
          console.log(currentTodoId);
        }
      })

      todoList.appendChild(item);
    });
  }

})();