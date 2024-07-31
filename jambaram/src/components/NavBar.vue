<template>
  <div>
    <div class="navbar">
      <div class="navbar-left">
        <router-link to="/" class="logo-link" v-if="!isMobile">
          <span class="site-name">잼바람<span class="site-name2">.xyz</span></span>
        </router-link>
        <div class="navbar-center" v-if="!isMobile">
          <router-link to="/" class="menu-item" exact>홈</router-link>
          <router-link to="/combine" class="menu-item" exact>조합</router-link>
          <router-link to="/champion" class="menu-item" exact>챔피언</router-link>
        </div>
      </div>
      <div class="navbar-right" v-if="!isMobile">
        <div class="version-info">v14.14.1</div>
        <select class="language-select" v-model="selectedLanguage" @change="changeLanguage">
          <option value="ko">한국어</option>
          <option value="en">English(disabled)</option>
        </select>
      </div>
      <div class="navbar-center-mobile" v-if="isMobile">
        <button @click="toggleDropdown" class="dropdown-toggle">메뉴</button>
        <router-link to="/" class="logo-link mobile-logo">
          <span class="site-name">잼바람<span class="site-name2">.xyz</span></span>
        </router-link>
      </div>
    </div>
    <div v-if="isMobile && showDropdown" class="dropdown-menu">
      <div class="dropdown-content">
        <router-link to="/" class="menu-item" @click="toggleDropdown">홈</router-link>
        <router-link to="/combine" class="menu-item" @click="toggleDropdown">조합</router-link>
        <router-link to="/champion" class="menu-item" @click="toggleDropdown">챔피언</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      selectedLanguage: 'ko',
      isMobile: false,
      showDropdown: false,
    };
  },
  methods: {
    changeLanguage() {
      console.log('Language changed to:', this.selectedLanguage);
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  beforeRouteLeave(to, from, next) {
    if (window.history.state && window.history.state.back) {
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
  height: 60px;
  background-color: #364156;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.site-name {
  font-family: 'Cafe24Moyamoya-Regular-v1.0';
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(270deg, #62D6C0, #5BC7CE, #54B9DC, #4DAAE9, #469CF8);
  color: transparent;
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
  margin-left: 100px;
}

.navbar-center-mobile {
  display: none;
}

.menu-item {
  font-family: 'Pretendard-Regular';
  background: none;
  border: none;
  color: #959595;
  font-size: 16px;
  margin: 0 10px;
  padding: 0 20px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 40px;
  transition: background-color 0.3s, color 0.3s;
}

.menu-item:hover,
.menu-item:focus,
.menu-item.router-link-exact-active {
  background-color: #212D40;
  color: white;
}

.navbar-right {
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

.dropdown-menu {
  display: none;
}

.dropdown-toggle {
  display: none;
  background-color: #364156;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  border-radius: 10px;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  background-color: #364156;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  border: 1px solid #212D40;
  border-radius: 10px;
  z-index: 10;
}

@media (max-width: 768px) {
  .navbar-center,
  .navbar-right {
    display: none;
  }

  .navbar-left {
    margin: 0 auto;
  }

  .navbar-center-mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .dropdown-menu {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .dropdown-toggle {
    display: block;
  }

  .logo-link.mobile-logo {
    margin-left: auto;
    margin-right: auto;
  }

  .site-name {
    font-size: 30px;
  }

  .site-name2 {
    font-size: 15px;
  }
}
</style>
