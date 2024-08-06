<template>
  <div class="home-container">
    <div class="search-bar-container">
      <router-link to="/" class="logo" v-if="!isMobile">
        <img src="../assets/image.png">
      </router-link>
      <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="summoner#KR1" class="search-bar">
      <img src="../assets/search.png" alt="search icon" class="search-icon" @click="searchSummoner">
    </div>
    <div class="combination-container">
      <div class="combination-section">
        <h3>최고 승률</h3>
        <div class="toggle-wrapper">
          <div class="toggle-button" @click="toggleData('win')">
            <div :class="['toggle-circle', { 'toggle-right': !isWinToday }]"></div>
            <span class="toggle-label left-label">역대</span>
            <span class="toggle-label right-label">오늘</span>
          </div>
        </div>
        <div class="champions">
          <div v-for="(championId, idx) in currentWinData.champions" :key="idx" class="champion">
            <img v-if="championId !== -1" :src="getChampionImage(championId)" alt="champion" class="champion-icon">
            <span v-else>정보 없음</span>
          </div>
        </div>
        <div class="value">
          <span>{{ Math.round(currentWinData.value * 10000) / 100 }}%</span>
        </div>
      </div>
      <div class="combination-section">
        <h3>최고 점수</h3>
        <div class="toggle-wrapper">
          <div class="toggle-button" @click="toggleData('score')">
            <div :class="['toggle-circle', { 'toggle-right': !isScoreToday }]"></div>
            <span class="toggle-label left-label">역대</span>
            <span class="toggle-label right-label">오늘</span>
          </div>
        </div>
        <div class="champions">
          <div v-for="(championId, idx) in currentScoreData.champions" :key="idx" class="champion">
            <img v-if="championId !== -1" :src="getChampionImage(championId)" alt="champion" class="champion-icon">
            <span v-else>정보 없음</span>
          </div>
        </div>
        <div class="value">
          <span>{{ Math.round(currentScoreData.value * 100) / 100 }}</span>
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
      summonerInfo: null,
      champions: [],
      isWinToday: true,
      isScoreToday: true,
      combinations: {
        win_today: { champions: [-1], value: 0, api: 'https://jambaram.xyz/api/model/stats/best_win_today' },
        win_all: { champions: [-1], value: 0, api: 'https://jambaram.xyz/api/model/stats/best_win_all' },
        score_today: { champions: [-1], value: 0, api: 'https://jambaram.xyz/api/model/stats/best_score_today' },
        score_all: { champions: [-1], value: 0, api: 'https://jambaram.xyz/api/model/stats/best_score_all' }
      }
    };
  },
  computed: {
    currentWinData() {
      return this.isWinToday ? this.combinations.win_today : this.combinations.win_all;
    },
    currentScoreData() {
      return this.isScoreToday ? this.combinations.score_today : this.combinations.score_all;
    }
  },
  methods: {
    async searchSummoner() {
      if (this.summonerName.trim() !== '') {
        this.$router.push(`/search/${this.summonerName.trim()}`);
      }
    },
    async fetchCombinationData() {
      for (const key in this.combinations) {
        try {
          const response = await axios.get(this.combinations[key].api);
          this.combinations[key].champions = response.data.champions;
          this.combinations[key].value = response.data.value;
        } catch (error) {
          console.error(`Failed to fetch ${key} data:`, error);
        }
      }
    },
    getChampionImage(championId) {
      const champion = this.champions.find(champ => parseInt(champ.key) === championId);
      return champion ? `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${champion.image.full}` : '';
    },
    async fetchChampionData() {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/champion.json');
        const championData = response.data.data;
        this.champions = Object.values(championData).map(champion => ({
          key: champion.key,
          image: champion.image
        }));
      } catch (error) {
        console.error('Failed to fetch champion data:', error);
      }
    },
    toggleData(type) {
      if (type === 'win') {
        this.isWinToday = !this.isWinToday;
      } else if (type === 'score') {
        this.isScoreToday = !this.isScoreToday;
      }
    }
  },
  async mounted() {
    await this.fetchChampionData();
    await this.fetchCombinationData();
  }
};
</script>

<style scoped>
@keyframes aurora {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.logo img {
  width: 60%;
}

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
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 18vh;
}

.search-bar {
  height: 20px;
  width: 60%;
  padding: 10px 20px;
  font-family: 'Pretendard-regular';
  font-size: 14px;
  font-weight: lighter;
  border-radius: 20px;
  background-color: #F7F4F3; 
  border: none;
}

.search-bar:focus {
  outline: none;
}

.search-icon {
  width: 11px;
  height: 10px;
  margin-left: -30px;
}

.combination-container {
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.combination-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  text-align: center;
  color: #fff;
}

.combination-section h3 {
  font-family: 'Pretendard-Regular';
  color: #54B9DC;
  font-size: 18px;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.toggle-button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100px;
  height: 40px;
  background-color: #535760;
  border-radius: 20px;
  cursor: pointer;
}

.toggle-circle {
  position: absolute;
  width: 48px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 18px;
  transition: 0.4s;
  left: 4px; /* default to left side */
}

.toggle-right {
  left: 48px; /* move to right side */
}

.toggle-label {
  position: absolute;
  color: #fff;
  font-size: 14px;
}

.left-label {
  left: 10px;
}

.right-label {
  right: 10px;
}

.champions {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.champion {
  width: 50px;
  height: 50px;
  margin: 0 5px;
}

.champion img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.value {
  font-family: 'Pretendard-Regular';
  background: linear-gradient(270deg, #f5b1b0, #aa78d7, #4a90e2, #a0e8af);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: aurora 2s ease infinite;
  font-size: 32px;
}
</style>
