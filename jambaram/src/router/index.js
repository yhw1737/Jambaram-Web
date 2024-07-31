import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CombineView from '../views/CombineView.vue';
import NotFound from '../views/NotFound.vue';
import SummonerView from '../views/SummonerView.vue';
import ChampionsView from '../views/ChampionsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/combine',
    name: 'Combinations',
    component: CombineView
  },
  {
    path: '/champion',
    name: 'Champions',
    component: ChampionsView
  },
  {
    path: '/search/:summonerName',
    name: 'Summoner',
    component: SummonerView
  },
  {
    path: '/:pathMatch(.*)*', // catch all routes
    name: 'not-found',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
