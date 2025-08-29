<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import BaseBadge from "@/ui/components/BaseBadge.vue";
import BaseMultiStepForm from "@/ui/components/BaseMultiStepForm.vue";
import hero from "@/assets/content/hero.json";

const titleParts = computed(() => {
  return hero.title.split('\n');
});

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const showContactsTextForTablet = computed(() => {
  return !(windowWidth.value <= 992 && windowWidth.value > 576);
});

const shouldWrapContacts = computed(() => {
  return windowWidth.value < 576;
});

const aspectRatio = computed(() => {
  return windowWidth.value / windowHeight.value;
});

const scrollOffset = computed(() => {
  const targetRatio = 16 / 9;
  
  if (windowWidth.value > 1600 || aspectRatio.value <= targetRatio) {
    return 0;
  }
  
  const ratioDifference = aspectRatio.value - targetRatio;
  const scrollPixels = (ratioDifference / 0.1) * 20;
  
  return Math.max(0, scrollPixels);
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  
  if (scrollOffset.value > 0) {
    setTimeout(() => {
      window.scrollTo({
        top: scrollOffset.value,
        behavior: 'smooth'
      });
    }, 100);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="image-container">
        <div class="seo-image"></div>
      </div>
      <div class="content">
        <div class="badges">
          <BaseBadge>
            <template #icon>
              <img src="@/assets/images/hero/shield.svg" class="icon" />
            </template>
            <template #text>{{ hero.badges[0] }}</template>
          </BaseBadge>
          <BaseBadge>
            <template #icon>
              <img src="@/assets/images/hero/medal.svg" class="icon" />
            </template>
            <template #text>{{ hero.badges[1] }}</template>
          </BaseBadge>
        </div>

        <h1 class="title">
          <template v-for="(part, index) in titleParts" :key="index">
            <span v-if="part">{{ part }}</span>
            <br v-else />
          </template>
        </h1>

        <p class="subtitle">{{ hero.subtitle }}</p>

        <div class="cta">
          <p class="cta-text">{{ hero.cta.text }}</p>

          <BaseMultiStepForm class="cta-form" :showContactsText="showContactsTextForTablet" :contacts-wrap="shouldWrapContacts" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background: $color-beige-light;
  border-bottom: 1px solid $color-grey-light;
  width: 100%;
}

.image-container {
  position: absolute;
  top: 0;
  right: -18%;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.seo-image {
  position: absolute;
  bottom: -38%;
  right: 0;
  height: 125%;
  background-image: url("@/assets/images/hero/seo-photo.png");
  background-size: contain;
  aspect-ratio: 1;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.container {
  position: relative;
  max-width: $max-container-width;
  margin: 0 auto;
  padding: calc($padding-block * 4 / 6) $padding-side $padding-block;
  z-index: 5;
}

.content {
  position: relative;
  max-width: 800px;
  z-index: 3;
}

.badges {
  display: flex;
  gap: 18px;
  margin-bottom: 20px;

  .badge {
    &:first-child {
      background: $color-blue-white;
      color: $color-blue-dark;
      border-color: $color-blue-border;
    }

    &:last-child {
      background: $color-green-light;
      color: $color-green-dark;
      border-color: $color-green-border;
    }
  }
}

.icon {
  width: 21px;
  height: 21px;
}

.title {
  font-size: 70px;
  font-weight: 400;
  line-height: 70px;
  font-family: Aeonik;
  background: linear-gradient(90deg, #000 -2.55%, #5D5D5D 105.44%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 20px;
}

.subtitle {
  font-size: 27px;
  line-height: 135%;
  color: $color-grey-dark;
  margin: 0 100px 40px 0;
  letter-spacing: -0.135px;
  width: 80%;
}

.cta-text {
  font-size: $font-size-2xl;
  color: $color-black;
  margin-bottom: 15px;
}

@media screen and (max-width: $breakpoint-xxl) {
  .image-container {
    right: -6%;
    overflow: hidden;
  }

  .seo-image {
    left: calc(300px + 20vw);
  }

  .container {
    padding: calc(37px + 3vw) $padding-side calc(37px + 3vw);
  }

  .content {
    width: calc(500px + 23vw);
  }

  .badges {
    margin-bottom: 1.4vw;
  }

  .title {
    font-size: calc(40px + 2.1vw);
    line-height: calc(40px + 2.1vw);
    padding-bottom: 1.4vw;
  }

  .subtitle {
    font-size: calc(12px + 0.9vw);
    line-height: 135%;
    margin: 0 calc(40px + 4vw) calc(15px + 1.6vw) 0;
  }
}

@media screen and (max-width: $breakpoint-xl) {
  .image-container {
    right: 0;
  }

  .seo-image {
    left: calc(140px + 35vw);
  }

  .container {
    padding: calc(37px + 3vw) $padding-side calc(37px + 2vw);
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .badges {
    margin-bottom: 1.2vw;
  }

  .cta-form {
    max-width: 550px;
    width: 100%;
  }

  .title {
    font-size: calc(35px + 2.3vw);
    line-height: calc(35px + 2.3vw);
    padding-bottom: 1.4vw;
  }

  .subtitle {
    font-size: calc(12px + 1.1vw);
    line-height: 135%;
    margin: 0 calc(40px + 4vw) calc(15px + 1.4vw) 0;
  }

  .cta {
    width: 53vw;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .seo-image {
    left: calc(59vw - 80px);
  }

  .content {
    width: 65vw;
  }

  .badges {
    gap: 1.5vw;
    margin-bottom: 1.5vw;
  }

  .container {
    padding: 6vw $padding-side 4vw;
  }

  .title {
    font-size: 5.6vw;
    line-height: 5.6vw;
    padding-bottom: 2vw;
  }

  .subtitle {
    font-size: 2.4vw;
    margin: 0 7vw 4vw 0;
  }

  .cta-text {
    font-size: $font-size-lg;
  }

  .icon {
    width: 14px;
    height: 14px;
  }

  .cta {
    width: 50vw;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .container {
    padding: 60px $padding-side-adaptive 40px;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .subtitle {
    width: 75%;
    margin-right: 0;
    font-size: calc(12px + 1vw);
  }

  .title {
    font-size: calc(30px + 2.1vw);
    line-height: calc((30px + 2.1vw) * 1.1);
  }

  .cta {
    width: 75%;
  }

  .seo-image {
    left: 55vw;
    height: 90%;
    bottom: -35%;
  }

  .badges {
    gap: 2vw;
  }
}

@media screen and (max-width: 680px) {
  .seo-image {
    left: calc(52vw + 20px);
    height: 85%;
    bottom: -30%;
  }
}

@media screen and (max-width: 630px) {
  .seo-image {
    left: calc(56vw);
    height: 80%;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .container {
    padding: calc($padding-side-adaptive * 2) $padding-side-adaptive $padding-side-adaptive;
  }

  .badges {
    gap: 12px;
    margin: calc($padding-side-adaptive * 2) 27vw 0 0;
    align-items: flex-end;
    flex-wrap: wrap;
    height: 100%;
    margin-right: 27vw;
    order: 1;
  }

  .subtitle {
    width: 100%;
    margin: 0 0 24px 0;
    font-size: 16px;
  }

  .title {
    font-size: calc(23px + 3vw);
    line-height: calc((23px + 3vw) * 1.2);
    margin-bottom: 8px;
  }

  .cta {
    width: 100%;
  }

  .seo-image {
    right: calc(-28vw);
    left: auto;
    height: calc(15vw + 60%);
    bottom: calc(-28vw - 14%);
  }

  .cta-text {
    margin-bottom: 12px;
    font-size: 16px;
  }
  
}

@media screen and (max-width: 500px) {
  .container {
    padding-bottom: calc($padding-side-adaptive * 2);
  }
  .badges {
    margin-top: $padding-side-adaptive;
  }

  .seo-image {
    right: calc(-30vw);
    left: auto;
    height: calc(40vw + 40%);
    bottom: calc(-30vw - 12%);
  }
}

@media screen and (max-width: 480px) {
  .title {
    margin-right: 40px;
  }
}

@media screen and (max-width: $breakpoint-xs) {
  .seo-image {
    right: calc(-38%);
  }

  .title {
    margin-right: 0;
  }
}
</style>