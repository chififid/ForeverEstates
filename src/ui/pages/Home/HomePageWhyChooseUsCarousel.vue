<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed, nextTick } from "vue";


const props = defineProps({
  speed: {
    type: Number,
    default: 30
  },
  height: {
    type: String,
    default: "600px"
  }
});


const emit = defineEmits(["content-needed-left", "content-needed-right"]);


const viewport = ref(null);
const scroller = ref(null);
const block = ref(null);


const state = reactive({
  offset: 0,
  blockHeight: 0,
  speed: props.speed,
  running: true,
  isPointerDown: false,
  pointerStartY: 0,
  offsetStart: 0,
  lastTime: null,
  velocity: 0,
  friction: 0.94,
  isInertia: false,
  lastMoveTime: null,
  lastMoveY: 0,
  resumeTimeout: null,
  lastMouseX: 0,
  lastMouseY: 0,
});

let rafId = null;
let resizeObserver = null;


function viewportPx() {
  return Math.max(0, parseInt(props.height));
}
function minOffset() {
  return Math.min(0, viewportPx() - state.blockHeight);
}
function clampOffset(v) {
  const lo = minOffset();
  if (v > 0) return 0;
  if (v < lo) return lo;
  return v;
}


const scrollerStyle = computed(() => ({
  transform: `translate3d(0, ${state.offset}px, 0)`,
}));


function measure() {
  if (!block.value) return;
  const newHeight = block.value.getBoundingClientRect().height || 0;
  if (!newHeight) return;

  state.blockHeight = newHeight;
  state.offset = clampOffset(state.offset);

  setTimeout(() => {
    checkAndAddContentForColumns();
  }, 200);
}


function checkAndAddContentForColumns() {
  if (!scroller.value || !block.value) return;

  const vh = viewportPx();
  const safetyMargin = 300;

  const checkCol = (sel, emitName, yShift = 0) => {
    const el = block.value.querySelector(sel);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const contentEnd = rect.height + state.offset + yShift;
    if (contentEnd < vh + safetyMargin) emit(emitName);
  };

  checkCol(".column-1", "content-needed-left", 0);
  checkCol(".column-2", "content-needed-right", -60);
}


function tick(now) {
  if (!state.lastTime) state.lastTime = now;
  const dt = (now - state.lastTime) / 1000;
  state.lastTime = now;

  if (state.isInertia && !state.isPointerDown) {
    state.velocity *= state.friction;
    state.offset = clampOffset(state.offset + state.velocity * dt);

    if (Math.abs(state.velocity) < 10) {
      state.isInertia = false;
      state.velocity = 0;
    }
  } else if (state.running && !state.isPointerDown && state.blockHeight > 0) {
    state.offset = clampOffset(state.offset - state.speed * dt);
  }

  if (rafId % 10 === 0) {
    checkAndAddContentForColumns();
  }

  rafId = requestAnimationFrame(tick);
}


function onPointerDown(e) {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  viewport.value.setPointerCapture(e.pointerId);
  state.isPointerDown = true;
  state.pointerStartY = e.clientY;
  state.offsetStart = state.offset;
  state.running = false;
  state.isInertia = false;
  state.velocity = 0;
  state.lastTime = null;
  state.lastMoveTime = null;
  state.lastMoveY = 0;
  e.preventDefault();
}

function onPointerMove(e) {
  if (!state.isPointerDown) return;
  const dy = e.clientY - state.pointerStartY;
  state.offset = clampOffset(state.offsetStart + dy);

  const now = performance.now();
  if (state.lastMoveTime) {
    const dt = (now - state.lastMoveTime) / 1000;
    if (dt > 0) {
      const moveDistance = e.clientY - (state.pointerStartY + state.lastMoveY);
      const instantVelocity = moveDistance / dt;
      state.velocity = state.velocity * 0.6 + instantVelocity * 0.4;
    }
  }
  state.lastMoveTime = now;
  state.lastMoveY = e.clientY - state.pointerStartY;

  if (rafId % 5 === 0) checkAndAddContentForColumns();
}

function onPointerUp(e) {
  if (!state.isPointerDown) return;
  try { viewport.value.releasePointerCapture?.(e.pointerId); } catch {}
  state.isPointerDown = false;

  const rect = viewport.value.getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;

  if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    if (Math.abs(state.velocity) > 50) {
      state.velocity = Math.max(-600, Math.min(600, state.velocity));
      state.isInertia = true;
      state.running = false;
    } else {
      state.running = false;
      state.isInertia = false;
    }
  } else {
    state.running = true;
    state.isInertia = false;
  }
  state.lastTime = null;
}


function onMouseEnter() {
  state.running = false;
  state.lastTime = null;
}
function onMouseLeave() {
  state.running = true;
  state.lastTime = null;
}
function onMouseMove(e) {
  state.lastMouseX = e.clientX;
  state.lastMouseY = e.clientY;
}
function onWheel(e) {
  state.running = false;
  state.isInertia = false;
  state.velocity = 0;

  const scrollStep = 45;
  const delta = e.deltaY > 0 ? -scrollStep : scrollStep;
  state.offset = clampOffset(state.offset + delta);

  checkAndAddContentForColumns();

  clearTimeout(state.resumeTimeout);
  state.resumeTimeout = setTimeout(() => {
    if (viewport.value) {
      const rect = viewport.value.getBoundingClientRect();
      const { lastMouseX: mx = 0, lastMouseY: my = 0 } = state;
      if (mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom) return;
    }
    state.running = true;
    state.lastTime = null;
  }, 1500);

  e.preventDefault();
}


const pause = () => {
  state.running = false;
  state.lastTime = null;
};
const resume = () => {
  state.running = true;
  state.lastTime = null;
};
defineExpose({ pause, resume, measure });


onMounted(() => {
  nextTick(() => measure());
  rafId = requestAnimationFrame(tick);
      window.addEventListener("pointermove", onPointerMove);

  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(() => {
      setTimeout(() => measure(), 200);
    });
    if (block.value) resizeObserver.observe(block.value);
    if (viewport.value) resizeObserver.observe(viewport.value);
  } else {
    window.addEventListener("resize", measure);
  }
});
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
  if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", measure);
});
</script>

<template>
  <div 
    class="carousel-wrapper"
    ref="viewport"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerUp"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    @wheel="onWheel"
  >
    <div class="scroller" ref="scroller" :style="scrollerStyle">
      <div class="block" ref="block">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel-wrapper {
  height: v-bind(height);
  position: relative;
  touch-action: pan-y;
  user-select: none;
  cursor: grab;
  touch-action: none;
  
  &:active { cursor: grabbing; }
  
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 80px;
    z-index: 10;
    pointer-events: none;
  }

  &::before {
    top: 0;
    background: linear-gradient(180deg, $color-beige-light 0%, rgba(255,253,250,0) 100%);
  }
  &::after {
    bottom: 0;
    background: linear-gradient(0deg, $color-beige-light 0%, rgba($color-beige-light,0) 100%);
  }
}
.scroller {
  will-change: transform;
  transform: translate3d(0,0,0);
}

.block {
  width: 100%;
}
</style>
