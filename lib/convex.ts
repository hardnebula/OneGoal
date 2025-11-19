import { ConvexReactClient } from "convex/react";
import Constants from "expo-constants";

// Obtener la URL de Convex desde las variables de entorno
// En desarrollo: desde process.env
// En producción: desde Constants.expoConfig.extra
const getConvexUrl = (): string => {
  // Primero intentar desde process.env (desarrollo)
  if (process.env.EXPO_PUBLIC_CONVEX_URL) {
    return process.env.EXPO_PUBLIC_CONVEX_URL;
  }

  // Luego intentar desde Constants (producción/Expo)
  if (Constants.expoConfig?.extra?.convexUrl) {
    return Constants.expoConfig.extra.convexUrl;
  }

  // Si está en app.json como extra
  if (Constants.expoConfig?.extra?.EXPO_PUBLIC_CONVEX_URL) {
    return Constants.expoConfig.extra.EXPO_PUBLIC_CONVEX_URL;
  }

  return "";
};

const convexUrl = getConvexUrl();

if (!convexUrl) {
  console.warn(
    "EXPO_PUBLIC_CONVEX_URL no está configurada. Por favor, configura tu URL de Convex.\n" +
    "Ejecuta 'npx convex dev' para obtener tu URL o agrégalo en app.json o .env"
  );
}

export const convex = new ConvexReactClient(convexUrl || "https://placeholder.convex.cloud");

