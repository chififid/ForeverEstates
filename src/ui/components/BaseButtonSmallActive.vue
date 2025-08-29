
<template>
  <div class="button">
    <div class="pulse-container">
      <div class="pulse-dot"></div>
      <div class="pulse-ring pulse-ring-1"></div>
      <div class="pulse-ring pulse-ring-2"></div>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: $radius-md;
  background: $color-blue;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 0 $common-shadow-length $color-blue-shadow;
  font-family: Inter;
  cursor: pointer;
  transition: opacity $transition ease, box-shadow $transition ease;

  &:hover {
    opacity: 0.8;
    box-shadow: none;

    span {
      margin-left: 5px;
    }
  }
}

.pulse-container {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba($color-white, 0.4);
  border-radius: 50%;
  animation: pulse 3s infinite ease-out;
}

.pulse-ring-1 {
  animation-delay: 0s;
}

.pulse-ring-2 {
  animation-delay: 1.5s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  70% {
    transform: scale(2.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

@media screen and (max-width: $breakpoint-xl) {
  .button {
    gap: 8px;
    padding: 12px 16px;

    &:hover {
      opacity: 0.8;
      box-shadow: none;

      span {
        margin-left: 5px;
      }
    }
  }
}

@media screen and (max-width: $breakpoint-xl) {
  .button {
    padding: 10px 16px;
  }

  .pulse-container {
    width: 22px;
    height: 22px;
  }
}
</style>
