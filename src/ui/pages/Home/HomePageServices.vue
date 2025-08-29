<script setup>
import { ref, onMounted } from "vue";
import BaseButton from "@/ui/components/BaseButton.vue";
import HomePageServicesItem from "@/ui/pages/Home/HomePageServicesItem.vue";
import { useImageLoader } from "@/composables/useImageLoader.js";
import servicesData from "@/assets/content/services.json";

const activeStep = ref(null);

const onEnter = (id) => {
  activeStep.value = id;
};

const onLeave = () => {
  activeStep.value = null;
};


const featureImages = ref({});

onMounted(() => {
  servicesData.features.forEach(feature => {
    const { imageSrc: src, loadImage: load } = useImageLoader();
    load(`services/${feature.icon}`);
    featureImages.value[feature.title] = src;
  });
});
</script>

<template>
  <section class="services">
    <div class="container">
      <h2 class="title">{{ servicesData.title }}</h2>
      <p class="subtitle">
        {{ servicesData.subtitle }}
      </p>

      <div class="timeline">
        <div class="vline"></div>
        <home-page-services-item v-for="item in servicesData.timeline" :key="item.id" :item="item"
          :active-step="activeStep" @enter="onEnter" @leave="onLeave" />
      </div>

      <div class="features">
        <div v-for="feature in servicesData.features" :key="feature.title" class="feature">
          <div class="f-header">
            <img :src="featureImages[feature.title]" class="icon" />
            <div class="f-title">{{ feature.title }}</div>
          </div>
          <div class="f-desc">{{ feature.description }}</div>
        </div>
      </div>

      <div class="cta">
        <router-link :to="{ name: 'home', hash: '#contact' }">
          <BaseButton class="btn">
            {{ servicesData.cta.text }}
            <span class="active-icon">→</span>
          </BaseButton>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$padding-outside-height: 120px;
$padding-outside-height-xl: 60px;
$padding-outside-height-lg: 40px;
$padding-left-elem: 80px;
$padding-left-elem-lg: 6.5vw;
$circle-size: 20px;
$line-width: 4px;
$left-padding-line: calc($padding-left-elem + $circle-size/2 - $line-width/2);
$left-padding-line-lg: calc($padding-left-elem-lg + $circle-size/2 - $line-width/2);

.services {
  background: linear-gradient(180deg, #FFFDFA 0%, #F6ECE2 50%, #FFFDFA 100%);
  padding: calc($padding-block / 3) 0 $padding-block;
}

.container {
  max-width: calc($max-container-width - $padding-side * 2);
  margin: 0 auto;
  padding: 0 $padding-side;
}

.subtitle {
  color: #000;
  text-align: center;
  font-size: $font-size-lg;
  line-height: 150%;
  letter-spacing: -0.1px;
  max-width: 800px;
  margin: 15px auto 0;
}

.timeline {
  margin-top: 48px;
  background: $color-white;
  border: 1px solid $color-grey-light;
  border-radius: $radius-lg $radius-lg 0 0;
  box-shadow: $common-shadow $color-black-shadow;
  position: relative;

  &::before {
    content: "";
    display: block;
    background: linear-gradient(180deg, rgba($color-blue, 0) 0%, $color-blue 100%);
    left: $left-padding-line;
    top: -$padding-outside-height;
    position: absolute;
    height: $padding-outside-height;
    width: $line-width;
  }
}

.vline {
  position: absolute;
  left: $left-padding-line;
  top: 0;
  bottom: 0;
  width: 4px;
  background: $color-blue;
}

.features {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.feature {
  text-align: left;
  padding: 20px;
}

.f-header {
  display: flex;
  align-items: center;
}

.icon {
  width: 16px;
  height: 18px;
}

.f-title {
  font-family: Aeonik;
  font-size: $font-size-base;
  margin-left: 7px;
  line-height: 125%;
}

.f-desc {
  color: $color-grey-dark;
  font-size: $font-size-sm;
  font-weight: 500;
  line-height: 142%;
  margin-top: 10px;
}

.cta {
  text-align: center;
  margin-top: 40px;
}

.btn {
  background: $color-blue;
  box-shadow: $cta-shadow $color-blue-shadow;
  border-radius: $radius-md;
}

@media screen and (max-width: $breakpoint-xl) {
  .timeline {
    &::before {
      left: $left-padding-line;
      top: -$padding-outside-height-xl;
      height: $padding-outside-height-xl;
    }
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .services {
    padding: calc($padding-block-lg / 3) 0 $padding-block-lg;
  }

  .vline {
    left: $left-padding-line-lg;
  }

  .timeline {
    &::before {
      left: $left-padding-line-lg;
      top: -$padding-outside-height-lg;
      height: $padding-outside-height-lg;
    }
  }

  .features {
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 5px;
  }

  .feature {
    text-align: left;
    padding: 20px 20px 15px 20px;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .container {
    padding: 0 $padding-side-adaptive;
  }
  
  .feature {
    padding: calc($padding-side-adaptive / 2);
  }

  .subtitle {
    font-size: 18px;
  }
}

@media screen and (max-width: 460px) {
  .features {
    grid-template-columns: 1fr;
  }

  .feature {
    text-align: left;
    padding: 15px 0;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .services {
    padding: calc($padding-block-sm / 3) 0 $padding-block-sm;
  }

  .cta {
    margin-top: $padding-side-adaptive;
  }

  .btn {
    width: 100%;
  }

  .subtitle {
    font-size: 16px;
  }

  .f-desc {
    margin-top: 8px;
  }
}
</style>