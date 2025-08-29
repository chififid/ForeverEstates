<script setup>
import BasePhoneInput from "@/ui/components/BasePhoneInput.vue";
import BaseButton from "@/ui/components/BaseButton.vue";
import BaseContactLink from "@/ui/components/BaseContactLink.vue";
import BaseInput from "@/ui/components/BaseInput.vue";
import { useMultiStepForm } from "@/composables/useMultiStepForm";
import hero from "@/assets/content/hero.json";
import messages from "@/assets/content/messages.json";

const props = defineProps({
  showContactsText: {
    type: Boolean,
    default: true
  },
  contactsWrap: {
    type: Boolean,
    default: false
  }
});

const {
  isSubmitting,
  formData,
  showPhoneSuccess,
  showSuccessText,
  hasAttemptedSubmit,
  isFirstStep,
  isSecondStep,
  handlePhoneSubmit,
  handleNameSubmit,
  handleStartedTyping,
  setPhoneValid,
  setPhoneValue,
  setNameValue
} = useMultiStepForm();
</script>

<template>
  <div class="hero-form">
    <div class="form">
      <!-- Шаг 1: Поле телефона -->
      <BasePhoneInput v-if="isFirstStep" v-model="formData.phone" class="phone-input"
        :hasAttemptedSubmit="hasAttemptedSubmit" :showSuccess="showPhoneSuccess" @update:modelValue="setPhoneValue"
        @update:valid="setPhoneValid" @started-typing="handleStartedTyping" @focus="handleStartedTyping"
        @click="handleStartedTyping" />

      <!-- Шаг 2: Поле имени -->
      <BaseInput v-if="isSecondStep" v-model="formData.name" type="text" class="name-input"
        placeholder="Enter your name" @update:modelValue="setNameValue" />

      <BaseButton class="button" :disabled="isSubmitting"
        @click="isFirstStep ? handlePhoneSubmit() : handleNameSubmit()">
        Send
      </BaseButton>
    </div>

    <div class="contacts" :class="{ 'contacts-wrap': contactsWrap }">
      <span v-if="showContactsText" class="contacts-text">{{ hero.cta.contacts.text }}</span>
      <div class="contacts-links">
        <BaseContactLink class="contact-link">
          <template #icon>
            <img src="@/assets/images/contact/phone.svg" class="icon" />
          </template>
          <template #text>{{ hero.cta.contacts.links[0] }}</template>
        </BaseContactLink>
        <BaseContactLink class="contact-link">
          <template #icon>
            <img src="@/assets/images/contact/whatsapp.svg" class="icon" />
          </template>
          <template #text>{{ hero.cta.contacts.links[1] }}</template>
        </BaseContactLink>
      </div>
    </div>

    <!-- Сообщение об успехе -->
    <div class="success-text" :class="{ show: showSuccessText }">
      {{ messages.success.contact }}
    </div>
    <div class="success-text adaptive" :class="{ show: showSuccessText }">
      {{ messages.success.contactAdaptive }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form {
  display: inline-flex;
  box-shadow: $common-shadow $color-black-shadow;
  width: max-content;
  border-radius: $radius-md;
  max-width: 100%;
}

.phone-input {
  border-radius: $radius-md 0 0 $radius-md;
  border-right: 0;
  width: 400px;
}

.name-input {
  border-radius: $radius-md 0 0 $radius-md;
  border: 1px solid $color-grey;
  border-right: 0;
  width: 400px;
}

.button {
  width: 150px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.contacts {
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;

  &.contacts-wrap {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    .contacts-links {
      flex-direction: column;
      gap: 12px;
    }
  }
}

.contacts-text {
  font-size: $font-size-xl;
}

.contacts-links {
  padding-top: 2px;
  display: inline-flex;
  gap: $spacing-sm;
}

.contact-link {
  gap: 10px;

  &:last-child {
    color: $color-green-dark;
  }
}

.success-text.adaptive {
  display: none;
}

.success-text {
  color: $color-green-bright;
  font-size: $font-size-lg;
  text-align: left;
  transition: all $transition ease;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  height: $font-size-lg;
  line-height: $font-size-lg;

  &.show {
    opacity: 1;
    transform: scaleY(1);
  }
}

.icon {
  width: 20px;
  height: 20px;
}


@media screen and (max-width: $breakpoint-xl) {
  .form {
    border-radius: $radius-sm;
    width: 100%;
    max-width: 480px;
  }

  .hero-form {
    gap: 12px;
  }

  .phone-input {
    border-radius: $radius-sm 0 0 $radius-sm;
    border-right: 0;
    width: 72%;
  }

  .button {
    width: 28%;
  }

  .contacts {
    gap: 12px;
  }

  .contacts-text {
    font-size: $font-size-md;
  }

  .contacts-links { 
    gap: 14px;
  }

  .contact-link {
    gap: 8px;
  }

  .icon {
    width: 18px;
    height: 18px;
  }

  .success-text {
    height: $font-size-md;
    font-size: $font-size-md;
    line-height: $font-size-md;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .hero-form {
    gap: 10px;
  }

  .contacts-text {
    font-size: $font-size-base;
  }

  .icon {
    width: 16px;
    height: 16px;
  }

  .success-text.adaptive {
    display: block;
  }

  .success-text {
    margin-top: 0.5vw;
    display: none;
    height: $font-size-base;
    font-size: $font-size-base;
    line-height: $font-size-base;
  }
}

@media screen and (max-width: $breakpoint-xs) {
  .button {
    width: 25%;
  }

  .phone-input {
    border-radius: $radius-sm 0 0 $radius-sm;
    border-right: 0;
    width: 75%;
  }
}
</style>
