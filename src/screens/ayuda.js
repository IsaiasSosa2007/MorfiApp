// src/screens/ayuda.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLOR_PRINCIPAL = '#34B87F';

const AyudaScreen = () => {
  const faqs = [
    {
      pregunta: '¿Cómo guardo una receta?',
      respuesta: 'Tocá el ícono de marcador en cualquier receta para guardarla.',
    },
    {
      pregunta: '¿Cómo creo una colección?',
      respuesta: 'En la pestaña Guardadas, tocá "Crear colección".',
    },
    {
      pregunta: '¿Puedo compartir recetas?',
      respuesta: 'Sí, tocá el ícono de compartir en el detalle de la receta.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
        {faqs.map((faq, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.pregunta}>{faq.pregunta}</Text>
            <Text style={styles.respuesta}>{faq.respuesta}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => Linking.openURL('mailto:soporte@morifapp.com')}
      >
        <Ionicons name="mail-outline" size={20} color="#fff" />
        <Text style={styles.contactText}>Contactar soporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pregunta: { fontSize: 15, fontWeight: '600', color: '#333' },
  respuesta: { fontSize: 14, color: '#666', marginTop: 4 },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_PRINCIPAL,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  contactText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default AyudaScreen;