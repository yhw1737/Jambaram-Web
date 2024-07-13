<template>
  <div class="home-container">
    <img src="../assets/칼바람.jpg" class="home-img" alt="사진">
    <div class="search-bar-container">
      <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="플레이어+태그 전적검색" class="search-bar">
      <button @click="searchSummoner" class="search-button">검색</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      summonerName: ''
    };
  },
  methods: {
    searchSummoner() {
      if (this.summonerName.trim() !== '') {
        console.log(this.summonerName);
        // 실제 검색 기능 구현
      }
    }
  }
}
</script>

<style>
.home-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-img {
  width: 100%;
  height: auto;
  max-height: 400px; /* 세로 길이를 제한하여 가로로 넓게 보이도록 설정 */
  object-fit: cover;
}

.search-bar-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  width: 300px;
  padding: 10px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: darkslateblue;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}
</style>
