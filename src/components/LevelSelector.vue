<template>
  <div class="level-selector">
    <div class="animated-background">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
    
    <div class="content">
      <div class="title-section">
        <div class="hangman-icon">
          <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Gallows -->
            <line x1="10" y1="90" x2="50" y2="90" stroke="white" stroke-width="3"/>
            <line x1="30" y1="10" x2="30" y2="90" stroke="white" stroke-width="3"/>
            <line x1="30" y1="10" x2="60" y2="10" stroke="white" stroke-width="3"/>
            <line x1="60" y1="10" x2="60" y2="25" stroke="white" stroke-width="3"/>
            <!-- Head -->
            <circle cx="60" cy="35" r="10" stroke="white" stroke-width="3" fill="none"/>
          </svg>
        </div>
        <h1 class="main-title">HANGMAN GAME</h1>
        <p class="subtitle">Can you guess the word before it's too late?</p>
        <p class="sub-description">Challenge your vocabulary and spelling skills!</p>
      </div>

      <!-- Difficulty Selection -->
      <div class="difficulty-section">
        <h2 class="section-title">Choose Your Difficulty Level</h2>
        <div class="level-buttons">
          <button 
            @click="selectDifficulty('easy')" 
            :class="['level-btn', 'easy', { selected: selectedDifficulty === 'easy' }]"
          >
            <div class="btn-icon">🌱</div>
            <div class="btn-content">
              <span class="btn-title">Easy</span>
              <span class="btn-desc">Max 5 letters</span>
            </div>
            <div class="btn-glow"></div>
          </button>

          <button 
            @click="selectDifficulty('medium')" 
            :class="['level-btn', 'medium', { selected: selectedDifficulty === 'medium' }]"
          >
            <div class="btn-icon">⚡</div>
            <div class="btn-content">
              <span class="btn-title">Medium</span>
              <span class="btn-desc">5-8 letters</span>
            </div>
            <div class="btn-glow"></div>
          </button>

          <button 
            @click="selectDifficulty('hard')" 
            :class="['level-btn', 'hard', { selected: selectedDifficulty === 'hard' }]"
          >
            <div class="btn-icon">🔥</div>
            <div class="btn-content">
              <span class="btn-title">Hard</span>
              <span class="btn-desc">8-15 letters</span>
            </div>
            <div class="btn-glow"></div>
          </button>
        </div>
      </div>

      <!-- Category Selection (Optional) -->
      <div v-if="selectedDifficulty" class="category-section">
        <div class="category-grid">
          <button 
            @click="selectCategoryOption('cricket')" 
            :class="['category-card', { selected: selectedCategory === 'cricket' }]"
          >
            <div class="category-icon">🏏</div>
            <div class="category-name">Cricket</div>
          </button>

          <button 
            @click="selectCategoryOption('cinema')" 
            :class="['category-card', { selected: selectedCategory === 'cinema' }]"
          >
            <div class="category-icon">🎬</div>
            <div class="category-name">Cinema</div>
          </button>

          <button 
            @click="selectCategoryOption('technology')" 
            :class="['category-card', { selected: selectedCategory === 'technology' }]"
          >
            <div class="category-icon">💻</div>
            <div class="category-name">Technology</div>
          </button>

          <button 
            @click="selectCategoryOption('food')" 
            :class="['category-card', { selected: selectedCategory === 'food' }]"
          >
            <div class="category-icon">🍕</div>
            <div class="category-name">Food</div>
          </button>

          <button 
            @click="selectCategoryOption('places')" 
            :class="['category-card', { selected: selectedCategory === 'places' }]"
          >
            <div class="category-icon">🌍</div>
            <div class="category-name">Places</div>
          </button>
        </div>
      </div>

      <!-- Start Button -->
      <div v-if="selectedDifficulty" class="start-button-container">
        <button @click="startGame" class="start-btn">
          Start Game 🎯
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['selectLevel'])

const selectedDifficulty = ref('')
const selectedCategory = ref('')

const selectDifficulty = (level) => {
  selectedDifficulty.value = level
}

const selectCategoryOption = (category) => {
  selectedCategory.value = category
}

const startGame = () => {
  let category = selectedCategory.value
  
  // If no category selected, pick random
  if (!category) {
    const categories = ['cricket', 'cinema', 'technology', 'food', 'places']
    category = categories[Math.floor(Math.random() * categories.length)]
  }
  
  emit('selectLevel', {
    difficulty: selectedDifficulty.value,
    category: category
  })
}
</script>

<style scoped>
.level-selector {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0;
}

.animated-background {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  right: 10%;
  animation-delay: 3s;
}

.circle-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  right: -100px;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  width: 90%;
  animation: fadeInUp 0.8s ease-out;
  margin: auto;
  padding-bottom: 40px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-section {
  margin-bottom: 30px;
}

