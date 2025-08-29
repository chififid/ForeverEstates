<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import HomePageReviewCard from "@/ui/pages/Home/HomePageReviewCard.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  activeStep: {
    type: String,
    default: null
  }
});

const emit = defineEmits(["enter", "leave"]);

const descEl = ref(null);
const reviewEl = ref(null);
const windowWidth = ref(window.innerWidth);

const isDesktop = computed(() => windowWidth.value > 1200);

const showGoogleIconForMobile = computed(() => windowWidth.value >= 360);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const onEnter = () => {
  emit("enter", props.item.id);
};

const onLeave = () => {
  emit("leave");
};


const getDescHeight = () => descEl.value?.scrollHeight || 0;
const getReviewHeight = () => reviewEl.value?.scrollHeight || 0;
</script>

<template>
  <div class="row" @mouseenter="onEnter" @mouseleave="onLeave">
    <div class="rail">
      <div class="point"></div>
      <div class="num">{{ item.id }}</div>
    </div>
    <div class="content">
      <h3 class="row-title">{{ item.title }}</h3>
      <div class="tags">{{ item.tags }}</div>
      <div class="inf">
        <div class="inf-left">
          <div ref="descEl" class="desc" :class="{ open: activeStep === item.id }"
            :style="{ maxHeight: activeStep === item.id ? getDescHeight() + 'px' : '0px' }">
            <div class="desc-text">
              {{ item.description }}
            </div>
          </div>
        </div>
        <div v-if="!isDesktop" class="review review-mobile" :class="{ open: activeStep === item.id }"
          :style="{ maxHeight: activeStep === item.id ? getReviewHeight() + 'px' : '0px' }">
          <div ref="reviewEl">
            <HomePageReviewCard :review="item.review" :showGoogleIcon="showGoogleIconForMobile" class="review-card" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isDesktop" class="review review-desktop" :class="{ open: activeStep === item.id }"
      :style="{ maxHeight: activeStep === item.id ? getReviewHeight() + 'px' : '0px' }">
      <div ref="reviewEl">
        <HomePageReviewCard :review="item.review" :showGoogleIcon="showGoogleIconForMobile" class="review-card" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$padding-left-elem: 80px;
$padding-left-elem-lg: 6.5vw;
$padding-left-elem-md: 6.5vw;
$circle-size: 20px;

.row {
  display: flex;
  padding: 40px 40px 40px $padding-left-elem;
  position: relative;
  cursor: pointer;
  transition: background $transition ease;

  &:hover {
    background: rgba($color-blue, 0.05);
  }
}

.row+.row {
  border-top: 1px solid $color-grey-light;
}

.rail {
  position: absolute;
  display: flex;
  gap: $spacing-sm;
  align-items: center;
  left: $padding-left-elem;
  top: calc(40px + (20px + 2vw) * 0.36);
}

.point {
  width: $circle-size;
  height: $circle-size;
  border-radius: 100%;
  background: $color-blue;
}

.num {
  color: $color-grey-dark;
  font-family: Inter;
  font-weight: 600;
  font-size: $font-size-md;
  letter-spacing: -0.45px;
}

.content {
  margin: 0 40px 0 calc(7% + 45px);
  flex: 1;
}

.row-title {
  font-family: Aeonik;
  font-size: 36px;
  line-height: 116%;
}

.tags {
  font-family: Inter;
  font-size: $font-size-base;
  line-height: 150%;
  margin-top: 12px;
}

.desc {
  font-size: $font-size-base;
  line-height: 1.5;
  max-width: 600px;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height calc($transition * 3) ease,
    opacity calc($transition * 2) ease;
  will-change: max-height;
}

.desc.open {
  opacity: 1;
}

.desc-text {
  padding-top: 10px;
}

.review {
  width: 320px;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height calc($transition * 3) ease,
    opacity calc($transition * 2) ease;
  will-change: max-height;
  box-shadow: 0 4px $common-shadow-length 0 rgba($color-black-shadow, 0.02);
  border: 1px solid $color-grey-light;
  border-radius: $radius-lg;
}

.review.open {
  opacity: 1;
}

@media screen and (max-width: $breakpoint-xl) {
  .inf {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }

  .content {
    margin-right: 0;
  }

  .inf-left {
    max-width: 420px;
    width: 55%;
  }

  .review {
    width: 45%;
    max-width: 320px;
    margin-top: 10px;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .row {
    padding-left: $padding-left-elem-lg;
  }

  .rail {
    left: $padding-left-elem-lg;
  }

  .inf {
    flex-direction: column;
    gap: 0;
  }

  .inf-left {
    width: 100%;
    max-width: 100%;
  }

  .review {
    margin: 0;
    width: 100%;
    transition:
      max-height calc($transition * 3) ease,
      opacity calc($transition * 2) ease,
      margin-top calc($transition * 2) ease;
  }

  .review.open {
    margin-top: 40px;
  }

  .review:not(.open) {
    margin-top: 0;
  }

  .row-title {
    font-size: calc(20px + 2vw);
  }
}

@media screen and (max-width: $breakpoint-md) {
  .row {
    padding: calc(40px + 28px) 6.5vw 40px 28px;
  }

  .content {
    margin-left: 6.5vw;
    flex: 1;
  }

  .rail {
    gap: 8px;
    top: 40px;
  }

  .review.open {
    margin-top: 6.5vw;
  }
  
  .row-title {
    font-size: calc(20px + 2vw);
  }
}
</style>
