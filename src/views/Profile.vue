<template>
  <div class="profile-container">
    <h2>My Profile</h2>
    <p><strong>Email:</strong> {{ userEmail }}</p>

    <input v-model="name" placeholder="Name" />
    <textarea v-model="bio" placeholder="Bio"></textarea>

    <button @click="saveProfile">Save Profile</button>
    <button @click="logout" class="logout-button">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase'
import { saveUserProfile, getUserProfile } from '@/services/profile'
import { onAuthStateChanged } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const userEmail = ref('')
const name = ref('')
const bio = ref('')

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userEmail.value = user.email
    const profile = await getUserProfile(user.uid)
    if (profile) {
      name.value = profile.name || ''
      bio.value = profile.bio || ''
    }
  } else {
    // Redirect to login if not logged in
    window.location.href = '/login'
  }
})

const saveProfile = async () => {
  const user = auth.currentUser
  if (!user) return
  await saveUserProfile(user.uid, {
    name: name.value,
    bio: bio.value,
  })
  alert('Profile saved!')
}

const logout = async () => {
  try {
    await signOut(auth)
    // Redirect to login page after logout
    router.push('/login')
  } catch (error) {
    alert('Error logging out: ' + error.message)
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input,
textarea {
  width: 100%;
  padding: 8px;
}
button {
  padding: 10px;
  cursor: pointer;
}
.logout-button {
  padding: 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}
.logout-button:hover {
  background-color: #d9363e;
}
</style>
