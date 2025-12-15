<template>
  <div class="chat-container">
    <h2>Live Chat</h2>

    <ul class="messages" ref="messagesList">
      <li v-for="msg in messages" :key="msg.id" :class="{ own: msg.userId === currentUser.uid }">
        <div class="message-header">
          <span class="username">{{ msg.username }}</span>
          <span class="timestamp">{{ formatTimestamp(msg.timestamp) }}</span>
        </div>
        <div class="message-text" v-if="msg.text" v-html="formatEmoji(msg.text)"></div>
        <img v-if="msg.imageUrl" :src="msg.imageUrl" class="chat-image" />
      </li>
    </ul>

    <div class="input-container">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <input type="file" @change="handleImageUpload" accept="image/*" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { db, auth } from '@/firebase'
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const router = useRouter()
const messages = ref([])
const newMessage = ref('')
const messagesList = ref(null)
const userCache = {}
const storage = getStorage()
const selectedImage = ref(null)

// Redirect if not logged in
const currentUser = auth.currentUser
if (!currentUser) router.push('/login')

// Firestore reference
const messagesRef = collection(db, 'messages')

// Real-time listener
onMounted(() => {
  const q = query(messagesRef, orderBy('timestamp'))
  onSnapshot(q, async (snapshot) => {
    messages.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    await nextTick()
    scrollToBottom()
  })
})

// Send a new message
const sendMessage = async () => {
  if (!newMessage.value.trim() && !selectedImage.value) return

  let imageUrl = null

  // Upload image to Firebase Storage if selected
  if (selectedImage.value) {
    const imageRef = storageRef(storage, `chatImages/${Date.now()}_${selectedImage.value.name}`)
    await uploadBytes(imageRef, selectedImage.value)
    imageUrl = await getDownloadURL(imageRef)
    selectedImage.value = null
  }

  // Fetch username from Firestore or use cached
  const username = await getUsername(currentUser.uid)

  // Save message in Firestore
  await addDoc(messagesRef, {
    text: newMessage.value.trim() || '',
    imageUrl: imageUrl,
    userId: currentUser.uid,
    username: username,
    timestamp: serverTimestamp(),
  })

  newMessage.value = ''
}

const getUsername = async (uid) => {
  if (userCache[uid]) return userCache[uid]

  const userDoc = await getDoc(doc(db, 'users', uid))
  const name = userDoc.exists() ? userDoc.data().name || 'Anonymous' : 'Anonymous'
  userCache[uid] = name
  return name
}

const handleImageUpload = (event) => {
  selectedImage.value = event.target.files[0]
}

// Auto-scroll to latest message
const scrollToBottom = () => {
  if (messagesList.value) {
    messagesList.value.scrollTop = messagesList.value.scrollHeight
  }
}

// Format timestamp
const formatTimestamp = (ts) => {
  if (!ts) return ''
  const date = ts.toDate()
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Simple emoji support: converts text like ":smile:" to actual emoji
const emojiMap = {
  ':smile:': '😄',
  ':heart:': '❤️',
  ':thumbsup:': '👍',
  ':laugh:': '😂',
}

const formatEmoji = (text) => {
  let formatted = text
  for (const [code, emoji] of Object.entries(emojiMap)) {
    formatted = formatted.replaceAll(code, emoji)
  }
  return formatted
}
</script>

<style scoped>
.chat-container {
  max-width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
}

.messages {
  list-style: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.messages li {
  margin-bottom: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  background-color: #74a7e2;
  color: #222222;
  max-width: 80%;
}

.messages li.own {
  background-color: #4caf50;
  color: #ffffff;
  margin-left: auto;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 2px;
  color: #555;
}

.username {
  font-weight: bold;
}

.timestamp {
  font-style: italic;
}

.message-text {
  white-space: pre-wrap;
}

.input-container {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}

.chat-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 5px;
}
</style>
