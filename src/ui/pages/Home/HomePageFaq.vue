<script setup>
import { ref, computed } from "vue";
import HomePageFaqItem from "@/ui/pages/Home/HomePageFaqItem.vue";
import faqData from "@/assets/content/faq.json";

const openItem = ref(null);


const faqItems = computed(() => {
  return faqData.items.map((item, index) => ({
    ...item,
    id: (index + 1).toString().padStart(2, "0")
  }));
});

const toggleItem = (id) => {

  if (openItem.value === id) {
    openItem.value = null;
  } else {

    openItem.value = id;
  }
};
</script>

<template>
  <section class="faq">
    <div class="container">
      <h2 class="title">{{ faqData.title }}</h2>

      <div class="faq-list">
        <home-page-faq-item
          v-for="item in faqItems"
          :key="item.id"
          :item="item"
          :is-open="openItem === item.id"
          @toggle="toggleItem"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  background: white;
  padding: $padding-block 0 calc($padding-block / 2) 0;
}

.container {
  max-width: calc($max-container-width - $padding-side * 2);
  margin: 0 auto;
  padding: 0 $padding-side;
}

.faq-list {
  margin-top: 40px;
  overflow: hidden;
}

@media screen and (max-width: $breakpoint-lg) {
  .faq {
    padding: $padding-block-lg 0 calc($padding-block-lg / 2) 0;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .container {
    padding: 0 $padding-side-adaptive;
  }

  .faq-list {
    margin-top: 30px;
    overflow: hidden;
  }
}


@media screen and (max-width: $breakpoint-sm) {
  .faq {
    padding: $padding-block-sm 0 calc($padding-block-sm / 2) 0;
  }
}
</style>
