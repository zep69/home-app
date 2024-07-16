import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import {auth} from "../firebase";
import {useUserStore} from "../stores/counter";
import {storeToRefs} from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name:'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path:'/home',
      name:'home',
      component:() => import('../views/home/Home.vue'),
      meta:{
        requiresAuth:true
      },
      children:[
        {
          path:'/home/profile',
          name:'profile',
          component:()=>import('../views/home/Profile.vue'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/home/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/home/AboutView.vue'),
          meta:{
            requiresAuth:true
          }
        }
      ]
    },
    { path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})

router.beforeEach((to,from,next)=>{

  console.log('router ', auth.currentUser)



  if(to.path ==='/login' && localStorage.token){
    next('/home')
    return
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !localStorage.token){
    next('/login')
    return;
  }
  next();
})

export default router
