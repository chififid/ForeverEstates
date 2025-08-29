<script setup>
import HomePageAboutUsCard from "@/ui/pages/Home/HomePageAboutUsCard.vue";
import about from "@/assets/content/about.json";
</script>

<template>
  <section class="about-us">
    <div class="container">
      <h2 class="section-title">{{ about.title }}</h2>
      
      <div class="content-grid">
        <HomePageAboutUsCard 
          v-for="card in about.cards" 
          :key="card.title"
          :card="card"
          class="about-us-card"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-us {
  padding: calc($padding-block / 3 * 2) 0;
}

.container {
  max-width: calc($max-container-width - $padding-side * 2);
  margin: 0 auto;
  padding: 0 $padding-side;
  position: relative;
}

.section-title {
  margin-bottom: 30px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-lg;

  .about-us-card {
    &:last-child {
      grid-column: 2;
      grid-row: 1 / span 3;
    }
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .about-us {
    padding: calc($padding-block-lg / 3 * 2) 0;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: $spacing-md;
    
    .about-us-card {
      &:last-child {
        grid-column: 1;
        grid-row: auto;
      }
    }
  }
}

@media screen and (max-width: $breakpoint-md) {
  .container {
    padding: 0 $padding-side-adaptive;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .about-us {
    padding: calc($padding-block-sm / 3 * 2) 0;
  }
}
</style>