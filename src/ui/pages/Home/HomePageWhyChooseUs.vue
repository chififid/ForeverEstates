<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import HomePageReviewCard from "@/ui/pages/Home/HomePageReviewCard.vue";
import HomePageWhyChooseUsCarousel from "@/ui/pages/Home/HomePageWhyChooseUsCarousel.vue";
import whyChooseUsData from "@/assets/content/why-choose-us.json";
import BaseMultiStepForm from "@/ui/components/BaseMultiStepForm.vue";
import { useContent } from "@/composables/useContent.js";

const reviewsData = whyChooseUsData;

const { generateUniqueId } = useContent();

const leftColumnContent = ref([]);
const rightColumnContent = ref([]);

const leftCounter = ref(0);
const rightCounter = ref(0);

const leftLoading = ref(false);
const rightLoading = ref(false);

const windowWidth = ref(window.innerWidth);

const showGoogleIconForTablet = ref(true);
const showContactsTextForTablet = ref(true);

const showContactsTextForMobile = computed(() => {
  return windowWidth.value >= 460;
});

const shouldWrapContacts = computed(() => {
  return windowWidth.value < 360;
});

const carouselHeight = computed(() => {
  if (windowWidth.value >= 1200) {
    return '800px';
  } else if (windowWidth.value >= 992) {
    return '700px';
  } else if (windowWidth.value >= 768) {
    return '600px';
  } else if (windowWidth.value >= 576) {
    return '400px';
  } else {
    return '300px';
  }
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  showGoogleIconForTablet.value = !(windowWidth.value < 1200 && windowWidth.value > 992);
  showContactsTextForTablet.value = !(windowWidth.value <= 1070 && windowWidth.value > 992);
};

const addContentToColumn = (columnType) => {
  const sourceData = columnType === "left" ? whyChooseUsData.leftColumn : whyChooseUsData.rightColumn;
  const counter = columnType === "left" ? leftCounter : rightCounter;
  const contentRef = columnType === "left" ? leftColumnContent : rightColumnContent;

  const newContent = sourceData.map(item => ({
    ...item,
    uniqueId: generateUniqueId(columnType)
  }));

  contentRef.value.push(...newContent);
  counter.value++;
};

const initializeContent = () => {
  addContentToColumn("left");
  addContentToColumn("right");
};

const handleContentNeededLeft = () => {
  if (leftLoading.value) return;

  leftLoading.value = true;
  addContentToColumn("left");

  setTimeout(() => {
    leftLoading.value = false;
  }, 500);
};

const handleContentNeededRight = () => {
  if (rightLoading.value) return;

  rightLoading.value = true;
  addContentToColumn("right");

  setTimeout(() => {
    rightLoading.value = false;
  }, 500);
};

onMounted(() => {
  initializeContent();
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <section class="reviews-section">
    <div class="container">
      <div class="content-wrapper">
        <div class="left-content">
          <h2 class="section-title">{{ reviewsData.title }}</h2>

          <div class="stats-card">
            <div class="stats-bg">
              <div class="stat-item">
                <div class="stat-number">{{ reviewsData.stats.clients }}</div>
                <div class="stat-text">{{ reviewsData.stats.clientsText }}</div>
              </div>

              <div class="stat-item">
                <div class="stat-number">{{ reviewsData.stats.deals }}</div>
                <div class="stat-text">{{ reviewsData.stats.dealsText }}</div>
              </div>
            </div>
          </div>

          <div class="cta">
            <BaseMultiStepForm class="cta-form" :showContactsText="showContactsTextForMobile && showContactsTextForTablet" :contacts-wrap="shouldWrapContacts"/>
          </div>
        </div>

        <HomePageWhyChooseUsCarousel class="carousel" :height="carouselHeight" :speed="30"
          @content-needed-left="handleContentNeededLeft" @content-needed-right="handleContentNeededRight">
          <div class="reviews-carousel">
            <div class="carousel-column column-1">
              <div v-for="item in leftColumnContent" :key="item.uniqueId" class="carousel-item">
                <HomePageReviewCard v-if="item.type === 'review'" :review="item" :is-video="false"
                  :showGoogleIcon="showGoogleIconForTablet" class="review" />
                <HomePageReviewCard v-else-if="item.type === 'video-review'" :review="item" :is-video="true"
                  :showGoogleIcon="showGoogleIconForTablet" class="review" />
                <div v-else-if="item.type === 'logo'" class="logo-card">
                  <img :src="`/src/assets/images/why-choose-us/${item.logo}`" :alt="item.name" class="logo-image" />
                </div>
              </div>
            </div>

            <div class="carousel-column column-2">
              <div v-for="item in rightColumnContent" :key="item.uniqueId" class="carousel-item">
                <HomePageReviewCard v-if="item.type === 'review'" :review="item" :is-video="false"
                  :showGoogleIcon="showGoogleIconForTablet" class="review" />
                <HomePageReviewCard v-else-if="item.type === 'video-review'" :review="item" :is-video="true"
                  :showGoogleIcon="showGoogleIconForTablet" class="review" />
                <div v-else-if="item.type === 'logo'" class="logo-card">
                  <img :src="`/src/assets/images/why-choose-us/${item.logo}`" :alt="item.name" class="logo-image" />
                </div>
              </div>
            </div>
          </div>
        </HomePageWhyChooseUsCarousel>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$spacing-carousel-adaptive: calc(40px + 5vw - 70px);

.reviews-section {
  border-top: 1px solid $color-grey-light;
  border-bottom: 1px solid $color-grey-light;
}

.carousel {
  max-width: calc(640px + 2 * $padding-side);
  width: 70%;
  overflow-y: hidden;
}

.reviews-carousel {
  padding-left: $padding-side;
  padding-right: $padding-side;
}

.container {
  max-width: calc($max-container-width - $padding-side * 0.75);
  margin: 0 auto;
  padding-left: $padding-side;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-content {
  max-width: 600px;
  width: 45%;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
}

.stats-card {
  margin-bottom: 40px;
  border-radius: 43px;
  background: url("@/assets/images/why-choose-us/background.jpg") lightgray 0 -54.611px / 100.683% 132.979% no-repeat;
  box-shadow: 0 4px common-shadow-length 0 $common-shadow-length;
  padding: 10px;
}

.stats-bg {
  border-radius: 40px;
  background: linear-gradient(131deg, rgba(107, 107, 107, 0.40) 12.76%, rgba(255, 255, 255, 0.10) 78.74%);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25) inset;
  backdrop-filter: blur(10px);
  height: 100%;
  color: $color-white;
  padding: 40px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stat-item {
  &:last-child {
    text-align: right;
  }
}

.stat-number {
  background: linear-gradient(180deg, #F0F0F0 0%, #FFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-number {
  font-size: 70px;
  font-weight: 600;
  font-family: Inter;
  line-height: 1;
  letter-spacing: -1.5px;
}

.stat-text {
  font-size: $font-size-2xl;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.6px;
}

.cta-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reviews-carousel {
  display: flex;
  gap: $spacing-xl;
  height: 100%;
  position: relative;
}

.review,
.logo-card {
  background: $color-white;
  box-shadow: 0 4px $common-shadow-length 0 $color-black-shadow;
  border: 1px solid $color-grey-light;
  border-radius: $radius-lg;
}

.carousel-column {
  flex: 1;
  height: 100%;
  position: relative;

  &.column-2 {
    transform: translateY(-60px);
  }
}

.carousel-item {
  margin-bottom: 40px;
}

.logo-card {
  padding: 20px;
  text-align: center;
}

.logo-image {
  max-width: 100%;
  max-height: 40px;
  height: 30px;
}

@media screen and (max-width: $breakpoint-xxl) {
  .carousel-item {
    margin-bottom: $spacing-carousel-adaptive;
  }

  .reviews-carousel {
    gap: $spacing-carousel-adaptive;
  }

  .stats-bg {
    padding: $spacing-carousel-adaptive;
  }

  .carousel {
    min-width: calc(540px + $padding-side * 2);
  }

  .stat-number {
    font-size: calc(70px + 5vw - 70px);
  }

  .stat-text {
    font-size: calc($font-size-2xl + 1.25vw - 18px);
  }
}

@media screen and (max-width: $breakpoint-xl) {
  .section-title {
    margin-bottom: $spacing-carousel-adaptive;
  }

  .stats-card {
    margin-bottom: $spacing-carousel-adaptive;
  }

  .left-content {
    width: 50%;
  }

  .carousel {
    width: 60%;
    min-width: calc(480px + $padding-side * 2);
  }

  .stat-number {
    font-size: 55px;
  }

  .stat-text {
    font-size: 22px;
  }

  .stats-card {
    border-radius: 33px;
  }

  .stats-bg {
    border-radius: 30px;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .content-wrapper {
    flex-direction: column;
    gap: 20px;
  }

  .left-content {
    width: 100%;
    max-width: 100%;
  }

  .reviews-section {
    padding-top: $padding-block-lg;
  }

  .carousel {
    max-width: 100%;
    width: 100%;
    overflow-y: hidden;
  }

  .reviews-carousel {
    padding: 0;
  }

  .container {
    max-width: 700px;
    padding: 0 $padding-side;
  }

  .stats-card {
    margin-bottom: 40px;
    border-radius: 43px;
    padding: 10px;
  }

  .stats-bg {
    border-radius: 40px;
    padding: 40px;
    gap: 20px;
  }

  .stat-number {
    font-size: 70px;
  }

  .stat-text {
    font-size: $font-size-2xl;
  }

  .reviews-carousel {
    gap: 30px;
  }

  .carousel-item {
    margin-bottom: 30px;
  }

  .section-title {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .container {
    padding: 0;
  }

  .left-content {
    padding: 0 $padding-side-adaptive;
  }

  .content-wrapper {
    gap: 10px;
  }

  .carousel-wrapper {
    padding: 0 $padding-side-adaptive;
  }

  .stats-card {
    margin-bottom: 30px;
    border-radius: 33px;
  }

  .stats-bg {
    border-radius: 30px;
    padding: 30px;
    gap: 20px;
  }

  .stat-number {
    font-size: calc(45px + 4vw);
  }

  .stat-text {
    font-size: calc(17px + 1.5vw);
  }

  .carousel {
    min-width: auto;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .reviews-carousel {
    flex-direction: column;
    gap: 30px;
  }

  .reviews-section {
    padding-top: $padding-block-sm;
  }

  .carousel-column {
    &.column-2 {
      transform: none;
    }
  }

  .carousel-item {
    margin-bottom: 20px;
  }

  .stat-number {
    font-size: calc(32px + 4vw);
  }

  .stat-text {
    font-size: calc(12px + 1.5vw);
  }

  .stats-card {
    margin-bottom: 20px;
    padding: 8px;
  }

  .stats-bg {
    padding: 25px;
    gap: calc(10px + 4vw);
  }
}

@media screen and (max-width: 360px) {
  .content-wrapper {
    gap: 5px;
  }
}
</style>