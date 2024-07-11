<template>
  <div class="home-container">
    <img src="../assets/칼바람.jpg" class="home-img">
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style>
.home-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-img {
  width: 100%;
  height: auto;
  max-height: 400px; /* 세로 길이를 제한하여 가로로 넓게 보이도록 설정 */
  object-fit: cover;
}
</style>
