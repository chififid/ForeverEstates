<template>
  <input 
    class="base-input"
    :class="{ 'error': error, 'success': success }"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: ""
  },
  modelValue: {
    type: String,
    default: ""
  },
  error: {
    type: Boolean,
    default: false
  },
  success: {
    type: Boolean,
    default: false
  }
});

defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
.base-input {
  width: 100%;
  padding: 15px 20px;
  font-size: $font-size-xl;
  font-family: Inter;
  background: $color-white;
  transition: border-color $transition ease;

  &::placeholder {
    color: $color-grey;
  }

  &:focus-within {
    border-color: $color-grey;
  }

  &.error {
    border-color: $color-red-dark;
  }

  &.success {
    border-color: $color-green-bright;
  }
}

@media screen and (max-width: $breakpoint-xl) {
  .base-input {
    padding: 12px 16px;
    font-size: $font-size-md;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .base-input {
    padding: 10px 16px;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .base-input {
    padding: 10px 12px;
    font-size: 16px;
  }
}

@media screen and (max-width: $breakpoint-xs) {
  .base-input {
    padding: 10px 10px;
    font-size: 15px;
  }
}
</style>
