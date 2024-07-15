<template>
  <div class="home-container">
    <img src="../assets/칼바람.jpg" class="home-img" alt="사진">
    <div class="search-bar-container">
      <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="플레이어+태그 전적검색" class="search-bar">
      <button @click="searchSummoner" class="search-button">검색</button>
    </div>
    <div class="champion-tier-container">
      <h2>v{{ gameversion }} 칼바람나락 티어</h2>
      <div class="champion-tier-list">
        <div v-for="(champion, index) in championTiers" :key="index" class="champion-tier-item">
          <div class="champion-icon-container">
            <img src="../assets/empty-champion.png" alt="empty champion" class="champion-img">
            <span class="tier-badge">{{ champion.tier }}</span>
          </div>
          <div class="champion-name">{{ champion.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      summonerName: '',
      gameversion: '14.13.1', // 예시 버전
      championTiers: [
        { name: '이즈리얼', tier: 1 },
        { name: '진', tier: 1 },
        { name: '케이틀린', tier: 1 },
        { name: '징크스', tier: 1 },
        { name: '쓰레쉬', tier: 1 },
        { name: '제라스', tier: 1 },
        { name: '럭스', tier: 1 },
        { name: '니달리', tier: 1 },
        { name: '모르가나', tier: 1 },
        { name: '제리', tier: 1 },
        { name: '룰루', tier: 1 },
        { name: '블리츠크랭크', tier: 1 },
        { name: '베이가', tier: 1 },
        { name: '판테온', tier: 1 },
        { name: '아리', tier: 1 },
        { name: '브랜드', tier: 1 }
      ]
    };
  },
  methods: {
    searchSummoner() {
      if (this.summonerName.trim() !== '') {
        console.log(this.summonerName);
        // 실제 검색 기능 구현
      }
    },
    async fetchChampionTiers() {
      try {
        // 챔피언 티어 데이터를 가져오는 API 호출
        const response = await axios.get('https://api.example.com/champion-tiers'); // 실제 API 주소로 대체
        this.championTiers = response.data;
      } catch (error) {
        console.error('Failed to fetch champion tiers:', error);
      }
    }
  },
  async mounted() {
    await this.fetchChampionTiers();
  }
}
</script>

<style>
.home-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  top: 200px;
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

.champion-tier-container {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #f0f0f0;
  margin-top: 20px;
  text-align: center;
}

.champion-tier-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.champion-tier-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.champion-tier-item {
  width: 80px;
  margin: 10px;
  text-align: center;
  position: relative;
}

.champion-icon-container {
  position: relative;
  width: 80px;
  height: 80px;
}

.champion-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f0f0f0;
}

.tier-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
}

.champion-name {
  margin-top: 10px;
  font-size: 14px;
}
</style>
