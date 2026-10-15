// src/screens/crearPerfil.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';
// import {conectar}from '../database/conexion.js';
// const bdd=await conectar();

const CrearPerfilScreen = ({ navigation }) => {
  const { colores } = useTema();
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================
  const [formData, setFormData] = useState({
    nombre: 'isa',
    apellido: 'hernandez',
    email: 'isa@gmail.com',
    username: 'isaiasAbraham',
    password: 'supermeganashe',           // ← NUEVO
    descripcion: 'megusta el keke',        // ← NUEVO (opcional)
    intereses: [],
    avatar: null,
  });

  // Estado para mostrar/ocultar la contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Lista de intereses disponibles
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

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const toggleInteres = (interes) => {
    const yaSeleccionado = formData.intereses.includes(interes);
    if (yaSeleccionado) {
      setFormData({
        ...formData,
        intereses: formData.intereses.filter((i) => i !== interes),
      });
    } else {
      setFormData({
        ...formData,
        intereses: [...formData.intereses, interes],
      });
    }
  };

  // Validar formulario
  const validarFormulario = () => {
    if (!formData.nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }
    // if (!formData.apellido.trim()) {
    //   Alert.alert('Error', 'Por favor ingresa tu apellido');
    //   return false;
    // }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return false;
    }
    if (!formData.username.trim()) {
      Alert.alert('Error', 'Por favor ingresa un username');
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert('Error', 'Por favor ingresa una contraseña');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
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

    const fecha = new Date();
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    const fechaFormateada = `${yyyy}/${mm}/${dd}`;

    let nombreApellido=`${formData.nombre.trim()} ${formData.apellido.trim()}`
    const perfilParaGuardar = {
      nombre: nombreApellido.trim(),
      email: formData.email.trim().toLowerCase(),
      username: formData.username.trim().toLowerCase(),
      password: formData.password, // ⚠️ En texto plano por ahora (en producción usar hash)
      descripcion: formData.descripcion.trim() || null, // Opcional
      intereses: formData.intereses.join(','),
      avatar: formData.avatar,
      fecha_creacion: fechaFormateada,
    };

    console.log('📦 Datos a guardar en MySQL:', perfilParaGuardar);

    // TODO: Aquí iría la llamada a tu API para guardar en MySQL

    Alert.alert(
      'Perfil creado',
      `¡Bienvenido ${perfilParaGuardar.nombre}!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MainApp'),
        },
      ]
    );
  };

//   export const cNuevo=async(pet, resp)=>{
//     //1: tomar contenido de los name
//     //2: colocar esos name en el insert
//     //3: ejecutar ese insert
//     let nom, username, email, contra, desc, url, fecha;
//     nom=;
//     username=;
//     email=;
//     contra=;
//     desc=;
//     url=;
//     fecha=;

//     try {
//         let altasSQL= "INSERT INTO `usuarios`(`nombre_usuario`,`username`,`email`,`contrasena`,`descripcion`,`url_foto`,`fecha_registro`)VALUES('"+nom+"','"+username+"','"+email+"','"+contra+"','"+desc+"','"+url+"','"+fecha+"');";
//         const [registro]=await bdd.query(altasSQL);
//         console.log(registro);
//     } catch (error) {
//         console.log(`error al crear la sentencia insert ${error}`);
//     }
// }
  // ============================================
  // RENDER
  // ============================================
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colores.fondo }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={[styles.logoMorfi, { color: colores.principal }]}>morfi</Text>
            <Text style={[styles.logoApp, { color: colores.principal }]}>app</Text>
          </Text>
        </View>

        {/* Título */}
        <Text style={[styles.title, { color: colores.texto }]}>Crear perfil</Text>

        {/* Avatar */}
        <TouchableOpacity style={styles.avatarContainer}>
          <View style={[styles.avatarCircle, { backgroundColor: colores.bordeSuave }]}>
            <Ionicons name="camera-outline" size={40} color={colores.textoMuted} />
          </View>
        </TouchableOpacity>

        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Nombre y Apellido */}
          <View style={styles.row}>
            <View style={styles.fieldHalf}>
              <Text style={[styles.label, { color: colores.texto }]}>Nombre</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colores.inputFondo,
                    borderColor: colores.inputBorde,
                    color: colores.texto,
                  },
                ]}
                value={formData.nombre}
                onChangeText={(text) => handleChange('nombre', text)}
                placeholderTextColor={colores.textoMuted}
              />
            </View>
            <View style={styles.fieldHalf}>
              <Text style={[styles.label, { color: colores.texto }]}>Apellido</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colores.inputFondo,
                    borderColor: colores.inputBorde,
                    color: colores.texto,
                  },
                ]}
                value={formData.apellido}
                onChangeText={(text) => handleChange('apellido', text)}
                placeholderTextColor={colores.textoMuted}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colores.texto }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colores.inputFondo,
                  borderColor: colores.inputBorde,
                  color: colores.texto,
                },
              ]}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colores.textoMuted}
            />
          </View>

          {/* Username */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colores.texto }]}>Username</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colores.inputFondo,
                  borderColor: colores.inputBorde,
                  color: colores.texto,
                },
              ]}
              value={formData.username}
              onChangeText={(text) => handleChange('username', text)}
              autoCapitalize="none"
              placeholderTextColor={colores.textoMuted}
            />
          </View>

          {/* Contraseña (NUEVO) */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colores.texto }]}>Contraseña</Text>
            <View
              style={[
                styles.passwordContainer,
                {
                  backgroundColor: colores.inputFondo,
                  borderColor: colores.inputBorde,
                },
              ]}
            >
              <TextInput
                style={[styles.passwordInput, { color: colores.texto }]}
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colores.textoMuted}
              />
              <TouchableOpacity
                onPress={() => setMostrarPassword(!mostrarPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color={colores.textoMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Descripción (OPCIONAL - NUEVO) */}
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colores.texto }]}>Descripción</Text>
              <Text style={[styles.opcional, { color: colores.textoMuted }]}>
                (opcional)
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: colores.inputFondo,
                  borderColor: colores.inputBorde,
                  color: colores.texto,
                },
              ]}
              value={formData.descripcion}
              onChangeText={(text) => handleChange('descripcion', text)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholder="Contá algo sobre vos..."
              placeholderTextColor={colores.textoMuted}
            />
          </View>

          {/* Intereses */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: colores.texto }]}>Intereses</Text>
            <View style={styles.interesesContainer}>
              {interesesDisponibles.map((interes) => {
                const seleccionado = formData.intereses.includes(interes.name);
                return (
                  <TouchableOpacity
                    key={interes.id}
                    style={[
                      styles.interesChip,
                      {
                        backgroundColor: seleccionado
                          ? colores.principal
                          : colores.inputFondo,
                        borderColor: seleccionado
                          ? colores.principal
                          : colores.inputBorde,
                      },
                    ]}
                    onPress={() => toggleInteres(interes.name)}
                  >
                    <Text
                      style={[
                        styles.interesText,
                        { color: seleccionado ? '#fff' : colores.texto },
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
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colores.principal }]}
          onPress={handleGuardar}
        >
          <Text style={styles.saveButtonText}>Guardar y continuar</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 20 },

  // Logo
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  logoText: { fontSize: 42, fontWeight: 'bold' },
  logoMorfi: {
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
  },
  logoApp: {},

  // Título
  title: {
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  // Avatar
  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Formulario
  formContainer: { marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  fieldHalf: { width: '48%' },
  field: { marginBottom: 16 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  label: {
    fontSize: 18,
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  opcional: { fontSize: 14, marginLeft: 6, fontStyle: 'italic' },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 10,
  },

  // Contraseña
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  eyeIcon: { paddingHorizontal: 12 },

  // Intereses
  interesesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  interesChip: {
    borderWidth: 1,
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
  interesText: { fontSize: 14 },
  interesTextSelected: { fontWeight: 'bold' },

  // Botón
  saveButton: {
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
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CrearPerfilScreen;