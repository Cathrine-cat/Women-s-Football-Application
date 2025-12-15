import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Chat from '../views/Chat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/home', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/chat', component: Chat },
  ],
})

export default router
