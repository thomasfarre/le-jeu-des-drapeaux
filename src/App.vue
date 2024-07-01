<template>
  <div
    class="min-h-screen bg-cover bg-center"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <GameModalStart
      v-if="startGameModal"
      @close="startGameModal = false"
      @start-game="startGame"
    />

    <GameContent
      v-if="gameStarted"
    />

    <div v-if="!gameStarted" class="px-4 pt-12 pb-4 mx-auto md:pt-4 text-center">
      <div class="pt-64">
        <h1 class="text-yellow-400 title">Le jeu des drapeaux</h1>
      </div>
      <div>
        <span class="text-yellow-400 subtitle"
          >Identifiez les Pays, Capitales et Emplacements à Travers leurs
          Drapeaux!</span
        >
      </div>
      <div class="pt-16">
        <button @click="startGameModal = true" class="btn">Jouer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import bgImage from "/images/bg-game.jpg";
import GameModalStart from "./components/GameModalStart.vue";
import GameContent from "./components/GameContent.vue";



const startGameModal = ref(false);
const gameStarted = ref(false);
const gameEnded = ref(false);
const finalScore = ref(0);

const startGame = async () => {
  startGameModal.value = false;
  gameStarted.value = true;
  gameEnded.value = false;
  finalScore.value = 0;
};

</script>
