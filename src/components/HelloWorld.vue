<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Click Me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello Vue!"
    }
  },
  methods: {
    changeMessage() {
      this.message = "You clicked the button!"
    }
  }
}
</script>

<style scoped>
.hello {
  text-align: center;
}
</style>
