// src/screens/explorar.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { searchRecipes, getRandomRecipes } from "../servicios/spoonacularApi";
import { traducirTexto } from "../servicios/ServicioTraduccion";

const COLOR_PRINCIPAL = "#34B87F";

const categorias = [
  { id: "1", name: "Todas", icon: "grid-outline", query: "" },
  { id: "2", name: "Pastas", icon: "restaurant-outline", query: "pasta" },
  { id: "3", name: "Postres", icon: "ice-cream-outline", query: "dessert" },
  { id: "4", name: "Carnes", icon: "pizza-outline", query: "meat" },
  { id: "5", name: "Vegano", icon: "leaf-outline", query: "vegan" },
  { id: "6", name: "Rápido", icon: "timer-outline", query: "quick" },
];

const ExploreScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  // Traducir los títulos de las recetas
  const traducirRecetas = async (data) => {
    return await Promise.all(
      data.map(async (receta) => ({
        ...receta,
        title: await traducirTexto(receta.title, 'es'),
      }))
    );
  };

  const loadRandomRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRandomRecipes(10);
      const traducidas = await traducirRecetas(data);
      setRecetas(traducidas);
    } catch (err) {
      setError("Error al cargar las recetas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.length > 2) {
      setLoading(true);
      setError(null);
      try {
        const results = await searchRecipes(text, 10);
        const traducidas = await traducirRecetas(results);
        setRecetas(traducidas);
      } catch (err) {
        setError("Error al buscar recetas");
      } finally {
        setLoading(false);
      }
    } else if (text.length === 0) {
      loadRandomRecipes();
    }
  };

  const handleCategoryPress = async (categoria) => {
    setSelectedCategory(categoria.id);
    setSearchText("");

    if (categoria.query === "") {
      loadRandomRecipes();
    } else {
      setLoading(true);
      setError(null);
      try {
        const results = await searchRecipes(categoria.query, 10);
        const traducidas = await traducirRecetas(results);
        setRecetas(traducidas);
      } catch (err) {
        setError("Error al filtrar por categoría");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive,
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <Ionicons
        name={item.icon}
        size={20}
        color={selectedCategory === item.id ? "#fff" : COLOR_PRINCIPAL}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() =>
        navigation.navigate("DetalleReceta", { recipeId: item.id })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.recipeAuthor}>
          {item.sourceName || "Receta popular"}
        </Text>
        <View style={styles.recipeFooter}>
          <View style={styles.recipeMeta}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.metaText}>
              {item.readyInMinutes || "30"} min
            </Text>
          </View>
          <View style={styles.recipeMeta}>
            <Ionicons name="heart-outline" size={14} color="#ff6b6b" />
            <Text style={styles.metaText}>
              {item.aggregateLikes || 0}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar recetas..."
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categorías */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categorias}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Resultados */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR_PRINCIPAL} />
          <Text style={styles.loadingText}>Cargando recetas...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#ff6b6b" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadRandomRecipes}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recetas}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>
                No se encontraron recetas
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#1a1a1a",
  },
  categoriesContainer: { marginBottom: 12 },
  categoriesList: { paddingHorizontal: 16 },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryButtonActive: {
    backgroundColor: COLOR_PRINCIPAL,
    borderColor: COLOR_PRINCIPAL,
  },
  categoryText: {
    marginLeft: 4,
    fontSize: 14,
    color: COLOR_PRINCIPAL,
  },
  categoryTextActive: { color: "#fff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { marginTop: 10, color: "#666", fontSize: 16 },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: COLOR_PRINCIPAL,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: { color: "#fff", fontWeight: "bold" },
  resultsList: { paddingHorizontal: 16, paddingBottom: 20 },
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeImage: { width: 80, height: 80, borderRadius: 8 },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  recipeAuthor: { fontSize: 13, color: "#777", marginTop: 2 },
  recipeFooter: { flexDirection: "row", marginTop: 6 },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  metaText: { fontSize: 12, color: "#666", marginLeft: 4 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 16, color: "#999", marginTop: 10 },
});

export default ExploreScreen;