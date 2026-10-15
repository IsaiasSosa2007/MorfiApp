// src/context/TemaContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { guardarPreferencias, leerPreferencias } from '../servicios/almacenamiento';

// ============================================
// DEFINICIÓN DE TEMAS
// ============================================
export const TEMAS = {
  claro: {
    // Fondos
    fondo: '#f8f9fa',
    fondoCard: '#fff',
    fondoHeader: '#fff',
    // Textos
    texto: '#1a1a1a',
    textoSecondary: '#666',
    textoMuted: '#999',
    // Bordes
    borde: '#e0e0e0',
    bordeSuave: '#f0f0f0',
    // Colores de la app
    principal: '#34B87F',
    // Inputs
    inputFondo: '#fff',
    inputBorde: '#ddd',
  },
  oscuro: {
    // Fondos
    fondo: '#121212',
    fondoCard: '#1e1e1e',
    fondoHeader: '#1e1e1e',
    // Textos
    texto: '#ffffff',
    textoSecondary: '#b0b0b0',
    textoMuted: '#777',
    // Bordes
    borde: '#333',
    bordeSuave: '#2a2a2a',
    // Colores de la app
    principal: '#34B87F',
    // Inputs
    inputFondo: '#2a2a2a',
    inputBorde: '#444',
  },
};

// ============================================
// CONTEXTO
// ============================================
const TemaContext = createContext();

// ============================================
// PROVIDER
// ============================================
export const TemaProvider = ({ children }) => {
  const [modoOscuro, setModoOscuro] = useState(false);

  // Cargar preferencia guardada al iniciar la app
  useEffect(() => {
    cargarTema();
  }, []);

  const cargarTema = async () => {
    const guardado = await leerPreferencias('modoOscuro');
    if (guardado !== null) {
      setModoOscuro(guardado);
    }
  };

  // Cambiar el modo y guardarlo
  const toggleModoOscuro = async (valor) => {
    setModoOscuro(valor);
    await guardarPreferencias('modoOscuro', valor);
  };

  // Colores actuales según el modo
  const colores = modoOscuro ? TEMAS.oscuro : TEMAS.claro;

  return (
    <TemaContext.Provider
      value={{
        modoOscuro,
        toggleModoOscuro,
        colores,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
};

// ============================================
// HOOK PERSONALIZADO
// ============================================
export const useTema = () => {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error('useTema debe usarse dentro de un TemaProvider');
  }
  return context;
};