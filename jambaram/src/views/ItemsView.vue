<template>
  <div class="items-container">
    <div class="left-menu">
      <div @click="setMap('all')" :class="{ active: selectedMap === 'all' }">전체</div>
      <div @click="setMap(11)" :class="{ active: selectedMap === 11 }">소환사의 협곡</div>
      <div @click="setMap(12)" :class="{ active: selectedMap === 12 }">칼바람 나락</div>
      <div @click="setMap('other')" :class="{ active: selectedMap === 'other' }">기타</div>
    </div>
    <div class="right-menu">
      <div @click="setTag('all')" :class="{ active: selectedTag === 'all' }">전체</div>
      <div v-for="tag in tags" :key="tag" @click="setTag(tag)" :class="{ active: selectedTag === tag }">{{ tag }}</div>
    </div>
    <div class="item-list">
      <div v-for="item in filteredItems" :key="item.id" class="item">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/item/${item.image.full}`" :alt="item.name" />
        <div>{{ item.name }}</div>
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
      gameversion: '14.14.1',
      items: [],
      selectedMap: 'all',
      selectedTag: 'all',
      tags: ['Attack', 'Defense', 'Magic', 'Movement', 'Consumable', 'Jungle', 'Vision', 'GoldPer', 'CooldownReduction', 'CriticalStrike', 'OnHit', 'Mana'],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const mapCondition = this.selectedMap === 'all' || item.maps[this.selectedMap] || (this.selectedMap === 'other' && !item.maps[11] && !item.maps[12]);
        const tagCondition = this.selectedTag === 'all' || item.tags.includes(this.selectedTag);
        return mapCondition && tagCondition;
      });
    }
  },
  methods: {
    setMap(map) {
      this.selectedMap = map;
    },
    setTag(tag) {
      this.selectedTag = tag;
    },
    async fetchItems() {
      try {
        const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/item.json');
        this.items = Object.values(response.data.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    }
  },
  mounted() {
    this.fetchItems();
  }
}
</script>

<style scoped>
.items-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.left-menu, .right-menu {
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: #2c3e50;
  color: white;
  padding: 10px;
}

.left-menu div, .right-menu div {
  padding: 10px;
  cursor: pointer;
}

.left-menu div.active, .right-menu div.active {
  background-color: #34495e;
}

.item-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  flex-grow: 1;
  overflow-y: scroll;
}

.item {
  width: 100px;
  margin: 10px;
  text-align: center;
}

.item img {
  width: 48px;
  height: 48px;
}
</style>
