<template>
    <div class="p-8 pb-0 text-orange-500">
      <h1 class="text-4xl font-bold mb-4">Random Meals</h1>
      <Meals :meals="randomMeals" />
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from "vue";
  import { useStore } from "../store";
  import Meals from "../components/Meals.vue";
  
  const store = useStore(); // Access the Pinia store
  
  // Use computed property to map state from Pinia
  const randomMeals = computed(() => store.searchedMeals);
  
  onMounted(async () => {
  for (let i = 0; i < 10; i++) {
    await store.fetchRandomMeals();
  }
});

  </script>
  