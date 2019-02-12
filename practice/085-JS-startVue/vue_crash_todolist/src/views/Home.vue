<template>
  <div id="app">
    <Header></Header>
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
  import Header from '../components/layout/Header';
  import Todos from '../components/Todos';
  import AddTodo from '../components/AddTodo';
  import axios from 'axios';

  export default {
    name: "Home",
    components: {
      Header,
      AddTodo,
      Todos,
    },
    data() {
      return {
        todos: []
      }
    },
    methods: {
      deleteTodo(id) {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then(res => this.todos = this.todos.filter(todo => todo.id !== id))
          .catch(err => console.log(err));
      },
      addTodo(newTodo) {
        const { title, completed} = newTodo;

        axios.post('https://jsonplaceholder.typicode.com/todos', {
          title,
          completed
        })
          .then(res =>this.todos = [...this.todos, res.data])
          .catch(err => console.log(err))
      }
    },
    created() {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(res => this.todos = res.data)
        .catch(err => console.log(err));
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif, 'Microsoft YaHei';
  }

  .btn {
    display: inline-block;
    background: #555;
    border: none;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }

  .btn:hover {
    background: #666;
  }

</style>
