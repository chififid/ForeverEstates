<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  background: $color-red-dark;
  color: $color-white;
  border: none;
  font-size: $font-size-xl;
  font-weight: 500;
  font-family: Inter;
  border-radius: 0 $radius-md $radius-md 0;
  cursor: pointer;
  transition: opacity $transition ease, box-shadow $transition ease;

  &:hover {
    opacity: 0.8;
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@media screen and (max-width: $breakpoint-xl) {
  .button {
    gap: 8px;
    padding: 14px 16px;
    font-size: $font-size-md;
  }
}

@media screen and (max-width: $breakpoint-xl) {
  .button {
    padding: 10px 16px;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .button {
    padding: 10px 12px;
    font-size: 16px;
  }
}

@media screen and (max-width: $breakpoint-xs) {
  .button {
    padding: 10px 10px;
    font-size: 15px;
  }
}
</style>
