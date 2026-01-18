<template>
  <div class="shop-container">
    <h2>Shop</h2>

    <div v-if="items.length === 0" class="empty">No items available.</div>

    <div class="items-grid">
      <div v-for="item in items" :key="item.id" class="item-card">
        <img :src="item.image" :alt="item.name" />

        <h3>{{ item.name }}</h3>

        <p class="description">{{ item.description }}</p>

        <p class="price">£{{ item.price.toFixed(2) }}</p>

        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

const items = ref([])

// Fetch shop items from Firestore
onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'shopItems'))
  items.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
})

// Basic cart (localStorage for now)
const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')

  const existing = cart.find((i) => i.id === item.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({
      ...item,
      quantity: 1,
    })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  alert(`${item.name} added to cart`)
}
</script>

<style scoped>
.shop-container {
  max-width: 1000px;
  margin: 80px auto;
  padding: 0 20px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.item-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.item-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.description {
  font-size: 0.9rem;
  color: #555;
  margin: 8px 0;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
  margin: 10px 0;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #43a047;
}

.empty {
  text-align: center;
  color: #777;
}
</style>
