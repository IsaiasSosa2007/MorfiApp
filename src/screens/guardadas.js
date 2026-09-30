import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLOR_PRINCIPAL = "#34B87F";

// Datos de ejemplo para recetas guardadas
const recetasGuardadas = [
  {
    id: "1",
    title: "Pasta cremosa con champiñones",
    author: "María Cocina",
    time: "30 min",
    difficulty: "Fácil",
    saved: true,
  },
  {
    id: "2",
    title: "Tostada de aguacate con huevo",
    author: "Cocina Con Laura",
    time: "15 min",
    difficulty: "Fácil",
    saved: true,
  },
  {
    id: "3",
    title: "Brownies de chocolate",
    author: "Dulce Momento",
    time: "45 min",
    difficulty: "Media",
    saved: true,
  },
  {
    id: "4",
    title: "Tacos de pollo al cilantro",
    author: "Sabores Del Mundo",
    time: "25 min",
    difficulty: "Fácil",
    saved: true,
  },
  {
    id: "5",
    title: "Bowl mediterráneo",
    author: "Veggie Lover",
    time: "20 min",
    difficulty: "Fácil",
    saved: true,
  },
];

// Colecciones de ejemplo
const colecciones = [
  { id: "1", name: "Favoritas", count: 12, icon: "heart" },
  { id: "2", name: "Para probar", count: 8, icon: "restaurant" },
  { id: "3", name: "Postres", count: 6, icon: "ice-cream" },
  { id: "4", name: "Rápidas", count: 15, icon: "timer" },
];

const SavedScreen = () => {
  const [activeTab, setActiveTab] = useState("recetas");

  const renderSavedRecipe = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <View style={styles.recipeContent}>
        <View style={styles.recipeImagePlaceholder}>
          <Ionicons name="restaurant-outline" size={24} color="#ccc" />
        </View>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeAuthor}>{item.author}</Text>
          <View style={styles.recipeMeta}>
            <Ionicons name="time-outline" size={12} color="#666" />
            <Text style={styles.metaText}>{item.time}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{item.difficulty}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="bookmark" size={24} color={COLOR_PRINCIPAL} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCollection = ({ item }) => (
    <TouchableOpacity style={styles.collectionCard}>
      <View style={styles.collectionIcon}>
        <Ionicons name={item.icon} size={24} color={COLOR_PRINCIPAL} />
      </View>
      <Text style={styles.collectionName}>{item.name}</Text>
      <Text style={styles.collectionCount}>{item.count} recetas</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guardadas</Text>
        <Text style={styles.headerSubtitle}>
          Tus recetas favoritas en un solo lugar
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "recetas" && styles.tabActive]}
          onPress={() => setActiveTab("recetas")}
        >
          <Ionicons
            name="bookmark-outline"
            size={20}
            color={activeTab === "recetas" ? COLOR_PRINCIPAL : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "recetas" && styles.tabTextActive,
            ]}
          >
            Recetas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "colecciones" && styles.tabActive]}
          onPress={() => setActiveTab("colecciones")}
        >
          <Ionicons
            name="folder-outline"
            size={20}
            color={activeTab === "colecciones" ? COLOR_PRINCIPAL : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "colecciones" && styles.tabTextActive,
            ]}
          >
            Colecciones
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "recetas" ? (
        <FlatList
          data={recetasGuardadas}
          renderItem={renderSavedRecipe}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="bookmark-outline" size={60} color="#ccc" />
              <Text style={styles.emptyTitle}>Sin recetas guardadas</Text>
              <Text style={styles.emptyText}>
                Guarda tus recetas favoritas para verlas aquí
              </Text>
            </View>
          }
        />
      ) : (
        <View style={styles.collectionsContainer}>
          <View style={styles.collectionsHeader}>
            <Text style={styles.collectionsTitle}>Mis colecciones</Text>
            <TouchableOpacity style={styles.createCollectionButton}>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={COLOR_PRINCIPAL}
              />
              <Text style={styles.createCollectionText}>Crear colección</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={colecciones}
            renderItem={renderCollection}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.collectionsGrid}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footerMessage}>
            <Text style={styles.footerTitle}>¿Te encantan las recetas?</Text>
            <Text style={styles.footerText}>
              Crea colecciones y organiza tus favoritas
            </Text>
            <TouchableOpacity style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Crear colección</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: COLOR_PRINCIPAL,
  },
  tabText: {
    fontSize: 15,
    color: "#666",
    marginLeft: 6,
  },
  tabTextActive: {
    color: COLOR_PRINCIPAL,
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  recipeAuthor: {
    fontSize: 14,
    color: "#777",
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
  },
  metaDot: {
    marginHorizontal: 4,
    color: "#ccc",
  },
  saveButton: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 4,
  },
  collectionsContainer: {
    flex: 1,
    padding: 16,
  },
  collectionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  collectionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  createCollectionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  createCollectionText: {
    fontSize: 14,
    color: COLOR_PRINCIPAL,
    marginLeft: 4,
  },
  collectionsGrid: {
    paddingBottom: 16,
  },
  collectionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  collectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e8faf0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  collectionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
  collectionCount: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  footerMessage: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  footerButton: {
    backgroundColor: COLOR_PRINCIPAL,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 12,
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SavedScreen;
