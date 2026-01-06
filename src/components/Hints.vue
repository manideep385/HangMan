<template>
  <div class="hints-container">
    <div class="hints-header">
      <h3>Hints Available: {{ hintsRemaining }}/3</h3>
      <button 
        v-if="hintsRemaining > 0 && !gameOver" 
        @click="requestHint" 
        class="hint-btn"
        :disabled="hintsRemaining === 0"
      >
        💡 Get Hint
      </button>
    </div>
    <div v-if="usedHints.length > 0" class="hints-list">
      <div v-for="(hint, index) in usedHints" :key="index" class="hint-item">
        <span class="hint-number">Hint {{ index + 1 }}:</span>
        <span class="hint-text">{{ hint }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  hintsRemaining: {
    type: Number,
    default: 3
  },
  usedHints: {
    type: Array,
    default: () => []
  },
  gameOver: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['requestHint'])

const requestHint = () => {
  emit('requestHint')
}
</script>

<style scoped>
.hints-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 500px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.hints-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.hints-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.hint-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.hint-btn:hover:not(:disabled) {
  background: #2980b9;
}

.hint-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.hints-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hint-item {
  background: white;
  padding: 12px;
  border-radius: 5px;
  border-left: 4px solid #3498db;
  animation: slideIn 0.3s ease-out;
}

.hint-number {
  font-weight: bold;
  color: #3498db;
  margin-right: 8px;
}

.hint-text {
  color: #555;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
