<template>
  <div class="home-container">
    <div class="search-bar-container">
      <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="summoner#KR1" class="search-bar">
      <img src="../assets/search.png" alt="search icon" class="search-icon" @click="searchSummoner">
    </div>
    <div class="summoner-info-container">
      <div class="summoner-profile">
        <div class="summoner-icon-placeholder">
          <img src="../assets/empty-champion.png" alt="소환사 아이콘" class="summoner-icon">
        </div>
        <div class="summoner-details">
          <h2>소환사이름</h2>
          <p>태그</p>
        </div>
      </div>
      <div class="champion-stats-container">
        <div class="champion-stats" v-for="i in 5" :key="i">
          <div class="champion-icon-placeholder">
            <img src="../assets/empty-champion.png" alt="챔피언 아이콘" class="champion-icon">
          </div>
          <div class="champion-details">
            <p>칼바람 나락 승률 {{ i }}등 챔피언</p>
          </div>
        </div>
      </div>
    </div>
    <div class="match-history-container">
      <div class="match-history" v-for="i in 2" :key="i">
        <p>전적 {{ i }}</p>
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
  width: 100%;
  margin-top: 20px; /* 검색창을 상단에 위치시키기 위해 여백 추가 */
}

.search-bar {
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

.summoner-info-container {
  background: #364156;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 95%;
  margin-top: 20px; /* 검색창 아래로 여백 추가 */
}

.summoner-profile {
  display: flex;
  align-items: center;
  justify-content: center;
}

.summoner-icon-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 20px;
}

.summoner-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.summoner-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.summoner-details h2 {
  margin: 0;
  color: #fff;
  font-size: 24px;
}

.summoner-details p {
  margin: 0;
  color: #999;
  font-size: 16px;
}

.champion-stats-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.champion-stats {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.champion-icon-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 10px;
}

.champion-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.champion-details p {
  margin: 0;
  color: #fff;
  font-size: 14px;
}

.match-history-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.match-history {
  border: 2px solid black;
  width: 45%;
  height: 200px; /* 원하는 높이로 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.match-history p {
  margin: 0;
  font-size: 24px;
}
</style>
