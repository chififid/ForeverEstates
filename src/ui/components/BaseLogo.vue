<script setup>
import header from "@/assets/content/header.json";
import BaseLogoIcon from "@/ui/components/BaseLogoIcon.vue";
</script>

<template>
  <router-link :to="{ name: 'home' }" class="logo">
    <BaseLogoIcon class="icon"/>
    <span class="text">{{ header.logo }}</span>
  </router-link>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.icon {
  width: 40px;
  height: 40px;
}

.text {
  font-size: $font-size-lg;
  font-weight: 500;
}
</style>


