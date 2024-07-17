<template>
  <div id="app">
    <NavBar />
    <div class="background-image">
      <router-view />
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
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

body {
  margin: 0;
  background: black; /* Set background to black */
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('./assets/칼바람.jpg') no-repeat center center;
  background-size: cover;
  z-index: -1;
}

.main-content {
  position: relative;
  margin-top: 80px; /* Adjust for NavBar height */
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
