import { ref } from "vue";
import { useTimers } from "./useTimers";

export function useUIState() {
  const { setTimer } = useTimers();
  
  const showPhoneSuccess = ref(false);
  const showNameSuccess = ref(false);
  const showSuccessText = ref(false);

  const setSuccessStates = (show = true) => {
    showPhoneSuccess.value = show;
    showNameSuccess.value = show;
    showSuccessText.value = show;
  };

  const hideSuccessStates = () => {
    setSuccessStates(false);
  };

  const showSuccessWithTimer = (duration = 3000, fadeDelay = 300) => {
    setSuccessStates(true);
    
    setTimer(() => {
      showSuccessText.value = false;
      
      setTimer(() => {
        showPhoneSuccess.value = false;
        showNameSuccess.value = false;
      }, fadeDelay);
    }, duration);
  };

  const resetSuccessStates = () => {
    showPhoneSuccess.value = false;
    showNameSuccess.value = false;
    showSuccessText.value = false;
  };

  return {
    showPhoneSuccess,
    showNameSuccess,
    showSuccessText,
    setSuccessStates,
    hideSuccessStates,
    showSuccessWithTimer,
    resetSuccessStates
  };
}
