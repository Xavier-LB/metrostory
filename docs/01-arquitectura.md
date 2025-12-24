# Arquitectura Técnica

## Stack Tecnológico

| Capa | Tecnología | Versión | Justificación |
|------|------------|---------|---------------|
| Framework | **SvelteKit** | 2.x | SSG/SSR, routing, DX excelente |
| UI | **Svelte 5** | 5.x | Runes, mejor reactividad, menos código |
| Estilos | **TailwindCSS** | 4.x | Utilidades CSS, tema oscuro fácil |
| Mapas | **Mapbox GL JS** | 3.x | Mapas vectoriales, buen free tier |
| Búsqueda | **Fuse.js** | 7.x | Búsqueda fuzzy client-side |
| Tipos | **TypeScript** | 5.x | Tipado estático, mejor DX |

## Estructura del Proyecto

```
metrostory/
├── docs/                    # Documentación del proyecto
│   ├── 00-vision.md
│   ├── 01-arquitectura.md
│   ├── 02-features.md
│   └── 03-datos.md
├── src/
│   ├── lib/
│   │   ├── components/      # Componentes reutilizables
│   │   │   ├── Map/         # Mapa interactivo
│   │   │   ├── Timeline/    # Línea de tiempo
│   │   │   ├── Search/      # Búsqueda de estaciones
│   │   │   ├── Station/     # Tarjetas de estación
│   │   │   └── UI/          # Componentes genéricos (Modal, Button, etc.)
│   │   ├── data/            # Datos estáticos
│   │   │   ├── stations.ts  # Todas las estaciones
│   │   │   ├── lines.ts     # Todas las líneas
│   │   │   └── events.ts    # Eventos históricos
│   │   ├── types/           # Definiciones TypeScript
│   │   │   └── index.ts
│   │   └── utils/           # Funciones utilitarias
│   │       ├── search.ts    # Lógica de búsqueda
│   │       └── geo.ts       # Utilidades geográficas
│   ├── routes/
│   │   ├── +layout.svelte   # Layout global
│   │   ├── +page.svelte     # Página principal (mapa)
│   │   ├── timeline/
│   │   │   └── +page.svelte # Vista de línea de tiempo
│   │   └── station/
│   │       └── [id]/
│   │           └── +page.svelte  # Detalle de estación
│   ├── app.css              # Estilos globales
│   ├── app.html             # HTML base
│   └── app.d.ts             # Tipos globales
├── static/
│   ├── images/              # Imágenes de estaciones
│   ├── lines.geojson        # GeoJSON de líneas
│   └── stops.geojson        # GeoJSON de estaciones
├── package.json
├── svelte.config.js
├── tailwind.config.js
└── vite.config.ts
```

## Patrones de Diseño

### Estado Global
- Usar **Svelte 5 runes** (`$state`, `$derived`) para estado local
- Estado compartido mínimo: solo `selectedStation` y `searchQuery`
- Sin stores complejos - la app es mayormente de lectura

### Componentes
- **Composición sobre herencia** - componentes pequeños y específicos
- **Props tipadas** - interfaces claras para cada componente
- **Eventos** - comunicación hijo → padre via eventos

### Datos
- **Estáticos en build time** - no necesitamos backend
- **TypeScript** - tipos generados desde los datos
- **GeoJSON** - formato estándar para datos geográficos

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│                    +page.svelte                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   Search    │  │   MetroMap  │  │  StationPanel   │ │
│  │  Component  │  │  Component  │  │    Component    │ │
│  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘ │
│         │                │                   │          │
│         ▼                ▼                   ▼          │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Estado Local ($state)                  ││
│  │  - selectedStationId: string | null                 ││
│  │  - searchQuery: string                              ││
│  │  - filteredStations: Station[]                      ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    lib/data/                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │ stations.ts │  │  lines.ts   │  │   events.ts     │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Despliegue

- **Vercel** - hosting gratuito, integración con GitHub
- **Static Site Generation** - pre-renderizado en build
- **CDN** - assets servidos desde edge locations
