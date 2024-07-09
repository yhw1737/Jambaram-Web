<template>
    <div>
      <h1>Champions</h1>
      <div v-for="(champion, index) in champions" :key="index" class="champion">
        <h2>{{ champion.name }}</h2>
        <p>{{ champion.role }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChampionsView',
    data() {
      return {
        champions: [
          { name: 'Ahri', role: 'Mage' },
          { name: 'Aatrox', role: 'Fighter' },
          // ... 더 많은 챔피언 정보
        ]
      }
    }
  }
  </script>
  
  <style>
  .champion {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
  }
  </style>
  