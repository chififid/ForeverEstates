import { ref } from "vue";

export function useDOM() {
  const elementRef = ref(null);
  const isVisible = ref(false);
  const hasSeen = ref(false);

  const checkScrollPosition = (selector, threshold = 0) => {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      // Добавляем дополнительный отступ в 80px для флоутинг видео
      const additionalOffset = selector === '.video' ? 60 : 0;
      const isElementVisible = rect.top <= window.innerHeight + threshold - additionalOffset;
      
      if (isElementVisible) {
        isVisible.value = false;
        hasSeen.value = true;
      } else if (!hasSeen.value) {
        isVisible.value = true;
      }
      
      return isElementVisible;
    }
    return false;
  };

  const scrollToElement = (selector, options = {}) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        ...options
      });
    }
  };

  const addScrollListener = (callback) => {
    window.addEventListener("scroll", callback);
  };

  const removeScrollListener = (callback) => {
    window.removeEventListener("scroll", callback);
  };

  const addResizeListener = (callback) => {
    window.addEventListener("resize", callback);
  };

  const removeResizeListener = (callback) => {
    window.removeEventListener("resize", callback);
  };

  const addPointerListener = (element, event, callback) => {
    if (element) {
      element.addEventListener(event, callback);
    }
  };

  const removePointerListener = (element, event, callback) => {
    if (element) {
      element.removeEventListener(event, callback);
    }
  };

  return {
    elementRef,
    isVisible,
    hasSeen,
    checkScrollPosition,
    scrollToElement,
    addScrollListener,
    removeScrollListener,
    addResizeListener,
    removeResizeListener,
    addPointerListener,
    removePointerListener
  };
}
