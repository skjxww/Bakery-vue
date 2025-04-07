import { createRouter,  RouteRecordRaw, createWebHashHistory } from 'vue-router'
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
  },
  {
    path:'/cart',
    name:'Cart',
    component:()=>import('@/components/cartForm.vue'),
    meta:{isAuth:true}
  },
  {
    path: `/order/:orderId`,
    component:()=>import('@/components/order/ViewOrderView.vue'),
    meta:{isAuth:true}
  },
  //   github认证后的欢迎界面,可以去设置跳转到主页【现在是跳转到edit界面】
  {
    path: '/after',
    component:()=>import('@/components/account/welcomePage.vue')
  },
  {
    path: '/account',
    name: 'account',
    component:()=>import('@/components/account/accountForm.vue'),
    meta:{isAuth:true},
    children:[
      {
        path:'edit',
        name: 'edit',
        component:()=>import('@/components/account/edit/editAccountForm.vue'),

      },
      {
        path:'orderList',
        name:'orderList',
        component:()=>import('@/components/order/ListOrdersView.vue')
      }
    ]
  },
  {
    path:'/checkOut',
    name:"checkOut",
    component:()=>import('@/components/order/NewOrderFormView.vue'),
  },
  {
    path: '/welcome',
    name: 'welcome',
    component:()=>import('@/components/account/loginPage.vue'),
    children:[
      {
        path:'login',
        name:'welcome-login',
        component:()=>import('@/components/account/welcome/loginForm.vue')
      },
      {
        path:'register',
        name:'welcome-register',
        component:()=>import('@/components/account/welcome/newAccountForm.vue')
      },
      {
        path:'forget',
        name:'welcome-forget',
        component:()=>import('@/components/account/welcome/forgetForm.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory('/category'),
  routes:routes
})
router.beforeEach((to, from, next) => {
  if(to.meta.isAuth){
    if (sessionStorage.getItem('Authorization')) {
      next()  //放行
    } else {
      alert('请先登录')
      next({name: 'welcome-login'})
    }
  }
  next()
})

export default router;
