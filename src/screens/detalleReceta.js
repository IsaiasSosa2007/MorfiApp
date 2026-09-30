// src/screens/detalleReceta.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRecipeDetails } from '../servicios/spoonacularApi';
import { traducirTexto } from '../servicios/ServicioTraduccion';

const COLOR_PRINCIPAL = "#34B87F";

const DetalleRecetaScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDetalleReceta();
  }, []);

  const cargarDetalleReceta = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipeDetails(recipeId);

      // Traducir título, ingredientes e instrucciones
      const tituloTraducido = await traducirTexto(data.title, 'es');

      // Traducir ingredientes
      const ingredientesTraducidos = await Promise.all(
        (data.extendedIngredients || []).map(async (ing) => ({
          ...ing,
          name: await traducirTexto(ing.name, 'es'),
        }))
      );

      // Traducir instrucciones paso a paso
      let instruccionesTraducidas = [];
      if (data.analyzedInstructions?.length > 0) {
        instruccionesTraducidas = await Promise.all(
          data.analyzedInstructions[0].steps.map(async (paso) => ({
            ...paso,
            step: await traducirTexto(paso.step, 'es'),
          }))
        );
      }

      setReceta({
        ...data,
        title: tituloTraducido,
        extendedIngredients: ingredientesTraducidos,
        instruccionesTraducidas,
      });
    } catch (err) {
      setError('Error al cargar los detalles de la receta');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const abrirRecetaOriginal = () => {
    if (receta?.sourceUrl) {
      Linking.openURL(receta.sourceUrl);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLOR_PRINCIPAL} />
        <Text style={styles.loadingText}>Cargando receta...</Text>
      </View>
    );
  }

  if (error || !receta) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={50} color="#ff6b6b" />
        <Text style={styles.errorText}>{error || 'No se encontró la receta'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={cargarDetalleReceta}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Imagen de la receta */}
      <Image
        source={{ uri: receta.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Título y datos */}
      <View style={styles.header}>
        <Text style={styles.title}>{receta.title}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color={COLOR_PRINCIPAL} />
            <Text style={styles.metaText}>
              {receta.readyInMinutes || 'N/A'} min
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={20} color={COLOR_PRINCIPAL} />
            <Text style={styles.metaText}>
              {receta.servings || 'N/A'} porciones
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="heart-outline" size={20} color="#ff6b6b" />
            <Text style={styles.metaText}>
              {receta.aggregateLikes || 0}
            </Text>
          </View>
        </View>
      </View>

      {/* Botón para ver receta original */}
      {/* {receta.sourceUrl && (
        <TouchableOpacity style={styles.sourceButton} onPress={abrirRecetaOriginal}>
          <Ionicons name="open-outline" size={20} color="#fff" />
          <Text style={styles.sourceButtonText}>Ver receta original</Text>
        </TouchableOpacity>
      )} */}

      {/* Ingredientes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        {receta.extendedIngredients?.length > 0 ? (
          receta.extendedIngredients.map((ingrediente, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.ingredientBullet} />
              <Text style={styles.ingredientText}>
                {ingrediente.amount} {ingrediente.unit} {ingrediente.name}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No hay ingredientes disponibles.</Text>
        )}
      </View>

      {/* Instrucciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instrucciones</Text>
        {receta.instruccionesTraducidas?.length > 0 ? (
          receta.instruccionesTraducidas.map((paso) => (
            <View key={paso.number} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{paso.number}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepText}>{paso.step}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>
            No hay instrucciones disponibles para esta receta.
          </Text>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    marginTop: 10,
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: COLOR_PRINCIPAL,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_PRINCIPAL,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sourceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLOR_PRINCIPAL,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLOR_PRINCIPAL,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  noData: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default DetalleRecetaScreen;