.hangman-icon {
  margin-bottom: 20px;
  animation: swing 3s ease-in-out infinite;
}

@keyframes swing {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
}

.main-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  margin: 10px 0 5px 0;
  letter-spacing: 1px;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sub-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 5px 0 0 0;
  font-weight: 400;
  font-style: italicease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.3);
  }
  to {
    text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.6);
  }
}

.subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 10px 0 0 0;
  font-weight: 300;
  letter-spacing: 1px;
}

.difficulty-section {
  margin-bottom: 25px;
}

.section-title {
  color: #fff;
  font-size: 1.6rem;
  margin-bottom: 20px;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.level-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.level-btn {
  position: relative;
  padding: 0;
  width: 180px;
  height: 130px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.level-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
}

.level-btn:hover::before {
  opacity: 1;
}

.level-btn:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.level-btn:active {
  transform: translateY(-5px) scale(1.02);
}

.btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.level-btn:hover .btn-glow {
  opacity: 1;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-icon {
  font-size: 2.5rem;
  margin-bottom: 3px;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.btn-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.btn-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

.level-btn.easy {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.level-btn.medium {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.level-btn.hard {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.level-btn.selected {
  transform: translateY(-10px) scale(1.1);
  box-shadow: 0 20px 50px rgba(255, 255, 255, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.5);
}

/* Category Section */
.category-section {
  margin-top: 25px;
  margin-bottom: 20px;
  animation: fadeInUp 0.5s ease-out;
}

.optional {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.category-hint {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  margin: -10px 0 15px 0;
  font-style: italic;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  max-width: 700px;
  margin: 0 auto;
}

.category-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 15px 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.category-card:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.category-card.selected {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

.category-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
}

.category-name {
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.category-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 500;
}

/* Start Button */
.start-button-container {
  margin-top: 25px;
  margin-bottom: 20px;
  animation: fadeInUp 0.6s ease-out;
}

.start-btn {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 15px 50px;
  font-size: 1.3rem;
  font-weight: 800;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 25px rgba(245, 87, 108, 0.4);
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.start-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 40px rgba(245, 87, 108, 0.5);
}

.start-btn:active {
  transform: translateY(-2px) scale(1.02);
}

@media (max-width: 768px) {
  .level-selector {
    padding: 10px 0;
  }
  
  .content {
    width: 95%;
    padding-bottom: 30px;
  }
  
  .title-section {
    margin-bottom: 20px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .sub-description {
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }
  
  .difficulty-section {
    margin-bottom: 20px;
  }
  
  .level-buttons {
    gap: 12px;
  }
  
  .level-btn {
    width: 150px;
    height: 110px;
  }
  
  .btn-icon {
    font-size: 2rem;
  }
  
  .btn-title {
    font-size: 1.3rem;
  }
  
  .btn-desc {
    font-size: 0.8rem;
  }
  
  .category-section {
    margin-top: 20px;
    margin-bottom: 15px;
  }
  
  .category-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
  }
  
  .category-icon {
    font-size: 1.8rem;
  }
  
  .category-name {
    font-size: 0.95rem;
  }
  
  .category-desc {
    font-size: 0.7rem;
  }
  
  .start-button-container {
    margin-top: 20px;
    margin-bottom: 15px;
  }
  
  .start-btn {
    padding: 12px 40px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .level-selector {
    padding: 5px 0;
  }
  
  .content {
    width: 95%;
    padding-bottom: 20px;
  }
  
  .title-section {
    margin-bottom: 15px;
  }
  
  .hangman-icon svg {
    width: 60px;
    height: 75px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 0.95rem;
  }
  
  .sub-description {
    font-size: 0.8rem;
  }
  
  .section-title {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
  
  .optional {
    font-size: 1rem;
  }
  
  .difficulty-section {
    margin-bottom: 15px;
  }
  
  .level-buttons {
    gap: 10px;
  }
  
  .level-btn {
    width: 140px;
    height: 100px;
  }
  
  .btn-icon {
    font-size: 1.8rem;
  }
  
  .btn-title {
    font-size: 1.1rem;
  }
  
  .btn-desc {
    font-size: 0.75rem;
  }
  
  .category-section {
    margin-top: 15px;
    margin-bottom: 12px;
  }
  
  .category-hint {
    font-size: 0.85rem;
    margin: -8px 0 12px 0;
  }
  
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .category-card {
    padding: 12px 8px;
  }
  
  .category-icon {
    font-size: 1.6rem;
  }
  
  .category-name {
    font-size: 0.9rem;
  }
  
  .category-desc {
    font-size: 0.65rem;
  }
  
  .start-button-container {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  .start-btn {
    padding: 12px 35px;
    font-size: 1.1rem;
    width: 90%;
    max-width: 250px;
  }
}
</style>
