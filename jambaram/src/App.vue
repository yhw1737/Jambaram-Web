<template>
  <div id="app">
    <NavBar :key="$route.fullPath"/>
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
  font-family: 'Pretendard-Regular', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

::-webkit-scrollbar {
  width: 5px; /* 스크롤바 너비 */
}

::-webkit-scrollbar-thumb {
  background-color: #7c96c6; /* 스크롤바 색상 */
  border-radius: 10px; /* 스크롤바 모서리 둥글게 */
}

::-webkit-scrollbar-track {
  background-color: #212D40; /* 스크롤바 트랙 색상 */
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
  left: 200px;
}

.right-divider {
  right: 200px;
}

@media (max-width: 1500px) {
  .divider {
    display: none;
  }
}

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'HSSanTokki20-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Cafe24Moyamoya-Regular-v1.0';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/Cafe24Moyamoya-Regular-v1.0.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Cafe24SsurroundAir';
    src: url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff') format('woff');
    font-weight: normal;
    font-style: normal;
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
  left: 250px;
  width: calc(100% - 500px);
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
