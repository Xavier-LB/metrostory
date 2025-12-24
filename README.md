# MetroStory

MetroStory es una aplicación web interactiva que cuenta la historia del Metro de Santiago de Chile, estación por estación. Los usuarios pueden explorar un mapa interactivo del metro para descubrir el origen de los nombres de las estaciones, información histórica, datos técnicos y curiosidades.

## Tecnologías Utilizadas

- SvelteKit: Framework para el frontend
- TailwindCSS: Para los estilos
- Mapbox: Para la visualización del mapa interactivo
- TypeScript: Para tipado estático

## Configuración

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Copiar el archivo `.env.example` a `.env` y configurar las variables de entorno:
   ```
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   VITE_MAPBOX_STYLE=mapbox://styles/mapbox/dark-v10
   VITE_DEFAULT_CENTER=-70.620,-33.420
   VITE_DEFAULT_ZOOM=12
   ```
4. Para obtener un token de Mapbox, registrarse en [Mapbox](https://www.mapbox.com/) y crear un token.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del Proyecto

- `src/lib/components/Map/`: Componentes del mapa interactivo
- `src/lib/types/`: Definiciones de tipos TypeScript
- `src/lib/data/`: Datos de las líneas y estaciones del metro
- `src/routes/`: Páginas de la aplicación

## Inspiración

Este proyecto está inspirado en [The Weekendest](https://github.com/blahblahblah-/theweekendest), una aplicación que muestra en tiempo real el servicio del metro de Nueva York.

## Contribuir

Las contribuciones son bienvenidas. Puedes ayudar a:

1. Mejorar los datos históricos de las estaciones
2. Añadir fotos históricas
3. Mejorar el diseño y la experiencia de usuario
4. Implementar nuevas funcionalidades

## Licencia

MIT
