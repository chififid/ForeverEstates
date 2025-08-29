import { onUnmounted } from "vue";

export function useTimers() {
  const timers = new Set();

  const setTimer = (callback, delay) => {
    const timerId = setTimeout(() => {
      timers.delete(timerId);
      callback();
    }, delay);
    timers.add(timerId);
    return timerId;
  };

  const clearTimer = (timerId) => {
    if (timers.has(timerId)) {
      clearTimeout(timerId);
      timers.delete(timerId);
    }
  };

  const clearAllTimers = () => {
    timers.forEach(timerId => clearTimeout(timerId));
    timers.clear();
  };

  onUnmounted(() => {
    clearAllTimers();
  });

  return {
    setTimer,
    clearTimer,
    clearAllTimers
  };
}
