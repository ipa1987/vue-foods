<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">
      Meals for {{ ingredient.strIngredient }}
    </h1>
  </div>
  <Meals :meals="meals" />
</template>

<script setup>
import { computed } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../store"; // Import Pinia store
import Meals from "../components/Meals.vue";

const store = useStore(); // Access Pinia store
const route = useRoute(); // Access route parameters

// Map state from Pinia store
const ingredient = computed(() => store.ingredient);
const meals = computed(() => store.mealsByIngredients);

// Fetch meals by ingredient on mount
onMounted(() => {
  store.searchMealsByIngredient(route.params.ingredient); // Use Pinia action
});
</script>
