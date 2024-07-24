<template>
  <div class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo-link">
        <img src="../assets/icon03.png" alt="로고" class="logo" />
        <span class="site-name">잼바람<span class="site-name2">.XYZ</span></span>
      </router-link>
      <div class="navbar-center">
        <router-link to="/" class="menu-item" exact>홈</router-link>
        <router-link to="/combine" class="menu-item" exact>조합</router-link>
        <router-link to="/champions" class="menu-item" exact>챔피언</router-link>
        <router-link to="/spells" class="menu-item" exact>스펠</router-link>
        <router-link to="/items" class="menu-item" exact>아이템</router-link>
        <router-link to="/runes" class="menu-item" exact>룬</router-link>
      </div>
    </div>
    <div class="navbar-right">
      <div class="version-info">v14.14.1</div>
      <select class="language-select" v-model="selectedLanguage" @change="changeLanguage">
        <option value="ko">한국어</option>
        <option value="en">English(disabled)</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      selectedLanguage: 'ko',
    };
  },
  methods: {
    changeLanguage() {
      // 언어 변경 로직을 여기에 추가하세요.
      console.log('Language changed to:', this.selectedLanguage);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (window.history.state && window.history.state.back) {
      // 뒤로 가기 감지
      this.$router.go(0);
    } else {
      next();
    }
  },
};
</script>

<style>
.navbar {
  top: 0;
  left: 0;
  right: 0;
  height: 60px; /* Adjusted height */
  background-color: #364156;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Separator */
}

.navbar-left {
  padding-left: 100px;
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  height: 60px;
  margin-right: 10px; 
}

.site-name {
  font-family: 'Cafe24Moyamoya-Regular-v1.0';
  color: white;
  font-size: 45px;
  font-weight: light;
}

.site-name2 {
  font-family: 'Cafe24Moyamoya-Regular-v1.0';
  color: white;
  font-size: 20px;
}

.navbar-center {
  display: flex;
  margin-left: 50px;
}

.menu-item {
  font-family: 'Cafe24SsurroundAir';
  background: none;
  border: none;
  color: #959595; /* Extracted color */
  font-size: 18px; /* Increased font size */
  margin: 0 10px; /* 간격 조정 */
  padding: 0 20px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 40px; /* Set height to 50px */
  transition: background-color 0.3s, color 0.3s; /* Transition 효과 추가 */
}

.menu-item:hover,
.menu-item:focus,
.menu-item.router-link-exact-active {
  background-color: #212D40; /* 마우스 오버 및 포커스 시 배경색 */
  color: white;
}

.navbar-right {
  padding-right: 100px;
  display: flex;
  align-items: center;
}

.version-info {
  color: white;
  margin-right: 20px;
  font-family: 'Cafe24SsurroundAir';
}

.language-select {
  padding: 5px;
  font-family: 'Cafe24SsurroundAir';
}

@media (max-width: 1200px) {
  .navbar-center {
    display: none;
  }
}
</style>
