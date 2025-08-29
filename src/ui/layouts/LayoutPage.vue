<script setup>
import TheHeader from "@/ui/components/TheHeader.vue";
import TheFooter from "@/ui/components/TheFooter.vue";
</script>

<template>
  <div class="page">
    <TheHeader/>
    <div class="content">
      <slot></slot>
    </div>
    <TheFooter class="inv"/>
  </div>
</template>

<style lang="scss" scoped>
.page {
  background: $color-beige-light;
  overflow-x: hidden;
  min-height: 200vh;
}
</style>
