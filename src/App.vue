<template>
  <LevelSelector 
    v-if="!levelSelected"
    :level-selected="levelSelected" 
    @select-level="selectLevel"
  />
  <div v-else>
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

// Word lists by category and difficulty with contextual hints
const wordsByCategory = {
  cricket: {
    easy: [
      { word: 'dhoni', hints: ['Captain Cool', 'Wicket-keeper batsman', 'Led India to 2011 World Cup'] },
      { word: 'virat', hints: ['Run machine', 'Modern Indian captain', 'Chase master'] },
      { word: 'sachin', hints: ['God of cricket', '100 international centuries', 'Little Master'] },
      { word: 'rohit', hints: ['Mumbai Indians captain','ODI double century record','Hitman'] },
      { word:'yuvraj', hints: ['All-rounder', '2011 World Cup hero', 'Six sixes in an over'] }
    ],
    medium: [
      { word: 'bumrah', hints: ['Death over specialist', 'Unique bowling action', 'India\'s pace ace'] },
      { word: 'hardik', hints: ['All-rounder', 'Big hitter', 'Gujarat Titans captain'] },
      { word: 'ravi', hints: ['Former Indian captain', 'Head coach', 'Batting maestro'] },
      { word: 'gambhir', hints: ['2011 World Cup hero', 'KKR captain', 'Delhi batsman'] }
    ],
    hard: [
      { word: 'dravid', hints: ['The Wall', 'Reliable batsman', 'Indian coach'] },
      { word: 'jadeja', hints: ['All-rounder from Saurashtra', 'Rockstar', 'Gun fielder'] },
      { word: 'ashwin', hints: ['Off-spinner', 'Test specialist', 'Tamil Nadu cricketer'] },
      { word: 'suryakumar', hints: ['Mr. 360', 'T20 specialist', 'Mumbai batsman'] }
    ]
  },
  cinema: {
    easy: [
      { word: 'ram', hints: ['Mega Power Star', 'Racha hero', 'Son of Chiranjeevi'] },
      { word: 'pawan', hints: ['Power Star', 'Vakeel Saab hero', 'Brother of Chiranjeevi'] },
      { word: 'nani', hints: ['Natural Star', 'Jersey hero', 'Gang Leader actor'] },
      { word: 'vijay', hints: ['Thalapathy', 'Tamil superstar', 'Beast hero'] }
    ],
    medium: [
      { word: 'mahesh', hints: ['Superstar', 'Pokiri hero', 'Son of Krishna'] },
      { word: 'prabhas', hints: ['Darling', 'Baahubali hero', 'Pan-India star'] },
      { word: 'allu', hints: ['Stylish Star', 'Pushpa hero', 'Son of Allu Aravind'] },
      { word: 'jr', hints: ['Young Tiger', 'RRR hero', 'Son of NTR'] }
    ],
    hard: [
      { word: 'chiranjeevi', hints: ['Mega Star', 'Indra hero', 'First Padma Vibhushan in Telugu'] },
      { word: 'nagarjuna', hints: ['Akkineni hero', 'Manmadhudu actor', 'Bigg Boss host'] },
      { word: 'venkatesh', hints: ['Victory Venkatesh', 'F2 hero', 'Drushyam actor'] },
      { word: 'balakrishna', hints: ['Nandamuri hero', 'Akhanda actor', 'Son of NTR'] }
    ]
  },
  technology: {
    easy: [
      { word: 'java', hints: ['Programming language', 'Coffee-named', 'Object-oriented'] },
      { word: 'code', hints: ['Instructions for computers', 'What programmers write', 'Source of software'] },
      { word: 'cloud', hints: ['Online storage', 'Remote computing', 'AWS, Azure offer this'] },
      { word: 'data', hints: ['Digital information', 'Stored in databases', 'Raw facts'] }
    ],
    medium: [
      { word: 'python', hints: ['Snake-named language', 'Popular for AI/ML', 'Easy to learn'] },
      { word: 'server', hints: ['Provides services', 'Hosts websites', 'Backend computer'] },
      { word: 'github', hints: ['Code hosting platform', 'Version control', 'Owned by Microsoft'] },
      { word: 'docker', hints: ['Container platform', 'Whale logo', 'DevOps tool'] }
    ],
    hard: [
      { word: 'javascript', hints: ['Web language', 'Runs in browsers', 'Node.js uses this'] },
      { word: 'kubernetes', hints: ['Container orchestration', 'K8s shortform', 'Google created'] },
      { word: 'typescript', hints: ['Superset of JavaScript', 'Microsoft developed', 'Adds static typing'] },
      { word: 'blockchain', hints: ['Decentralized ledger', 'Cryptocurrency tech', 'Immutable records'] }
    ]
  },
  food: {
    easy: [
      { word: 'rice', hints: ['Staple grain', 'Biryani base', 'Asian favorite'] },
      { word: 'dosa', hints: ['South Indian breakfast', 'Made from fermented batter', 'Crispy crepe'] },
      { word: 'pizza', hints: ['Italian flatbread', 'Has cheese and toppings', 'Round and sliced'] },
      { word: 'pasta', hints: ['Italian noodles', 'Many shapes', 'Spaghetti is one type'] }
    ],
    medium: [
      { word: 'biryani', hints: ['Spiced rice dish', 'Hyderabadi specialty', 'Layered cooking'] },
      { word: 'samosa', hints: ['Fried pastry', 'Triangular shape', 'Filled with potatoes'] },
      { word: 'burger', hints: ['Fast food', 'Has buns and patty', 'McDonald\'s specialty'] },
      { word: 'noodles', hints: ['Long thin strips', 'Chinese dish', 'Made from flour'] }
    ],
    hard: [
      { word: 'quesadilla', hints: ['Mexican dish', 'Filled tortilla', 'Grilled and folded'] },
      { word: 'cappuccino', hints: ['Coffee drink', 'Italian beverage', 'Espresso with foam'] },
      { word: 'shawarma', hints: ['Middle Eastern wrap', 'Meat on spit', 'Pita bread wrap'] },
      { word: 'croissant', hints: ['French pastry', 'Crescent shaped', 'Buttery and flaky'] }
    ]
  },
  places: {
    easy: [
      { word: 'india', hints: ['Asian country', 'Second most populous', 'Has 28 states'] },
      { word: 'delhi', hints: ['Indian capital', 'Old and New', 'Red Fort location'] },
      { word: 'paris', hints: ['City of Light', 'Eiffel Tower city', 'French capital'] },
      { word: 'dubai', hints: ['UAE city', 'Burj Khalifa location', 'Desert metropolis'] }
    ],
    medium: [
      { word: 'mumbai', hints: ['Financial capital', 'Bollywood city', 'Gateway of India'] },
      { word: 'london', hints: ['British capital', 'Big Ben location', 'Thames river city'] },
      { word: 'tokyo', hints: ['Japanese capital', 'Largest metro area', 'Mount Fuji nearby'] },
      { word: 'sydney', hints: ['Australian city', 'Opera House location', 'Harbor Bridge'] }
    ],
    hard: [
      { word: 'hyderabad', hints: ['City of Pearls', 'IT hub of India', 'Charminar landmark'] },
      { word: 'singapore', hints: ['Island city-state', 'Marina Bay Sands', 'Southeast Asian hub'] },
      { word: 'amsterdam', hints: ['Dutch capital', 'Canal city', 'Bicycles everywhere'] },
      { word: 'barcelona', hints: ['Spanish city', 'Sagrada Familia', 'Mediterranean port'] }
    ]
  }
}

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
const randomWord = (selectedCategory, level) => {
  const words = wordsByCategory[selectedCategory][level]
  const selected = words[Math.floor(Math.random() * words.length)]
  return selected
}

const selectLevel = (selection) => {
  difficulty.value = selection.difficulty
  category.value = selection.category
  levelSelected.value = true
  const selected = randomWord(selection.category, selection.difficulty)
  word.value = selected.word
  wordHints.value = selected.hints
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
