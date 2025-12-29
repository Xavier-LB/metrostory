# Contributing to MetroStory / Contribuir a MetroStory

[Español](#español) | [English](#english)

---

## Español

¡Gracias por tu interés en contribuir a MetroStory!

### Tipos de Contribuciones

#### 1. Datos de Estaciones (La forma más fácil)

La forma más accesible de contribuir es mejorando los datos de las estaciones:

1. Navega a `data/stations/stations.json`
2. Encuentra la estación que quieres mejorar
3. Agrega o corrige información
4. **Importante:** Agrega tus fuentes a `data/sources/sources.json`
5. Crea un Pull Request

**Campos que necesitan contribuciones:**

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `nameOrigin` | Origen del nombre de la estación | "Por el río Mapocho que cruza Santiago" |
| `history` | Historia de la estación | "Inaugurada como parte del tramo inicial..." |
| `curiosity` | Datos curiosos | "Fue la primera estación subterránea..." |
| `architect` | Arquitecto (si se conoce) | "Borja Huidobro" |
| `dailyPassengers` | Pasajeros diarios (con fuente) | 45000 |

**Ejemplo de contribución:**

```json
{
  "id": "baquedano",
  "nameOrigin": "En honor al General Manuel Baquedano, héroe de la Guerra del Pacífico",
  "sources": ["wikipedia-baquedano", "mi-nueva-fuente"]
}
```

#### 2. Agregar Fuentes

Toda información debe estar respaldada por fuentes verificables:

1. Abre `data/sources/sources.json`
2. Agrega tu fuente con un ID único:

```json
{
  "id": "mi-fuente-2024",
  "title": "Título del Artículo o Libro",
  "url": "https://ejemplo.com/articulo",
  "consultedAt": "2024-12"
}
```

3. Usa el ID en la estación correspondiente

#### 3. Código

Para contribuciones de código:

1. **Abre un Issue primero** describiendo el cambio propuesto
2. Fork el repositorio
3. Crea una rama: `git checkout -b feature/mi-feature`
4. Haz tus cambios
5. Ejecuta los checks:
   ```bash
   yarn lint
   yarn check
   yarn validate:data
   ```
6. Crea un Pull Request

### Validación de Datos

Antes de enviar un PR, valida tus cambios:

```bash
yarn validate:data
```

Este comando verificará que:
- Los JSON tienen formato válido
- Los campos requeridos están presentes
- Los IDs de fuentes existen
- Las coordenadas son válidas

### Estilo de Código

- Usamos Prettier para formateo
- ESLint para linting
- TypeScript strict mode

Ejecuta `yarn format` antes de hacer commit.

### Proceso de Pull Request

1. Asegúrate de que tu PR tiene una descripción clara
2. Incluye las fuentes de cualquier dato nuevo
3. Un maintainer revisará tu PR
4. Puede que te pidamos cambios o aclaraciones
5. Una vez aprobado, se hará merge

### Código de Conducta

Seguimos el [Contributor Covenant](./CODE_OF_CONDUCT.md). Por favor léelo antes de participar.

---

## English

Thank you for your interest in contributing to MetroStory!

### Types of Contributions

#### 1. Station Data (The easiest way)

The most accessible way to contribute is by improving station data:

1. Navigate to `data/stations/stations.json`
2. Find the station you want to improve
3. Add or correct information
4. **Important:** Add your sources to `data/sources/sources.json`
5. Create a Pull Request

**Fields that need contributions:**

| Field | Description | Example |
|-------|-------------|---------|
| `nameOrigin` | Origin of the station name | "Named after the Mapocho river" |
| `history` | Station history | "Opened as part of the initial stretch..." |
| `curiosity` | Fun facts | "It was the first underground station..." |
| `architect` | Architect (if known) | "Borja Huidobro" |
| `dailyPassengers` | Daily passengers (with source) | 45000 |

**Contribution example:**

```json
{
  "id": "baquedano",
  "nameOrigin": "Named after General Manuel Baquedano, hero of the War of the Pacific",
  "sources": ["wikipedia-baquedano", "my-new-source"]
}
```

#### 2. Adding Sources

All information must be backed by verifiable sources:

1. Open `data/sources/sources.json`
2. Add your source with a unique ID:

```json
{
  "id": "my-source-2024",
  "title": "Article or Book Title",
  "url": "https://example.com/article",
  "consultedAt": "2024-12"
}
```

3. Use the ID in the corresponding station

#### 3. Code

For code contributions:

1. **Open an Issue first** describing the proposed change
2. Fork the repository
3. Create a branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Run the checks:
   ```bash
   yarn lint
   yarn check
   yarn validate:data
   ```
6. Create a Pull Request

### Data Validation

Before submitting a PR, validate your changes:

```bash
yarn validate:data
```

This command will verify that:
- JSONs have valid format
- Required fields are present
- Source IDs exist
- Coordinates are valid

### Code Style

- We use Prettier for formatting
- ESLint for linting
- TypeScript strict mode

Run `yarn format` before committing.

### Pull Request Process

1. Make sure your PR has a clear description
2. Include sources for any new data
3. A maintainer will review your PR
4. We may ask for changes or clarifications
5. Once approved, it will be merged

### Code of Conduct

We follow the [Contributor Covenant](./CODE_OF_CONDUCT.md). Please read it before participating.
