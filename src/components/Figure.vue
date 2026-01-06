<template>
  <svg height="300" width="280" class="figure-container" viewBox="0 0 280 300">
    <defs>
      <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    </defs>
    
    <!-- Base platform with wood texture -->
    <rect x="40" y="260" width="140" height="8" fill="url(#woodGradient)" filter="url(#shadow)" rx="2"/>
    
    <!-- Vertical pole with wood grain -->
    <rect x="88" y="30" width="12" height="235" fill="url(#woodGradient)" filter="url(#shadow)" rx="2"/>
    
    <!-- Top horizontal beam -->
    <rect x="95" y="30" width="105" height="10" fill="url(#woodGradient)" filter="url(#shadow)" rx="2"/>
    
    <!-- Rope -->
    <line x1="195" y1="40" x2="195" y2="70" stroke="#8B7355" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Head with face -->
    <g v-if="lte(1)" class="body-part head">
      <circle cx="195" cy="95" r="25" fill="#FFE4C4" stroke="#8B4513" stroke-width="3"/>
      <!-- Eyes -->
      <circle cx="188" cy="90" r="3" fill="#000"/>
      <circle cx="202" cy="90" r="3" fill="#000"/>
      <!-- Sad mouth -->
      <path d="M 185 105 Q 195 100 205 105" stroke="#000" stroke-width="2" fill="none"/>
    </g>
    
    <!-- Body with shirt -->
    <g v-if="lte(2)" class="body-part body">
      <rect x="180" y="120" width="30" height="50" fill="#4A90E2" stroke="#2E5C8A" stroke-width="2" rx="3"/>
      <!-- Buttons -->
      <circle cx="195" cy="135" r="2" fill="#FFF"/>
      <circle cx="195" cy="150" r="2" fill="#FFF"/>
    </g>
    
    <!-- Left arm -->
    <g v-if="lte(3)" class="body-part arm-left">
      <line x1="180" y1="130" x2="155" y2="155" stroke="#FFE4C4" stroke-width="6" stroke-linecap="round"/>
      <!-- Hand -->
      <circle cx="155" cy="155" r="4" fill="#FFE4C4"/>
    </g>
    
    <!-- Right arm -->
    <g v-if="lte(4)" class="body-part arm-right">
      <line x1="210" y1="130" x2="235" y2="155" stroke="#FFE4C4" stroke-width="6" stroke-linecap="round"/>
      <!-- Hand -->
      <circle cx="235" cy="155" r="4" fill="#FFE4C4"/>
    </g>
    
    <!-- Left leg with pants -->
    <g v-if="lte(5)" class="body-part leg-left">
      <line x1="187" y1="170" x2="170" y2="220" stroke="#2C3E50" stroke-width="8" stroke-linecap="round"/>
      <!-- Foot -->
      <ellipse cx="168" cy="223" rx="8" ry="5" fill="#654321"/>
    </g>
    
    <!-- Right leg with pants -->
    <g v-if="lte(6)" class="body-part leg-right">
      <line x1="203" y1="170" x2="220" y2="220" stroke="#2C3E50" stroke-width="8" stroke-linecap="round"/>
      <!-- Foot -->
      <ellipse cx="222" cy="223" rx="8" ry="5" fill="#654321"/>
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  wrongCount: {
    type: Number,
    default: 0
  }
})

const lte = (num) => props.wrongCount >= num
</script>

<style scoped>
.figure-container {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.body-part {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.head {
  animation: fadeIn 0.5s ease-out, swing 2s ease-in-out infinite;
  transform-origin: 195px 70px;
}

@keyframes swing {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  75% { transform: rotate(-3deg); }
}
</style>