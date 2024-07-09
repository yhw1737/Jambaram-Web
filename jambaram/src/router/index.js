import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ChampionsView from '../views/ChampionsView.vue';
import StatsView from '../views/StatsView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/champions',
    name: 'ChampionsView',
    component: ChampionsView
  },
  {
    path: '/stats',
    name: 'StatsView',
    component: StatsView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
