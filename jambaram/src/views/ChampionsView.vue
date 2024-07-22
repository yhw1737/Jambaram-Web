<template>
  <div class="champions-container">
    <div class="search-bar-container">
      <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
    </div>
    <div class="champion-list">
      <div v-for="champion in filteredChampions" :key="champion.id" class="champion">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" :alt="champion.koreanName" />
        <div>{{ champion.koreanName }}</div>
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
.champions-container {
  padding: 50px;
  text-align: center;
}

.search-bar-container {
  margin-bottom: 20px;
}

.search-bar {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

.champion img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.champion-name {
  margin-top: 5px;
  font-size: 14px;
}
</style>
