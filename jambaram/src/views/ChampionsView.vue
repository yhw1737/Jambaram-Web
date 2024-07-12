<template>
  <div>
    <div class="selected-champions">
      <div v-for="(champion, index) in selectedChampions" :key="index" class="circle" @click="removeChampion(index)">
        <img v-if="champion" :src="`http://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champion.image.full}`" alt="champion" class="circle-img">
      </div>
    </div>
    <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
    <div class="champion-list">
      <div v-for="(champion, index) in filteredChampions" 
           :key="index" 
           class="champion" 
           :class="{ selected: isSelected(champion) }"
           @click="toggleChampion(champion)">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champion.image.full}`" alt="champion" class="circle-img">
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
      searchQuery: '',
      champions: [],
      selectedChampions: Array(5).fill(null), // 빈 동그라미 5개
      loading: true
    }
  },
  computed: {
    filteredChampions() {
      return this.champions.filter(champion => 
        champion.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    isSelected(champion) {
      return this.selectedChampions.includes(champion);
    },
    toggleChampion(champion) {
      const index = this.selectedChampions.indexOf(champion);
      if (index !== -1) {
        // 이미 선택된 챔피언이면 선택 취소
        this.removeChampion(index);
      } else {
        // 선택되지 않은 챔피언이면 선택
        const emptyIndex = this.selectedChampions.findIndex(c => c === null);
        if (emptyIndex !== -1) {
          this.selectedChampions.splice(emptyIndex, 1, champion);
          this.sortSelectedChampions();
        } else {
          alert('모든 슬롯이 가득 찼습니다.');
        }
      }
    },
    removeChampion(index) {
      this.selectedChampions.splice(index, 1);
      this.selectedChampions.push(null);
      this.sortSelectedChampions();
    },
    sortSelectedChampions() {
      const sorted = this.selectedChampions.filter(c => c !== null).sort((a, b) => a.name.localeCompare(b.name));
      this.selectedChampions = [...sorted, ...Array(5 - sorted.length).fill(null)];
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion.json');
      this.champions = Object.values(response.data.data);
    } catch (error) {
      console.error('Failed to load champion data:', error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
.selected-champions {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}

.circle-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-bar {
  width: calc(100% - 20px); /* Add some padding to avoid overflow */
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
  height: 400px; /* Adjust as needed */
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
}

.champion {
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100px;
  height: 100px;
}

.champion.selected {
  background-color: rgba(0, 0, 0, 0.1);
}

.champion img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
