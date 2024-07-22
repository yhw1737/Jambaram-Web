<template>
  <div id="app">
    <NavBar />
    <div class="background-image"></div>
    <div class="divider left-divider"></div>
    <div class="divider right-divider"></div>
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
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.divider {
  position: absolute;
  top: 60px;
  bottom: 200px;
  width: 1px;
  background-color: #e0e0e0;
  opacity: 0.05;
}

.left-divider {
  left: 20%;
}

.right-divider {
  right: 20%;
}

@media (max-width: 1500px) {
  .divider {
    display: none;
  }
}

@font-face {
  font-family: 'NanumBarunGothic';
  src: url('./assets/fonts/NanumBarunGothic.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'NanumBarunGothic';
  src: url('./assets/fonts/NanumBarunGothicLight.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'NanumBarunGothic';
  src: url('./assets/fonts/NanumBarunGothicBold.ttf') format('truetype');
  font-weight: 700;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
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
  left: 20%;
  width: 60%;
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
