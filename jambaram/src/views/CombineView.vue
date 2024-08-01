<template>
  <div>
    <transition-group name="list" tag="div" class="selected-champions" @leave="onLeave">
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
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="filterChampions" 
        @keyup.enter.exact="selectFirstChampion" 
        @keyup.shift.enter.exact="fixedFirstChampion" 
        placeholder="챔피언 검색" 
        class="search-bar"
      >
      <div class="action-buttons">
        <div class="action-button info" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">?</div>
        <div class="tooltip" v-if="showTooltip">챔피언을 선택하고, 고정하려면 우클릭하세요. 고정된 챔피언은 조합 결과에 필수 반영됩니다.<p>챔피언을 검색하고 엔터 키로 선택하며, 쉬프트+엔터 키로 고정합니다.</p></div>
      </div>
    </div>
    <div class="champion-list-container">
      <div class="champion-list">
        <div 
          v-for="(champion, index) in filteredChampions" 
          :key="index" 
          class="champion" 
          @click="selectChampionFromList(champion)"
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
      <div class="optimal-champion-list">
        <div v-for="(championId, index) in optimalCombination.champions" :key="index" class="champion">
          <img :src="getChampionImage(championId)" alt="champion" class="circle-img">
        </div>
        <div class="combination-details">
          <div class="detail">
            <span>승률</span>
            <span class="win-prob" :class="winProbColor">{{ (optimalCombination.win_prob * 100).toFixed(2) }}%</span>
          </div>
          <div class="detail">
            <div class="action-button small-info one" @mouseover="showTooltip2 = true" @mouseleave="showTooltip2 = false">?</div>
            <span>조합 점수</span>
            <span class="score">{{ Math.round(optimalCombination.score) }}</span>
          </div>
          <div class="tooltip second" v-if="showTooltip2">점수가 높을수록 조합의 딜 포텐셜이 높습니다.</div>
          <div class="detail">
            <span>랭크</span>
            <span class="tier">{{ tier }}</span>
          </div>
        </div>
        <div class="main-champion">
          <div class="action-button small-info two" @mouseover="showTooltip3 = true" @mouseleave="showTooltip3 = false">?</div>
          <img :src="getChampionImage(optimalCombination.main_champ)" alt="main champion" class="circle-img main">
        </div>
        <div class="tooltip third" v-if="showTooltip3">이 조합에 없어선 안되는 핵심 챔피언입니다.</div>
      </div>
      <div class="button-container">
        <button @click="copyToClipboard" class="copy-button">복사</button>
        <button @click="[resetChampions(), resetOptimal(), scrollToselection()]" class="reset-button">리셋</button>
      </div>
      <div v-if="copySuccess" class="copy-success">클립보드에 복사되었습니다</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

