<template>
  <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
  <div class="champions-container">
    <div class="champion-list">
      <div v-for="champion in filteredChampions" :key="champion.id" class="champion" @mouseover="showTooltip(champion, $event)" @mouseleave="hideTooltip">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" :alt="champion.koreanName" />
        <div>{{ champion.koreanName }}</div>
      </div>
    </div>
    <div v-if="tooltipChampion" class="tooltip" :style="{ top: tooltipPosition.top, left: tooltipPosition.left }">
      <h3>{{ tooltipChampion.koreanName }}</h3>
      <p>{{ tooltipChampion.aramStats }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChampionsView',
  data() {
    return {
      gameversion: "14.14.1",
      searchQuery: '',
      champions: [],
      tooltipChampion: null,
      tooltipPosition: { top: '0px', left: '0px' },
      aramStats: {
        Aatrox: '체력 재생량 50% 증가',
        Ahri: '마나 소모량 30% 감소',
        // 각 챔피언에 대한 칼바람 나락 능력치 조정 내용을 추가
        // ...
      },
      loading: true,
    };
  },
  computed: {
    filteredChampions() {
      return this.champions.filter(champion =>
        champion.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        champion.koreanName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    showTooltip(champion, event) {
      this.tooltipChampion = {
        ...champion,
        aramStats: this.aramStats[champion.englishName] || '변경 사항 없음'
      };
      this.tooltipPosition = {
        top: `${event.clientY + 10}px`,
        left: `${event.clientX + 10}px`
      };
    },
    hideTooltip() {
      this.tooltipChampion = null;
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.gameversion}/data/ko_KR/champion.json`);
      const koreanData = response.data.data;

      const englishResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.gameversion}/data/en_US/champion.json`);
      const englishData = englishResponse.data.data;

      this.champions = Object.values(koreanData).map(champion => ({
        ...champion,
        koreanName: champion.name,
        englishName: englishData[champion.id].name // 영어 이름 추가
      }));
      this.champions.sort((a, b) => a.koreanName.localeCompare(b.koreanName)); // 한국어 이름으로 정렬
    } catch (error) {
      console.error('Failed to load champion data:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.champions-container {
  padding: 20px;
  text-align: center;
}

.search-bar {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.champion-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.champion {
  width: 100px;
  margin: 10px;
  text-align: center;
  position: relative;
}

.champion img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  max-width: 200px;
  word-wrap: break-word;
}
</style>
