<template>
    <div class="word">
        <span v-for="(letter, index) in letters" :key="index" class="letter">
            <span class="letter-text">{{ correctLetters.includes(letter) ? letter : '' }}</span>
        </span>
    </div>
</template>

<script setup>
defineProps({
  letters: {
    type: Array,
    required: true
  },
  correctLetters: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.word {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  max-width: 100%;
  flex-wrap: wrap;
  padding: 0 15px;
}

/* Tablet (768px - 1024px) */
@media (max-width: 1024px) {
  .word {
    gap: 10px;
    padding: 0 12px;
  }
}

/* Mobile Landscape & Small Tablets (481px - 768px) */
@media (max-width: 768px) {
  .word {
    gap: 8px;
    padding: 0 10px;
  }
}

/* Mobile Portrait (up to 480px) */
@media (max-width: 480px) {
  .word {
    gap: 6px;
    padding: 0 8px;
  }
}

/* Extra Small Devices (up to 375px) */
@media (max-width: 375px) {
  .word {
    gap: 5px;
    padding: 0 5px;
  }
}
</style>