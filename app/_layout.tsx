import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ConvexProvider } from 'convex/react';

import { convex } from '@/lib/convex';
import { OneGoalProvider } from '@/store/OneGoalStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  // Forzamos visualmente el esquema 'dark' si ya cambiaste el app.json,
  // pero esto asegura consistencia en el código.
  const colorScheme = 'dark'; 

  return (
    <ConvexProvider client={convex}>
      <OneGoalProvider>
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="goal-picker" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          {/* Esto pone los textos de la barra de estado en blanco */}
          <StatusBar style="light" />
        </ThemeProvider>
      </OneGoalProvider>
    </ConvexProvider>
  );
}