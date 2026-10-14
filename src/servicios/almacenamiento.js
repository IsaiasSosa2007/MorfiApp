// src/servicios/almacenamiento.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============ GUARDAR DATOS ============
export const guardarPreferencias = async (clave, valor) => {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.error('Error guardando:', error);
  }
};

// ============ LEER DATOS ============
export const leerPreferencias = async (clave) => {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
  } catch (error) {
    console.error('Error leyendo:', error);
    return null;
  }
};

// ============ BORRAR DATOS ============
export const borrarDatos = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error borrando:', error);
  }
};