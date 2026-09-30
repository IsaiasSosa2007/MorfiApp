// src/servicios/servicioTraduccion.js
import axios from 'axios';

const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';

export const traducirTexto = async (texto, idiomaDestino = 'es') => {
  // MyMemory solo acepta textos cortos (máx ~500 caracteres)
  if (!texto || texto.length > 500) {
    return texto; // Devuelve el original si es muy largo o está vacío
  }

  try {
    const response = await axios.get(MYMEMORY_URL, {
      params: {
        q: texto,
        langpair: `en|${idiomaDestino}`, // Traduce de Inglés a Español
      },
    });

    // MyMemory devuelve la traducción aquí
    return response.data.responseData.translatedText || texto;
  } catch (error) {
    console.error('Error al traducir:', error);
    return texto; // En caso de error, devuelve el texto original
  }
};