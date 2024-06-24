<template>
  <div
    class="min-h-screen bg-cover bg-center"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="px-4 pt-12 pb-4 mx-auto md:pt-4 text-center">
      <div class="pt-64">
        <h1 class="text-yellow-400 title">Le jeu des drapeaux</h1>
      </div>
      <div>
        <span class="text-yellow-400 subtitle"
          >Identifiez les Pays, Capitales et Emplacements à Travers leurs Drapeaux!</span
        >
      </div>
      <div class="pt-16">
        <button class="btn">
          Jouer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import bgImage from "/public/images/bg-game.jpg";



</script>
