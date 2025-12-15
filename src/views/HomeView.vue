<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Women's Football Application</h1>
      <p>Your home for the latest news, merchandise, and fun around women’s football.</p>
      <button @click="goToNews">Explore Latest News</button>
    </section>

    <!-- Features Section -->
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

    <!-- Call to Action -->
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
    }
  }
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

.hero p {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.hero button {
  background: white;
  color: #7b2cbf;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  padding: 3rem 1.5rem;
  background: #f8f9fa;
}

.feature {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.feature h2 {
  margin-bottom: 0.5rem;
}

.cta {
  text-align: center;
  padding: 3rem 1.5rem;
}

.cta button {
  background: #7b2cbf;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
