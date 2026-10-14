// src/screens/privacidad.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLOR_PRINCIPAL = '#34B87F';

const PrivacidadScreen = () => {
  const [perfilPublico, setPerfilPublico] = useState(true);
  const [mostrarEmail, setMostrarEmail] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.itemTitulo}>Perfil público</Text>
          <Switch
            value={perfilPublico}
            onValueChange={setPerfilPublico}
            trackColor={{ false: '#ccc', true: COLOR_PRINCIPAL }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitulo}>Mostrar mi email</Text>
          <Switch
            value={mostrarEmail}
            onValueChange={setMostrarEmail}
            trackColor={{ false: '#ccc', true: COLOR_PRINCIPAL }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.dangerButton}
        onPress={() =>
          Alert.alert(
            'Eliminar cuenta',
            'Esta acción no se puede deshacer. ¿Continuar?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', style: 'destructive' },
            ]
          )
        }
      >
        <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
        <Text style={styles.dangerText}>Eliminar mi cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  section: { backgroundColor: '#fff', margin: 16, borderRadius: 12 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemTitulo: { fontSize: 16, color: '#1a1a1a' },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  dangerText: {
    color: '#ff6b6b',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
});

export default PrivacidadScreen;