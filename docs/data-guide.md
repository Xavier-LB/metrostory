# Guía de Datos / Data Guide

[Español](#español) | [English](#english)

---

## Español

Esta guía explica cómo están estructurados los datos de MetroStory y cómo puedes contribuir.

### Estructura de Datos

Los datos están en formato JSON en la carpeta `/data/`:

```
data/
├── stations/
│   ├── stations.json         # Todas las estaciones
│   └── stations.schema.json  # Schema de validación
├── lines/
│   ├── lines.json            # Líneas operativas
│   ├── future-lines.json     # Líneas en construcción/planificadas
│   └── lines.schema.json     # Schema de validación
├── sources/
│   ├── sources.json          # Fuentes bibliográficas
│   └── sources.schema.json   # Schema de validación
├── rolling-stock/
│   └── rolling-stock.json    # Material rodante (trenes)
└── metroarte/
    └── artworks.json         # Obras de arte
```

### Estructura de una Estación

Cada estación tiene la siguiente estructura:

```json
{
  "id": "baquedano",
  "name": "Baquedano",
  "coordinates": [-70.6394, -33.4372],
  "lines": ["L1", "L5"],
  "inauguratedAt": "1975-09-15",
  "commune": "Providencia",
  "history": "Historia de la estación...",
  "nameOrigin": "Origen del nombre...",
  "curiosity": "Dato curioso...",
  "isTransfer": true,
  "isTerminal": false,
  "isAccessible": true,
  "sources": ["wikipedia-baquedano", "metro-oficial"]
}
```

#### Campos requeridos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único (slug) |
| `name` | string | Nombre de la estación |
| `coordinates` | [number, number] | [longitud, latitud] |
| `lines` | string[] | IDs de líneas (L1, L2, etc.) |
| `inauguratedAt` | string | Fecha de inauguración (YYYY-MM-DD) |
| `history` | string | Historia de la estación |
| `isTransfer` | boolean | Es combinación |
| `isTerminal` | boolean | Es terminal |
| `isAccessible` | boolean | Tiene acceso universal |

#### Campos opcionales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `commune` | string | Comuna donde se ubica |
| `nameOrigin` | string | Origen del nombre |
| `curiosity` | string | Dato curioso |
| `formerName` | string | Nombre anterior |
| `architect` | string | Arquitecto |
| `dailyPassengers` | number | Pasajeros diarios |
| `pictogram` | string | Descripción del pictograma (L3/L6) |
| `sources` | string[] | IDs de fuentes |

### Cómo Agregar una Fuente

**Paso 1:** Abre `data/sources/sources.json`

**Paso 2:** Agrega tu fuente con un ID único:

```json
{
  "id": "mi-fuente-2024",
  "title": "Título del Artículo o Libro",
  "url": "https://ejemplo.com/articulo",
  "consultedAt": "2024-12"
}
```

**Paso 3:** Usa el ID en la estación correspondiente:

```json
{
  "id": "baquedano",
  "sources": ["wikipedia-baquedano", "mi-fuente-2024"]
}
```

### Convenciones para IDs de Fuentes

- Usa minúsculas y guiones: `wikipedia-l1`, `metro-oficial`
- Incluye el nombre de la fuente: `emol-articulo-2024`
- Para Wikipedia: `wikipedia-[tema]`
- Para medios: `[medio]-[tema]-[año]`

### Validación de Datos

Antes de enviar un PR, valida tus cambios:

```bash
yarn validate:data
```

Este comando verificará:
- Formato JSON válido
- Campos requeridos presentes
- Referencias a fuentes existentes
- Coordenadas válidas

### Tipos de Contribuciones de Datos

1. **Correcciones:** Arreglar errores en datos existentes
2. **Completar campos:** Agregar `nameOrigin`, `curiosity`, etc.
3. **Agregar fuentes:** Respaldar información existente
4. **Nuevas estaciones:** Para extensiones futuras

---

## English

This guide explains how MetroStory data is structured and how you can contribute.

### Data Structure

Data is stored as JSON in the `/data/` folder:

```
data/
├── stations/
│   ├── stations.json         # All stations
│   └── stations.schema.json  # Validation schema
├── lines/
│   ├── lines.json            # Operational lines
│   ├── future-lines.json     # Lines under construction/planned
│   └── lines.schema.json     # Validation schema
├── sources/
│   ├── sources.json          # Bibliographic sources
│   └── sources.schema.json   # Validation schema
├── rolling-stock/
│   └── rolling-stock.json    # Rolling stock (trains)
└── metroarte/
    └── artworks.json         # Art installations
```

### Station Structure

Each station has the following structure:

```json
{
  "id": "baquedano",
  "name": "Baquedano",
  "coordinates": [-70.6394, -33.4372],
  "lines": ["L1", "L5"],
  "inauguratedAt": "1975-09-15",
  "commune": "Providencia",
  "history": "Station history...",
  "nameOrigin": "Name origin...",
  "curiosity": "Fun fact...",
  "isTransfer": true,
  "isTerminal": false,
  "isAccessible": true,
  "sources": ["wikipedia-baquedano", "metro-oficial"]
}
```

#### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (slug) |
| `name` | string | Station name |
| `coordinates` | [number, number] | [longitude, latitude] |
| `lines` | string[] | Line IDs (L1, L2, etc.) |
| `inauguratedAt` | string | Inauguration date (YYYY-MM-DD) |
| `history` | string | Station history |
| `isTransfer` | boolean | Is transfer station |
| `isTerminal` | boolean | Is terminal station |
| `isAccessible` | boolean | Has universal access |

#### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `commune` | string | Municipality |
| `nameOrigin` | string | Name origin |
| `curiosity` | string | Fun fact |
| `formerName` | string | Previous name |
| `architect` | string | Architect |
| `dailyPassengers` | number | Daily passengers |
| `pictogram` | string | Pictogram description (L3/L6) |
| `sources` | string[] | Source IDs |

### How to Add a Source

**Step 1:** Open `data/sources/sources.json`

**Step 2:** Add your source with a unique ID:

```json
{
  "id": "my-source-2024",
  "title": "Article or Book Title",
  "url": "https://example.com/article",
  "consultedAt": "2024-12"
}
```

**Step 3:** Use the ID in the corresponding station:

```json
{
  "id": "baquedano",
  "sources": ["wikipedia-baquedano", "my-source-2024"]
}
```

### Source ID Conventions

- Use lowercase and hyphens: `wikipedia-l1`, `metro-oficial`
- Include source name: `emol-article-2024`
- For Wikipedia: `wikipedia-[topic]`
- For media outlets: `[outlet]-[topic]-[year]`

### Data Validation

Before submitting a PR, validate your changes:

```bash
yarn validate:data
```

This command will verify:
- Valid JSON format
- Required fields present
- References to existing sources
- Valid coordinates

### Types of Data Contributions

1. **Corrections:** Fix errors in existing data
2. **Complete fields:** Add `nameOrigin`, `curiosity`, etc.
3. **Add sources:** Back up existing information
4. **New stations:** For future extensions
