<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDOM } from "@/composables/useDOM";

const { isVisible, hasSeen, checkScrollPosition, scrollToElement, addScrollListener, removeScrollListener, addResizeListener, removeResizeListener } = useDOM();

const isHovered = ref(false);

const checkResize = () => {
  // При ресайзе также проверяем позицию
  checkScrollPosition(".video");
};

onMounted(() => {
  // Сначала проверяем позицию, а потом добавляем listeners
  checkScrollPosition(".video");
  
  // Добавляем listeners только если видео еще не было показано
  if (!hasSeen.value) {
    addScrollListener(() => checkScrollPosition(".video"));
    addResizeListener(checkResize);
  }
});

onUnmounted(() => {
  if (!hasSeen.value) {
    removeScrollListener(() => checkScrollPosition(".video"));
    removeResizeListener(checkResize);
  }
});
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="isVisible"
      class="floating-video"
      :class="{ 'hovered': isHovered }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="video-frame" @click="() => scrollToElement('.video')">
        <div class="video-thumbnail">
          <div class="video-preview">
            <div class="black-screen"></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.floating-video {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(70%);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &.hovered {
    transform: translateX(-50%) translateY(40%);
  }
}

.video-frame {
  width: min(480px, 60vw);
  height: auto;
  aspect-ratio: 16/9;
  border-radius: 8px;
  border: 1px solid #D4D4D4;
  background: linear-gradient(84deg, #FFF -7.72%, #EBEBEB 103.44%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    border-color: #B0B0B0;
  }
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: -4px -4px 8px 0 rgba(0, 0, 0, 0.1) inset;
    pointer-events: none;
    z-index: 1;
  }
}

.video-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.black-screen {
  width: 100%;
  height: 100%;
  background: #000000;
  border-radius: 5px;
  display: block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: $breakpoint-sm) {
  .floating-video {
    transform: translateX(-50%) translateY(60%);
  }
}
</style>
