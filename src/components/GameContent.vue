<template>
  <div class="pt-8">
    <div class="max-w-[1100px] mx-auto bg-white p-6 rounded shadow-md overflow-hidden">
      <div class="flex flex-col items-center">
        <div class="mb-8">
          <img :src="`${currentFlag.flag}`" alt="Country Flag" class="w-40 h-auto border border-gray-400"/>
        </div>
        <div class="mb-4 w-60">
          <label for="">Pays:</label>
          <div class="relative">
            <input v-model="userCountry" type="text" placeholder="Entrez" class="w-full p-2 border rounded"/>
            <span class="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 transform pl-4" v-if="showResult" :class="{'text-green-500': isCountryCorrect, 'text-red-500': !isCountryCorrect}">
              {{ currentFlag.country }}
            </span>
          </div>
        </div>
        <div class="mb-4 w-60">
          <label for="">Capitale:</label>
          <div class="relative">
            <input v-model="userCapital" type="text" placeholder="Entrez" class="w-full p-2 border rounded"/>
            <span class="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 transform pl-4" v-if="showResult" :class="{'text-green-500': isCapitalCorrect, 'text-red-500': !isCapitalCorrect}">
              {{ currentFlag.capital }}
            </span>
          </div>
        </div>
        <div class="h-[400px] overflow-hidden mt-8" ref="svgContainer" v-html="worldSvg"></div>
        <div v-if="showResult" class="mt-4 w-40">
          <button @click="selectRandomFlag" class="w-full bg-blue-500 text-white p-2 rounded">Suivant</button>
        </div>
        <div v-else class="mb-4 w-40">
          <button @click="checkAnswer" class="w-full bg-green-500 text-white p-2 rounded">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import worldSvg from '../assets/world.svg?raw';
import svgPanZoom from 'svg-pan-zoom';

const flags = ref([]);
const currentFlag = ref({});
const userCountry = ref('');
const userCapital = ref('');
const showResult = ref(false);
const isCountryCorrect = ref(false);
const isCapitalCorrect = ref(false);
const svgContainer = ref(null);
const selectedCountry = ref('');
const isSubmitted = ref(false);
let panZoomInstance = null;

const normalizeText = (text) => {
  if (!text) return '';
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

const selectRandomFlag = () => {
  if (flags.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * flags.value.length);
    currentFlag.value = flags.value[randomIndex];
    userCountry.value = '';
    userCapital.value = '';
    showResult.value = false;
    selectedCountry.value = '';
    isSubmitted.value = false;
    resetSvgColors();
  }
};

const checkAnswer = () => {
  const normalizedUserCountry = normalizeText(userCountry.value);
  const normalizedUserCapital = normalizeText(userCapital.value);
  const normalizedCountry = normalizeText(currentFlag.value.country);
  const normalizedCapital = normalizeText(currentFlag.value.capital);
  const normalizedSelectedCountry = normalizeText(selectedCountry.value);

  isCountryCorrect.value = (normalizedUserCountry === normalizedCountry);
  isCapitalCorrect.value = (normalizedUserCapital === normalizedCapital);

  showResult.value = true;
  isSubmitted.value = true;
  highlightCorrectCountry();
  zoomToCorrectCountry();
};

const resetSvgColors = () => {
  const paths = svgContainer.value.querySelectorAll('path');
  paths.forEach(path => {
    path.style.fill = ''; // Reset to the original color
  });
};

const fetchFlags = async () => {
  try {
    const response = await axios.get('/data/data.json');
    flags.value = response.data;
    selectRandomFlag();
  } catch (error) {
    console.error('Error fetching flags:', error);
  }
};

const highlightCorrectCountry = () => {
  const paths = svgContainer.value.querySelectorAll('path');
  paths.forEach(path => {
    const country = path.parentElement.getAttribute('data-country');
    const normalizedCountry = normalizeText(country);
    if (normalizedCountry === normalizeText(currentFlag.value.country)) {
      path.style.fill = 'green'; // Highlight the correct country with green color
    }
  });
};

const zoomToCorrectCountry = () => {
  console.log('Zooming to correct country');
  const paths = svgContainer.value.querySelectorAll('path');
  paths.forEach(path => {
    const country = path.parentElement.getAttribute('data-country');
    const normalizedCountry = normalizeText(country);
    if (normalizedCountry === normalizeText(currentFlag.value.country)) {
      const bbox = path.getBBox();
      const centerX = bbox.x + bbox.width / 2;
      const centerY = bbox.y + bbox.height / 2;
      panZoomInstance.zoomAtPoint(2, {x: centerX, y: centerY});
      const { realZoom } = panZoomInstance.getSizes();
      panZoomInstance.pan({x: (panZoomInstance.getSizes().width / 2) - (centerX * realZoom), y: (panZoomInstance.getSizes().height / 3.5) - (centerY * realZoom)});
    }
  });
};

const addSvgEventListeners = () => {
  const paths = svgContainer.value.querySelectorAll('path');
  paths.forEach(path => {
    path.addEventListener('click', () => {
      if (!isSubmitted.value) {
        // Reset the fill color of all paths
        paths.forEach(p => {
          p.style.fill = ''; // Reset to the original color
        });

        // Highlight the selected country
        const country = path.parentElement.getAttribute('data-country');
        const normalizedCountry = normalizeText(country);
        paths.forEach(p => {
          if (normalizeText(p.parentElement.getAttribute('data-country')) === normalizedCountry) {
            p.style.fill = 'yellow'; // Change this color to your desired highlight color
          }
        });
        selectedCountry.value = country; // Store the selected country
      }
    });
  });
};

const initializeSvgPanZoom = () => {
  const svgElement = svgContainer.value.querySelector('svg');
  if (svgElement) {
    panZoomInstance = svgPanZoom(svgElement, {
      zoomEnabled: true,
      controlIconsEnabled: false,
      fit: true,
      center: false,
      zoomScaleSensitivity: 0.4, // Increase this value to make zoom faster
      minZoom: 0.5,
      maxZoom: 10
    });
  }
};

onMounted(() => {
  fetchFlags();
  addSvgEventListeners();
  initializeSvgPanZoom();
});
</script>

<style scoped>
.text-green-500 {
  color: #48bb78;
}
.text-red-500 {
  color: #f56565;
}
</style>
