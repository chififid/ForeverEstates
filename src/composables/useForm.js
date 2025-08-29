import { ref, computed } from "vue";

export function useForm(initialData = {}, validationRules = {}) {
  const formData = ref({ ...initialData });
  const errors = ref({});
  const isSubmitting = ref(false);
  const submitSuccess = ref(false);
  const hasAttemptedSubmit = ref(false);

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  const setFieldValue = (field, value) => {
    formData.value[field] = value;
    if (errors.value[field]) {
      delete errors.value[field];
    }
  };

  const setFieldError = (field, error) => {
    if (error) {
      errors.value[field] = error;
    } else {
      delete errors.value[field];
    }
  };

  const validateField = (field, value) => {
    const rule = validationRules[field];
    if (!rule) return true;

    if (rule.required && !value) {
      setFieldError(field, rule.required);
      return false;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      setFieldError(field, rule.pattern.message);
      return false;
    }

    if (rule.custom) {
      const customResult = rule.custom(value, formData.value);
      if (customResult !== true) {
        setFieldError(field, customResult);
        return false;
      }
    }

    setFieldError(field, null);
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      if (!validateField(field, formData.value[field])) {
        newErrors[field] = errors.value[field];
      }
    });
    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    formData.value = { ...initialData };
    errors.value = {};
    hasAttemptedSubmit.value = false;
    submitSuccess.value = false;
  };

  const setSubmitting = (value) => {
    isSubmitting.value = value;
  };

  const setSubmitSuccess = (value) => {
    submitSuccess.value = value;
  };

  const setAttemptedSubmit = (value) => {
    hasAttemptedSubmit.value = value;
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    hasAttemptedSubmit,
    isValid,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm,
    resetForm,
    setSubmitting,
    setSubmitSuccess,
    setAttemptedSubmit
  };
}
