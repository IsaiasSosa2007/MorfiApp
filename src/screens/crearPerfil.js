// src/screens/crearPerfil.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLOR_PRINCIPAL = "#34B87F";
const COLOR_NARANJA = "#F5A623"; // Color del botón según la imagen

const CrearPerfilScreen = ({ navigation }) => {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================
  const [formData, setFormData] = useState({
    nombre: 'isa',//datos por defecto para no escribir cada vez que se recarga
    apellido: 'sosa',
    email: 'isa@gmail.com',
    username: 'isasosa67',
    intereses: [], // Array de intereses seleccionados
    avatar: null,  // URI de la imagen (para más adelante)
  });

  // Lista de intereses disponibles (según la imagen)
  const interesesDisponibles = [
    { id: '1', name: 'comida rapida' },
    { id: '2', name: 'panaderia' },
    { id: '3', name: 'reposteria' },
    { id: '4', name: 'gourmet' },
    { id: '5', name: 'vegana' },
    { id: '6', name: 'pastas' },
  ];

  // ============================================
  // FUNCIONES
  // ============================================

  // Actualizar un campo del formulario
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Seleccionar/deseleccionar un interés
  const toggleInteres = (interes) => {
    const yaSeleccionado = formData.intereses.includes(interes);
    if (yaSeleccionado) {
      // Quitar el interés
      setFormData({
        ...formData,
        intereses: formData.intereses.filter((i) => i !== interes),
      });
    } else {
      // Agregar el interés
      setFormData({
        ...formData,
        intereses: [...formData.intereses, interes],
      });
    }
  };

  // Validar el formulario
  const validarFormulario = () => {
    if (!formData.nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }
    if (!formData.apellido.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu apellido');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return false;
    }
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Por favor ingresa un username');
      return false;
    }
    if (formData.intereses.length === 0) {
      Alert.alert('Error', 'Selecciona al menos un interés');
      return false;
    }
    return true;
  };

  // Guardar y continuar
  const handleGuardar = () => {
  if (!validarFormulario()) return;

  const perfilParaGuardar = {
    nombre: formData.nombre.trim(),
    apellido: formData.apellido.trim(),
    email: formData.email.trim().toLowerCase(),
    username: formData.username.trim().toLowerCase(),
    intereses: formData.intereses.join(','),
    avatar: formData.avatar,
    fecha_creacion: new Date().toISOString(),
  };

  console.log('📦 Datos a guardar en MySQL:', perfilParaGuardar);

  // TODO: Aquí iría la llamada a tu API para guardar en MySQL

  Alert.alert(
    'Perfil creado',
    `¡Bienvenido ${perfilParaGuardar.nombre}!`,
    [
      {
        text: 'OK',
        onPress: () => navigation.navigate('MainApp'), // ← CAMBIO AQUÍ
      },
    ]
  );
};

  // ============================================
  // RENDER
  // ============================================
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo de MorfiApp */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoMorfi}>morfi</Text>
            <Text style={styles.logoApp}>app</Text>
          </Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>Crear perfil</Text>

        {/* Avatar con ícono de cámara */}
        <TouchableOpacity style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="camera-outline" size={40} color="#999" />
          </View>
        </TouchableOpacity>

        {/* Campos del formulario */}
        <View style={styles.formContainer}>
          {/* Fila: Nombre y Apellido */}
          <View style={styles.row}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={formData.nombre}
                onChangeText={(text) => handleChange('nombre', text)}
                placeholder=""
                placeholderTextColor="#ccc"
              />
            </View>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.input}
                value={formData.apellido}
                onChangeText={(text) => handleChange('apellido', text)}
                placeholder=""
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder=""
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Username */}
          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text) => handleChange('username', text)}
              autoCapitalize="none"
              placeholder=""
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Intereses */}
          <View style={styles.field}>
            <Text style={styles.label}>Intereses</Text>
            <View style={styles.interesesContainer}>
              {interesesDisponibles.map((interes) => {
                const seleccionado = formData.intereses.includes(interes.name);
                return (
                  <TouchableOpacity
                    key={interes.id}
                    style={[
                      styles.interesChip,
                      seleccionado && styles.interesChipSelected,
                    ]}
                    onPress={() => toggleInteres(interes.name)}
                  >
                    <Text
                      style={[
                        styles.interesText,
                        seleccionado && styles.interesTextSelected,
                      ]}
                    >
                      {interes.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Botón Guardar y continuar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
          <Text style={styles.saveButtonText}>Guardar y continuar</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  logoMorfi: {
    color: `${COLOR_PRINCIPAL}`,
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
  },
  logoApp: {
    color: `${COLOR_PRINCIPAL}`,
  },

  // Título
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Formulario
  formContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fieldHalf: {
    width: '48%',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    // Sombra sutil
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  // Intereses
  interesesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  interesChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  interesChipSelected: {
    backgroundColor: COLOR_PRINCIPAL,
    borderColor: COLOR_PRINCIPAL,
  },
  interesText: {
    fontSize: 14,
    color: '#333',
  },
  interesTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Botón
  saveButton: {
    backgroundColor: COLOR_PRINCIPAL,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CrearPerfilScreen;