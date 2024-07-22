<template>
  <div class="spells-container">
    <div class="search-bar-container">
      <input type="text" v-model="searchQuery" placeholder="스펠 검색" class="search-bar">
    </div>
    <div class="spell-list">
      <div v-for="spell in filteredSpells" :key="spell.id" class="spell" @mouseover="showTooltip(spell, $event)" @mouseleave="hideTooltip">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/14.14.1/img/spell/${spell.image.full}`" :alt="spell.name" />
        <div>{{ spell.name }}</div>
      </div>
    </div>
    <div v-if="tooltipSpell" class="tooltip" :style="{ top: tooltipPosition.top, left: tooltipPosition.left }">
      <h3>{{ tooltipSpell.name }}</h3>
      <p v-html="tooltipSpell.description"></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SpellsView',
  data() {
    return {
      spells: [],
      searchQuery: '',
      tooltipSpell: null,
      tooltipPosition: { top: '0px', left: '0px' }
    };
  },
  computed: {
    aramSpells() {
      return this.spells.filter(spell => spell.modes.includes('ARAM'));
    },
    filteredSpells() {
      return this.aramSpells.filter(spell =>
        spell.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchSpells() {
      try {
        const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/summoner.json');
        this.spells = Object.values(response.data.data);
      } catch (error) {
        console.error('Failed to fetch spells:', error);
      }
    },
    showTooltip(spell, event) {
      this.tooltipSpell = spell;
      this.tooltipPosition = {
        top: `${event.clientY + 10}px`,
        left: `${event.clientX + 10}px`
      };
    },
    hideTooltip() {
      this.tooltipSpell = null;
    }
  },
  mounted() {
    this.fetchSpells();
  }
}
</script>

<style scoped>
.spells-container {
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

.spell-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.spell {
  width: 100px;
  margin: 10px;
  text-align: center;
  position: relative;
}

.spell img {
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
