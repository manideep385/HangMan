<template>
   <Header />
  <div class="game-container">
    <Figure :wrong-count="wrongLetters.length"/>
    <WrongLetters :wrong-letters="wrongLetters"/>
    <Word :letters="letters" :correct-letters ="correctLetters"/>
  </div>
  <Popup :status="status" :word = "word" @reset="reset"/>
  <Notification :show="notification"/>
  </template>


<script>
import { computed, ref } from 'vue';
import './assets/style.css'
import Header from './components/Header.vue'; 
import Figure from './components/Figure.vue';
import WrongLetters from './components/WrongLetters.vue';
import Word from './components/Word.vue';
import Popup from './components/Popup.vue';
import Notification from './components/Notification.vue';
import onKeyDown from './assets/onKeydown';
const words = ['programing', 'vuejs', 'composition']
const randomWord = () => words[Math.floor(Math.random() * words.length)]
export default {
  components:{Header,Figure,Word,WrongLetters,Popup,Notification},
  setup() {
    const word = ref(randomWord())
    const guessedLetters = ref([])
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
    const reset = () => {
      guessedLetters.value = []
      word.value = randomWord()
    }
  const notification = ref(false)
  const shownotification = () =>{
    notification.value = true
    setTimeout(()=>(notification.value =false),2000)
  }
   onKeyDown(event =>{
    const letter = event.key.toLowerCase()
    if (event.keyCode < 65 || event.keyCode > 90) return
    if(status.value) return
    if(guessedLetters.value.includes(letter)){
      shownotification()
      return
    }
    guessedLetters.value.push(letter)
   })
   return{
    letters,
    word,
    wrongLetters,
    correctLetters,
    guessedLetters,
    notification,
    status,
    reset
   }

  }
}
</script>

<style></style>
