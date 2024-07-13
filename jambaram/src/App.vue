<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>

#app {
  font-family: '나눔스퀘어 NEO OTF Regular', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

body {
  margin: 0;
}

.main-content {
  margin-top: 100px;
  margin-left: 160px;
  margin-right: 160px;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
