<template>
  <LevelSelector 
    v-if="!levelSelected"
    :level-selected="levelSelected" 
    @select-level="selectLevel"
  />
  <div v-else>
    <Header />
    <Score :score="currentScore" :level="difficulty" />
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

// Word lists by difficulty with contextual hints
const wordsByDifficulty = {
  easy: [
    { word: 'cat', hints: ['A common household pet', 'Meows and purrs', 'Loves to chase mice'] },
    { word: 'dog', hints: ['Man\'s best friend', 'Barks and wags tail', 'Loves to play fetch'] },
    { word: 'fish', hints: ['Lives in water', 'Has fins and gills', 'Often kept in aquariums'] },
    { word: 'bird', hints: ['Can fly in the sky', 'Has feathers and wings', 'Lays eggs in nests'] },
    { word: 'lion', hints: ['King of the jungle', 'A large wild cat', 'Has a majestic mane'] },
    { word: 'bear', hints: ['Hibernates in winter', 'Loves honey', 'Large furry mammal'] },
    { word: 'wolf', hints: ['Howls at the moon', 'Lives in packs', 'Wild relative of dogs'] },
    { word: 'frog', hints: ['Amphibian that jumps', 'Lives near water', 'Says "ribbit"'] },
    { word: 'duck', hints: ['Swims in ponds', 'Says "quack"', 'Has webbed feet'] },
    { word: 'deer', hints: ['Has antlers', 'Lives in forests', 'Fast running animal'] }
  ],
  medium: [
    { word: 'python', hints: ['A programming language', 'Also a type of snake', 'Popular for data science'] },
    { word: 'coding', hints: ['Writing instructions for computers', 'Programmers do this', 'Creates software'] },
    { word: 'guitar', hints: ['Musical instrument', 'Has six strings', 'Rock bands use this'] },
    { word: 'planet', hints: ['Orbits around a star', 'Earth is one of these', 'Found in space'] },
    { word: 'castle', hints: ['Medieval fortress', 'Kings and queens lived here', 'Has towers and moats'] },
    { word: 'bridge', hints: ['Crosses over water or roads', 'Connects two sides', 'Used for transportation'] },
    { word: 'garden', hints: ['Place to grow plants', 'Has flowers and vegetables', 'Needs watering'] },
    { word: 'forest', hints: ['Full of trees', 'Wildlife habitat', 'Dense woodland area'] }
  ],
  hard: [
    { word: 'programming', hints: ['Creating computer software', 'Uses languages like Java or Python', 'Involves algorithms and logic'] },
    { word: 'composition', hints: ['Creating something by combining parts', 'Can refer to music or writing', 'The act of composing'] },
    { word: 'javascript', hints: ['Web programming language', 'Runs in browsers', 'Used for interactive websites'] },
    { word: 'algorithm', hints: ['Step-by-step problem solving', 'Used in computer science', 'A set of instructions'] },
    { word: 'architecture', hints: ['Design of buildings', 'Combines art and engineering', 'Creates structures'] },
    { word: 'development', hints: ['Process of growth or progress', 'Software creation', 'Building and improving'] },
    { word: 'infrastructure', hints: ['Basic systems and facilities', 'Roads, bridges, utilities', 'Foundation of a system'] }
  ]
}

// Game state
const difficulty = ref('')
const levelSelected = ref(false)
const word = ref('')
const wordHints = ref([])
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
  const selected = words[Math.floor(Math.random() * words.length)]
  return selected
}

const selectLevel = (level) => {
  difficulty.value = level
  levelSelected.value = true
  const selected = randomWord(level)
  word.value = selected.word
  wordHints.value = selected.hints
}

const reset = () => {
  levelSelected.value = false
  difficulty.value = ''
  guessedLetters.value = []
  word.value = ''
  wordHints.value = []
  hintsRemaining.value = 3
  usedHints.value = []
  currentScore.value = 100
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
</style>
