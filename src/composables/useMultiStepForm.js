import { ref, computed } from "vue";
import { useTimers } from "./useTimers";
import { useForm } from "./useForm";
import { useUIState } from "./useUIState";
import { usePhoneValidation } from "./usePhoneValidation";

export function useMultiStepForm() {
  const { setTimer, clearAllTimers } = useTimers();
  
  const currentStep = ref(1);
  const isSubmitting = ref(false);
  
  const {
    formData,
    setFieldValue,
    resetForm
  } = useForm({
    phone: "",
    name: ""
  });

  const {
    showPhoneSuccess,
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

  const isFirstStep = computed(() => currentStep.value === 1);
  const isSecondStep = computed(() => currentStep.value === 2);

  const nextStep = () => {
    if (currentStep.value < 2) {
      currentStep.value++;
    }
  };

  const resetToFirstStep = () => {
    currentStep.value = 1;
    resetForm();
    resetValidation();
  };

  const handlePhoneSubmit = () => {
    clearAllTimers();
    setAttemptedSubmit(true);
    
    if (!phoneValid.value) {
      setTimer(() => {
        setAttemptedSubmit(false);
      }, 3000);
      return;
    }
    
    nextStep();
  };

  const handleNameSubmit = async () => {
    // Убираем проверку на обязательность имени - теперь поле необязательно
    isSubmitting.value = true;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Сразу сбрасываем форму, но оставляем success состояния
      resetToFirstStep();
      showSuccessWithTimer();
      
    } catch {
      // Обработка ошибок
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleStartedTyping = () => {
    if (hasAttemptedSubmit.value) {
      setAttemptedSubmit(false);
    }
  };

  const setPhoneValue = (value) => {
    setFieldValue("phone", value);
    // Сбрасываем ошибку при изменении значения
    if (hasAttemptedSubmit.value) {
      setAttemptedSubmit(false);
    }
  };

  const setNameValue = (value) => {
    setFieldValue("name", value);
  };

  return {
    isSubmitting,
    formData,
    phoneValid,
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
  };
}
