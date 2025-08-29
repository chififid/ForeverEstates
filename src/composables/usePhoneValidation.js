import { ref, computed } from "vue";

export function usePhoneValidation() {
  const phoneValid = ref(false);
  const hasAttemptedSubmit = ref(false);

  const setPhoneValid = (valid) => {
    phoneValid.value = valid;
  };

  const setAttemptedSubmit = (attempted) => {
    hasAttemptedSubmit.value = attempted;
  };

  const resetValidation = () => {
    phoneValid.value = false;
    hasAttemptedSubmit.value = false;
  };

  const shouldShowError = computed(() => {
    return hasAttemptedSubmit.value && !phoneValid.value;
  });

  return {
    phoneValid,
    hasAttemptedSubmit,
    setPhoneValid,
    setAttemptedSubmit,
    resetValidation,
    shouldShowError
  };
}
