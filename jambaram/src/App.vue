<template>
  <div id="app">
    <div class="advertisement left-ad">
      <!-- 좌측 광고 공간 -->
      <img src="path/to/your/ad.jpg" alt="Ad" />
    </div>
    <div class="main-content">
      <NavBar />
      <router-view />
    </div>
    <div class="advertisement right-ad">
      <!-- 우측 광고 공간 -->
      <img src="path/to/your/ad.jpg" alt="Ad" />
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
  display: flex;
  justify-content: center;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  width: 100vw;
}

.advertisement {
  width: 150px;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 0;
}

.left-ad {
  left: 0;
  border-right: 1px solid #ccc;
}

.right-ad {
  right: 0;
  border-left: 1px solid #ccc;
}

.main-content {
  margin: 0 170px; /* 광고 영역의 너비 + 패딩/마진을 고려하여 설정 */
  flex-grow: 1;
  padding-top: 70px; /* 메뉴바 높이만큼 패딩 추가 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
</style>
