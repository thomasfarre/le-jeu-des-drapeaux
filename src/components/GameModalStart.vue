<template>
  <!-- Modal Background and Content -->
  <div
    @click.stop="emitClose"
    class="absolute inset-0 w-screen h-screen bg-gray-800 opacity-60"
  ></div>
  <div
    class="absolute z-20 w-full max-h-[95vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[3rem] left-1/2 top-1/2 max-w-[54rem]"
  >
    <button
      @click.stop="emitClose"
      class="absolute transition duration-300 ease-out top-2 right-2 text-blue-950 hover:text-blue-700 md:top-8 md:right-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div class="py-6 text-center">
      <!-- Title and Instructions -->
      <div>
        <span class="title text-blue-950">Bienvenue au Jeu des Drapeaux !</span>
      </div>
      <div class="px-8 py-4">
        <p class="text-blue-950">
          Le jeu consiste à identifier des drapeaux de différents pays. À chaque
          tour, un drapeau s'affiche à l'écran. Le joueur doit retrouver et
          entrer trois informations :
          <br /><br />
          <span class="block subtitle"
            >1. Le nom du pays correspondant au drapeau
          </span>
          <br />
          <span class="block subtitle">2. La capitale de ce pays.</span>
          <br />
          <span class="block subtitle"
            >3. La localisation du pays sur une carte.
          </span>
          <br /><br />
          Une fois que tu as toutes ces informations, valide tes réponses. Si
          elles sont correctes, tu marqueras des points et tu passeras au
          drapeau suivant. Prêt à tester tes connaissances en géographie et à
          accumuler des points ? Bonne chance !
        </p>
      </div>
      <div
        class="flex flex-col items-center justify-center pt-6 mx-auto space-y-2 w-fit"
      >
        <button @click="emitStartGame" class="btn">lance la partie !</button>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  availableRounds: Array,
  selectedRounds: Array,
  teamExists: Boolean,
  teamName: String,
  isLoggedIn: Boolean,
});

const emit = defineEmits(["close", "start-game"]);

const emitStartGame = () => {
  emit("start-game");
};

const emitClose = () => {
  emit("close");
};
</script>
