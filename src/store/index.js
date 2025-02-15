import { defineStore } from 'pinia';
import axiosClient from '../axiosClient';

export const useStore = defineStore('main', {
  // State
  state: () => ({
    searchedMeals: [],
    mealsByLetter: [],
    mealsByIngredients: [],
    ingredient: {}, // Assuming it's an object
    ingredients: [],
  }),

  // Actions
  actions: {
    // Fetch meals by keyword
    async searchMeals(keyword) {
      try {
        const { data } = await axiosClient.get(`search.php?s=${keyword}`);
        this.searchedMeals = data.meals || [];
      } catch (error) {
        console.error('Error fetching meals by keyword:', error);
      }
    },

    // Fetch meals by first letter
    async searchMealsByLetter(letter) {
      try {
        const { data } = await axiosClient.get(`search.php?f=${letter}`);
        this.mealsByLetter = data.meals || [];
      } catch (error) {
        console.error('Error fetching meals by letter:', error);
      }
    },

    // Fetch meals by ingredient
    async searchMealsByIngredient(ingredient) {
      try {
        const { data } = await axiosClient.get(`filter.php?i=${ingredient}`);
        this.mealsByIngredients = data.meals || [];
      } catch (error) {
        console.error('Error fetching meals by ingredient:', error);
      }
    },

    async fetchRandomMeals() {
      try {
        const { data } = await axiosClient.get(`random.php`);
        this.searchedMeals.push(data.meals[0]); // Append each random meal
      } catch (error) {
        console.error('Error fetching random meal:', error);
      }
    },
    
    async fetchIngredients() {
      try {
        const { data } = await axiosClient.get("list.php?i=list");
        this.ingredients = data.meals || [];
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    },
    // Update ingredient state
    setIngredient(ingredient) {
      this.ingredient = ingredient;
    },
  },
});
