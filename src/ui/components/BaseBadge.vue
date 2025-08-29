<template>
  <div class="badge">
    <slot name="icon" class="icon"></slot>
    <span class="text"><slot name="text"></slot></span>
  </div>
</template>

<style scoped lang="scss">
.badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: $font-size-md;
  font-family: Inter;
  border: 1px transparent solid;
}

.text {
  font-weight: 500;
  letter-spacing: -0.5px;
}

@media screen and (max-width: $breakpoint-lg) {
  .badge {
    padding: 6px 15px;
    font-size: $font-size-base;
    gap: 6px;
  }

  .text {
    letter-spacing: -0.4px;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .badge {
    padding: 6px 12px;
    font-size: $font-size-sm;
    gap: 4px;
  }

  .text {
    letter-spacing: -0.3px;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .badge {
    padding: 4px 10px;
    font-size: 12px;
    gap: 3px;
  }

  .text {
    letter-spacing: -0.25px;
  }
}
</style>
