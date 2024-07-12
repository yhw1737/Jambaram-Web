<template>
  <div id="app">
    <div class="ad left-ad">
      <p>광고 배너</p>
    </div>
    <div class="ad right-ad">
      <p>광고 배너</p>
    </div>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh; /* Full height */
}

.ad {
  background-color: #ccc;
  color: white;
  padding: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 150px;
  z-index: 1100; /* Higher than navbar */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-ad {
  left: 0;
}

.right-ad {
  right: 0;
}

.main-content {
  margin-top: 80px; /* Adjust based on navbar height */
  margin-left: 160px; /* Adjust based on ad width */
  margin-right: 160px; /* Adjust based on ad width */
  padding: 20px;
  flex-grow: 1;
  height: calc(100vh - 80px); /* Full height minus navbar */
  overflow-y: auto;
}
</style>
