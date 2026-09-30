import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextoPersonalizado = ({ texto = "anashe" }) => {
  return (
    <Text style={styles.texto}>
      {texto}
    </Text>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
    fontWeight: '500',
  },
});

export default TextoPersonalizado;
