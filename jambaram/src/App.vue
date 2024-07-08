<template>
<div>
  <div class="menu">
    <a v-for="i in 메뉴" :key="i">{{ i }}</a>
  </div>
  <div v-for="(a,i) in products" :key="i">
    <h4>{{ a }}</h4>
    <p>{{ prices[i] }} 만원</p>
  </div>
</div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      prices : [60, 70, 80],
      메뉴 : ['Home', 'Shop', 'About'],
      products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.menu{
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a{
  color: white;
  padding: 10px;
}

</style>
