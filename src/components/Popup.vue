<template>
    <div v-if="finalMessage" class="popup-container" id="popup-container">
        <div class="popup">
            <h2>{{ finalMessage }}</h2>
            <div class="score-display">
                <h3>Your Score: {{ score }}</h3>
            </div>
            <h3 v-show="status === 'lost'" class="word-reveal">The word was: {{ word }}</h3>
            <button @click="reset">Play Again</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: ''
  },
  word: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['reset'])

const finalMessage = computed(() => {
  if (props.status === 'win') {
    return 'Congratulations! You won! 🎉'
  } else if (props.status === 'lost') {
    return 'Unfortunately you lost. 😕'
  } else {
    return ''
  }
})

const reset = () => emit('reset')
</script>

<style scoped>
.score-display {
  background: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.score-display h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.word-reveal {
  color: #555;
  font-style: italic;
}
</style>