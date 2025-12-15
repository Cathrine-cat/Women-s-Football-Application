<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Login</h2>

      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <div class="button-row">
        <button @click="login">Login</button>
        <button @click="register">Register</button>
      </div>

      <hr />

      <button class="google" @click="google">Login with Google</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginWithEmail, registerWithEmail, loginWithGoogle, logout } from '@/services/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

const login = async () => {
  try {
    const result = await loginWithEmail(email.value, password.value)

    if (!result.user.emailVerified) {
      alert('Please verify your email before logging in.')
      await logout()
      return
    }

    router.push('/home')
  } catch (e) {
    alert(e.message)
  }
}

const register = async () => {
  try {
    await registerWithEmail(email.value, password.value)
    alert('Verification email sent! Please check your inbox.')
    router.push('/login')
  } catch (err) {
    alert(err.message)
  }
}

const google = async () => {
  try {
    await loginWithGoogle()
    alert('Logged in successfully!')
    router.push('/home')
  } catch (err) {
    alert(err.message)
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 320px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 8px;
  font-size: 14px;
}

.button-row {
  display: flex;
  gap: 10px;
}

.button-row button {
  flex: 1;
}

button {
  padding: 8px;
  cursor: pointer;
}

button.google {
  background-color: #4285f4;
  color: white;
  border: none;
}
</style>
