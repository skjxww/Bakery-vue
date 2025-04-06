import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import CategoryView from '../views/CategoryView.vue'
import ItemView from '@/views/ItemView.vue';
import ProductView from '@/views/ProductView.vue';
import ItemDetailView from '@/views/ItemDetailView.vue';
import SearchView from '@/views/SearchView.vue';
import CommentView from '@/views/CommentView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/category',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/review',
    name: 'review',
    component: CommentView
  },
  
  {
    path: '/item',
    name: 'item',
    component: ItemView
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView
  },
  {
    path: '/itemdetail/:itemId',
    name: 'itemDetail',
    component: ItemDetailView
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  }
]

const router = createRouter({
  history: createWebHashHistory('/category'),
  routes
})

export default router;
