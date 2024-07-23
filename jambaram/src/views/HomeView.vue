<template>
  <div class="home-container">
    <div class="summoner-info-container">
      <div class="summoner-profile">
        <div class="summoner-icon-placeholder">
          <img src="../assets/empty-champion.png" alt="소환사 아이콘" class="summoner-icon">
        </div>
        <div class="summoner-details-placeholder">
          <h2>-------#KR1</h2>
        </div>
      </div>
      <div class="additional-info-container">
        <div class="win-rate-container">
          <h3>챔피언별 승률</h3>
          <div class="champion-win-rate" v-for="i in 3" :key="i">
            <p>챔피언 {{ i }}</p>
          </div>
        </div>
        <div class="match-history-container">
          <h3>전적</h3>
          <div class="match-history" v-for="i in 5" :key="i">
            <p>전적 {{ i }}</p>
          </div>
        </div>
      </div>
      <div class="search-bar-container">
        <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="summoner#KR1" class="search-bar">
        <img src="../assets/search.png" alt="search icon" class="search-icon" @click="searchSummoner">
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
  position: absolute;
  top: 20px;
  right: 5%;
  display: flex;
  align-items: center;
}

.search-bar {
  width: 100%;
  padding: 10px 20px;
  font-family: 'NanumBarunGothic';
  font-size: 12px;
  font-weight: lighter;
  border-radius: 20px; /* 둥근 모서리 추가 */
  background-color: #F7F4F3; 
  border: none; /* 테두리 제거 */
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

.summoner-info-container {
  background: #364156;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 95%;
}

.summoner-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; /* 수직 정렬 */
}

.summoner-icon-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-bottom: 20px; /* 아래쪽 여백 */
}

.summoner-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.summoner-details-placeholder h2 {
  margin: 0;
  color: #999;
}

.additional-info-container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.win-rate-container, .match-history-container {
  background-color: #F7F4F3;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
}

.win-rate-container h3, .match-history-container h3 {
  margin-top: 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.champion-win-rate, .match-history {
  border: 1px dashed #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.champion-win-rate:last-child, .match-history:last-child {
  margin-bottom: 0;
}
</style>