function getInitials(text) {
  const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  let initials = "";

  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c >= 0xAC00 && c <= 0xD7A3) {
      const unicode = c - 0xAC00;
      const choIndex = Math.floor(unicode / 588);
      initials += CHO[choIndex];
    } else {
      initials += text[i];
    }
  }
  return initials;
}

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
        win_prob: 0,
        main_champ: null,
        score: 0
      },
      loading: true,
      containerWidth: 0,
      errorMessage: '',
      showTooltip: false, // 툴팁 상태
      showTooltip2: false,
      showTooltip3: false,
      copySuccess: false, // 복사 성공 메시지 상태
      filteredChampionsCache: [] // 추가된 부분
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
      const query = this.searchQuery.toLowerCase();
      return this.champions.filter(champion => 
        champion.englishName.toLowerCase().includes(query) ||
        champion.koreanName.toLowerCase().includes(query) ||
        getInitials(champion.koreanName).includes(query)
      );
    },
    tier() {
      const winProb = this.optimalCombination.win_prob * 100;
      if (winProb > 65) {
        return 'S';
      } else if (winProb > 55) {
        return 'A';
      } else if (winProb > 45) {
        return 'B';
      } else {
        return 'C';
      }
    }
  },
  methods: {
    filterChampions() {
      // This will trigger a re-computation of filteredChampions
      this.filteredChampions = this.champions.filter(champion => 
        champion.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        champion.koreanName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        getInitials(champion.koreanName).includes(this.searchQuery.toLowerCase())
      );
    },
    selectFirstChampion() {
      if (this.filteredChampions.length > 0 && this.searchQuery != '') {
        this.toggleChampion(this.filteredChampions[0]);
        this.searchQuery = '';
      }
    },
    fixedFirstChampion() {
      if (this.filteredChampions.length > 0 && this.searchQuery != '') {
        this.toggleFixedChampion(this.filteredChampions[0]);
        this.searchQuery = '';
      }
    },
    isSelected(champion) {
      return this.selectedChampions.includes(champion);
    },
    isFixed(champion) {
      return this.fixedChampions.includes(champion);
    },
    isFixedById(championId) {
      return this.fixedChampions.some(champion => parseInt(champion.key) === championId);
    },
    isMainChampion(championId) {
      return championId == this.optimalCombination.main_champ;
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
    selectChampionFromList(champion) {
      this.toggleChampion(champion);
      this.searchQuery = ''; // 검색어 초기화
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
    resetOptimal() {
      this.optimalCombination = {
        champions: [],
        win_prob: 0,
        main_champ: null,
        score: 0
      };
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
          this.optimalCombination.main_champ = response.data.main_champ;
          this.optimalCombination.score = response.data.score;
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
    scrollToselection() {
      this.$nextTick(() => {
        const element = document.querySelector(".search-bar-container");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: "end" });
        }
      });
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
    },
    copyToClipboard() {
      const championNames = this.optimalCombination.champions.map(id => this.getChampionName(id)).join(', ');
      navigator.clipboard.writeText(championNames).then(() => {
        this.showCopySuccess();
      }).catch(() => {
        // fallback for unsupported environments
        const textArea = document.createElement('textarea');
        textArea.value = championNames;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          this.showCopySuccess();
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
      });
    },
    showCopySuccess() {
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    },
    getChampionName(id) {
      const champion = this.champions.find(champion => parseInt(champion.key) === id);
      return champion ? champion.koreanName : '';
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
  border: 2px solid #364156;
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

.circle-img.main {
  border: 2px solid transparent;
  background-image: linear-gradient(#fff, #fff), linear-gradient(270deg, #f5b1b0, #aa78d7, #4a90e2, #a0e8af);
  background-clip: content-box, border-box;
  background-origin: border-box;
}

.search-bar-container {
  display: flex;
  align-items: center;
  justify-content: center; /* 검색창이 가운데로 유지되도록 설정 */
  margin-top: 20px;
  margin-bottom: 20px;
}

.search-bar {
  margin: 0;
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
  width: 30px; /* 버튼 크기 키움 */
  height: 30px; /* 버튼 크기 키움 */
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #364156;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  font-size: 18px; /* 폰트 크기 조정 */
}

.action-button.info {
  position: relative;
}

.tooltip {
  position: absolute;
  top: 50px; /* 검색창과 툴팁 사이의 간격 조정 */
  right: 0;
  background: #364156;
  color: white;
  padding: 5px;
  border-radius: 3px;
  width: 200px; /* 툴팁의 너비 설정 */
  text-align: center;
}

.tooltip.second {
  top: 600px;
  right: 20px;
}
.tooltip.third {
  top: 600px;
  right: 20px;
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

.copy-button {
  font-family: 'Cafe24Moyamoya-Regular-v1.0';
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  background: #62D6C0;
  color: #F7F4F3;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.copy-success {
  font-family: 'Pretendard-Regular';
  color: #62D6C0;
  text-align: center;
  margin-top: 10px;
  animation: fadeOut 3s forwards;
  height: 20px; /* 고정된 높이 설정 */
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.optimal-combination {
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
  color: #F7F4F3; /* 조합 결과 텍스트 색상 변경 */
}

.optimal-combination .optimal-champion-list {
  height: 120px;
  border: 2px solid #212D40;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.optimal-combination .optimal-champion-list .champion {
  margin: 0 10px;
}

.optimal-combination .optimal-champion-list .combination-details {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
}

.combination-details .detail {
  margin: 0 20px;
  text-align: center;
}

.detail span {
  display: block;
}

.detail .win-prob,
.detail .score,
.detail .tier {
  font-size: 24px;
  font-weight: bold;
}

.optimal-combination .optimal-champion-list .main-champion {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0px;
}

.action-button.small-info {
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 12px;
}

.action-button.small-info.one {
  top: -25px;
  left: 15px;
}

.action-button.small-info.two {
  top: -25px;
  right: 28px;
}

.detail {
  position: relative; /* 조합 점수 툴팁 위치 조정 */
}

.main-champion {
  position: relative; /* 핵심 챔피언 툴팁 위치 조정 */
}

.optimal-combination .optimal-champion-list .champion img {
  border: 2px solid #9e9e9e;
  border-radius: 50%;
}

.optimal-combination .optimal-champion-list .main img {
  border: 2px solid transparent;
  background-image: linear-gradient(#fff, #fff), linear-gradient(270deg, #62D6C0, #5BC7CE, #54B9DC, #4DAAE9, #469CF8);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 50%;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.copy-button,
.reset-button {
  font-family: 'Cafe24Moyamoya-Regular-v1.0';
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 10px;
  background: #212D40;
  color: #F7F4F3;
  border: none;
  cursor: pointer;
}

.reset-button {
  background: #cf4529;
}

.error-message {
  color: #cf4529;
  margin-top: 20px;
  text-align: center;
}
</style>
