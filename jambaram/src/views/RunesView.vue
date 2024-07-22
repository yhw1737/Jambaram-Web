<template>
  <input type="text" v-model="searchQuery" placeholder="룬 검색" class="search-bar">
  <div class="runes-container">
    <div class="rune-list">
      <div v-for="rune in filteredRunes" :key="rune.id" class="rune" @mouseover="showTooltip(rune, $event)" @mouseleave="hideTooltip">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`" :alt="rune.name" />
        <div>{{ rune.name }}</div>
      </div>
    </div>
    <div v-if="tooltipRune" class="tooltip" :style="{ top: tooltipPosition.top, left: tooltipPosition.left }">
      <h3>{{ tooltipRune.name }}</h3>
      <p v-html="cleanDescription(tooltipRune.longDesc)"></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RunesView',
  data() {
    return {
      runes: [],
      searchQuery: '',
      tooltipRune: null,
      tooltipPosition: { top: '0px', left: '0px' }
    };
  },
  computed: {
    filteredRunes() {
      return this.runes.filter(rune =>
        rune.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchRunes() {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/runesReforged.json');
        this.runes = response.data.flatMap(tree => tree.slots.flatMap(slot => slot.runes));
      } catch (error) {
        console.error('Failed to fetch runes:', error);
      }
    },
    showTooltip(rune, event) {
      this.tooltipRune = rune;
      this.tooltipPosition = {
        top: `${event.clientY + 10}px`,
        left: `${event.clientX + 10}px`
      };
    },
    hideTooltip() {
      this.tooltipRune = null;
    },
    cleanDescription(description) {
      return description.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    }
  },
  mounted() {
    this.fetchRunes();
  }
}
</script>

<style scoped>
.runes-container {
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

.rune-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.rune {
  width: 100px;
  margin: 10px;
  text-align: center;
  position: relative;
}

.rune img {
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
