# MetroStory - Documentación

## Índice

| Documento | Descripción |
|-----------|-------------|
| [00-vision.md](./00-vision.md) | Visión, objetivos y público objetivo |
| [01-arquitectura.md](./01-arquitectura.md) | Stack técnico y estructura del proyecto |
| [02-features.md](./02-features.md) | Features detallados y componentes |
| [03-datos.md](./03-datos.md) | Modelo de datos y fuentes |

## Resumen Ejecutivo

**MetroStory** es una aplicación web que cuenta la historia del Metro de Santiago, estación por estación.

### Stack
- **Svelte 5** + SvelteKit 2
- **Mapbox GL** para mapas
- **TailwindCSS** para estilos
- **TypeScript** para tipado

### Features MVP
1. Mapa interactivo con todas las líneas
2. Panel de información por estación
3. Búsqueda de estaciones
4. Línea de tiempo histórica

### Próximos Pasos
1. Inicializar proyecto con Svelte 5
2. Configurar Mapbox
3. Crear datos de líneas y estaciones
4. Implementar mapa básico
5. Agregar panel de información

## Desarrollo

```bash
# Instalar dependencias
yarn install

# Desarrollo
yarn dev

# Build
yarn build
```
