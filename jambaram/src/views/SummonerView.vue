<template>
  <div v-if="summonerInfo" class="summoner-info-container">
    <!-- 소환사 정보가 있을 때의 레이아웃 -->
    <h1>{{ summonerInfo.name }}</h1>
    <!-- 추가적인 소환사 정보를 여기에 추가 -->
  </div>
  <div v-else class="not-found-container">
    <div class="layout">
      <div class="item A">A</div>
      <div class="item B">B</div>
      <div class="item C">C</div>
      <div class="search-bar-container">
        <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="summoner#KR1" class="search-bar">
        <img src="../assets/search.png" alt="search icon" class="search-icon" @click="searchSummoner">
      </div>
      <div class="item E">E</div>
      <div class="item F">F</div>
      <div class="item G">G</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SummonerView',
  data() {
    return {
      summonerName: '',
      summonerInfo: null,
    };
  },
  methods: {
    async searchSummoner() {
      if (this.summonerName.trim() !== '') {
        this.$router.push(`/search/${this.summonerName.trim()}`);
      }
    }
  },
  async created() {
    const summonerName = this.$route.params.summonerName;
    try {
      const response = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
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
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  color: white;
}

.layout {
  display: grid;
  grid-template-areas:
    "D D E"
    "A B E"
    "A C E"
    "F F F"
    "G G G";
  grid-gap: 10px;
  width: 100%;
  margin: 0 auto;
}

.item {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.item.A {
  grid-area: A;
  border-radius: 50%;
  height: 150px; /* Adjust height as needed */
  width: 150px; /* Adjust width as needed */
}

.item.B {
  grid-area: B;
}

.item.C {
  grid-area: C;
}

.search-bar-container {
  grid-area: D;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.search-bar {
  width: 100%;
  margin: 0;
  height: 20px;
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

.item.E {
  grid-area: E;
}

.item.F {
  grid-area: F;
}

.item.G {
  grid-area: G;
  display: flex;
  flex-direction: column;
}
</style>
