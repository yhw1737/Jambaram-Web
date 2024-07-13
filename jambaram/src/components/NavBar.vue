<template>
  <div class="top-ad">
    <img src="../assets/광고예시.png" height=100%>
  </div>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="dropdown">
        <button class="dropdown-toggle">
          <img src="../assets/logo.png" alt="Logo">
          <span>JAMBARAM.XYZ</span>
        </button>
      </div>
    </div>
    <div class="navbar-middle">
      <router-link to="/" class="nav-item" exact-active-class="active">홈</router-link>
      <router-link to="/champions" class="nav-item" exact-active-class="active">챔피언</router-link>
      <router-link to="/about" class="nav-item" exact-active-class="active">?</router-link>
    </div>
    <div class="navbar-right">
      <span class="nav-item">마이페이지</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>

.top-ad {
  background-color: transparent;
  height: 100px;
  width: 100vw;
}

.navbar {
  display: grid;
  width: 100%;
  box-sizing: border-box;
  background-color: #2C2F33;
  justify-content: space-between;
  grid-template-columns: 200px 1fr 100px;
  align-items: center;
  padding: 0px 15px;
}

.navbar-left, .navbar-middle, .navbar-right {
  display: flex;
  align-items: center;
}

.navbar-left .nav-logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin-right: 20px;
}

.nav-item {
  width: 50px;
  color: white;
  margin: 0 5px;
  padding: 10px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item:hover {
  background-color: #23272A;
  color: white;
}

.active {
  background-color: #7289DA;
  color: white;
}

.active:hover {
  background-color: #7289DA;
  color: white;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 14px;
}

.dropdown-toggle img {
  height: 20px;
  margin-right: 5px;
}
</style>
