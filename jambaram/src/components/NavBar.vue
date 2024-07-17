<template>
  <div class="navbar">
    <div class="navbar-left">
      <img src="../assets/logo.png" alt="로고" class="logo" />
      <span class="site-name">jambaram.xyz</span>
      <div class="navbar-center">
        <router-link to="/" class="menu-item" exact>홈</router-link>
        <router-link to="/champions" class="menu-item">조합</router-link>
        <router-link to="/about" class="menu-item">개발자</router-link>
      </div>
    </div>
    <div class="separator"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  mounted() {
    const navbar = document.querySelector('.navbar');
    navbar.addEventListener('mousemove', (e) => {
      const rect = navbar.getBoundingClientRect();
      navbar.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      navbar.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  }
}
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px; /* Adjusted height */
  background: linear-gradient(to bottom, black, transparent);
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

.logo {
  height: 60px;
  margin-right: 10px;
}

.site-name {
  color: white;
  font-size: 24px; /* Increased font size */
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
  position: relative;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
}

.menu-item:hover,
.menu-item:focus,
.menu-item.router-link-active {
  color: white;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 80px; /* Make gradient much larger vertically */
  padding: 0 15px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0)); /* Gradient from bottom to top */
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1; /* Ensure it is behind the navbar background */
}

.menu-item:hover::before,
.menu-item:focus::before,
.menu-item.router-link-active::before {
  opacity: 1;
}

.separator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2); /* White separator */
}

.navbar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.3), transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.navbar:hover::after {
  opacity: 1;
}
</style>
