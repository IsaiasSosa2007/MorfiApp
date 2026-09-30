import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TextoPersonalizado from './TextoPersonalizado';
import BotonPersonalizado from './BotonPersonalizado';

const ContadorInteractivo = () => {
  // Definimos el estado: 'cuenta' es el valor, 'setCuenta' es la función para actualizarlo
  const [cuenta, setCuenta] = useState(0);

  const aumentar = () => {
    setCuenta(cuenta + 1);
  };

  const reiniciar = () => {
    setCuenta(0);
  };

  return (
    <View style={styles.contenedor}>
      <TextoPersonalizado texto={`Presionaste el botón: ${cuenta} veces`} />
      
      <View style={styles.filaBotones}>
        <BotonPersonalizado 
          label="Sumar 1" 
          onPress={aumentar} 
          color="#28a745" 
        />
        
        <BotonPersonalizado 
          label="Reiniciar" 
          onPress={reiniciar} 
          color="#ffc107" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
});

export default ContadorInteractivo;
