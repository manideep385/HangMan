<template>
  <LevelSelector 
    v-if="!levelSelected"
    :level-selected="levelSelected" 
    @select-level="selectLevel"
  />
  <div v-else-if="isLoading" class="loading-screen">
    <div class="loading-content">
      <div class="spinner"></div>
      <p>Generating your word...</p>
    </div>
  </div>
  <div v-else>
    <button @click="goBackHome" class="back-home-btn" title="Back to Home">
      🏠 Home
    </button>
    <Header />
    <Score :score="currentScore" :level="difficulty" :category="category" />
    <div class="game-layout">
      <div class="game-container">
        <Figure :wrong-count="wrongLetters.length"/>
        <WrongLetters :wrong-letters="wrongLetters"/>
        <Word :letters="letters" :correct-letters="correctLetters"/>
      </div>
      <Hints 
        :hints-remaining="hintsRemaining" 
        :used-hints="usedHints"
        :game-over="status !== ''"
        @request-hint="provideHint"
      />
    </div>
    <Popup :status="status" :word="word" :score="currentScore" @reset="reset"/>
    <Notification :show="notification"/>
  </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue'
import './assets/style.css'
import Header from './components/Header.vue'
import Figure from './components/Figure.vue'
import WrongLetters from './components/WrongLetters.vue'
import Word from './components/Word.vue'
import Popup from './components/Popup.vue'
import Notification from './components/Notification.vue'
import LevelSelector from './components/LevelSelector.vue'
import Score from './components/Score.vue'
import Hints from './components/Hints.vue'
import onKeyDown from './assets/onKeydown'
import { generateWord } from './services/aiService'
import fallbackWords from './data/words.json'

// Game state
const difficulty = ref('')
const category = ref('')
const levelSelected = ref(false)
const word = ref('')
const wordHints = ref([])
const guessedLetters = ref([])
const hintsRemaining = ref(3)
const usedHints = ref([])
const currentScore = ref(100)
const isLoading = ref(false)

// Computed properties
const letters = computed(() => word.value.split(''))
const wrongLetters = computed(() =>
  guessedLetters.value.filter(l => !letters.value.includes(l)))
const correctLetters = computed(() =>
  guessedLetters.value.filter(l => letters.value.includes(l)))

const status = computed(() => {
  if (wrongLetters.value.length === 6) return 'lost'
  if (letters.value.every(l => correctLetters.value.includes(l)))
    return 'win'
  return ''
})

// Helper function to get word from fallback JSON
const getFromFallback = (selectedCategory, level) => {
  const words = fallbackWords[selectedCategory][level]
  const selected = words[Math.floor(Math.random() * words.length)]
  return selected
}

// Main function to get word - tries AI first, falls back to JSON
const getWord = async (selectedCategory, level) => {
  try {
    // Try to generate with AI
    const aiResult = await generateWord(selectedCategory, level)
    
    if (aiResult && aiResult.word && aiResult.hints) {
      return aiResult
    }
  } catch (error) {
    console.warn('AI generation failed, using fallback:', error)
  }
  
  // Fallback to JSON file
  return getFromFallback(selectedCategory, level)
}

const selectLevel = async (selection) => {
  difficulty.value = selection.difficulty
  category.value = selection.category
  levelSelected.value = true
  isLoading.value = true
  
  try {
    const selected = await getWord(selection.category, selection.difficulty)
    word.value = selected.word
    wordHints.value = selected.hints
  } catch (error) {
    console.error('Error loading word:', error)
    // Final fallback if everything fails
    const fallback = getFromFallback(selection.category, selection.difficulty)
    word.value = fallback.word
    wordHints.value = fallback.hints
  } finally {
    isLoading.value = false
  }
}

const reset = () => {
  levelSelected.value = false
  difficulty.value = ''
  category.value = ''
  guessedLetters.value = []
  word.value = ''
  wordHints.value = []
  hintsRemaining.value = 3
  usedHints.value = []
  currentScore.value = 100
}

const goBackHome = () => {
  reset()
}

const provideHint = () => {
  if (hintsRemaining.value > 0 && wordHints.value.length > 0) {
    const hintIndex = 3 - hintsRemaining.value
    usedHints.value.push(wordHints.value[hintIndex])
    hintsRemaining.value--
    
    // Update score based on hints used
    const hintsUsed = 3 - hintsRemaining.value
    if (hintsUsed === 1) currentScore.value = 80
    else if (hintsUsed === 2) currentScore.value = 60
    else if (hintsUsed === 3) currentScore.value = 40
  }
}

// Watch for game completion to update score
watch(status, (newStatus) => {
  if (newStatus === 'lost') {
    currentScore.value = 0
  }
})

const notification = ref(false)
const shownotification = () => {
  notification.value = true
  setTimeout(() => (notification.value = false), 2000)
}

onKeyDown(event => {
  const letter = event.key.toLowerCase()
  if (event.keyCode < 65 || event.keyCode > 90) return
  if (status.value) return
  if (guessedLetters.value.includes(letter)) {
    shownotification()
    return
  }
  guessedLetters.value.push(letter)
})
</script>

<style>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.loading-content {
  text-align: center;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-content p {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.game-layout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex-wrap: wrap;
}

.game-container {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 968px) {
  .game-layout {
    flex-direction: column;
    align-items: center;
  }
}

.back-home-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  z-index: 100;
}

.back-home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.back-home-btn:active {
  transform: translateY(0);
}

</style>
