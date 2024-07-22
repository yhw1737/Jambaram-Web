<template>
  <div class="items-container">
    <h1>아이템 정보</h1>
    <div class="search-bar-container">
      <input type="text" v-model="searchQuery" placeholder="아이템 검색" class="search-bar">
    </div>
    <div class="item-list">
      <div v-for="item in filteredItems" :key="item.id" class="item" @mouseover="showTooltip(item, $event)" @mouseleave="hideTooltip">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/item/${item.image.full}`" :alt="item.name" />
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div v-if="tooltipItem" class="tooltip" :style="{ top: tooltipPosition.top, left: tooltipPosition.left }">
      <h3>{{ tooltipItem.name }}</h3>
      <p v-html="tooltipItem.description"></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ItemsView',
  data() {
    return {
      gameversion: '14.14.1',
      items: [],
      searchQuery: '',
      tooltipItem: null,
      tooltipPosition: { top: '0px', left: '0px' }
    };
  },
  computed: {
    aramItems() {
      return this.items.filter(item => item.maps['12'] && item.inStore !== false);
    },
    filteredItems() {
      return this.aramItems.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/item.json');
        this.items = Object.values(response.data.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    },
    showTooltip(item, event) {
      this.tooltipItem = item;
      this.tooltipPosition = {
        top: `${event.clientY + 10}px`,
        left: `${event.clientX + 10}px`
      };
    },
    hideTooltip() {
      this.tooltipItem = null;
    }
  },
  mounted() {
    this.fetchItems();
  }
}
</script>

<style scoped>
.items-container {
  padding: 20px;
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

.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  width: 100px;
  margin: 10px;
  text-align: center;
  position: relative;
}

.item img {
  width: 48px;
  height: 48px;
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
