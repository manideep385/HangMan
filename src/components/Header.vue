<template>
    <div class="header-container">
        <div class="title-wrapper">
            <span class="emoji-icon">🎮</span>
            <h1 class="game-title">Hangman Game</h1>
            <span class="emoji-icon">🎮</span>
        </div>
        <p class="game-subtitle">Find the hidden word - enter a letter</p>
        <div class="decorative-line"></div>
    </div>
</template>

<script setup>
// No props or state needed for this component
</script>

<style scoped>
.header-container {
    text-align: center;
    padding: 30px 20px 20px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-image-slice: 1;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
}

.header-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

.title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 10px;
}

.emoji-icon {
    font-size: 2.5rem;
    animation: bounce 2s ease-in-out infinite;
}

.emoji-icon:first-child {
    animation-delay: 0s;
}

.emoji-icon:last-child {
    animation-delay: 1s;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.game-title {
    margin: 0;
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
    letter-spacing: 3px;
    animation: titleGlow 3s ease-in-out infinite alternate;
    position: relative;
}

@keyframes titleGlow {
    from {
        filter: drop-shadow(0 0 5px rgba(102, 126, 234, 0.5));
    }
    to {
        filter: drop-shadow(0 0 15px rgba(118, 75, 162, 0.8));
    }
}

.game-subtitle {
    margin: 10px 0 20px;
    font-size: 1.4rem;
    color: #555;
    font-weight: 500;
    letter-spacing: 1px;
    font-style: italic;
    position: relative;
    display: inline-block;
}

.game-subtitle::before,
.game-subtitle::after {
    content: '✦';
    margin: 0 10px;
    color: #764ba2;
    font-size: 1rem;
}

.decorative-line {
    width: 200px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #667eea, #764ba2, #667eea, transparent);
    margin: 0 auto;
    border-radius: 2px;
    animation: expand 2s ease-in-out infinite alternate;
}

@keyframes expand {
    from {
        width: 150px;
        opacity: 0.6;
    }
    to {
        width: 250px;
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .game-title {
        font-size: 2.5rem;
        letter-spacing: 2px;
    }
    
    .game-subtitle {
        font-size: 1.1rem;
    }
    
    .emoji-icon {
        font-size: 2rem;
    }
}
</style>