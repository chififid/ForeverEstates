import { ref } from "vue";

export function useImageLoader() {
  const imageSrc = ref("");

  const loadImage = (imagePath) => {
    try {

      imageSrc.value = new URL(`../assets/images/${imagePath}`, import.meta.url).href;
    } catch (error) {
      console.error("Failed to load image:", error);
    }
  };

  return {
    imageSrc,
    loadImage
  };
}
