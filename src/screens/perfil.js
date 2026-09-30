import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

const COLOR_PRINCIPAL = "#34B87F";

const ProfileScreen = () => {
  const user = {
    name: "Ricotero",
    handle: "@IndioDeLaRicota",
    bio: "Fanático de los redondos y de las recetas de ricota.",
    stats: {
      recipes: 67,
      followers: 1248,
      following: 320,
    },
  };

  const recipes = [
    {
      id: "1",
      title: "Pasta cremosa con champiñones",
      time: "30 min",
      difficulty: "Fácil",
      likes: 128,
    },
    {
      id: "2",
      title: "Tostada de aguacate con huevo",
      time: "15 min",
      difficulty: "Fácil",
      likes: 93,
    },
    {
      id: "3",
      title: "Brownies de chocolate",
      time: "45 min",
      difficulty: "Media",
      likes: 156,
    },
  ];

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
  
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-outline" size={50} color={COLOR_PRINCIPAL} />
          </View>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.handle}>{user.handle}</Text>
        <Text style={styles.bio}>{user.bio}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.recipes}</Text>
            <Text style={styles.statLabel}>Recetas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.followers}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.following}</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.button, styles.editButton]}>
            <Text style={styles.buttonText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.newRecipeButton]}>
            <Text style={styles.buttonText}>Nueva receta</Text>
          </TouchableOpacity>
        </View>
      </View>


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
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLOR_PRINCIPAL,
    backgroundColor: "#e8faf0",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  handle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginHorizontal: 80,
    marginBottom: 15,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: COLOR_PRINCIPAL,
  },
  newRecipeButton: {
    backgroundColor: "#ff6b6b",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  recipeCard: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  recipeMeta: {
    flexDirection: "row",
    marginTop: 4,
    flexWrap: "wrap",
  },
  recipeMetaText: {
    fontSize: 14,
    color: "#777",
    marginRight: 8,
  },
});

export default ProfileScreen;