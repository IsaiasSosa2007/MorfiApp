// src/servicios/spoonacularApi.js
import axios from 'axios';


const API_KEY = "5d545a5a94a645159d80ea56babcaa0";//5d545a5a94a645159d80ea56babcaa0d
const API_BASE_URL = "https://api.spoonacular.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  params: { apiKey: API_KEY },
  timeout: 10000,
});

// 1. Obtener recetas aleatorias
export const getRandomRecipes = async (number = 10) => {
  try {
    const response = await api.get('/recipes/random', {
      params: { number },
    });
    return response.data.recipes;
  } catch (error) {
    console.error('Error en getRandomRecipes:', error);
    throw error;
  }
};

// 2. Buscar recetas por texto
export const searchRecipes = async (query, number = 10) => {
  try {
    const response = await api.get('/recipes/complexSearch', {
      params: {
        query,
        number,
        addRecipeInformation: true,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error en searchRecipes:', error);
    throw error;
  }
};

// 3. Buscar recetas por ingredientes
export const searchByIngredients = async (ingredients, number = 10) => {
  try {
    const response = await api.get('/recipes/findByIngredients', {
      params: {
        ingredients,
        number,
        ranking: 2,
        ignorePantry: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error en searchByIngredients:', error);
    throw error;
  }
};

// 4. Obtener detalles de una receta
export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await api.get(`/recipes/${recipeId}/information`, {
      params: { includeNutrition: true },
    });
    return response.data;
  } catch (error) {
    console.error('Error en getRecipeDetails:', error);
    throw error;
  }
};

export default api;