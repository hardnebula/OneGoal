# Configuración de Convex

Este proyecto usa Convex como backend para sincronizar los datos de los usuarios.

## Pasos para configurar Convex

1. **Instalar Convex CLI** (si no lo tienes instalado):
   ```bash
   npm install -g convex
   ```

2. **Iniciar sesión en Convex**:
   ```bash
   npx convex dev
   ```
   Esto abrirá tu navegador para autenticarte. Si no tienes cuenta, puedes crear una gratis.

3. **Configurar el proyecto**:
   Cuando ejecutes `npx convex dev`, Convex:
   - Creará un nuevo proyecto (o te pedirá que selecciones uno existente)
   - Generará un archivo `.env.local` con tu `EXPO_PUBLIC_CONVEX_URL`
   - Iniciará el servidor de desarrollo de Convex

4. **Configurar la variable de entorno**:
   Copia la URL de Convex que se genera y créala en un archivo `.env` en la raíz del proyecto:
   ```
   EXPO_PUBLIC_CONVEX_URL=https://tu-deployment.convex.cloud
   ```

   O si usas Expo, puedes agregarla directamente en `app.json`:
   ```json
   {
     "expo": {
       "extra": {
         "convexUrl": "https://tu-deployment.convex.cloud"
       }
     }
   }
   ```

5. **Desplegar el schema y funciones**:
   Las funciones y el schema se despliegan automáticamente cuando ejecutas `npx convex dev`.
   También puedes desplegar manualmente con:
   ```bash
   npx convex deploy
   ```

## Estructura de Convex

- `convex/schema.ts`: Define el schema de la base de datos
- `convex/goals.ts`: Contiene las queries y mutations para gestionar los goals
- `convex/_generated/`: Archivos generados automáticamente (no editar)

## Funciones disponibles

### Queries
- `getCurrentGoal`: Obtiene el goal actual del usuario

### Mutations
- `createGoal`: Crea un nuevo goal
- `markTodayComplete`: Marca el día actual como completado
- `completeOnboarding`: Marca el onboarding como completado
- `startNewGoal`: Inicia un nuevo goal
- `resetCycle`: Resetea el ciclo actual

## Desarrollo

Para desarrollo local, ejecuta:
```bash
npx convex dev
```

Esto:
- Sincroniza tus funciones con Convex
- Abre el dashboard de Convex en tu navegador
- Muestra logs en tiempo real

## Producción

Para desplegar a producción:
```bash
npx convex deploy --prod
```

O configura un deployment específico:
```bash
npx convex deploy --prod --project-name tu-proyecto
```

