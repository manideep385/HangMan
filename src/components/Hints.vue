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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.hints-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
}

.hints-header h3 {
  margin: 0;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.hint-btn {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.hint-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
}

.hint-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.hint-btn:disabled {
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.6;
}

.hints-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hint-item {
  background: rgba(255, 255, 255, 0.95);
  padding: 12px;
  border-radius: 10px;
  border-left: 4px solid #f5576c;
  animation: slideIn 0.4s ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hint-number {
  font-weight: 700;
  color: #f5576c;
  margin-right: 8px;
  font-size: 0.95rem;
}

.hint-text {
  color: #2c3e50;
  font-size: 0.9rem;
  line-height: 1.5;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .hints-container {
    max-width: 450px;
    margin: 0 auto;
  }
}

/* Mobile Landscape & Small Tablets (481px - 768px) */
@media (max-width: 768px) {
  .hints-container {
    max-width: 100%;
    padding: 18px;
  }
  
  .hints-header h3 {
    font-size: 1.2rem;
  }
  
  .hint-btn {
    padding: 11px 18px;
    font-size: 1rem;
  }
  
  .hint-item {
    padding: 11px;
  }
  
  .hint-number {
    font-size: 0.9rem;
  }
  
  .hint-text {
    font-size: 0.85rem;
  }
}

/* Mobile Portrait (up to 480px) */
@media (max-width: 480px) {
  .hints-container {
    padding: 15px;
  }
  
  .hints-header {
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .hints-header h3 {
    font-size: 1.1rem;
  }
  
  .hint-btn {
    padding: 10px 16px;
    font-size: 0.95rem;
  }
  
  .hints-list {
    gap: 8px;
  }
  
  .hint-item {
    padding: 10px;
  }
  
  .hint-number {
    font-size: 0.85rem;
  }
  
  .hint-text {
    font-size: 0.8rem;
  }
}

/* Extra Small Devices (up to 375px) */
@media (max-width: 375px) {
  .hints-container {
    padding: 12px;
  }
  
  .hints-header h3 {
    font-size: 1rem;
  }
  
  .hint-btn {
    padding: 9px 14px;
    font-size: 0.9rem;
  }
  
  .hint-item {
    padding: 9px;
  }
}
</style>
