// src/screens/perfil.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { leerPreferencias } from '../servicios/almacenamiento';

const COLOR_PRINCIPAL = "#34B87F";

const ProfileScreen = ({ navigation }) => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  // useFocusEffect se ejecuta cada vez que la pantalla gana foco
  useFocusEffect(
    React.useCallback(() => {
      cargarPerfil();
    }, [])
  );

  const cargarPerfil = async () => {
    setLoading(true);
    const datos = await leerPreferencias('perfil');
    setPerfil(datos);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLOR_PRINCIPAL} />
      </View>
    );
  }

  if (!perfil) {
    return (
      <View style={styles.centered}>
        <Ionicons name="person-outline" size={60} color="#ccc" />
        <Text style={styles.noDataText}>No hay perfil creado</Text>
      </View>
    );
  }

  // Datos por defecto si no existen
  const stats = perfil.stats || { recipes: 0, followers: 0, following: 0 };
  const intereses = perfil.intereses || [];

  // Recetas de ejemplo (después las traerás de la API)
  const recipes = [
    { id: '1', title: 'Pasta cremosa con champiñones', time: '30 min', likes: 128 },
    { id: '2', title: 'Tostada de aguacate con huevo', time: '15 min', likes: 93 },
    { id: '3', title: 'Brownies de chocolate', time: '45 min', likes: 156 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-outline" size={50} color={COLOR_PRINCIPAL} />
          </View>
        </View>
        <Text style={styles.name}>
          {perfil.nombre} {perfil.apellido}
        </Text>
        <Text style={styles.handle}>@{perfil.username}</Text>
        <Text style={styles.email}>{perfil.email}</Text>

        {/* Intereses */}
        {intereses.length > 0 && (
          <View style={styles.interesesContainer}>
            {intereses.map((interes, index) => (
              <View key={index} style={styles.interesChip}>
                <Text style={styles.interesText}>{interes}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.recipes}</Text>
            <Text style={styles.statLabel}>Recetas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.followers}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.following}</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate('Settings', { screen: 'EditarPerfil' })}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.newRecipeButton]}>
            <Ionicons name="add-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Nueva receta</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mis recetas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mis recetas</Text>
        {recipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.recipeMeta}>
              <Text style={styles.recipeMetaText}>{recipe.time}</Text>
              <Text style={styles.recipeMetaText}>• ❤️ {recipe.likes}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noDataText: { marginTop: 10, color: '#999', fontSize: 16 },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: { marginBottom: 10 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLOR_PRINCIPAL,
    backgroundColor: '#e8faf0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
  handle: { fontSize: 16, color: '#555', marginTop: 2 },
  email: { fontSize: 14, color: '#888', marginTop: 2 },
  interesesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
    paddingHorizontal: 10,
  },
  interesChip: {
    backgroundColor: '#e8faf0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  interesText: { fontSize: 12, color: COLOR_PRINCIPAL, fontWeight: '500' },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 15,
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  statLabel: { fontSize: 12, color: '#555' },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  editButton: { backgroundColor: COLOR_PRINCIPAL },
  newRecipeButton: { backgroundColor: '#ff6b6b' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginLeft: 4 },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1a1a1a' },
  recipeCard: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recipeTitle: { fontSize: 16, fontWeight: '500', color: '#1a1a1a' },
  recipeMeta: { flexDirection: 'row', marginTop: 4 },
  recipeMetaText: { fontSize: 14, color: '#777', marginRight: 8 },
});

export default ProfileScreen;