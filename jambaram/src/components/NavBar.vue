<template>
  <div class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo-link">
        <img src="../assets/logo.png" alt="로고" class="logo" />
        <span class="site-name">잼바람</span>
      </router-link>
      <div class="navbar-center">
        <router-link to="/" class="menu-item" exact>홈</router-link>
        <router-link to="/combine" class="menu-item">조합</router-link>
        <router-link to="/champions" class="menu-item">챔피언</router-link>
        <router-link to="/items" class="menu-item">아이템</router-link>
      </div>
    </div>
    <div class="separator"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  mounted() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        item.style.setProperty('--mouse-y', `${rect.height}px`);
        item.classList.add('hovering'); // Add hovering class
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('hovering'); // Remove hovering class on mouse leave
      });
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
  height: 80px; /* Set height to 80px */
  overflow: hidden; /* Ensure gradient doesn't overflow */
}

.menu-item:hover,
.menu-item:focus,
.menu-item.router-link-active {
  color: white;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 60px; /* Maintain gradient height */
  background: linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0)); /* Gradient from bottom to top */
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1; /* Ensure it is behind the navbar background */
}

.menu-item.hovering::before,
.menu-item:hover::before,
.menu-item:focus::before,
.menu-item.router-link-active::before {
  opacity: 1;
}

.menu-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* Ensure gradient matches the height */
  pointer-events: none;
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(200, 190, 180, 0.3), transparent 50%);
  opacity: 0;
  transition: opacity 0.3s, background 0.3s;
}

.menu-item.hovering::after,
.menu-item:hover::after,
.menu-item:focus::after {
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
</style>
