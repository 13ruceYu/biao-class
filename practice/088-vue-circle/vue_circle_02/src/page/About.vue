<template>
  <div class="container">
    <Dropdown api="user/read" searchBy="username" displayBy="username" :onSelect="onSelect"/>
    <Dropdown :list="userList" searchBy="username" displayBy="username" :onSelect="onSelect"/>
  </div>
</template>

<script>
import Dropdown from "../component/Dropdown";
export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      userList: [
        {
          id: 1,
          username: 'whh',
          name: '王花花',
        },
        {
          id: 2,
          username: 'lsd',
          name: '李拴蛋',
        },
        {
          id: 3,
          username: 'zks',
          name: '赵可爽',
        },
        {
          id: 4,
          username: 'wmm',
          name: '王萌萌',
        },
      ]
    }
  },
  methods: {
    onSelect(it) {
      console.log(it.name);
    }
  },
}
</script>