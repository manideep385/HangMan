# Hangman Game - Vue 3 Composition API

A modern, interactive Hangman game built with Vue 3 using the Composition API and `<script setup>` syntax.

## Features

### 🎮 Difficulty Levels
- **Easy**: Words with max 5 letters
- **Medium**: Words with 5-8 letters  
- **Hard**: Words with 8-15 letters

### 💡 Hint System
- Get up to 3 hints per game:
  - Hint 1: Word length
  - Hint 2: First letter
  - Hint 3: Last letter

### 🏆 Scoring System
- **No hints used**: 100 points
- **1 hint used**: 80 points
- **2 hints used**: 60 points
- **3 hints used**: 40 points
- **Failed to solve**: 0 points

### ✨ Game Features
- Interactive keyboard input
- Visual hangman figure updates
- Wrong letters tracking
- Level-based difficulty selection
- Score tracking
- Play again functionality

## Tech Stack

- **Vue 3** - Progressive JavaScript Framework
- **Composition API** with `<script setup>` syntax
- **JavaScript ES6+**
- **CSS3** for styling

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
