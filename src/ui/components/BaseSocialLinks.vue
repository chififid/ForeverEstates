<template>
  <div class="social-links">
    <a 
      href="#instagram" 
      class="social-link"
      title="Instagram"
    >
      <img src="/src/assets/images/contact/instagram.svg" alt="Instagram" />
    </a>
    
    <a 
      href="#telegram" 
      class="social-link"
      title="Telegram"
    >
      <img src="/src/assets/images/contact/telegram.svg" alt="Telegram" />
    </a>
    
    <a 
      href="#youtube" 
      class="social-link"
      title="YouTube"
    >
      <img src="/src/assets/images/contact/youtube.svg" alt="YouTube" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.social-links {
  display: flex;
  gap: 17px;
}

.social-link {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity $transition ease;
  
  &:hover {
    opacity: 1;
  }
}
</style>
