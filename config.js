// config.js
export const API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY || "5d545a5a94a645159d80ea56babcaa0d";
export const API_BASE_URL = "https://api.spoonacular.com";
// Límites de la API (versión gratuita)
export const API_LIMITS = {
  maxRequestsPerDay: 150,
  maxRequestsPerMinute: 10,
};