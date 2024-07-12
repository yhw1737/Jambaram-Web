<template>
  <nav class="navbar">
    <router-link to="/" class="nav-item" exact-active-class="active">Home</router-link>
    <router-link to="/champions" class="nav-item" exact-active-class="active">Champions</router-link>
    <router-link to="/about" class="nav-item" exact-active-class="active">About</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #34495e;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: calc(100% - 300px); /* Adjust width to exclude ad space */
  left: 150px; /* Position it correctly considering left ad */
  top: 0;
  z-index: 1000;
}

.nav-item {
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item:hover {
  background-color: #1abc9c;
  color: white;
}

.active {
  background-color: #e74c3c;
  color: white;
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.4);
}
</style>
