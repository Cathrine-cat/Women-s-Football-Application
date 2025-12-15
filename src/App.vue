<template>
  <header v-if="showNav">
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link to="/news">News</router-link>
    </nav>
  </header>

  <router-view />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showNav = ref(route.path !== '/login')

// Update showNav whenever the route changes
watch(route, (newRoute) => {
  showNav.value = newRoute.path !== '/login'
})
</script>

<style scoped>
header {
  position: fixed; /* sticks to viewport */
  top: 0; /* top of page */
  left: 0; /* top-left corner */
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* stays above other elements */
  display: flex;
  gap: 10px;
}

header nav {
  display: flex;
  gap: 10px;
}

header a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>
