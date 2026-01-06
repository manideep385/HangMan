<template>
  <div class="notification-container" :class="show ? 'show' : ''">
    <p>You have already entered this letter</p>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>