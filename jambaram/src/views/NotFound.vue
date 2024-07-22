<template>
  <div class="not-found-container">
    <h1>다시 한번 확인해 주세요!</h1>
    <p>지금 입력하신 주소의 페이지는 사라졌거나 다른 페이지로 변경되었습니다.<br>주소를 다시 확인해주세요.</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  background-color: #111;
}

.not-found-container h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.not-found-container p {
  font-size: 1.2em;
  line-height: 1.5;
}

.not-found-container a {
  color: #4d90fe;
  text-decoration: none;
}

.not-found-container a:hover {
  text-decoration: underline;
}
</style>
