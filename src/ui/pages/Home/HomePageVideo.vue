<script setup>
import BaseButton from "@/ui/components/BaseButton.vue";
import HomePageVideoPlayer from "@/ui/pages/Home/HomePageVideoPlayer.vue";
import HomePageReviewCard from "@/ui/pages/Home/HomePageReviewCard.vue";
import video from "@/assets/content/video.json";
</script>

<template>
  <section class="video">
    <div class="container">
      <HomePageVideoPlayer video-id="th8wqvNqGQw" />

      <HomePageReviewCard :review="video.review" class="review" />

      <router-link :to="{ name: 'home', hash: '#contact' }" class="consultation-container">
        <BaseButton class="consultation-button">
          {{ video.cta.text }}
          <span class="active-icon">{{ video.cta.icon }}</span>
        </BaseButton>
      </router-link>
    </div>
  </section>
</template>

<style scoped lang="scss">
.video {
  padding: $padding-block 0 calc($padding-block/3);
}

.container {
  max-width: calc($max-container-width - 400px);
  margin: 0 auto;
  padding: 0 $padding-side;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.consultation-button {
  border-radius: 10px;
  background: $color-blue;
  box-shadow: $cta-shadow $color-blue-shadow;
}

.review {
  box-shadow: $common-shadow $color-black-shadow;
  border: 1px solid $color-grey-light;
  border-radius: 16px;
}

@media screen and (max-width: $breakpoint-lg) {
  .video {
    padding: $padding-block-lg 0 calc($padding-block-lg / 3);
  }
}

@media screen and (max-width: $breakpoint-md) {
  .container {
    padding: 0 $padding-side-adaptive;
  }

  .review {
    border-radius: 12px;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .container {
    gap: 20px;
  }

  .video {
    padding: $padding-block-sm 0 calc($padding-block-sm / 3);
  }

  .consultation-button, .consultation-container {
    width: 100%;
  }
}
</style>