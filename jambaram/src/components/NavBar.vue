<template>
    <div class="menu">
      <router-link to="/">Home</router-link>
      <router-link to="/champions">Champions</router-link>
      <router-link to="/stats">Stats</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style>
  .menu {
    background: darkslateblue;
    padding: 15px;
    border-radius: 5px;
  }
  .menu a {
    color: white;
    padding: 10px;
  }
  </style>
  