<template>
  <div>
    <transition-group name="list" tag="div" class="selected-champions" ref="selectedChampionsContainer" @leave="onLeave">
      <div 
        v-for="(champion, index) in selectedChampions" 
        :key="champion.key" 
        class="circle" 
        @click="removeChampion(index)" 
        @contextmenu.prevent="toggleFixedChampion(champion)" 
        :class="{ fixed: isFixed(champion) }"
      >
        <img 
          v-if="champion" 
          :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" 
          alt="champion" 
          class="circle-img" 
        >
      </div>
    </transition-group>
    <div class="search-bar-container">
      <input type="text" v-model="searchQuery" placeholder="챔피언 검색" class="search-bar">
      <div class="action-buttons">
        <div class="action-button info" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">?</div>
        <div class="action-button reset" @click="resetChampions">X</div>
        <div class="tooltip" v-if="showTooltip">챔피언을 선택하고, 고정하려면 우클릭하세요. 고정된 챔피언은 조합 결과에 필수 반영됩니다.</div>
      </div>
    </div>
    <div class="champion-list-container">
      <div class="champion-list">
        <div 
          v-for="(champion, index) in filteredChampions" 
          :key="index" 
          class="champion" 
          @click="toggleChampion(champion)"
          @contextmenu.prevent="toggleFixedChampion(champion)"
        >
          <img 
            :src="`http://ddragon.leagueoflegends.com/cdn/${gameversion}/img/champion/${champion.image.full}`" 
            alt="champion" 
            class="circle-img" 
            :class="{ selected: isSelected(champion), fixed: isFixed(champion) }"
          >
        </div>
      </div>
    </div>
    <button @click="submitChampions" class="submit-button">최적의 조합 찾기</button>
    <div v-if="errorMessage" ref="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="optimalCombination.champions.length > 0" ref="optimalCombination" class="optimal-combination">
      <p class="win-prob" :class="winProbColor">승률: {{ (optimalCombination.win_prob * 100).toFixed(2) }}%</p>
      <div class="optimal-champion-list">
        <div v-for="(championId, index) in optimalCombination.champions" :key="index" class="champion">
          <img :src="getChampionImage(championId)" alt="champion" class="circle-img" :class="{ fixed: isFixedById(championId) }">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CombineView',
  data() {
    return {
      gameversion: "14.14.1",
      searchQuery: '',
      champions: [],
      selectedChampions: [],
      fixedChampions: [], // 고정된 챔피언 목록
      optimalCombination: {
        champions: [],
        win_prob: 0
      },
      loading: true,
      containerWidth: 0,
      errorMessage: '',
      showTooltip: false // 툴팁 상태
    };
  },
  computed: {
    winProbColor() {
      const winProb = this.optimalCombination.win_prob * 100;
      if (winProb <= 45) {
        return 'low-win-prob';
      } else if (winProb <= 55) {
        return 'mid-win-prob';
      } else if (winProb < 65){
        return 'high-win-prob';
      } else {
        return 'aurora';
      }
    },
    filteredChampions() {
      return this.champions.filter(champion => 
        champion.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        champion.koreanName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    isSelected(champion) {
      return this.selectedChampions.includes(champion);
    },
    isFixed(champion) {
      return this.fixedChampions.includes(champion);
    },
    isFixedById(championId) {
      return this.fixedChampions.some(champion => parseInt(champion.key) === championId);
    },
    toggleChampion(champion) {
      const index = this.selectedChampions.indexOf(champion);
      if (index !== -1) {
        this.removeChampion(index);
      } else {
        if (this.selectedChampions.length < 12) {
          this.selectedChampions.push(champion);
        } else {
          this.errorMessage = '모든 슬롯이 가득 찼습니다.';
          this.scrollToErrorMessage();
        }
      }
    },
    toggleFixedChampion(champion) {
      if (this.fixedChampions.length >= 4 && !this.isFixed(champion)) {
        this.errorMessage = '챔피언은 최대 4개까지 고정할 수 있습니다.';
        this.scrollToErrorMessage();
        return;
      }
      const index = this.fixedChampions.indexOf(champion);
      if (index !== -1) {
        this.fixedChampions.splice(index, 1);
      } else {
        if (!this.isSelected(champion)) {
          this.selectedChampions.push(champion);
        }
        this.fixedChampions.push(champion);
      }
    },
    removeChampion(index) {
      const champion = this.selectedChampions[index];
      this.selectedChampions.splice(index, 1);
      const fixedIndex = this.fixedChampions.indexOf(champion);
      if (fixedIndex !== -1) {
        this.fixedChampions.splice(fixedIndex, 1);
      }
    },
    resetChampions() {
      this.selectedChampions = [];
      this.fixedChampions = [];
    },
    onLeave(el, done) {
      const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el;
      el.style.position = 'absolute';
      el.style.top = `${offsetTop}px`;
      el.style.left = `${offsetLeft}px`;
      el.style.width = `${offsetWidth}px`;
      el.style.height = `${offsetHeight}px`;
      requestAnimationFrame(() => {
        el.style.transform = 'scale(1.2)';
        el.style.opacity = '0';
        el.addEventListener('transitionend', done);
      });
    },
    async submitChampions() {
      if (this.fixedChampions.length > 4) {
        this.errorMessage = '챔피언은 최대 4개까지 고정할 수 있습니다.';
        this.scrollToErrorMessage();
        return;
      }
      if (this.selectedChampions.length >= 5 && this.selectedChampions.length <= 12) {
        try {
          const response = await axios.post('http://jambaram.xyz:10090/api/model/combination', {
            champion_list: this.selectedChampions.map(champion => parseInt(champion.key)),
            fixed_list: this.fixedChampions.map(champion => parseInt(champion.key))
          });
          this.optimalCombination.champions = response.data.champions;
          this.optimalCombination.win_prob = response.data.win_prob;
          this.errorMessage = '';
          this.scrollToOptimalCombination();
        } catch (error) {
          console.error('Failed to fetch optimal combination:', error);
          this.errorMessage = '최적의 조합을 가져오는 데 실패했습니다.';
          this.scrollToErrorMessage();
        }
      } else {
        this.errorMessage = '최적의 조합을 찾으려면 5에서 12개의 챔피언을 선택해야 합니다.';
        this.scrollToErrorMessage();
      }
    },
    scrollToOptimalCombination() {
      this.$nextTick(() => {
        const element = this.$refs.optimalCombination;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    scrollToErrorMessage() {
      this.$nextTick(() => {
        const element = this.$refs.errorMessage;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    getChampionImage(id) {
      const champion = this.champions.find(champion => parseInt(champion.key) === id);
      return champion ? `http://ddragon.leagueoflegends.com/cdn/${this.gameversion}/img/champion/${champion.image.full}` : '';
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.14.1/data/ko_KR/champion.json');
      const koreanData = response.data.data;

      const englishResponse = await axios.get('http://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json');
      const englishData = englishResponse.data.data;

      this.champions = Object.values(koreanData).map(champion => ({
        ...champion,
        koreanName: champion.name,
        englishName: englishData[champion.id].name, // 영어 이름 추가
        key: champion.key // 챔피언 ID 추가
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
@keyframes aurora {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.low-win-prob {
  color: #FD151B;
}

.mid-win-prob {
  color: #9e9e9e;
}

.high-win-prob {
  color: #0bc67e;
}

.aurora {
  background: linear-gradient(270deg, #f5b1b0, #aa78d7, #4a90e2, #a0e8af);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: aurora 2s ease infinite;
}

.selected-champions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
  min-height: 100px; /* 최소 높이 설정 */
}

.list-move, /* 움직이는 엘리먼트에 트랜지션 적용 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

.circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #F7F4F3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: .5s;
}

.circle-img {
  width: 70px;
  height: 70px;
  border: 2px solid #364156;
  border-radius: 50%;
  object-fit: cover;
  transition: .5s;
}

.circle.fixed {
  border: 2px solid #cf4529; /* 고정된 챔피언의 테두리 색상 */
}

.circle-img.selected {
  border: 2px solid #F7F4F3;
  opacity: 0.6;
} 

.circle-img.fixed {
  border: 2px solid #cf4529; /* 고정된 챔피언의 테두리 색상 */
}

.search-bar-container {
  display: flex;
  align-items: center;
  justify-content: center; /* 검색창이 가운데로 유지되도록 설정 */
  margin-top: 20px;
  margin-bottom: 20px;
}

.search-bar {
  width: 50%;
  padding: 10px;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  align-items: center;
  margin-left: 10px; /* 검색창과 버튼 사이의 간격 조정 */
}

.action-button {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #364156;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

.action-button.info {
  position: relative;
}

.tooltip {
  position: absolute;
  top: 120px; /* 검색창과 툴팁 사이의 간격 조정 */
  right: 0;
  background: #364156;
  color: white;
  padding: 5px;
  border-radius: 3px;
  width: 200px; /* 툴팁의 너비 설정 */
  text-align: center;
}

.champion-list-container {
  margin-left: auto;
  margin-right: auto;
  background-color: #11151C;
  border: 1px solid #212D40;
  width: 90%;
  height: 350px;
  overflow-y: auto; /* 기본적으로 스크롤바 숨김 */
}

.champion-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}

.champion {
  border-radius: 50%;
  margin: 10px;
}

.champion img {
  object-fit: cover;
  cursor: pointer;
}

.submit-button {
  font-family: 'Cafe24Moyamoya-Regular-v1.0';
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  background: linear-gradient(270deg, #62D6C0, #5BC7CE, #54B9DC, #4DAAE9, #469CF8);
  color: white;
  border: none;
  cursor: pointer;
}

.optimal-combination {
  margin-top: 20px;
  margin-bottom: 120px;
  text-align: center;
  color: #F7F4F3; /* 조합 결과 텍스트 색상 변경 */
}

.optimal-combination .optimal-champion-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.optimal-combination .optimal-champion-list .champion img.fixed {
  border: 2px solid #cf4529;
}

.optimal-combination .optimal-champion-list .champion img {
  border: 2px solid #F7F4F3;
}

.error-message {
  color: #cf4529;
  margin-top: 20px;
  text-align: center;
}
</style>
