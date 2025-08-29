<template>
  <a href="" class="contact-link">
    <slot name="icon" class="icon"></slot>
    <span class="text"><slot name="text" ></slot></span>
  </a>
</template>

<style scoped lang="scss">
.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity $transition ease;

  &:hover {
    opacity: 1;
  }
}

.text {
  font-size: 17px;
  padding-top: 0px;
  font-weight: 600;
}


@media screen and (max-width: $breakpoint-xl) {
  .text {
    font-size: 16px;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .text {
    font-size: 14px;
  }
}
</style>