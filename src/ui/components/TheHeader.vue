<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import BaseLogo from "@/ui/components/BaseLogo.vue";
import BaseButtonSmallActive from "@/ui/components/BaseButtonSmallActive.vue";

import header from "@/assets/content/header.json";

const activeSection = ref("");
const isHeaderVisible = ref(true);
const lastScrollY = ref(0);
const scrollTimeout = ref(null);
const isMobileMenuOpen = ref(false);

const getActiveSectionFromScroll = (scrollY) => {
  const sections = header.navigation.links.map(link => ({
    id: link.hash.replace("#", ""),
    hash: link.hash
  }));
  
  const viewportCenter = scrollY + window.innerHeight / 2;
  
  let activeSection = sections[0].hash;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const element = document.getElementById(section.id);
    
    if (element) {
      const sectionTop = element.offsetTop;
      const sectionBottom = sectionTop + element.offsetHeight;
      
      if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
        activeSection = section.hash;
        break;
      }
    
      if (scrollY >= sectionTop - 100) {
        activeSection = section.hash;
      }
    }
  }
  
  return activeSection;
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isHeaderVisible.value = false;
    // Закрываем мобильное меню при скролле вниз
    if (isMobileMenuOpen.value) {
      closeMobileMenu();
    }
  } else {
    isHeaderVisible.value = true;
  }
  
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  
  scrollTimeout.value = setTimeout(() => {
    const newActiveSection = getActiveSectionFromScroll(currentScrollY);
    if (newActiveSection !== activeSection.value) {
      activeSection.value = newActiveSection;
    }
  }, 50);
  
  lastScrollY.value = currentScrollY;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  
  // Закрываем мобильное меню при клике вне его
  document.addEventListener("click", (e) => {
    const header = document.querySelector(".header");
    if (header && !header.contains(e.target) && isMobileMenuOpen.value) {
      closeMobileMenu();
    }
  });
  
  // Закрываем мобильное меню при изменении размера экрана
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1200 && isMobileMenuOpen.value) {
      closeMobileMenu();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
});

const isActive = (hash) => {
  return activeSection.value === hash;
};
</script>

<template>
  <header class="header" :class="{ hidden: !isHeaderVisible }">
    <div class="container">
      <BaseLogo />

      <nav class="nav" :class="{ 'mobile-open': isMobileMenuOpen }">
        <router-link
          v-for="link in header.navigation.links"
          :key="link.label"
          :to="{ name: 'home', hash: link.hash }"
          class="link"
          :class="{ active: isActive(link.hash) }"
          @click="closeMobileMenu"
        >
          {{ link.label }}
        </router-link>
        <router-link 
          class="button-link"
          :to="{ name: 'home', hash: header.navigation.ctaButton.hash}" 
          @click="closeMobileMenu"
        > 
          <BaseButtonSmallActive class="button">
            {{ header.navigation.ctaButton.text }}
            <span class="active-icon">{{ header.navigation.ctaButton.icon }}</span>
          </BaseButtonSmallActive>
        </router-link>
      </nav>

      <!-- Бургер-меню для мобильных устройств -->
      <div class="burger-menu" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";
.header {
  background: $color-white;
  border-bottom: $color-grey-light 1px solid;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transform: translateY(0);
  transition: transform 0.3s ease;
  
  &.hidden {
    transform: translateY(-100%);
  }
}

.container {
  width: 100%;
  max-width: $max-container-width;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px $padding-side;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;
}

.link {
  font-family: Inter;
  color: $color-black;
  text-decoration: none;
  font-weight: 400;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1.2px;
    background-color: $color-black;
    transition: width $transition ease;
  }
  
  &:hover {    
    &::after {
      width: 100%;
    }
  }
  
  &.active {
    &::after {
      width: 100%;
    }
  }
}

@media only screen and (max-width: $breakpoint-xl) {
  .nav {
    position: fixed;
    top: 80px; 
    left: 0;
    width: 100%;
    border-bottom: 1px solid $color-grey-light;
    border-top: 1px solid $color-grey-light;
    background: $color-white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 40px $padding-side 40px;
    gap: 0px;
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all $transition ease;
    z-index: 999;
    
    &.mobile-open {
      transform: translateX(0);
      opacity: 1;
      pointer-events: all;
    }
  }

  .link {
    font-size: 18px;
    margin-bottom: 40px;
    
    &:last-of-type {
      border-bottom: none;
    }
  }

  .button-link {
    width: 100%; 
    position: relative;

    &::before {
      content: "";
      background: $color-grey-light;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
    }
  }

  .button {
    margin-top: 40px;
    width: 100%;
    justify-content: center;
    width: 100%;
  }  

  .burger-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28px;
    height: 20px;
    cursor: pointer;
    z-index: 1001;
    transition: margin $transition;
    
    .burger-line {
      width: 100%;
      height: 2px;
      background: $color-black;
      border-radius: 2px;
      transition: all $transition;
      transform-origin: center;
    }
    
    &.active {
      .burger-line {
        &:nth-child(1) {
          transform: translateY(9px) rotate(-45deg);
        }
        
        &:nth-child(2) {
          opacity: 0;
        }
        
        &:nth-child(3) {
          transform: translateY(-9px) rotate(45deg);
        }
      }
    }
  }
}

@media only screen and (min-width: $breakpoint-xl) {
  .burger-menu {
    display: none;
  }
}

@media only screen and (max-width: $breakpoint-md) {
  .container {
    padding: 20px $padding-side-adaptive;
  }

  .nav {
    padding: 30px $padding-side-adaptive;
  }

  .link {
    margin-bottom: 30px; 
  }

  .button {
    margin-top: 30px;
  }  
}

</style>