// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// Importar las pantallas
import CrearPerfilScreen from "./src/screens/crearPerfil";
import HomeScreen from "./src/screens/inicio";
import ExploreScreen from "./src/screens/explorar";
import SavedScreen from "./src/screens/guardadas";
import ProfileScreen from "./src/screens/perfil";
import SettingsScreen from "./src/screens/ajustes";
import DetalleRecetaScreen from "./src/screens/detalleReceta";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const COLOR_PRINCIPAL = "#34B87F";

// ============================================
// STACK PARA LA PESTAÑA DE INICIO
// ============================================
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLOR_PRINCIPAL },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="DetalleReceta"
        component={DetalleRecetaScreen}
        options={{ title: "Detalle de receta" }}
      />
    </Stack.Navigator>
  );
}

// ============================================
// STACK PARA LA PESTAÑA DE EXPLORAR
// ============================================
function ExploreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLOR_PRINCIPAL },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ title: "Explorar" }}
      />
      <Stack.Screen
        name="DetalleReceta"
        component={DetalleRecetaScreen}
        options={{ title: "Detalle de receta" }}
      />
    </Stack.Navigator>
  );
}

// ============================================
// PESTAÑAS PRINCIPALES (MainApp)
// ============================================
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Saved") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLOR_PRINCIPAL,
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Ocultamos el header de las tabs
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Inicio" }} />
      <Tab.Screen name="Explore" component={ExploreStack} options={{ title: "Explorar" }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ title: "Guardadas" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Ajustes" }} />
    </Tab.Navigator>
  );
}

// ============================================
// APP PRINCIPAL
// ============================================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Ocultamos el header en el stack raíz
        }}
      >
        <Stack.Screen name="CrearPerfil" component={CrearPerfilScreen} />
        <Stack.Screen name="MainApp" component={MainTabs} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}