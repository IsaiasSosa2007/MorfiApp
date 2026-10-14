// src/screens/editarPerfil.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { guardarPreferencias } from '../servicios/almacenamiento';

const COLOR_PRINCIPAL = '#34B87F';

const EditarPerfilScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('Ricotero');
  const [email, setEmail] = useState('ricotero@email.com');
  const [username, setUsername] = useState('@IndioDeLaRicota');

  const guardar = async () => {
    if (!nombre.trim() || !email.trim()) {
      Alert.alert('Error', 'Completá todos los campos');
      return;
    }
    await guardarPreferencias('perfil', { nombre, email, username });
    Alert.alert('Éxito', 'Perfil actualizado', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={guardar}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  form: { padding: 20 },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: COLOR_PRINCIPAL,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default EditarPerfilScreen;