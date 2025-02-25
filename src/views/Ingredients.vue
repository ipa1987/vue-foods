<template>
    <div class="p-8 pb-0">
      <h1 class="text-4xl font-bold mb-4 text-orange-500">Ingredients</h1>
    </div>
    <div class="px-8">
      <input
        type="text"
        v-model="keyword"
        class="rounded border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 mb-3 w-full"
        placeholder="Search for Ingredients"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <a
          href="#"
          @click.prevent="openIngredient(ingredient)"
          v-for="ingredient of computedIngredients"
          :key="ingredient.idIngredient"
          class="block bg-white rounded p-3 mb-3 shadow"
        >
          <h3 class="text-2xl font-bold mb-2">{{ ingredient.strIngredient }}</h3>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "../store"; // Import Pinia store
  
  const router = useRouter();
  const store = useStore(); // Access Pinia store
  
  // Reactive search keyword
  const keyword = ref("");
  
  // Map ingredients from the Pinia store
  const ingredients = computed(() => store.ingredients);
  
  // Filter ingredients based on the search keyword
  const computedIngredients = computed(() => {
    if (!keyword.value) return ingredients.value;
    return ingredients.value.filter((i) =>
      i.strIngredient.toLowerCase().includes(keyword.value.toLowerCase())
    );
  });
  
  // Handle ingredient click
  function openIngredient(ingredient) {
    store.setIngredient(ingredient); // Use Pinia action to set ingredient
    router.push({
      name: "byIngredient",
      params: { ingredient: ingredient.strIngredient },
    });
  }
  
  // Fetch ingredients on mount
  onMounted(async () => {
    await store.fetchIngredients(); // Use Pinia action to fetch ingredients
  });
  </script>
  