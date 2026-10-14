// src/screens/ajustes.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/TemaContext';
import {
  guardarPreferencias,
  leerPreferencias,
  borrarDatos,
} from '../servicios/almacenamiento';

const SettingsScreen = ({ navigation }) => {
  const { modoOscuro, toggleModoOscuro, colores } = useTema();
  const [notificaciones, setNotificaciones] = useState(true);

  useEffect(() => {
    cargarPreferencias();
  }, []);

  const cargarPreferencias = async () => {
    const notif = await leerPreferencias('notificaciones');
    if (notif !== null) setNotificaciones(notif);
  };

  const toggleNotificaciones = async (valor) => {
    setNotificaciones(valor);
    await guardarPreferencias('notificaciones', valor);
  };

  const handleCerrarSesion = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que querés cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await borrarDatos();
            navigation.reset({
              index: 0,
              routes: [{ name: 'CrearPerfil' }],
            });
          },
        },
      ]
    );
  };

  const OpcionMenu = ({
    icono,
    titulo,
    onPress,
    colorIcono,
    mostrarSwitch,
    valorSwitch,
    onSwitch,
  }) => (
    <TouchableOpacity
      style={[styles.opcionItem, { borderTopColor: colores.bordeSuave }]}
      onPress={onPress}
      disabled={mostrarSwitch}
    >
      <View style={styles.opcionLeft}>
        <Ionicons name={icono} size={24} color={colorIcono || colores.principal} />
        <Text style={[styles.opcionTitulo, { color: colores.texto }]}>{titulo}</Text>
      </View>
      {mostrarSwitch ? (
        <Switch
          value={valorSwitch}
          onValueChange={onSwitch}
          trackColor={{ false: '#ccc', true: colores.principal }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward-outline" size={20} color={colores.textoMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colores.fondo }]}>
      <View style={[styles.header, { backgroundColor: colores.fondoHeader, borderBottomColor: colores.borde }]}>
        <Text style={[styles.headerTitle, { color: colores.texto }]}>Ajustes</Text>
        <Text style={[styles.headerSubtitle, { color: colores.textoSecondary }]}>
          Configurá tu experiencia
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: colores.fondoCard }]}>
          <Text style={[styles.sectionTitle, { color: colores.textoMuted }]}>Cuenta</Text>
          <OpcionMenu
            icono="person-outline"
            titulo="Editar perfil"
            onPress={() => navigation.navigate('EditarPerfil')}
          />
          <OpcionMenu
            icono="lock-closed-outline"
            titulo="Privacidad"
            onPress={() => navigation.navigate('Privacidad')}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colores.fondoCard }]}>
          <Text style={[styles.sectionTitle, { color: colores.textoMuted }]}>Preferencias</Text>
          <OpcionMenu
            icono="notifications-outline"
            titulo="Notificaciones"
            mostrarSwitch
            valorSwitch={notificaciones}
            onSwitch={toggleNotificaciones}
          />
          <OpcionMenu
            icono="moon-outline"
            titulo="Modo oscuro"
            mostrarSwitch
            valorSwitch={modoOscuro}
            onSwitch={toggleModoOscuro}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colores.fondoCard }]}>
          <Text style={[styles.sectionTitle, { color: colores.textoMuted }]}>Soporte</Text>
          <OpcionMenu
            icono="help-circle-outline"
            titulo="Ayuda y soporte"
            onPress={() => navigation.navigate('Ayuda')}
          />
          <OpcionMenu
            icono="information-circle-outline"
            titulo="Acerca de MorfiApp"
            onPress={() =>
              Alert.alert('MorfiApp', 'Versión 1.0.0\n\nTu app de recetas favorita 🍳', [
                { text: 'OK' },
              ])
            }
          />
        </View>

        <View style={[styles.section, { backgroundColor: colores.fondoCard }]}>
          <Text style={[styles.sectionTitle, { color: colores.textoMuted }]}>Sesión</Text>
          <OpcionMenu
            icono="log-out-outline"
            titulo="Cerrar sesión"
            colorIcono="#ff6b6b"
            onPress={handleCerrarSesion}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colores.textoMuted }]}>MorfiApp v1.0.0</Text>
          <Text style={[styles.versionSubtext, { color: colores.textoMuted }]}>
            © 2025 - Hecho con 🍳
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  section: {
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  opcionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  opcionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  opcionTitulo: { fontSize: 16, marginLeft: 12 },
  versionContainer: { alignItems: 'center', paddingVertical: 20 },
  versionText: { fontSize: 13, fontWeight: '500' },
  versionSubtext: { fontSize: 11, marginTop: 4 },
});

export default SettingsScreen;