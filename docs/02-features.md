# Features y Componentes

## Feature 1: Mapa Interactivo

### Descripción
Mapa de Santiago centrado en la red de metro, mostrando todas las líneas y estaciones con sus colores oficiales.

### Componentes
- `MapboxMap.svelte` - Wrapper de Mapbox GL
- `MetroMap.svelte` - Lógica específica del metro (capas, estilos)

### Interacciones
- **Click en estación** → Abre panel lateral con información
- **Hover en estación** → Muestra tooltip con nombre
- **Zoom** → Muestra/oculta etiquetas según nivel
- **Click en línea** → Resalta la línea completa

### Datos requeridos
- `lines.geojson` - Trazado de cada línea
- `stops.geojson` - Ubicación de cada estación

---

## Feature 2: Panel de Información de Estación

### Descripción
Panel lateral que muestra información detallada de la estación seleccionada.

### Componentes
- `StationPanel.svelte` - Container del panel
- `StationHeader.svelte` - Nombre y líneas
- `StationHistory.svelte` - Historia del nombre
- `StationStats.svelte` - Fecha, arquitecto, pasajeros

### Información mostrada
```
┌────────────────────────────────┐
│ ● ● Baquedano                  │  ← Nombre + indicadores de línea
│ Línea 1 · Línea 5              │
├────────────────────────────────┤
│ 📅 Inauguración: 31 Mar 1977   │
│ 👷 Arquitecto: Juan Parrochia  │
│ 👥 98,000 pasajeros/día        │
├────────────────────────────────┤
│ Historia del nombre            │
│                                │
│ Honra al general Manuel        │
│ Baquedano, héroe de la Guerra  │
│ del Pacífico. La estación se   │
│ ubica bajo la Plaza Italia...  │
├────────────────────────────────┤
│ [Ver fotos] [Ver en timeline]  │
└────────────────────────────────┘
```

---

## Feature 3: Búsqueda de Estaciones

### Descripción
Campo de búsqueda que filtra estaciones por nombre, línea, o características.

### Componentes
- `SearchInput.svelte` - Campo de entrada
- `SearchResults.svelte` - Lista de resultados
- `SearchResultItem.svelte` - Item individual

### Funcionalidad
- Búsqueda fuzzy (tolera errores de tipeo)
- Búsqueda por nombre: "baquedano", "plaza de armas"
- Búsqueda por línea: "línea 1", "L1"
- Búsqueda por característica: "combinación", "terminal"

### Implementación
```typescript
// Usar Fuse.js para búsqueda fuzzy
const fuse = new Fuse(stations, {
  keys: ['name', 'lines', 'history'],
  threshold: 0.3
});

const results = fuse.search(query);
```

---

## Feature 4: Línea de Tiempo

### Descripción
Visualización cronológica de la expansión del Metro de Santiago desde 1969 hasta hoy.

### Componentes
- `Timeline.svelte` - Container principal
- `TimelineEvent.svelte` - Evento individual
- `TimelineYear.svelte` - Marcador de año

### Eventos a mostrar
- Inauguración de líneas
- Extensiones de líneas
- Eventos históricos (terremoto 2010, estallido 2019)
- Hitos (pasajero 1 billón, etc.)

### Diseño
```
1969 ─────────────────────────────────────────────
      │
      ├── 🚧 Inicio construcción Línea 1
      │
1975 ─────────────────────────────────────────────
      │
      ├── 🚇 Inauguración L1: San Pablo - La Moneda
      │
1977 ─────────────────────────────────────────────
      │
      ├── 🚇 Extensión L1: La Moneda - Salvador
      │
...
2019 ─────────────────────────────────────────────
      │
      ├── 🚇 Inauguración Línea 3
      ├── ⚠️ Estallido social - daños a estaciones
      │
2024 ─────────────────────────────────────────────
```

---

## Feature 5: Página de Detalle de Estación

### Descripción
Página dedicada a cada estación con información completa y galería de fotos.

### Ruta
`/station/[id]` - ej: `/station/baquedano`

### Componentes
- Reutiliza componentes del panel
- `StationGallery.svelte` - Galería de fotos
- `StationMap.svelte` - Mapa centrado en la estación

### SEO
- Meta tags dinámicos por estación
- Open Graph para compartir en redes

---

## Componentes UI Genéricos

### Modal.svelte
Modal reutilizable con cierre por Escape y click fuera.

### Button.svelte
Botón con variantes: primary, secondary, ghost.

### Badge.svelte
Badge para mostrar líneas con su color oficial.

### Tooltip.svelte
Tooltip para información adicional en hover.

---

## Prioridad de Implementación

| Prioridad | Feature | Complejidad | Dependencias |
|-----------|---------|-------------|--------------|
| 1 | Mapa interactivo | Media | Mapbox, datos GeoJSON |
| 2 | Panel de estación | Baja | Datos de estaciones |
| 3 | Búsqueda | Baja | Fuse.js, datos |
| 4 | Línea de tiempo | Media | Datos de eventos |
| 5 | Página de detalle | Baja | Rutas, datos |
| 6 | Galería de fotos | Alta | Imágenes, hosting |
