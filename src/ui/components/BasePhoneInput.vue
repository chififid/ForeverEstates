<template>
  <div ref="root" class="phone-input" :class="{ 'error': error, 'success': success }" @keydown.esc="close">
    <button
      type="button"
      class="select"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="toggle"
    >
      <span class="code">{{ selectedCountry.dialCode }}</span>
      <img src="@/assets/images/hero/arrow.svg" class="icon" :class="{ open: isOpen }" />
    </button>

    <BaseInput 
      v-model="maskedValue"
      type="tel" 
      class="phone-input-field"
      :placeholder="selectedPlaceholder"
      :maxlength="selectedPlaceholder.length"
      inputmode="numeric"
      @keydown="onKeydown"
      @paste="onPaste"
    />

    <div
      class="dropdown"
      :class="{ open: isOpen }"
      :aria-hidden="!isOpen"
    >
      <div class="search">
        <BaseInput
          v-model="query"
          type="text"
          class="search-input"
          :placeholder="`Search country...`"
          :disabled="!isOpen"
        />
      </div>
      <ul class="list">
        <li
          v-for="opt in filteredCountries"
          :key="opt.iso + opt.dialCode"
          class="item"
          @click="select(opt)"
        >
          <span class="flag">{{ getFlag(opt) }}</span>
          <span class="name">{{ opt.name }}</span>
          <span class="dial">{{ opt.dialCode }}</span>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import BaseInput from "@/ui/components/BaseInput.vue";
import countries from "@/assets/content/countries.json";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  defaultCountry: {
    type: String,
    default: "AE",
  },
  country: {
    type: String,
    default: undefined,
  },
  showSuccess: {
    type: Boolean,
    default: false
  },
  hasAttemptedSubmit: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue", "update:country", "update:valid", "startedTyping"]);

const root = ref(null);
const isOpen = ref(false);
const query = ref("");
const selectedCountry = ref(
  countries.find(c => c.iso === (props.country || props.defaultCountry)) || countries[0]
);
const localNumber = ref("");

const selectedPlaceholder = computed(() => {
  return selectedCountry.value?.placeholder || "000000000";
});

const maxDigits = computed(() => {
  return (selectedPlaceholder.value.match(/0/g) || []).length;
});

const isPhoneValid = computed(() => {
  const digits = sanitizeNumber(localNumber.value);
  return digits.length === maxDigits.value;
});

const success = computed(() => {
  return props.showSuccess;
});

const error = computed(() => {
  return props.hasAttemptedSubmit && !isPhoneValid.value;
});

function formatWithPlaceholder(digits, template) {
  const onlyDigits = sanitizeNumber(digits).slice(0, (template.match(/0/g) || []).length);
  if (!template) return onlyDigits;
  let out = "";
  let di = 0;
  for (let i = 0; i < template.length; i += 1) {
    const ch = template[i];
    if (ch === "0") {
      if (di < onlyDigits.length) {
        out += onlyDigits[di++];
      } else {
        break;
      }
    } else {
      if (onlyDigits.length > 0 || di > 0) {
        out += ch;
      }
    }
  }
  return out;
}

const maskedValue = computed({
  get() {
    return formatWithPlaceholder(localNumber.value, selectedPlaceholder.value);
  },
  set(val) {
    const digits = sanitizeNumber(val).slice(0, maxDigits.value);
    if (digits !== localNumber.value) {
      localNumber.value = digits;
    }
  },
});

function getFlag(country) {
  return country?.flag || "🌐";
}

const filteredCountries = computed(() => {
  if (!query.value) return countries;
  const q = query.value.toLowerCase();
  return countries.filter(
    c => c.name.toLowerCase().includes(q) || c.dialCode.includes(q)
  );
});

function sanitizeNumber(value) {
  return (value || "").replace(/[^0-9]/g, "");
}

function buildFullNumber() {
  const digits = sanitizeNumber(localNumber.value);
  const full = `${selectedCountry.value.dialCode}${digits}`;
  emit("update:modelValue", full ? `+${full.replace(/^\+/, "")}` : "");
  emit("update:valid", isPhoneValid.value);
}

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

function select(newCountry) {
  selectedCountry.value = newCountry;
  emit("update:country", newCountry.iso);
  if (localNumber.value.length > maxDigits.value) {
    localNumber.value = localNumber.value.slice(0, maxDigits.value);
  }
  buildFullNumber();
  close();
}

function handleClickOutside(event) {
  if (!root.value) return;
  if (!root.value.contains(event.target)) {
    close();
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  if (props.modelValue && props.modelValue.startsWith("+")) {
    const val = props.modelValue;
    const match = countries
      .slice()
      .sort((a, b) => b.dialCode.length - a.dialCode.length)
      .find(c => val.startsWith(c.dialCode));
    if (match) {
      selectedCountry.value = match;
      localNumber.value = sanitizeNumber(val.slice(match.dialCode.length)).slice(0, maxDigits.value);
    }
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

watch(
  () => props.country,
  (iso) => {
    if (!iso) return;
    const found = countries.find(c => c.iso === iso);
    if (found) {
      selectedCountry.value = found;
      if (localNumber.value.length > maxDigits.value) {
        localNumber.value = localNumber.value.slice(0, maxDigits.value);
      }
      buildFullNumber();
    }
  }
);

watch(localNumber, (newVal, oldVal) => {
  const digits = sanitizeNumber(newVal);
  if (digits !== newVal) {
    localNumber.value = digits;
  }
  
  if (newVal !== oldVal && props.hasAttemptedSubmit) {
    emit("startedTyping");
  }
  
  buildFullNumber();
});

watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      localNumber.value = "";
      return;
    }
    if (val.startsWith("+")) {
      const match = countries
        .slice()
        .sort((a, b) => b.dialCode.length - a.dialCode.length)
        .find(c => val.startsWith(c.dialCode));
      if (match) {
        if (selectedCountry.value.iso !== match.iso) {
          selectedCountry.value = match;
        }
        const newDigits = sanitizeNumber(val.slice(match.dialCode.length)).slice(0, maxDigits.value);
        if (newDigits !== localNumber.value) {
          localNumber.value = newDigits;
        }
      }
    }
  }
);

