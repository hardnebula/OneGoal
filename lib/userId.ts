import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "onegoal_user_id";

/**
 * Obtiene o genera un ID único para el usuario
 * Este ID se guarda localmente y se reutiliza en todas las sesiones
 */
export async function getUserId(): Promise<string> {
  try {
    let userId = await AsyncStorage.getItem(USER_ID_KEY);
    
    if (!userId) {
      // Generar un ID único si no existe
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    }
    
    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    // Fallback a un ID temporal si hay error
    return `temp_${Date.now()}`;
  }
}

