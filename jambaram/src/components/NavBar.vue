<template>
    <nav class="nav-bar">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.name" class="nav-item">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    data() {
      return {
        menuItems: [
          { name: 'Home', path: '/' },
          { name: 'Champions', path: '/champions' },
          { name: 'Stats', path: '/stats' }
        ]
      };
    }
  }
  </script>
  
  <style>
  .nav-bar {
    width: 100%;
    background-color: darkslateblue;
    padding: 15px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .nav-item a {
    color: white;
    padding: 10px;
    text-decoration: none;
  }
  </style>
  