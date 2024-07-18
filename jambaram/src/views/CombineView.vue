<template>
  <div>
    <div class="selected-champions" ref="selectedChampionsContainer">
      <div v-for="(champion, index) in selectedChampions" :key="index" class="circle" @click="removeChampion(index)" :style="circleStyle">
        <img v-if="champion" :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" alt="champion" class="circle-img" :style="imgStyle">
      </div>
    </div>
    <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
    <div class="champion-list">
      <div v-for="(champion, index) in filteredChampions" 
           :key="index" 
           class="champion" 
           :class="{ selected: isSelected(champion) }"
           @click="toggleChampion(champion)">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" alt="champion" class="circle-img">
      </div>
    </div>
    <button @click="submitChampions" class="submit-button">최적의 조합 찾기</button>
    <div v-if="optimalCombination.length > 0" class="optimal-combination">
      <h3>최적의 조합</h3>
      <div class="champion-list">
        <div v-for="(champion, index) in optimalCombination" 
             :key="index" 
             class="champion">
          <img :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" alt="champion" class="circle-img">
          <div class="champion-name">{{ champion.koreanName }}</div>
        </div>
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
      gameversion: "14.13.1",
      searchQuery: '',
      champions: [],
      selectedChampions: [],
      optimalCombination: [],
      loading: true,
      containerWidth: 0,
    };
  },
  computed: {
    filteredChampions() {
      return this.champions.filter(champion => 
        champion.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        champion.koreanName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    circleStyle() {
      const selectedCount = this.selectedChampions.length;
      let baseSize = 100;
      if (selectedCount >= 10) baseSize=100-6*(selectedCount-9);

      return {
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        margin: '0 5px'
      };
    },
    imgStyle() {
      const selectedCount = this.selectedChampions.length;
      let baseSize = 100;
      if (selectedCount >= 10) baseSize=100-6*(selectedCount-9);

      return {
        width: `${baseSize}px`,
        height: `${baseSize}px`
      };
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
        if (this.selectedChampions.length < 12) {
          this.selectedChampions.push(champion);
        } else {
          alert('모든 슬롯이 가득 찼습니다.');
        }
      }
    },
    removeChampion(index) {
      this.selectedChampions.splice(index, 1);
    },
    updateContainerWidth() {
      if (this.$refs.selectedChampionsContainer) {
        this.containerWidth = this.$refs.selectedChampionsContainer.clientWidth;
      }
    },
    async submitChampions() {
      try {
        const response = await axios.post('jambaram.xyz:10055/combination', {
          champions: this.selectedChampions
        });
        this.optimalCombination = response.data;
      } catch (error) {
        console.error('Failed to fetch optimal combination:', error);
      }
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.13.1/data/ko_KR/champion.json');
      const koreanData = response.data.data;

      const englishResponse = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion.json');
      const englishData = englishResponse.data.data;

      this.champions = Object.values(koreanData).map(champion => ({
        ...champion,
        koreanName: champion.name,
        englishName: englishData[champion.id].name // 영어 이름 추가
      }));
      this.champions.sort((a, b) => a.koreanName.localeCompare(b.koreanName)); // 한국어 이름으로 정렬

      window.addEventListener('resize', this.updateContainerWidth);
      this.$nextTick(this.updateContainerWidth);
    } catch (error) {
      console.error('Failed to load champion data:', error);
    } finally {
      this.loading = false;
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerWidth);
  }
};
</script>

<style scoped>
.selected-champions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
  min-height: 120px; /* 최소 높이 설정 */
}

.circle {
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: width 0.3s, height 0.3s;
}

.circle-img {
  object-fit: cover;
  transition: width 0.3s, height 0.3s;
}

.search-bar {
  width: calc(100% - 500px);
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
  height: 350px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
}

.champion {
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 80px;
  height: 80px;
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

.submit-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: darkslateblue;
  color: white;
  border: none;
  cursor: pointer;
}

.optimal-combination {
  margin-top: 20px;
  text-align: center;
}

.optimal-combination h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.optimal-combination .champion-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
