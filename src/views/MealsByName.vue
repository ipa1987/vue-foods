<template>
    <div class="p-8 pb-0">
      <h1 class="text-4xl font-bold mb-4 text-orange-500">Search Meals by Name</h1>
    </div>
    <div class="px-8 pb-3">
      <input
        type="text"
        v-model="keyword"
        class="rounded border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 w-full"
        placeholder="Search for Meals"
        @change="searchMeals"
      />
    </div>
    <Meals :meals="meals" />
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useStore } from "../store"; // Import Pinia store
  import Meals from "../components/Meals.vue";
  
  const store = useStore(); // Access Pinia store
  const route = useRoute(); // Get route parameters
  
  // Reactive keyword state
  const keyword = ref("");
  
  // Map meals from the store
  const meals = computed(() => store.searchedMeals);
  
  // Search meals by name
  function searchMeals() {
    if (keyword.value) {
      store.searchMeals(keyword.value); // Use Pinia's action
    } else {
      store.searchedMeals = []; // Directly clear the state
    }
  }
  
  // Populate search input from route on mount
  onMounted(() => {
    keyword.value = route.params.name || ""; // Initialize with route param
    if (keyword.value) {
      searchMeals();
    }
  });
  </script>
  