function onKeydown(e) {
  const key = e.key;
  const ctrlCmd = e.ctrlKey || e.metaKey;
  const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End", "Tab"];
  if (allowed.includes(key)) return;
  if (ctrlCmd && ["a", "c", "v", "x"].includes(key.toLowerCase())) return;
  if (/^\d$/.test(key)) {
    if (localNumber.value.length >= maxDigits.value) {
      e.preventDefault();
    }
    return;
  }
  e.preventDefault();
}

function onPaste(e) {
  const text = (e.clipboardData || window.clipboardData).getData("text");
  const digits = sanitizeNumber(text).slice(0, maxDigits.value);
  if (!digits) {
    e.preventDefault();
    return;
  }
  e.preventDefault();
  const next = (localNumber.value + digits).slice(0, maxDigits.value);
  if (next !== localNumber.value) {
    localNumber.value = next;
  }
}
</script>

<style scoped lang="scss">
.phone-input {
  position: relative;
  display: flex;
  border: 1px solid $color-grey-light;
  font-size: $font-size-xl;
  background: $color-white;
  border-radius: $radius-md;
  transition: border-color $transition ease;

  &:focus-within {
    border-color: $color-grey;
    
    .phone-input-field {
      border-left-color: $color-grey;
    }
  }

  &.error {
    border-color: $color-red-dark;
    
    .phone-input-field {
      border-left-color: $color-red-dark;
    }
  }

  &.success {
    border-color: $color-green-bright;
    
    .phone-input-field {
      border-left-color: $color-green-bright;
    }
  }
}

.select {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  max-width: 145px;
  width: 100%;
  border-radius: 10px 0 0 10px;
  padding: 15px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background $transition ease;
}

.flag {
  font-size: $font-size-2xl;
}

.code {
  font-family: Inter;
  font-size: $font-size-xl;
}

.icon {
  width: 20px;
  height: 20px;
  transition: transform $transition ease;

  &.open {
    transform: rotate(180deg);
  }
}

.phone-input-field {
  max-width: 270px;
  width: 100%;
  border-left: 1px solid $color-grey-light;
  transition: border-color $transition ease;
}

.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: $color-white;
  border: 1px solid $color-grey-light;
  border-radius: $radius-sm;
  box-shadow: $common-shadow $color-black-shadow;
  z-index: 50;
  overflow: hidden;
  opacity: 0;
  transform: translateY(6px) scale(0.98);
  visibility: hidden;
  pointer-events: none;
  transition: opacity $transition ease, transform $transition ease, visibility $transition linear;
}

.dropdown.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  visibility: visible;
  pointer-events: auto;
}

.search {
  padding: 10px 16px;
  border-bottom: 1px solid $color-grey-white;
}

.search-input {
  width: 100%;
  padding: 10px 14px;
  font-size: $font-size-md;
  border: 1px solid $color-grey-white;
  border-radius: $radius-sm;
  font-family: Inter;
}

.list {
  max-height: 260px;
  overflow: auto;
  list-style: none;
  margin: 0;
}

.item {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  cursor: pointer;
  transition: background $transition ease;

  &:hover {
    background: $color-grey-white;
  }
}

.name {
  font-family: Inter;
  font-size: $font-size-xl;
  line-height: 125%;
}

.dial {
  font-family: Inter;
}

@media screen and (max-width: $breakpoint-xl) {
  .select {
    max-width: 36%;
    padding: 12px 16px;
  }

  .flag {
    font-size: $font-size-xl;
  }

  .code {
    font-size: $font-size-md;
  }

  .icon {
    width: 18px;
    height: 18px;
  }

  .search {
    padding: 10px 12px;
  }

  .search-input {
    width: 100%;
    padding: 10px 14px;
    font-size: $font-size-base;
  }

  .item {
    grid-template-columns: 24px 1fr auto;
    gap: 10px;
    padding: 18px 14px;
  }

  .name {
    font-size: $font-size-md;
  }

  .dial {
    font-size: $font-size-md;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .select {
    padding: 10px 16px;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .select {
    padding: 1px 12px;
    max-width: max-content;
  }

  .select {
    max-width: 100px;
  }

  .code {
    font-size: 16px;
  }

  .flag {
    font-size: 18px;
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .search-input {
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
  }

  .item {
    grid-template-columns: 20px 1fr auto;
    gap: 8px;
    padding: 14px 12px;
  }

  .name {
    font-size: 16px;
  }

  .dial {
    font-size: 16px;
  }
}

@media screen and (max-width: $breakpoint-xs) {
  .select {
    max-width: 85px;
    padding: 10px 10px;
  }

  .code {
    font-size: 15px;
  }

  .name {
    font-size: 15px;
  }

  .search-input {
    padding: 10px 10px;
  }

  .item {
    padding: 12px 10px;
  }

  .dial {
    font-size: 15px;
  }

  .icon {
    width: 15px;
    height: 15px;
  }
}
</style>
