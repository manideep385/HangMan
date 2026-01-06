<template>
  <LevelSelector 
    v-if="!levelSelected"
    :level-selected="levelSelected" 
    @select-level="selectLevel"
  />
  <div v-else>
    <Header />
    <Score :score="currentScore" :level="difficulty" />
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

// Word lists by difficulty
const wordsByDifficulty = {
  easy: ['cat', 'dog', 'fish', 'bird', 'lion', 'bear', 'wolf', 'frog', 'duck', 'deer'],
  medium: ['python', 'coding', 'guitar', 'planet', 'castle', 'bridge', 'garden', 'forest'],
  hard: ['programming', 'composition', 'javascript', 'algorithm', 'architecture', 'development', 'infrastructure']
}

// Game state
const difficulty = ref('')
const levelSelected = ref(false)
const word = ref('')
const guessedLetters = ref([])
const hintsRemaining = ref(3)
const usedHints = ref([])
const currentScore = ref(100)

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

// Helper functions
const randomWord = (level) => {
  const words = wordsByDifficulty[level]
  return words[Math.floor(Math.random() * words.length)]
}

const selectLevel = (level) => {
  difficulty.value = level
  levelSelected.value = true
  word.value = randomWord(level)
}

const reset = () => {
  levelSelected.value = false
  difficulty.value = ''
  guessedLetters.value = []
  word.value = ''
  hintsRemaining.value = 3
  usedHints.value = []
  currentScore.value = 100
}

const provideHint = () => {
  if (hintsRemaining.value > 0) {
    const hintMessages = [
      `The word has ${word.value.length} letters`,
      `The word starts with "${word.value[0].toUpperCase()}"`,
      `The word ends with "${word.value[word.value.length - 1].toUpperCase()}"`
    ]
    
    const hintIndex = 3 - hintsRemaining.value
    usedHints.value.push(hintMessages[hintIndex])
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

<style></style>
