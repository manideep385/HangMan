<template>
    <div class="wrong-letters-container">
        <div class="wrong-letters">
            <p v-show="wrongLetters.length > 0">Wrong</p>
            <span v-for="(letter, index) in wrongLetters" :key="index">
                {{ letter }}<span v-if="index !== wrongLetters.length - 1">, </span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: { wrongLetters: { type: Array, default: () => [] } }
}
</script>