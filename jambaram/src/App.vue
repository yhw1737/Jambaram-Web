<template>
  <div id="app">
    <NavBar />
    <div class="background-image"></div>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: 'NanumBarunGothic', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
  width: cal(100%-20px);
}

@font-face {
  font-family:'NanumBarunGothic';
  src: url('./assets/fonts/NanumBarunGothic.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('./assets/fonts/NanumBarunGothicLight.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family:'NanumBarunGothic';
  src: url('./assets/fonts/NanumBarunGothicBold.ttf') format('truetype');
  font-weight: 700;
}

body {
  margin: 0;
}

.background-image {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #11151C;
  background-size: cover;
  z-index: -1;
}

.main-content {
  position: relative;
  margin-top: 80px;
  box-sizing: border-box;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
