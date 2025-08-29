<script setup>
import { ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["toggle"]);

const answerEl = ref(null);

const handleClick = () => {
  emit("toggle", props.item.id);
};


const getAnswerHeight = () => answerEl.value?.scrollHeight || 0;
</script>

<template>
  <div class="faq-item" :class="{ open: isOpen }">
    <div class="question-wrapper" @click="handleClick">
      <div class="question-content">
        <h3 class="question">{{ item.question }}</h3>
      </div>
      <img src="/src/assets/images/faq/close.svg" alt="Toggle" class="icon" />
    </div>

    <div ref="answerEl" class="answer-wrapper" :style="{ maxHeight: isOpen ? getAnswerHeight() + 'px' : '0px' }">
      <div class="answer">
        <p v-for="(paragraph, index) in item.answer.split('\n').filter(p => p.trim())" :key="index"
          class="answer-paragraph">
          {{ paragraph.trim() }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-item {
  &:last-child {
    border-bottom: 1px solid $color-grey-light;
  }

  &.open {
    .question-wrapper {
      border-bottom: 1px solid $color-grey-light;
    }

    .icon {
      transform: rotate(45deg);
    }
  }
}

.question-wrapper {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 40px 25px;
  border-top: 1px solid $color-grey-light;
  border-bottom: 1px solid transparent;
  transition: border-bottom $transition ease;

  &:hover {
    .question {
      opacity: 0.6;
    }
  }
}

.question-content {
  flex: 1;
}

.question {
  transition: opacity $transition ease;
  font-family: Aeonik;
  font-size: 30px;
  line-height: 32px;
  letter-spacing: -0.8px;
}

.answer-wrapper {
  overflow: hidden;
  transition:
    max-height calc($transition * 2) ease;
  will-change: max-height;
}

.answer {
  font-family: Nunito;
  padding: 40px 25px 40px 50px;
  line-height: 144.44%;
  font-size: $font-size-md;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.1px;
}

.answer-paragraph {
  margin: 0;

  &+.answer-paragraph {
    margin-top: 18px;
  }
}

.icon {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform calc($transition * 2) ease;
}

@media screen and (max-width: $breakpoint-lg) {
  .question-wrapper {
    gap: 30px;
    padding: calc(20px + 2vw) 20px;
  }

  .question {
    font-size: calc(15px + 1.5vw);
    line-height: 110%;
    letter-spacing: -0.6px;
  }

  .answer {
    padding: calc(20px + 2vw) 20px calc(20px + 2vw) 40px;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .question-wrapper {
    padding: calc(20px + 2vw) 20px;
  }

  .question {
    font-size: calc(13px + 1.5vw);
  }

  .answer {
    font-size: calc(18px + 1vw - 7px);
    padding: calc(20px + 2vw) 20px calc(20px + 2vw) 40px;
  }

  .icon {
    width: 21px;
    height: 21px;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .question-wrapper {
    gap: 20px;
  }

  .answer {
    padding: calc(20px + 2vw) 20px calc(20px + 2vw) 20px;
  }

  .question {
    font-size: calc(16px + 1.7vw);
    line-height: 116%;
  }
  .answer {
    font-size: 16px;
  }
}
</style>
