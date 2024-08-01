<template>
  <div class="champions-view">
    <div class="sidebar">
      <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
      <div class="champion-table">
        <div class="champion-table-header">
          <span class="header-rank">순위</span>
          <span class="header-icon">챔피언</span>
          <span class="header-tier">티어</span>
          <span class="header-score">AI-score</span>
        </div>
        <div v-for="(champion, index) in filteredChampions" :key="champion" class="champion-row" @click="selectChampion">
          <span class="champion-rank">{{ index + 1 }}</span>
          <img :src="champion.image" alt="champion" class="champion-icon">
          <span class="champion-name">{{ champion.koreanName }}</span>
          <div class="champion-tier-wrapper">
            <span class="champion-tier" :class="`tier-${champion.tier}`">{{ champion.tier }}</span>
          </div>
          <span class="champion-score">{{ Math.round(champion.importance * 100) }}</span>
        </div>
      </div>
    </div>
    <div class="m-content">
      <div v-if="selectedChampion">
        <h2>{{ selectedChampion.koreanName }}</h2>
        <p>준비중</p>
      </div>
      <div v-else>
        <h2>챔피언을 선택하세요</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

function getInitials(text) {
  const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  let initials = "";

  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c >= 0xAC00 && c <= 0xD7A3) {
      const unicode = c - 0xAC00;
      const choIndex = Math.floor(unicode / 588);
      initials += CHO[choIndex];
    } else {
      initials += text[i];
    }
  }
  return initials;
}

export default {
  name: 'ChampionsView',
  data() {
    return {
      champions: [],
      searchQuery: '',
      selectedChampion: null
    };
  },
  computed: {
    filteredChampions() {
      const query = this.searchQuery.toLowerCase();
      return this.champions.filter(champion => 
        champion.englishName.toLowerCase().includes(query) ||
        champion.koreanName.toLowerCase().includes(query) ||
        getInitials(champion.koreanName).includes(query)
      );
    }
  },
  methods: {
    async fetchChampionData() {
      try {
        const response = await axios.get('https://jambaram.xyz/api/model/champion/feature_importance');
        const sortedFeatures = response.data.sorted_feature_importance_dict;

        const championDataResponse = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/champion.json');
        const championData = championDataResponse.data.data;

        const champions = Object.entries(sortedFeatures).map(([key, importance]) => {
          const champion = Object.values(championData).find(champ => champ.key == key);
          return {
            id: key,
            englishName: champion?.id || `Champion ${key}`,
            koreanName: champion?.name || `Champion ${key}`,
            image: champion ? `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${champion.image.full}` : '',
            importance,
            tier: this.getTier(importance)
          };
        }).sort((a, b) => b.importance - a.importance);

        this.champions = champions;
      } catch (error) {
        console.error('챔피언 데이터를 가져오는데 실패했습니다:', error);
      }
    },
    getTier(importance) {
      if (importance > 0.8) return 1;
      if (importance > 0.6) return 2;
      if (importance > 0.4) return 3;
      if (importance > 0.2) return 4;
      return 5;
    },
    selectChampion(champion) {
      this.selectedChampion = champion;
    }
  },
  async mounted() {
    await this.fetchChampionData();
  }
};
</script>

<style scoped>
.champions-view {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  overflow-y: auto;
  border-radius: 10px;
  padding: 10px;
}

.search-bar {
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.champion-table {
  width: 100%;
}

.champion-table-header,
.champion-row {
  display: flex;
  align-items: center;
}

.champion-table-header {
  font-weight: bold;
  border-bottom: 1px solid #a6a6a6;
  font-size: 12px;
  text-align: center;
}

.champion-row:hover {
  background-color: #34495e;
}

.champion-rank,
.header-rank,
.champion-score,
.header-score {
  width: 50px;
  text-align: center;
}

.header-score {
  margin-left: 10px;
}

.header-name, .header-tier {
  text-align: center;
}

.champion-icon,
.header-icon {
  font-size: 11px;
  width: 30px;
  text-align: center;
}

.champion-icon img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.champion-name,
.header-name {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

.champion-name.long-name {
  font-size: 12px;
}

.champion-tier-wrapper {
  width: 50px;
  height: 50px;
  text-align: center;
  background-color: #202c3a; /* 티어 열 배경 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.champion-tier,
.header-tier {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
}

.header-tier {
  margin-left: 85px;
}

.tier-1 {
  background-color: #469CF8;
}

.tier-2 {
  background-color: #00a2a5;
}

.tier-3 {
  background-color: #c37f00;
}

.tier-4 {
  background-color: #a6a6a6;
}

.tier-5 {
  background-color: #ae9473;
}

.m-content {
  flex: 1;
  padding: 20px;
  margin: 0;
}
</style>
