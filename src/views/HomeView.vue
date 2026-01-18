<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Women's Football Application</h1>
      <p>Your home for the latest news, merchandise, and fun around women’s football.</p>
      <button @click="goToNews">Explore Latest News</button>
    </section>

    <section class="features">
      <div class="feature">
        <h2>📰 Latest News</h2>
        <p>Stay up to date with articles from leagues, clubs, and players around the world.</p>
      </div>
      <div class="feature">
        <h2>🛍️ Merchandise</h2>
        <p>Find and buy official merchandise from your favorite women’s football teams.</p>
      </div>
      <div class="feature">
        <h2>🎮 Mini Games</h2>
        <p>Have fun with simple football-themed games while supporting the sport.</p>
      </div>
    </section>

    <section class="cta">
      <h2>Support Women’s Football</h2>
      <p>Discover stories, celebrate players, and be part of the growing community.</p>
      <button @click="goToShop">Visit the Shop</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToNews() {
      this.$router.push('/news')
    },
    goToShop() {
      this.$router.push('/shop')
    },
  },
}
</script>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  color: #222;
}

.hero {
  background: linear-gradient(135deg, #7b2cbf, #c77dff);
  color: white;
  text-align: center;
  padding: 4rem 1rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
</style>
