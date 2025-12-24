# Modelo de Datos

## Líneas del Metro

El Metro de Santiago tiene actualmente **7 líneas operativas**.

### Línea 1 (Roja)
- **Color**: `#D60D27`
- **Inauguración**: 15 septiembre 1975
- **Trayecto**: San Pablo ↔ Los Dominicos
- **Estaciones**: 27
- **Longitud**: 20.0 km

### Línea 2 (Amarilla)
- **Color**: `#FAB515`
- **Inauguración**: 31 marzo 1978
- **Trayecto**: Vespucio Norte ↔ La Cisterna
- **Estaciones**: 22
- **Longitud**: 20.5 km

### Línea 3 (Café)
- **Color**: `#9A5B29`
- **Inauguración**: 22 enero 2019
- **Trayecto**: Los Libertadores ↔ Fernando Castillo Velasco
- **Estaciones**: 22
- **Longitud**: 21.7 km

### Línea 4 (Azul)
- **Color**: `#2D2B73`
- **Inauguración**: 30 noviembre 2005
- **Trayecto**: Tobalaba ↔ Plaza de Puente Alto
- **Estaciones**: 22
- **Longitud**: 24.7 km

### Línea 4A (Celeste)
- **Color**: `#0471B9`
- **Inauguración**: 16 agosto 2006
- **Trayecto**: La Cisterna ↔ Vicuña Mackenna
- **Estaciones**: 6
- **Longitud**: 7.7 km

### Línea 5 (Verde)
- **Color**: `#179859`
- **Inauguración**: 5 abril 1997
- **Trayecto**: Plaza de Maipú ↔ Vicente Valdés
- **Estaciones**: 30
- **Longitud**: 30.0 km

### Línea 6 (Morada)
- **Color**: `#9A3488`
- **Inauguración**: 2 noviembre 2017
- **Trayecto**: Cerrillos ↔ Los Leones
- **Estaciones**: 10
- **Longitud**: 15.3 km

---

## Interfaces TypeScript

```typescript
// types/index.ts

export interface MetroLine {
  id: string;              // "L1", "L2", etc.
  name: string;            // "Línea 1"
  color: string;           // "#D60D27"
  textColor: string;       // Color de texto sobre el fondo
  inauguratedAt: string;   // ISO date "1975-09-15"
  terminals: [string, string];  // IDs de estaciones terminales
  length: number;          // km
  stationCount: number;
}

export interface Station {
  id: string;              // "baquedano", "tobalaba"
  name: string;            // "Baquedano"
  coordinates: [number, number];  // [lng, lat]
  lines: string[];         // ["L1", "L5"]
  inauguratedAt: string;   // ISO date
  history: string;         // Origen del nombre
  architect?: string;
  dailyPassengers?: number;
  isTransfer: boolean;     // Es estación de combinación
  isTerminal: boolean;     // Es terminal de línea
  isAccessible: boolean;   // Accesibilidad universal
  images?: StationImage[];
}

export interface StationImage {
  url: string;
  caption: string;
  year?: number;
  source?: string;         // Fuente/crédito
}

export interface HistoricalEvent {
  id: string;
  date: string;            // ISO date
  type: 'inauguration' | 'extension' | 'incident' | 'milestone';
  title: string;
  description: string;
  lineId?: string;
  stationIds?: string[];
  images?: string[];
}

export interface MapConfig {
  accessToken: string;
  style: string;
  center: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
  bounds?: [[number, number], [number, number]];
}
```

---

## Estaciones de Combinación

| Estación | Líneas | Notas |
|----------|--------|-------|
| Los Héroes | L1, L2 | |
| Baquedano | L1, L5 | Plaza Italia |
| Tobalaba | L1, L4 | |
| Santa Ana | L2, L5 | |
| Vicente Valdés | L4, L4A, L5 | Triple combinación |
| La Cisterna | L2, L4A | Terminal L4A |
| Plaza de Armas | L3, L5 | |
| Cal y Canto | L2, L3 | |
| Irarrázaval | L3, L5 | |
| Ñuñoa | L3, L6 | |
| Los Leones | L1, L6 | |

---

## Fuentes de Datos

### Información oficial
- [Metro de Santiago](https://www.metro.cl/) - Datos oficiales
- [Memoria Metro](https://www.metro.cl/corporativo/memoria) - Historia oficial

### Wikipedia
- [Metro de Santiago](https://es.wikipedia.org/wiki/Metro_de_Santiago)
- [Anexo:Estaciones del Metro](https://es.wikipedia.org/wiki/Anexo:Estaciones_del_Metro_de_Santiago)

### Datos geográficos
- OpenStreetMap - Trazados de líneas
- Datos propios en `/static/*.geojson`

---

## Estructura de Archivos de Datos

```typescript
// lib/data/lines.ts
export const lines: MetroLine[] = [
  {
    id: 'L1',
    name: 'Línea 1',
    color: '#D60D27',
    textColor: '#FFFFFF',
    inauguratedAt: '1975-09-15',
    terminals: ['san-pablo', 'los-dominicos'],
    length: 20.0,
    stationCount: 27
  },
  // ... resto de líneas
];

// lib/data/stations.ts
export const stations: Station[] = [
  {
    id: 'baquedano',
    name: 'Baquedano',
    coordinates: [-70.6344, -33.4378],
    lines: ['L1', 'L5'],
    inauguratedAt: '1977-03-31',
    history: 'Debe su nombre al general Manuel Baquedano, héroe de la Guerra del Pacífico...',
    architect: 'Juan Parrochia Beguin',
    dailyPassengers: 98000,
    isTransfer: true,
    isTerminal: false,
    isAccessible: true
  },
  // ... resto de estaciones
];

// lib/data/events.ts
export const events: HistoricalEvent[] = [
  {
    id: 'l1-inauguration',
    date: '1975-09-15',
    type: 'inauguration',
    title: 'Inauguración Línea 1',
    description: 'El presidente Augusto Pinochet inaugura el primer tramo...',
    lineId: 'L1',
    stationIds: ['san-pablo', 'la-moneda']
  },
  // ... resto de eventos
];
```

---

## Datos Pendientes por Recopilar

- [ ] Coordenadas exactas de todas las estaciones
- [ ] Historia de cada estación (136 estaciones totales)
- [ ] Fechas de inauguración de cada estación
- [ ] Arquitectos de estaciones principales
- [ ] Datos de pasajeros actualizados
- [ ] Fotos históricas (dominio público o con licencia)
- [ ] Eventos históricos relevantes
