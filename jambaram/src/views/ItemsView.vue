<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="아이템 검색" class="search-bar">
    <div class="item-list">
      <div v-for="(item, index) in filteredItems" :key="index" class="item">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/item/${item.image.full}`" alt="item" class="item-img">
        <div class="item-name">{{ item.koreanName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ItemsView',
  data() {
    return {
      gameversion: "14.14.1",
      searchQuery: '',
      items: [],
      loading: true,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.koreanName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  async mounted() {
    try {
      const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.gameversion}/data/ko_KR/item.json`);
      const koreanData = response.data.data;

      const englishResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.gameversion}/data/en_US/item.json`);
      const englishData = englishResponse.data.data;

      this.items = Object.values(koreanData).map(item => ({
        ...item,
        koreanName: item.name,
        englishName: englishData[item.id].name, // 영어 이름 추가
        image: { full: item.image.full }
      }));
    } catch (error) {
      console.error('Failed to load item data:', error);
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

.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  width: 100px;
  margin: 10px;
  text-align: center;
}

.item-img {
  width: 100%;
}

.item-name {
  margin-top: 5px;
  font-size: 14px;
}
</style>
