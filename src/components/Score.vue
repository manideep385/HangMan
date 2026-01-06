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
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.score-box, .level-box, .category-box {
  background: #f4f4f4;
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
}

.score-label, .level-label, .category-label {
  font-size: 1.2rem;
  color: #555;
  font-weight: 500;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.level-value {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 5px 15px;
  border-radius: 5px;
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
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
  padding: 5px 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .score-container {
    gap: 15px;
  }
  
  .score-box, .level-box, .category-box {
    padding: 12px 20px;
  }
  
  .score-label, .level-label, .category-label {
    font-size: 1rem;
  }
  
  .score-value, .level-value, .category-value {
    font-size: 1.1rem;
  }
}
</style>
