import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CombineView from '../views/CombineView.vue';
import ChampionsView from '../views/ChampionsView.vue';
import ItemsView from '../views/ItemsView.vue';

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
    path: '/champions',
    name: 'Champions',
    component: ChampionsView
  },
  {
    path: '/items',
    name: 'Items',
    component: ItemsView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
