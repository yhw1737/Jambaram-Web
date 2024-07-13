<template>
  <div>
    <nav class="navbar-top">
      <div class="navbar-left">
        <div class="dropdown">
          <button class="dropdown-toggle">
            <img src="../assets/logo.png" alt="Logo">
            <span>JAMBARAM.XYZ</span>
          </button>
        </div>
      </div>
      <div class="navbar-right">
        <span class="nav-item">마이페이지</span>
      </div>
    </nav>
    <nav class="navbar-bottom">
      <router-link to="/" class="nav-item" exact-active-class="active">홈</router-link>
      <router-link to="/champions" class="nav-item" exact-active-class="active">챔피언</router-link>
      <router-link to="/about" class="nav-item" exact-active-class="active">?</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: #1A1D21;
  padding: 10px 15px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-bottom {
  display: flex;
  justify-content: flex-start;
  background-color: #2C2F33;
  padding: 10px 100px;
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 999;
}

.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
}

.nav-item {
  color: white;
  margin: 0 10px;
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
