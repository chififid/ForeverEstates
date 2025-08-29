<script setup>
import { onMounted } from "vue";
import { useImageLoader } from "@/composables/useImageLoader.js";

const props = defineProps({
  review: {
    type: Object,
    required: true
  },
  isVideo: {
    type: Boolean,
    default: false
  },
  showGoogleIcon: {
    type: Boolean,
    default: true
  }
});

const { imageSrc, loadImage } = useImageLoader();

onMounted(() => {
  if (!props.isVideo) {
    loadImage(`reviews/${props.review.avatar}`);
  }
});
</script>

<template>
  <div class="review-card">
    <div class="review-header">
      <img v-if="!isVideo" :src="imageSrc" class="avatar" />
      <div class="review-info">
        <div class="author-name">{{ review.author }}</div>
        <div class="review-date">{{ review.date }}</div>
      </div>
      <img v-if="!isVideo && showGoogleIcon" src="@/assets/images/reviews/google.svg" class="google-icon" />
    </div>

    <div class="stars" :class="{ 'stars-video': isVideo }">
      <img v-for="i in review.stars" :key="i" src="@/assets/images/reviews/star.svg" class="star" />
    </div>


    <div v-if="!isVideo" class="review-text">
      {{ review.text }}
    </div>


    <div v-if="isVideo" class="video-container">
      <div class="youtube-player">
        <div class="black-screen"></div>
      </div>
    </div>

    <div v-if="!isVideo" class="check-link">
      <div class="check-text">{{ review.checkText }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.review-card {
  padding: 25px;
  max-width: 600px;
  width: 100%;
  background: linear-gradient(126deg, #F3E8FF -11.56%, #FFF 16.68%, #FFF 73.72%, #DAE5F8 134.39%);
  border-radius: $radius-md;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 40px;
}

.review-info {
  flex: 1;
}

.author-name {
  font-size: $font-size-base;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
}

.review-date {
  color: $color-grey;
  font-family: Inter;
  font-size: $font-size-sm;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
}

.google-icon {
  width: 24px;
  height: 24px;
}

.stars {
  margin-bottom: 4px;
  display: inline-flex;
  gap: 2px;

  &.stars-video {
    margin-bottom: 8px;
  }
}

.star {
  width: 20px;
  height: 20px;
}

.review-text {
  font-size: $font-size-base;
  font-style: normal;
  line-height: 125%;
}

.youtube-player {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  border-radius: $radius-sm;
}

.black-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  border-radius: $radius-sm;
}

.check-text {
  color: $color-blue;
  font-size: $font-size-sm;
  cursor: pointer;
  margin-top: 6px;
  line-height: 20px;
  position: relative;
  width: max-content;
  margin-left: auto;
  transition: opacity $transition ease;

  &::after {
    content: "";
    display: block;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 1.5px;
    background: $color-blue;
  }

  &:hover {
    opacity: 0.7;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .review-card {
    padding: 20px;
  }
}

</style>