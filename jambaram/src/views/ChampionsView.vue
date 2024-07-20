<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
    <div class="champion-list">
      <div v-for="(champion, index) in filteredChampions" :key="index" class="champion">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" alt="champion" class="champion-img">
        <div class="champion-name">{{ champion.koreanName }}</div>
      </div>
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
.search-bar {
  width: calc(100% - 20px);
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
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
}

.champion-img {
  width: 100%;
  border-radius: 50%;
}

.champion-name {
  margin-top: 5px;
  font-size: 14px;
}
</style>
