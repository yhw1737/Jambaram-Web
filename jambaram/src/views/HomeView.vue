<template>
  <div class="home-container">
    <div class="search-bar-container">
      <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="플레이어+태그 전적검색" class="search-bar">
      <img src="../assets/search.png" alt="search icon" class="search-icon">
    </div>
    <div class="patch-notes-container" v-if="patchNotes">
      <h2>최신 패치 노트</h2>
      <div v-for="(note, index) in patchNotes" :key="index" class="patch-note-item">
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      summonerName: '',
      patchNotes: null,
    };
  },
  methods: {
    searchSummoner() {
      if (this.summonerName.trim() !== '') {
        console.log(this.summonerName);
        // 실제 검색 기능 구현
      }
    },
    async fetchPatchNotes() {
      try {
        const response = await axios.get('https://kr.api.riotgames.com/lol/status/v4/platform-data', {
          headers: {
            'X-Riot-Token': 'YOUR_API_KEY' // 여기에 라이엇 API 키를 넣으세요
          }
        });
        this.patchNotes = response.data.status.maintenances; // 예시 데이터 구조, 실제 데이터 구조에 맞게 수정 필요
      } catch (error) {
        console.error('Failed to fetch patch notes:', error);
      }
    }
  },
  async mounted() {
    await this.fetchPatchNotes();
  }
}
</script>

<style>
.home-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 100px; /* 메뉴바 높이만큼 패딩 추가 */
}

.search-bar-container {
  position: absolute;
  top: 20px;
  right: 300px;
  display: flex;
  align-items: center;
}

.search-bar {
  width: 200px;
  padding: 10px;
  font-size: 16px;
  border-radius: 20px; /* 둥근 모서리 추가 */
  background-color: #e0e0e0; /* 약간 어둡게 */
  border: none; /* 테두리 제거 */
}

.search-bar:focus {
  outline: none; /* 포커스 시 외곽선 제거 */
}

.search-icon {
  width: 11px;
  height: 10px;
  margin-left: -25px; /* 검색창 오른쪽에 배치 */
  cursor: pointer;
}

.patch-notes-container {
  width: 100%;
  max-width: 800px;
  margin-top: 50px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.patch-note-item {
  margin-bottom: 20px;
}

.patch-note-item h3 {
  margin: 0 0 10px 0;
}

.patch-note-item p {
  margin: 0;
}
</style>
