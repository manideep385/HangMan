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

      <div class="difficulty-section">
        <h2 class="section-title">Choose Your Difficulty Level</h2>
        <div class="level-buttons">
          <button @click="selectLevel('easy')" class="level-btn easy">
            <div class="btn-icon">🌱</div>
            <div class="btn-content">
              <span class="btn-title">Easy</span>
              <span class="btn-desc">Max 5 letters</span>
            </div>
            <div class="btn-glow"></div>
          </button>

          <button @click="selectLevel('medium')" class="level-btn medium">
            <div class="btn-icon">⚡</div>
            <div class="btn-content">
              <span class="btn-title">Medium</span>
              <span class="btn-desc">5-8 letters</span>
            </div>
            <div class="btn-glow"></div>
          </button>

          <button @click="selectLevel('hard')" class="level-btn hard">
            <div class="btn-icon">🔥</div>
            <div class="btn-content">
              <span class="btn-title">Hard</span>
              <span class="btn-desc">8-15 letters</span>
            </div>
            <div class="btn-glow"></div>
          </button>
        </div>
      </div>

      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">💡</span>
          <span class="feature-text">3 Hints Available</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🏆</span>
          <span class="feature-text">Score up to 100 Points</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['selectLevel'])

const selectLevel = (level) => {
  emit('selectLevel', level)
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
  overflow: hidden;
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
  margin-bottom: 50px;
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
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  margin: 0.5;
  margin: 15px 0 5px 0;
  font-weight: 600;
  letter-spacing: 1px;
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
  margin-bottom: 40px;
}

.section-title {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.level-buttons {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.level-btn {
  position: relative;
  padding: 0;
  width: 220px;
  height: 160px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
  font-size: 3rem;
  margin-bottom: 5px;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.btn-title {
  font-size: 1.8rem;
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

.features {
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.15);
  padding: 15px 30px;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 1.5rem;
}

.feature-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .level-btn {
    width: 180px;
    height: 140px;
  }
  
  .btn-icon {
    font-size: 2.5rem;
  }
  
  .btn-title {
    font-size: 1.5rem;
  }
}
</style>
