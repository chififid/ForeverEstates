<script setup>
import { onMounted, computed } from "vue";
import { useImageLoader } from "@/composables/useImageLoader.js";

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const { imageSrc, loadImage } = useImageLoader();

const safeText = computed(() => {
  if (Array.isArray(props.card.text)) {
    return props.card.text.map(line => {
      // Разбиваем строку по \n и добавляем <br> теги
      const parts = line.split('\n');
      return parts;
    }).flat();
  }
  return [props.card.text];
});

onMounted(() => {
  if (props.card.icon) {
    loadImage(`about/${props.card.icon}`);
  }
});
</script>

<template>
  <div class="content-card">
    <div class="card-header">
      <div :class="['icon', `${card.iconType}-icon`]">
        <img v-if="imageSrc" :src="imageSrc" class="icon-image" />
      </div>
      <h3 class="card-title">{{ card.title }}</h3>
      <div v-if="card.experienceBadge" class="experience-badge">
        <span class="experience-icon">{{ card.experienceBadge.years }}</span>
        {{ card.experienceBadge.text }}
      </div>
    </div>

    <div v-if="card.license" class="license-info">
      <div class="license-text">
        <div class="license-title">{{ card.license.title }}</div>
        <div class="license-subtitle">{{ card.license.subtitle }}</div>
      </div>
      <div class="license-status">
        <div class="status-badge active">
          {{ card.license.status }}
          <img src="@/assets/images/about/download.svg" class="download-icon" />
        </div>
        <div class="download-text">{{ card.license.downloadText }}</div>
      </div>
    </div>

    <div v-else class="card-text">
      <template v-for="(part, index) in safeText" :key="index">
        <span v-if="part">{{ part }}</span>
        <br v-else />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-card {
  background: $color-white;
  border: 1px solid $color-grey-light;
  padding: 25px;
  box-shadow: $common-shadow $color-black-shadow;
  border-radius: $radius-sm;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: 16px;
}

.icon {
  width: 48px;
  height: 48px;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &.blue-icon {
    background: $color-blue-white;
  }

  &.purple-icon {
    background: $color-purple-light;
  }

  &.green-icon {
    background: $color-green-light;
  }

  &.gray-icon {
    background: $color-grey-white;
  }
}

.icon-image {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.card-title {
  font-size: $font-size-3xl;
  line-height: 32px;
  font-weight: 400;
  font-family: Aeonik;
}

.card-text {
  font-size: $font-size-base;
  line-height: 150%;
  font-weight: 300;
  letter-spacing: -0.08px;
  margin: 0;
}

.experience-badge {
  padding: 2px 15px;
  border-radius: $radius-xl;
  border: 1px solid #E3E3E3;
  margin-left: auto;
  text-align: center;
  font-family: Inter;
  font-size: $font-size-sm;
  line-height: 24px;
  font-weight: 300;
}

.experience-icon {
  font-weight: 400;
  margin-right: 4px;
}

.license-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba($color-green-light, 0.3);
  padding: 12px 15px;
}

.license-text {
  flex: 1;
}

.license-title {
  font-size: $font-size-base;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.08px;
}

.license-subtitle {
  font-weight: 300;
  font-size: $font-size-sm;
  letter-spacing: -0.07px;
}

.license-status {
  text-align: right;
  cursor: pointer;
  transform: translateY(2px);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  background: $color-green-bright;
  color: $color-white;
  border-radius: $radius-xl;
  font-size: $font-size-sm;
  line-height: 20px;
  font-weight: 500;
  margin-bottom: 2px;
  letter-spacing: -0.28px;
  padding: 0 10px;
  width: max-content;
  margin-left: auto;
  cursor: pointer;
  transition: opacity $transition ease;

  &:hover {
    opacity: 0.8;
  }
}

.download-text {
  letter-spacing: -0.06px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
}

.download-icon {
  width: 7px;
  margin-left: 7px;
}

@media screen and (max-width: calc($breakpoint-xl + 10px)) {
  .about-us-card {
    &:nth-child(2) {
      .card-title {
        padding-right: 100px;
      }
    }
  }

  .card-title {
    margin-top: 0;
    font-size: calc(20px + 1vw);
    line-height: calc(20px + 2vw);
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .about-us-card {
    &:nth-child(2) {
      .card-title {
        padding-right: 20px;
      }
    }
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .content-card {
    padding: 20px;
  }

  .card-header {
    margin-bottom: 14px;
  }

  .icon {
    width: calc(32px + 2vw);
    height: calc(32px + 2vw);
    border-radius: calc(32px + 2vw);
  }

  .icon-image {
    width: calc(14px + 2vw);
    height: calc(14px + 2vw);
  }
}

@media screen and (max-width: 480px) {
  .license-info {
    border-radius: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .license-status {
    width: 100%;
  }
}
</style>
