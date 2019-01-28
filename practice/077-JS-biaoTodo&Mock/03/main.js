;
(function () {

  'use strict';

  let form = document.querySelector('#todo-form');
  let input = form.querySelector('[name=title]');
  let list = document.querySelector('.todo-list');
  let currentId = null;
  let $list;

  boot();

  function boot() {
    read();
    bindEvents();
  };

  function bindEvents() {
    form.addEventListener('submit', e => {
      e.preventDefault();

      let title = input.value;
      if (currentId)
        update({
          id: currentId,
          title
        });
      else
        create({
          title
        });
    })
  };

  function update(row) {
    api('todo/update', row, r => {
      if (r.success) {
        currentId = null;
        read();
        form.reset();
      }
    })
  }

  function create(row) {
    api('todo/create', row, r => {
      if (r.success) {
        read();
        form.reset();
      }
    })
  };

  function read() {
    api('todo/read', null, r => {
      $list = r.data;
      render();
    })
  };

  function remove(id) {
    api('todo/delete', {
      id
    }, r => {
      read();
    })
  }

  function setCompleted(id, completed) {
    api('todo/update', {
      id,
      completed
    }, r => {
      read();
    });
  }

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
        let klass = target.classList;
        if (klass.contains('delete'))
          remove(it.id);

        if (klass.contains('fill')) {
          currentId = it.id;
          input.value = it.title;
        }
      })


      list.appendChild(item);
    });
  };

})();