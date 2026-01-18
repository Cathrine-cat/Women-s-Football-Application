<template>
  <div class="cart-container">
    <h2>Your Cart</h2>

    <p v-if="cart.length === 0">Your cart is empty.</p>

    <div v-else>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.image" />

        <div class="details">
          <h3>{{ item.name }}</h3>
          <p>£{{ Number(item.price).toFixed(2) }}</p>

          <div class="quantity">
            <button @click="decrease(item)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increase(item)">+</button>
          </div>

          <button class="remove" @click="remove(item)">Remove</button>
        </div>
      </div>

      <h3 class="total">Total: £{{ total }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const increase = (item) => {
  item.quantity++
  saveCart()
}

const decrease = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    remove(item)
  }
  saveCart()
}

const remove = (item) => {
  cart.value = cart.value.filter((i) => i.id !== item.id)
  saveCart()
}

const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 80px auto;
}

.cart-item {
  display: flex;
  gap: 15px;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.cart-item img {
  width: 100px;
  border-radius: 6px;
}

.details {
  flex: 1;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity button {
  padding: 4px 10px;
}

.remove {
  background: none;
  color: red;
  border: none;
  cursor: pointer;
}

.total {
  margin-top: 20px;
}
</style>
