;
(function () {

  'use strict';

  let todoForm = document.querySelector('.todo-form');
  let todoInput = todoForm.querySelector('[name=title]');
  let todoList = document.querySelector('.todo-list');
  let notifyDate = todoForm.querySelector('[name=notifyDate]');
  let notifyTime = todoForm.querySelector('[name=notifyTime]');
  let todoDesc = todoForm.querySelector('[name=todoDesc]');
  let more = document.getElementById('more');
  let moreTrigger = document.getElementById('more-trigger');
  let updatingTodoId = null;

  let catForm = document.querySelector('.cat-form');
  let catInput = catForm.querySelector('[name=name]');
  let catList = document.querySelector('.cat-list');
  let addCat = document.querySelector('.add-cat');
  let cancelCat = document.querySelector('.cancel-cat');
  let currentCatId = null;
  let updatingCatId = null;

  boot();

  function boot() {
    readTodo();
    readCat();
    bindEvents();
  }

  function readTodo(filter) {
    filter = filter || {};
    api('todo/read', filter, r => {
      let data = r.data || [];
      renderTodo(data);
      todoForm.reset();
    })
  }

  function readCat() {
    api('cat/read', null, r => {
      let data = r.data || [];
      data.unshift({
        id: null,
        name: '默认',
      })
      renderCat(data);
      highlightCurrentCat(currentCatId);
      catForm.reset();
    })
  }

  function renderCat(data) {
    catList.innerHTML = '';
    data.forEach(it => {
      let catItem = document.createElement('div');
      catItem.classList.add('cat-item');
      catItem.innerHTML = `
      <span class="name">${it.name}</span>
      <div class="cat-operation">
        <button class="fill">更新</button>
        <button class="delete">删除</button>
      </div>
      `;
      catItem.$id = it.id;
      catList.appendChild(catItem);

      catItem.addEventListener('click', e => {
        let klass = e.target.classList;
        if (klass.contains('delete')) {
          api('cat/delete', {
            id: it.id
          }, r => {
            readCat();
          });
        }

        if (klass.contains('fill')) {
          setCatFormVisible(true);
          updatingCatId = it.id;
          catInput.value = it.name;
        }

        if (klass.contains('name') || klass.contains('cat-item')) {
          currentCatId = it.id;
          highlightCurrentCat(currentCatId);
          let where = {
            and: {
              cat_id: currentCatId,
            }
          }
          readTodo({
            where
          });
        }
      })
    });
  }

  function highlightCurrentCat(currentCatId) {
    let catItems = catList.children;
    for (let i = 0; i < catItems.length; i++) {
      let item = catItems[i];
      if (item.$id == currentCatId)
        item.classList.add('active');
      else
        item.classList.remove('active');
    }
  }

  function renderTodo(data) {
    todoList.innerHTML = '';
    data.forEach(it => {
      let todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `
      <input type="checkbox" ${it.completed ? "checked" : ''}>
      <div class="todo-title">
        ${it.title}
      </div>
      <div class="todo-operation">
        <button class="fill">更新</button>
        <button class="delete">删除</button>
      </div>
      `;
      todoList.appendChild(todoItem);

      let itemCheckbox = todoItem.querySelector('[type=checkbox]');
      itemCheckbox.addEventListener('change', e => {
        api('todo/update', {
          id: it.id,
          completed: itemCheckbox.checked,
        })
      })

      let deleteBtn = todoItem.querySelector('.delete');
      deleteBtn.addEventListener('click', e => {
        api('todo/delete', {
          id: it.id
        }, r => {
          readTodo();
        });
      })

      let fillBtn = todoItem.querySelector('.fill');
      fillBtn.addEventListener('click', e => {
        updatingTodoId = it.id;
        todoInput.value = it.title;
      })
    });
  }

  function bindEvents() {
    bindTodoSubmit();
    bindCatSubmit();
    bindCatFormOpen();
    bindCatFormClose();
  }

  function bindCatFormClose() {
    cancelCat.addEventListener('click', e => {
      setCatFormVisible(false);
      catForm.reset();
    })
  }

  function bindCatFormOpen() {
    addCat.addEventListener('click', e => {
      setCatFormVisible(true);
      catInput.focus();
    })
  }


  function setCatFormVisible(visible = true) {
    catForm.hidden = !visible;
    addCat.hidden = visible;
  }

  function bindCatSubmit() {
    catForm.addEventListener('submit', e => {
      e.preventDefault();

      let name = catInput.value;
      if (updatingCatId) {
        api('cat/update', {
          id: updatingCatId,
          name: catInput.value,
        }, r => {
          readCat();
          updatingCatId = null;
        })
      } else
        createCat({
          name
        });
    })
  }

  function bindTodoSubmit() {
    todoForm.addEventListener('submit', e => {
      e.preventDefault();

      let title = todoInput.value;

      if (updatingTodoId) {
        api('todo/update', {
          id: updatingTodoId,
          title: todoInput.value,
        }, r => {
          readTodo();
          updatingTodoId = null;
          setCatFormVisible(false);
        })
      } else
        createTodo({
          title
        });
    })
  }

  function createTodo(row) {
    if (currentCatId)
      row.cat_id = currentCatId;
    api('todo/create', row, r => {
      readTodo();
    })
  }

  function createCat(row) {
    api('cat/create', row, r => {
      readCat();
    })
  }

})();