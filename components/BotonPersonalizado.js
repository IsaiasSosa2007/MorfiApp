import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonPersonalizado = ({ label, onPress, color = '#007bff' }) => {
  return (
    <TouchableOpacity 
      style={[styles.boton, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Text style={styles.texto}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombras en Android
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BotonPersonalizado;
