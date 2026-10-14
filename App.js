// App.js
import React from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// Contexto del tema
import { TemaProvider, useTema } from "./src/context/TemaContext";

// Pantallas
import CrearPerfilScreen from "./src/screens/crearPerfil";
import HomeScreen from "./src/screens/inicio";
import ExploreScreen from "./src/screens/explorar";
import SavedScreen from "./src/screens/guardadas";
import ProfileScreen from "./src/screens/perfil";
import SettingsScreen from "./src/screens/ajustes";
import DetalleRecetaScreen from "./src/screens/detalleReceta";
import EditarPerfilScreen from "./src/screens/editarPerfil";
import PrivacidadScreen from "./src/screens/privacidad";
import AyudaScreen from "./src/screens/ayuda";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ============================================
// STACKS
// ============================================
function HomeStack() {
  const { colores } = useTema();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colores.principal },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Inicio" }} />
      <Stack.Screen name="DetalleReceta" component={DetalleRecetaScreen} options={{ title: "Receta" }} />
    </Stack.Navigator>
  );
}

function ExploreStack() {
  const { colores } = useTema();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colores.principal },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ title: "Explorar" }} />
      <Stack.Screen name="DetalleReceta" component={DetalleRecetaScreen} options={{ title: "Receta" }} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  const { colores } = useTema();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colores.principal },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: "Ajustes" }} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ title: "Editar perfil" }} />
      <Stack.Screen name="Privacidad" component={PrivacidadScreen} options={{ title: "Privacidad" }} />
      <Stack.Screen name="Ayuda" component={AyudaScreen} options={{ title: "Ayuda" }} />
    </Stack.Navigator>
  );
}

// ============================================
// TABS PRINCIPALES
// ============================================
function MainTabs() {
  const { modoOscuro, colores } = useTema();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Explore") iconName = focused ? "search" : "search-outline";
          else if (route.name === "Saved") iconName = focused ? "bookmark" : "bookmark-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          else if (route.name === "Settings") iconName = focused ? "settings" : "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colores.principal,
        tabBarInactiveTintColor: modoOscuro ? "#888" : "gray",
        tabBarStyle: {
          backgroundColor: colores.fondoCard,
          borderTopColor: colores.borde,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "Inicio" }} />
      <Tab.Screen name="Explore" component={ExploreStack} options={{ title: "Explorar" }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ title: "Guardadas" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Tab.Screen name="Settings" component={SettingsStack} options={{ title: "Ajustes" }} />
    </Tab.Navigator>
  );
}

// ============================================
// NAVEGACIÓN PRINCIPAL CON TEMA
// ============================================
function NavegacionPrincipal() {
  const { modoOscuro, colores } = useTema();

  // Tema de navegación (colores de fondo de las pantallas)
  const temaNavegacion = modoOscuro
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colores.fondo,
          card: colores.fondoCard,
          text: colores.texto,
          border: colores.borde,
          primary: colores.principal,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colores.fondo,
          card: colores.fondoCard,
          text: colores.texto,
          border: colores.borde,
          primary: colores.principal,
        },
      };

  return (
    <NavigationContainer theme={temaNavegacion}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CrearPerfil" component={CrearPerfilScreen} />
        <Stack.Screen name="MainApp" component={MainTabs} />
      </Stack.Navigator>
      <StatusBar style={modoOscuro ? "light" : "dark"} />
    </NavigationContainer>
  );
}

// ============================================
// APP PRINCIPAL
// ============================================
export default function App() {
  return (
    <TemaProvider>
      <NavegacionPrincipal />
    </TemaProvider>
  );
}