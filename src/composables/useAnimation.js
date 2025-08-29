import { ref, computed } from "vue";

export function useAnimation() {
  const isAnimating = ref(false);
  const animationDuration = ref(300);
  const animationEasing = ref("ease");

  const startAnimation = () => {
    isAnimating.value = true;
  };

  const stopAnimation = () => {
    isAnimating.value = false;
  };

  const animateWithDelay = (callback, delay = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        callback();
      }, delay);
    } else {
      callback();
    }
  };

  const createTransition = (property, duration = null, easing = null) => {
    const dur = duration || animationDuration.value;
    const ease = easing || animationEasing.value;
    return `${property} ${dur}ms ${ease}`;
  };

  const createTransform = (transforms) => {
    return Object.entries(transforms)
      .map(([key, value]) => {
        if (key === "translateX") return `translateX(${value})`;
        if (key === "translateY") return `translateY(${value})`;
        if (key === "scale") return `scale(${value})`;
        if (key === "rotate") return `rotate(${value}deg)`;
        if (key === "skewX") return `skewX(${value}deg)`;
        if (key === "skewY") return `skewY(${value}deg)`;
        return "";
      })
      .filter(Boolean)
      .join(" ");
  };

  const createKeyframes = (name, keyframes) => {
    const style = document.createElement("style");
    const css = `
      @keyframes ${name} {
        ${Object.entries(keyframes)
          .map(([key, value]) => `${key} { ${value} }`)
          .join("\n        ")}
      }
    `;
    style.textContent = css;
    document.head.appendChild(style);
    return style;
  };

  const removeKeyframes = (styleElement) => {
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  };

  const animationClasses = computed(() => ({
    "animating": isAnimating.value,
    "animation-ready": !isAnimating.value
  }));

  return {
    isAnimating,
    animationDuration,
    animationEasing,
    startAnimation,
    stopAnimation,
    animateWithDelay,
    createTransition,
    createTransform,
    createKeyframes,
    removeKeyframes,
    animationClasses
  };
}
