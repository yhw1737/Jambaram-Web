<template>
  <div class="champions-view">
    <div class="sidebar">
      <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
      <div class="champion-table-header">
        <span>초상화</span>
        <span>이름</span>
        <span>AI-score</span>
        <span>티어</span>
      </div>
      <div v-for="champion in filteredChampions" :key="champion.id" class="champion-item" @click="selectChampion(champion)">
        <img :src="champion.image" alt="champion">
        <span class="champion-name">{{ champion.koreanName }}</span>
        <span class="champion-score">{{ Math.round(champion.importance * 100) }}</span>
        <span class="champion-tier" :class="`tier-${champion.tier}`">{{ champion.tier }}</span>
      </div>
    </div>
    <div class="main-content2">
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
        // 중요도 데이터 가져오기
        const response = await axios.get('http://jambaram.xyz:10090/api/model/champion/feature_importance');
        const sortedFeatures = response.data.sorted_feature_importance_dict;

        // 챔피언 데이터 가져오기
        const championDataResponse = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/champion.json');
        const championData = championDataResponse.data.data;

        // 챔피언 매핑 및 정렬
        const champions = Object.entries(sortedFeatures).map(([key, importance]) => {
          const champion = Object.values(championData).find(champ => champ.key == key);
          return {
            id: key,
            englishName: champion?.id || `Champion ${key}`,
            koreanName: champion?.name || `Champion ${key}`,
            image: champion ? `http://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${champion.image.full}` : '',
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
}

.search-bar {
  box-sizing: border-box;
  width: 230px;
  height: 40px;
  margin: 10px;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px; /* 검색창의 border-radius 수정 */
  border: 1px solid #ccc;
}

.champion-table-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: bold;
}

.champion-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.champion-item:hover {
  background-color: #34495e;
}

.champion-item img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
}

.champion-name {
  flex: 1;
  text-align: left;
}

.champion-score {
  width: 60px;
  text-align: left;
  margin-right: 10px;
}

.champion-tier {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}

.tier-1 {
  background-color: #469CF8;
}

.tier-2 {
  background-color: #00a2a5; /* 청록색 */
}

.tier-3 {
  background-color: #c37f00; /* 주황색 */
}

.tier-4 {
  background-color: #a6a6a6; /* 연회색 */
}

.tier-5 {
  background-color: #ae9473; /* 연갈색 */
}

.main-content2 {
  flex: 1;
  padding: 20px;
  margin: 0;
}
</style>