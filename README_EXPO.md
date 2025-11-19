# OneGoal - Versión Expo/React Native

Esta es la versión de OneGoal que funciona con **Expo Go**. Puedes ejecutarla directamente en tu dispositivo usando la app Expo Go.

## 🚀 Inicio Rápido

1. **Instala Expo Go** en tu dispositivo:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Escanea el código QR** con Expo Go:
   - iOS: Usa la cámara del iPhone
   - Android: Usa la app Expo Go para escanear el QR

## 📱 Características

- ✅ **Onboarding completo** - 3 pantallas de bienvenida
- ✅ **Pantalla principal** - Anillo de progreso animado y botón "Done Today"
- ✅ **Estadísticas** - Progreso del ciclo y tasa de finalización
- ✅ **Recordatorios** - Notificaciones diarias (requiere permisos)
- ✅ **Configuración** - Preferencias y ajustes
- ✅ **Selector de objetivos** - Lista de hábitos sugeridos o personalizado
- ✅ **Persistencia** - Los datos se guardan con AsyncStorage

## 🛠️ Tecnologías

- **Expo Router** - Navegación basada en archivos
- **React Native** - Framework móvil
- **AsyncStorage** - Persistencia de datos
- **Expo Notifications** - Notificaciones locales
- **React Native SVG** - Gráficos vectoriales para el anillo de progreso
- **React Native Reanimated** - Animaciones fluidas

## 📁 Estructura del Proyecto

```
app/
├── _layout.tsx          # Layout principal con provider
├── onboarding.tsx       # Flujo de onboarding
├── goal-picker.tsx      # Selector de objetivos
└── (tabs)/
    ├── index.tsx        # Pantalla principal (Home)
    ├── stats.tsx        # Estadísticas
    ├── reminders.tsx    # Recordatorios
    └── settings.tsx     # Configuración

store/
└── OneGoalStore.tsx     # Estado global y lógica de negocio
```

## 🔧 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en iOS
npm run ios

# Ejecutar en Android
npm run android

# Ejecutar en web
npm run web
```

## 📝 Notas

- La app usa **AsyncStorage** para persistencia (equivalente a UserDefaults en iOS nativo)
- Las notificaciones requieren permisos del usuario
- El anillo de progreso usa SVG animado con Reanimated
- El diseño sigue el mismo estilo minimalista que la versión iOS nativa

## 🐛 Solución de Problemas

Si tienes problemas:

1. **Limpia la caché**: `npx expo start -c`
2. **Reinstala dependencias**: `rm -rf node_modules && npm install`
3. **Verifica que Expo Go esté actualizado** en tu dispositivo

## 🎨 Diseño

- Color de acento: `#4A7AFF`
- Fondo: `#F7F7F7`
- Fuentes: Sistema (SF Pro en iOS, Roboto en Android)

