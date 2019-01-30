;
(function () {

  'use strict';

  let todoForm = document.querySelector('.todo-form');
  let todoInput = todoForm.querySelector('input');
  let todoList = document.querySelector('.todo-list');

  let catForm = document.querySelector('.cat-form');
  let catInput = catForm.querySelector('input');
  let catList = document.querySelector('.cat-list');
  let addCat = document.getElementById('add-cat');

  let updatingTodoId = null;
  let updatingCatId = null;
  let currentCatId = null;

  boot();

  function boot() {
    readTodo();
    readCat();
    bindEvents();
  };

  function readTodo(params) {
    params = params || {};
    params.where = {
      and: {
        cat_id: currentCatId,
      }
    }
    api('todo/read', params, r => {
      let data = r.data || [];
      console.log(data);
      renderTodo(data);
    })
  }

  function readCat() {
    api('cat/read', null, r => {
      let data = r.data || [];
      renderCat(data);
    })
  }

  function renderTodo(data) {
    todoList.innerHTML = '';
    data.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('todo-item');
      item.innerHTML = `
      <div class="checkbox">
        <input type="checkbox" ${it.completed ? 'checked' : ''}>
      </div>
      <div class="todo-title">
        <span>${it.title}</span>
      </div>
      <div class="operations">
        <button class="fill">更新</button>
        <button class="delete">删除</button>
      </div>
      `;
      todoList.appendChild(item);

      let checkbox = item.querySelector('[type=checkbox]');
      checkbox.addEventListener('change', e => {
        api('todo/update', {
          id: it.id,
          completed: checkbox.checked,
        })
      })

      let deleteBtn = item.querySelector('.delete');
      deleteBtn.addEventListener('click', e => {
        api('todo/delete', {
          id: it.id
        }, r => {
          readTodo();
        })
      })

      let fillBtn = item.querySelector('.fill');
      fillBtn.addEventListener('click', e => {
        todoInput.value = it.title;
        updatingTodoId = it.id;
      })
    });
  }

  function renderCat(data) {
    catList.innerHTML = '';
    data.forEach(it => {
      let item = document.createElement('div');
      item.classList.add('cat-item');
      item.innerHTML = `
      <span class="name">${it.name}</span>
      <span class="operations">
        <button class="fill">更新</button>
        <button class="delete">删除</button>
      </span>
      `;
      catList.appendChild(item);
      item.id = it.id;

      let deleteBtn = item.querySelector('.delete');
      deleteBtn.addEventListener('click', e => {
        api('cat/delete', {
          id: it.id
        }, r => {
          readCat();
        })
      })

      let fillBtn = item.querySelector('.fill');
      fillBtn.addEventListener('click', e => {
        setCatFormVisible(true);
        catInput.value = it.name;
        updatingCatId = it.id;
      })

      let nameBtn = item.querySelector('.name');
      nameBtn.addEventListener('click', e => {
        highlightCurrentCat(item.id);
        currentCatId = it.id;
        let where = {
          and: {
            cat_id: it.id,
          }
        }
        readTodo({
          where
        });
      })
    });
  }

  function highlightCurrentCat(currentCatId) {
    let catItems = catList.querySelectorAll('.cat-item');
    catItems.forEach(it => {
      if (it.id == currentCatId)
        it.classList.add('active');
      else it.classList.remove('active');
    });
  }

  function bindEvents() {
    bindTodoSubmit();
    bindToggleCatForm();
    bindCatFormClick();
    bindCatSubmit();
  };

  function bindTodoSubmit() {
    todoForm.addEventListener('submit', e => {
      e.preventDefault();

      let title = todoInput.value;
      if (updatingTodoId) {
        updateTodo(updatingTodoId);
      } else
        createTodo({
          title
        });
    })
  }

  function bindToggleCatForm() {
    addCat.addEventListener('click', e => {
      setCatFormVisible(true);
    })
  };

  function bindCatFormClick() {
    catForm.addEventListener('click', e => {
      if (e.target.classList.contains('cancel')) {
        setCatFormVisible(false);
      }
    })
  }

  function setCatFormVisible(visible) {
    catForm.hidden = !visible;
    addCat.hidden = visible;

    if (!catForm.hidden)
      catInput.focus();
  }

  function bindCatSubmit() {
    catForm.addEventListener('submit', e => {
      e.preventDefault();

      let name = catInput.value;
      if (updatingCatId) {
        updateCat(updatingCatId);
      } else
        createCat({
          name
        });

    })
  };

  function updateTodo(id) {
    api('todo/update', {
      id,
      title: todoInput.value,
    }, r => {
      readTodo();
      updatingTodoId = null;
      todoForm.reset();
    })
  }

  function updateCat(id) {
    api('cat/update', {
      id,
      name: catInput.value,
    }, r => {
      readCat();
      updatingCatId = null;
      catForm.reset();
      setCatFormVisible(false);
    })
  }

  function createTodo(row) {
    if (currentCatId)
      row.cat_id = currentCatId;
    api('todo/create', row, r => {
      if (r.success) {
        readTodo();
        todoForm.reset();
      }
    })
  }

  function createCat(row) {
    api('cat/create', row, r => {
      if (r.success)
        readCat();
      catForm.reset();
      setCatFormVisible(false);
    })
  }

})();