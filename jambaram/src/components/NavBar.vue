<template>
  <div class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo-link">
        <img src="../assets/icon03.png" alt="로고" class="logo" />
        <span class="site-name">잼바람</span>
      </router-link>
      <div class="navbar-center">
        <router-link to="/" class="menu-item" exact>홈</router-link>
        <router-link to="/combine" class="menu-item">조합</router-link>
        <router-link to="/champions" class="menu-item">챔피언</router-link>
        <router-link to="/spells" class="menu-item">스펠</router-link>
        <router-link to="/items" class="menu-item">아이템</router-link>
        <router-link to="/runes" class="menu-item">룬</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style>
.navbar {
  top: 0;
  left: 0;
  right: 0;
  height: 50px; /* Adjusted height */
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Separator */
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

.logo {
  height: 20px;
  margin-right: 10px; 
}

.site-name {
  color: white;
  font-size: 20px; /* Increased font size */
  font-weight: bold;
}

.navbar-center {
  display: flex;
  margin-left: 50px;
}

.menu-item {
  background: none;
  border: none;
  color: #c8aa6e; /* Extracted color */
  font-size: 18px; /* Increased font size */
  padding: 0 15px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 50px; /* Set height to 50px */
}

.menu-item:hover,
.menu-item:focus,
.menu-item.router-link-active {
  color: white;
}
</style>
