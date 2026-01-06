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