// src/servicios/almacenamiento.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarPreferencias = async (clave, valor) => {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.error('Error guardando:', error);
  }
};

export const leerPreferencias = async (clave) => {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
  } catch (error) {
    console.error('Error leyendo:', error);
    return null;
  }
};

export const borrarDatos = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error borrando:', error);
  }
};