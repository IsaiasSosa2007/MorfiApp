import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLOR_PRINCIPAL = "#34B87F";

const SettingsScreen = () => {
  const settingsOptions = [
    { id: "1", title: "Perfil", icon: "person-outline" },
    { id: "2", title: "Notificaciones", icon: "notifications-outline" },
    { id: "3", title: "Privacidad", icon: "lock-closed-outline" },
    { id: "4", title: "Idioma", icon: "language-outline" },
    { id: "5", title: "Ayuda", icon: "help-circle-outline" },
    { id: "6", title: "Cerrar sesión", icon: "log-out-outline" },
  ];

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.optionItem}>
      <View style={styles.optionLeft}>
        <Ionicons name={item.icon} size={24} color={COLOR_PRINCIPAL} />
        <Text style={styles.optionTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <Text style={styles.headerSubtitle}>Configura tu experiencia</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          {settingsOptions.slice(0, 4).map((item) => (
            <TouchableOpacity key={item.id} style={styles.optionItem}>
              <View style={styles.optionLeft}>
                <Ionicons name={item.icon} size={24} color={COLOR_PRINCIPAL} />
                <Text style={styles.optionTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soporte</Text>
          {settingsOptions.slice(4, 6).map((item) => (
            <TouchableOpacity key={item.id} style={styles.optionItem}>
              <View style={styles.optionLeft}>
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={
                    item.title === "Cerrar sesión" ? "#ff6b6b" : COLOR_PRINCIPAL
                  }
                />
                <Text
                  style={[
                    styles.optionTitle,
                    item.title === "Cerrar sesión" && styles.logoutText,
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              {item.title !== "Cerrar sesión" && (
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#999"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión beta</Text>
          <Text style={styles.versionSubtext}>MorfiApp © 2024</Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    fontSize: 16,
    color: "#1a1a1a",
    marginLeft: 12,
  },
  logoutText: {
    color: "#ff6b6b",
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#666",
  },
  versionSubtext: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});

export default SettingsScreen;
