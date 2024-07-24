<template>
  <div class="home-container">
    <div class="search-bar-container">
      <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="summoner#KR1" class="search-bar">
      <img src="../assets/search.png" alt="search icon" class="search-icon" @click="searchSummoner">
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
      summonerInfo: null,
    };
  },
  methods: {
    async searchSummoner() {
      if (this.summonerName.trim() !== '') {
        try {
          const response = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.summonerName}`, {
            headers: {
              'X-Riot-Token': 'YOUR_API_KEY' // 여기에 라이엇 API 키를 넣으세요
            }
          });
          this.summonerInfo = {
            name: response.data.name,
            summonerLevel: response.data.summonerLevel,
            profileIconUrl: `http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${response.data.profileIconId}.png`,
            masteryChampions: [
              { iconUrl: 'http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/Aatrox.png' },
              { iconUrl: 'http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/Ahri.png' },
              { iconUrl: 'http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/Akali.png' }
            ]
          };
        } catch (error) {
          console.error('Failed to fetch summoner info:', error);
          this.summonerInfo = null;
        }
      }
    }
  }
}
</script>

<style>
.home-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.search-bar-container {
  width: 100%;
  margin-top: 400px; /* 검색창을 상단에 위치시키기 위해 여백 추가 */
}

.search-bar {
  height: 20px;
  width: 60%;
  padding: 10px 20px;
  font-family: 'NanumBarunGothic';
  font-size: 12px;
  font-weight: lighter;
  border-radius: 20px;
  background-color: #F7F4F3; 
  border: none;
}

.search-bar:focus {
  outline: none; /* 포커스 시 외곽선 제거 */
}

.search-icon {
  width: 11px;
  height: 10px;
  margin-left: -30px; /* 검색창 오른쪽에 배치 */  
  cursor: pointer;
}
</style>
