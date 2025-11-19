import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'dark';
  const isDark = colorScheme === 'dark';
  
  // Colores dinámicos para la barra (siempre dark ahora)
  const tabBarBackground = Colors.dark.card;
  const activeColor = Colors.dark.tint;
  const inactiveColor = Colors.dark.icon;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false, // Minimalismo: Ocultamos texto, solo iconos
        tabBarStyle: {
          position: 'absolute',
          bottom: 25, // Flota 25px desde abajo
          left: 20,
          right: 20,
          height: 64,
          borderRadius: 32, // Bordes completamente redondos (estilo cápsula)
          backgroundColor: tabBarBackground,
          borderTopWidth: 0, // Sin línea divisoria superior
          elevation: 10, // Sombra fuerte en Android
          shadowColor: '#000', // Sombra suave en iOS
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          paddingBottom: 0, // Centrar iconos verticalmente (quita el espacio del label)
          alignItems: 'center',
          justifyContent: 'center',
        },
        // Estilo de cada item para asegurar centrado
        tabBarItemStyle: {
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
               <IconSymbol 
                  size={24} 
                  name="house.fill" 
                  color={color} 
                  style={focused ? { transform: [{ scale: 1.1 }] } : {}} // Pequeño pop al activar
               />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <IconSymbol 
                  size={24} 
                  name="chart.bar.fill" 
                  color={color}
                  style={focused ? { transform: [{ scale: 1.1 }] } : {}} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <IconSymbol 
                  size={24} 
                  name="bell.fill" 
                  color={color}
                  style={focused ? { transform: [{ scale: 1.1 }] } : {}} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <IconSymbol 
                  size={24} 
                  name="gearshape.fill" 
                  color={color}
                  style={focused ? { transform: [{ scale: 1.1 }] } : {}} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Oculta esta pantalla de la barra de navegación
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    // Opcional: Fondo suave cuando está activo (descomentar si te gusta)
    // backgroundColor: Platform.OS === 'ios' ? 'rgba(74, 122, 255, 0.1)' : 'transparent',
  }
});