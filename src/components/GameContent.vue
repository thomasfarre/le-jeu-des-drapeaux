<template>
  <div class="max-w-[1100px] mx-auto bg-white p-6 rounded shadow-md">
    <div class="flex flex-col items-center">
      <div class="mb-4">
        <img :src="`${currentFlag.flag}`" alt="Country Flag" class="w-40 h-auto"/>
      </div>
      <div class="mb-4 w-full">
        <input v-model="userCountry" type="text" placeholder="Enter country name" class="w-full p-2 border rounded"/>
      </div>
      <div class="mb-4 w-full">
        <input v-model="userCapital" type="text" placeholder="Enter capital name" class="w-full p-2 border rounded"/>
      </div>
      <div class="mb-4 w-full">
        <button @click="checkAnswer" class="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </div>
      <div v-if="showResult" class="mt-4 text-center">
        <div>
          <strong>Country:</strong> {{ currentFlag.country }}
        </div>
        <div>
          <strong>Capital:</strong> {{ currentFlag.capital }}
        </div>
        <div class="mt-4">
          <button @click="selectRandomFlag" class="w-full bg-green-500 text-white p-2 rounded">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const flags = ref([]);
const currentFlag = ref({});
const userCountry = ref('');
const userCapital = ref('');
const showResult = ref(false);

const selectRandomFlag = () => {
  if (flags.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * flags.value.length);
    currentFlag.value = flags.value[randomIndex];
    userCountry.value = '';
    userCapital.value = '';
    showResult.value = false;
  }
};

const checkAnswer = () => {
  if (
    userCountry.value.toLowerCase() === currentFlag.value.country.toLowerCase() &&
    userCapital.value.toLowerCase() === currentFlag.value.capital.toLowerCase()
  ) {
    alert('Correct!');
  } else {
    showResult.value = true;
  }
};

const fetchFlags = async () => {
  try {
    const response = await axios.get('/data/data.json');
    flags.value = response.data;
    console.log(flags.value)
    selectRandomFlag();
  } catch (error) {
    console.error('Error fetching flags:', error);
  }
};

onMounted(() => {
  fetchFlags();
});
</script>
