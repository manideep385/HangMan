<template>
  <div class="score-container">
    <div class="score-box">
      <span class="score-label">Score:</span>
      <span class="score-value">{{ score }}</span>
    </div>
    <div class="level-box">
      <span class="level-label">Level:</span>
      <span class="level-value" :class="level">{{ level.toUpperCase() }}</span>
    </div>
    <div class="category-box">
      <span class="category-label">Category:</span>
      <span class="category-value">{{ formatCategory(category) }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: {
    type: Number,
    default: 0
  },
  level: {
    type: String,
    default: 'easy'
  },
  category: {
    type: String,
    default: ''
  }
})

const formatCategory = (cat) => {
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}
</script>

<style scoped>
.score-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 20px auto;
  flex-wrap: wrap;
  max-width: 100%;
}

.score-box, .level-box, .category-box {
  background: #f4f4f4;
  padding: 12px 25px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.score-label, .level-label, .category-label {
  font-size: 1.1rem;
  color: #555;
  font-weight: 500;
  white-space: nowrap;
}

.score-value {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
}

.level-value {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 5px 15px;
  border-radius: 5px;
  white-space: nowrap;
}

.level-value.easy {
  background: #4caf50;
  color: white;
}

.level-value.medium {
  background: #ff9800;
  color: white;
}

.level-value.hard {
  background: #f44336;
  color: white;
}

.category-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: #667eea;
  padding: 5px 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .score-container {
    gap: 12px;
    margin: 15px auto;
  }
  
  .score-box, .level-box, .category-box {
    padding: 10px 20px;
  }
}

/* Mobile Landscape & Small Tablets (481px - 768px) */
@media (max-width: 768px) {
  .score-container {
    gap: 10px;
    margin: 12px auto;
  }
  
  .score-box, .level-box, .category-box {
    padding: 8px 16px;
  }
  
  .score-label, .level-label, .category-label {
    font-size: 0.95rem;
  }
  
  .score-value {
    font-size: 1.2rem;
  }
  
  .level-value, .category-value {
    font-size: 0.95rem;
    padding: 4px 12px;
  }
}

/* Mobile Portrait (up to 480px) */
@media (max-width: 480px) {
  .score-container {
    gap: 8px;
    margin: 10px auto;
    padding: 0 5px;
  }
  
  .score-box, .level-box, .category-box {
    padding: 7px 14px;
    gap: 8px;
  }
  
  .score-label, .level-label, .category-label {
    font-size: 0.85rem;
  }
  
  .score-value {
    font-size: 1.1rem;
  }
  
  .level-value, .category-value {
    font-size: 0.85rem;
    padding: 3px 10px;
  }
}

/* Extra Small Devices (up to 375px) */
@media (max-width: 375px) {
  .score-container {
    gap: 6px;
  }
  
  .score-box, .level-box, .category-box {
    padding: 6px 12px;
  }
  
  .score-label, .level-label, .category-label {
    font-size: 0.8rem;
  }
  
  .score-value {
    font-size: 1rem;
  }
  
  .level-value, .category-value {
    font-size: 0.8rem;
  }
}
</style>
