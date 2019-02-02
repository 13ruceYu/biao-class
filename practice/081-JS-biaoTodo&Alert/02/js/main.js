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
  let $todoList;

  let catForm = document.querySelector('.cat-form');
  let catInput = catForm.querySelector('[name=name]');
  let catList = document.querySelector('.cat-list');
  let addCat = document.querySelector('.add-cat');
  let cancelCat = document.querySelector('.cancel-cat');
  let currentCatId = null;
  let updatingCatId = null;

  let sound = document.getElementById('sound');

  boot();

  function boot() {
    readTodo();
    readCat();
    bindEvents();
  }

  function readTodo(filter) {
    filter = filter || {};
    api('todo/read', filter, r => {
      $todoList = r.data || [];
      renderTodo($todoList);
      notify();
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
          if (!confirm('确认删除'))
            return;
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
        if (!confirm('确认删除'))
          return;
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
        if (it.notified_at == null)
          it.notified_at = "2019-02-02 00:30:00";
        let dateArr = it.notified_at.split(' ');
        notifyDate.value = dateArr[0];
        notifyTime.value = dateArr[1];
        todoDesc.value = it.desc;

        setMoreVisible(true);
      })
    });
  }

  function bindEvents() {
    bindTodoSubmit();
    bindCatSubmit();
    bindCatFormOpen();
    bindCatFormClose();
    bindClickTodoForm();
  }

  function prepare() {
    let d = new Date;
    let arr = toLocalIsoString(d).split('T');
    let time = arr[1].split('.')[0];
    let timeArr = time.split(':');
    notifyDate.value = arr[0];
    notifyTime.value = timeArr[0] + ':' + timeArr[1];
  }

  function toLocalIsoString(date) {
    let d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return d.toISOString();
  }

  function cancelCurrentTime() {
    notifyDate.value = '';
    notifyTime.value = '';
  }

  function bindClickTodoForm() {
    todoForm.addEventListener('click', e => {
      let target = e.target;

      if (target == moreTrigger) {
        toggleMore();
      }
    })
  }

  function toggleMore() {
    setMoreVisible(more.hidden);
  }

  function setMoreVisible(visible) {
    more.hidden = !visible;
    if (more.hidden) {
      moreTrigger.innerText = '展开';
      cancelCurrentTime();
    } else {
      moreTrigger.innerText = '收起';
      prepare();
    }
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

      let row = {
        title: todoInput.value,
        notified_at: notifyDate.value + ' ' + normalizeTime(notifyTime.value),
        desc: todoDesc.value,
      }

      if (!row.title)
        return;


      if (updatingTodoId) {
        row.id = updatingTodoId;
        api('todo/update',
          row, r => {
            readTodo();
            updatingTodoId = null;
            setCatFormVisible(false);
            setMoreVisible(false);
          })
      } else
        createTodo(row);
    })
  }

  function normalizeTime(time) {
    if (time.length <= 0)
      return time = '';
    if (time.length <= 5)
      return time += ':00';
    return time;
  }

  function createTodo(row) {
    if (currentCatId)
      row.cat_id = currentCatId;
    api('todo/create', row, r => {
      readTodo();
      setMoreVisible(false);
    })
  }

  function createCat(row) {
    api('cat/create', row, r => {
      readCat();
    })
  }

  function notify() {
    let now = Date.now();

    setInterval(() => {
      $todoList.forEach(it => {
        let d = new Date(it.notified_at);
        let then = d.getTime();
        if (!then || it.completed || it.notified)
          return;
        if (then - now >= 10 * 60 * 1000)
          return;

        new Alert(it.title);
        playSound();
        it.notified = true;
        api('todo/update', {
          id: it.id,
          notified: it.notified
        })
      });
    }, 1000);

  }

  function playSound() {
    sound.play();
  }

})();