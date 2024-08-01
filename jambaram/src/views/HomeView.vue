<template>
  <div class="home-container">
    <div class="search-bar-container">
      <router-link to="/" class="logo" v-if="!isMobile">
        <img src="../assets/image.png">
      </router-link>
      <input type="text" v-model="summonerName" @keyup.enter="searchSummoner" placeholder="summoner#KR1" class="search-bar">
      <img src="../assets/search.png" alt="search icon" class="search-icon" @click="searchSummoner">
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      summonerName: '',
      summonerInfo: null,
    };
  },
  methods: {
    async searchSummoner() {
      if (this.summonerName.trim() !== '') {
        this.$router.push(`/search/${this.summonerName.trim()}`);
      }
    }
  }
}
</script>

<style>
.logo img {
  width: 60%;
}

.home-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.search-bar-container {
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20vh;
}

.search-bar {
  margin-top: 10vh;
  height: 20px;
  width: 60%;
  padding: 10px 20px;
  font-family: 'Pretendard-regular';
  font-size: 12px;
  font-weight: lighter;
  border-radius: 20px;
  background-color: #F7F4F3; 
  border: none;
}

.search-bar:focus {
  outline: none; /* 포커스 시 외곽선 제거 */
}

.search-icon {
  width: 11px;
  height: 10px;
  margin-left: -30px;
}
</style>
