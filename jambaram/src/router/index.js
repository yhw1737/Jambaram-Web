import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CombineView from '../views/CombineView.vue';
import ChampionsView from '../views/ChampionsView.vue';
import SpellsView from '../views/SpellsView.vue';
import ItemsView from '../views/ItemsView.vue';
import RunesView from '../views/RunesView.vue';
import NotFound from '../views/NotFound.vue';

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
    path: '/spells',
    name: 'Spells',
    component: SpellsView
  },
  {
    path: '/items',
    name: 'Items',
    component: ItemsView
  },
  {
    path: '/runes',
    name: 'Runes',
    component: RunesView
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
