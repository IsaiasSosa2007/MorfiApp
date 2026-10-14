// src/screens/inicio.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRandomRecipes } from '../servicios/spoonacularApi';
import { traducirTexto } from '../servicios/ServicioTraduccion';
import { useTema } from '../context/TemaContext';

const HomeScreen = ({ navigation }) => {
  const { colores } = useTema();
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRandomRecipes(10);
      const recetasTraducidas = await Promise.all(
        data.map(async (receta) => ({
          ...receta,
          title: await traducirTexto(receta.title, 'es'),
        }))
      );
      setRecetas(recetasTraducidas);
    } catch (err) {
      setError('Error al cargar las recetas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colores.fondoCard }]}
      onPress={() => navigation.navigate('DetalleReceta', { recipeId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colores.texto }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.cardAuthor, { color: colores.textoSecondary }]}>
          {item.sourceName || 'Receta popular'}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.cardMeta}>
            <Ionicons name="time-outline" size={16} color={colores.textoSecondary} />
            <Text style={[styles.metaText, { color: colores.textoSecondary }]}>
              {item.readyInMinutes || '30'} min
            </Text>
          </View>
          <View style={styles.likesContainer}>
            <Ionicons name="heart-outline" size={16} color="#ff6b6b" />
            <Text style={[styles.likesText, { color: colores.textoSecondary }]}>
              {item.aggregateLikes || 0}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colores.fondo }]}>
      <View style={[styles.header, { backgroundColor: colores.fondo }]}>
        <Text style={[styles.headerTitle, { color: colores.texto }]}>Inicio</Text>
        <Text style={[styles.headerSubtitle, { color: colores.textoSecondary }]}>
          Descubre nuevas recetas
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colores.principal} />
          <Text style={[styles.loadingText, { color: colores.textoSecondary }]}>
            Cargando recetas...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: colores.principal }]}
            onPress={loadRecipes}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recetas}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 16, marginTop: 4 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { marginTop: 10, color: '#ff6b6b', fontSize: 16, textAlign: 'center' },
  retryButton: { marginTop: 20, paddingHorizontal: 30, paddingVertical: 10, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontWeight: 'bold' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: { height: 150, width: '100%' },
  cardContent: { padding: 14 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  cardAuthor: { fontSize: 14, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardMeta: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 13, marginLeft: 4 },
  likesContainer: { flexDirection: 'row', alignItems: 'center' },
  likesText: { fontSize: 13, marginLeft: 4 },
});

export default HomeScreen;