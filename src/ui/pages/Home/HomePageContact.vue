<script setup>
import BaseButton from "@/ui/components/BaseButton.vue";
import BasePhoneInput from "@/ui/components/BasePhoneInput.vue";
import BaseContactLink from "@/ui/components/BaseContactLink.vue";
import BaseLogoIcon from "@/ui/components/BaseLogoIcon.vue";
import BaseInput from "@/ui/components/BaseInput.vue";
import BaseSocialLinks from "@/ui/components/BaseSocialLinks.vue";
import { useTimers } from "@/composables/useTimers";
import { useForm } from "@/composables/useForm";
import { useUIState } from "@/composables/useUIState";
import { usePhoneValidation } from "@/composables/usePhoneValidation";
import consultationData from "@/assets/content/contact.json";
import messages from "@/assets/content/messages.json";

const { setTimer, clearAllTimers } = useTimers();

const {
  formData,
  isSubmitting,
  setFieldValue,
  setSubmitting,
  resetForm
} = useForm({
  name: "",
  phone: ""
});

const {
  showPhoneSuccess,
  showNameSuccess,
  showSuccessText,
  showSuccessWithTimer
} = useUIState();

const {
  phoneValid,
  hasAttemptedSubmit,
  setPhoneValid,
  setAttemptedSubmit,
  resetValidation
} = usePhoneValidation();

const handleSubmit = async (e) => {
  e.preventDefault();
  
  clearAllTimers();
  setAttemptedSubmit(true);
  
  if (!phoneValid.value) {
    setTimer(() => {
      setAttemptedSubmit(false);
    }, 3000);
    return;
  }
  
  setSubmitting(true);
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    resetForm();
    resetValidation();
    showSuccessWithTimer();
    
  } catch {
    // Обработка ошибок
  } finally {
    setSubmitting(false);
  }
};

const handleNameChange = (value) => {
  setFieldValue("name", value);
  showNameSuccess.value = false;
};

const handlePhoneChange = (value) => {
  setFieldValue("phone", value);
};

const handlePhoneValid = (valid) => {
  setPhoneValid(valid);
};

const handleStartedTyping = () => {
  setAttemptedSubmit(false);
};
</script>

<template>
  <section class="contact">
    <div class="container">
      <div class="contact-card">
        <div class="header">
          <div class="header-content">
            <h2 class="title">{{ consultationData.title }}</h2>
            <BaseLogoIcon class="logo"/>
          </div>
          <p class="description">{{ consultationData.description }}</p>
        </div>

        <form class="form" @submit="handleSubmit">
          <div class="form-group">
            <label for="name" class="label">{{ consultationData.form.name.label }}</label>
            <BaseInput
              id="name"
              v-model="formData.name"
              type="text"
              class="input"
              :placeholder="consultationData.form.name.placeholder"
              :success="showNameSuccess"
              @update:model-value="handleNameChange"
            />
          </div>

          <div class="form-group">
            <label for="phone" class="label">{{ consultationData.form.phone.label }}</label>
            <BasePhoneInput 
              v-model="formData.phone" 
              class="input"
              :show-success="showPhoneSuccess"
              :has-attempted-submit="hasAttemptedSubmit"
              @update:model-value="handlePhoneChange"
              @update:valid="handlePhoneValid"
              @started-typing="handleStartedTyping"
            />
          </div>

          <BaseButton 
            type="submit" 
            class="submit-btn"
            :disabled="isSubmitting"
          >
            {{ consultationData.button.text }}
            <span class="active-icon">{{ consultationData.button.icon }}</span>
          </BaseButton>

          <div class="success-text" :class="{ show: showSuccessText }">
            {{ messages.success.contact }}
          </div>
        </form>

        <div class="footer">
          <div class="contact-info">
            <BaseContactLink>
              <template #icon>
                <img src="/src/assets/images/contact/phone.svg" alt="Phone" />
              </template>
              <template #text>{{ consultationData.footer.phone.text }}</template>
            </BaseContactLink>
            
            <BaseContactLink>
              <template #icon>
                <img src="/src/assets/images/contact/whatsapp.svg" alt="WhatsApp" />
              </template>
              <template #text>{{ consultationData.footer.chat.text }}</template>
            </BaseContactLink>
          </div>
          
          <BaseSocialLinks />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  background: linear-gradient(180deg, #FFF 0%, $color-beige-light 50%, $color-beige-light 100%);
  padding: 60px 0 120px;
}

.container {
  max-width: $max-container-width;
  margin: 0 auto;
  padding: 0 $padding-side;
}

.contact-card {
  border-radius: $radius-lg;
  border: 1px solid $color-grey-light;
  background: linear-gradient(90deg, #fcfcfc 0%, #FFF 50.48%, #fcfcfc 100%);
  box-shadow: $common-shadow $color-black-shadow;
  padding: 40px;
  max-width: 720px;
  margin: 0 auto;
}

.header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.title {
  font-family: Aeonik;
  font-size: 36px;
  line-height: 125%;
}

.logo {
  width: 56px;
  height: 56px;
}

.description {
  margin-top: 20px;
  font-size: $font-size-md;
  line-height: 144%;
}

.form {
  border-top: 1px solid $color-grey-light;
  padding: 30px 0;
}

.form-group {
  margin-bottom: 24px;
}

.label {
  font-family: Inter;
  font-size: $font-size-md;
  line-height: 144.4%; 
}

.input {
  width: 100%;
  margin-top: 10px;
  font-size: $font-size-md;
  border: 1px solid $color-grey-light;
  border-radius: $radius-sm;
}

.submit-btn {
  width: 100%;
  border-radius: $radius-md;
  box-shadow: $cta-shadow $color-red-white;
}

.success-text {
  color: $color-green-bright;
  font-size: $font-size-lg;
  text-align: left;
  font-weight: Inter;
  margin-top: 0;
  overflow: hidden;
  transition: all $transition ease;
  max-height: 0;
  opacity: 0;
  pointer-events: none;
  
  &.show {
    margin-top: 20px;
    max-height: 30px;
    opacity: 1;
    pointer-events: auto;
  }
}

.footer {
  border-top: 1px solid $color-grey-light;
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

@media screen and (max-width: $breakpoint-lg) {
  .contact {
    padding: calc($padding-block-lg / 2) 0 $padding-block-lg 0;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .title {
    text-align: left;
  }

  .container {
    padding: 0 $padding-side-adaptive;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .header-content {
    gap: 20px;
  }

  .contact {
    padding: calc($padding-block-sm / 2) 0 $padding-block-sm 0;
  }

  .contact-card {
    padding: 20px;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .title {
    font-size: calc(13px + 4vw);
  }

  .description {
    margin-top: 10px;
    font-size: 16px;
    line-height: 144%;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .label {
    font-size: 16px;
  }

  .input {
    font-size: $font-size-md;
    border: 1px solid $color-grey-light;
    border-radius: 8px;
    padding-right: 8px;
  }

  .submit-btn {
    margin-top: 10px;
  }

  .contact-info {
    gap: 15px;
  }

  .footer {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: $breakpoint-xs) {
  .footer {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .social-links {
    gap: 17px;
  }
}
</style>
