# MetroStory

[Español](#español) | [English](#english)

---

## Español

MetroStory es una aplicación web interactiva que cuenta la historia del Metro de Santiago de Chile, estación por estación. Los usuarios pueden explorar un mapa interactivo del metro para descubrir el origen de los nombres de las estaciones, información histórica, datos técnicos y curiosidades.

### Características

- Mapa interactivo con todas las líneas del Metro
- Historia y origen del nombre de cada estación
- Datos técnicos y curiosidades
- Línea de tiempo histórica
- Visor de datos completo en `/datos`

### Stack Tecnológico

- **Frontend:** Svelte 5 + SvelteKit 2
- **Estilos:** TailwindCSS 4
- **Mapas:** Mapbox GL JS 3
- **Lenguaje:** TypeScript 5
- **Búsqueda:** Fuse.js 7
- **Geoespacial:** Turf.js

### Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/YOUR_USERNAME/metrostory.git
cd metrostory

# Instalar dependencias
yarn install

# Copiar variables de entorno
cp .env.example .env
# Editar .env con tu token de Mapbox

# Iniciar servidor de desarrollo
yarn dev
```

Para obtener un token de Mapbox, regístrate en [Mapbox](https://www.mapbox.com/).

### Estructura del Proyecto

```
metrostory/
├── data/                    # Datos en formato JSON
│   ├── stations/            # Información de estaciones
│   ├── lines/               # Información de líneas
│   └── sources/             # Referencias bibliográficas
├── src/
│   ├── lib/
│   │   ├── components/      # Componentes Svelte
│   │   ├── data/            # Loaders de datos
│   │   └── types/           # Tipos TypeScript
│   └── routes/              # Páginas (SvelteKit)
└── docs/                    # Documentación adicional
```

### Datos

Los datos del proyecto están en formato JSON en la carpeta `/data/`:

- `data/stations/stations.json` - Información de estaciones
- `data/lines/lines.json` - Información de líneas
- `data/sources/sources.json` - Referencias bibliográficas

Todos los datos deben incluir fuentes verificables. Ver la [Guía de Datos](./docs/data-guide.md).

### Contribuir

¡Las contribuciones son bienvenidas! Puedes ayudar de varias formas:

- **Datos:** Mejorar información histórica, agregar curiosidades, corregir errores
- **Código:** Nuevas funcionalidades, mejoras de UX, corrección de bugs
- **Documentación:** Mejorar guías, traducir contenido

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

### Comunidad

- [Discord](https://discord.gg/YOUR_INVITE) - Discusión y propuestas

### Licencia

MIT - Ver [LICENSE](./LICENSE)

### Inspiración

Este proyecto está inspirado en [The Weekendest](https://github.com/blahblahblah-/theweekendest), una aplicación que muestra en tiempo real el servicio del metro de Nueva York.

---

## English

MetroStory is an interactive web application that tells the history of Santiago de Chile's Metro, station by station. Users can explore an interactive metro map to discover station name origins, historical information, technical data, and fun facts.

### Features

- Interactive map with all Metro lines
- History and origin of each station name
- Technical data and curiosities
- Historical timeline
- Complete data viewer at `/datos`

### Tech Stack

- **Frontend:** Svelte 5 + SvelteKit 2
- **Styling:** TailwindCSS 4
- **Maps:** Mapbox GL JS 3
- **Language:** TypeScript 5
- **Search:** Fuse.js 7
- **Geospatial:** Turf.js

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/metrostory.git
cd metrostory

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env
# Edit .env with your Mapbox token

# Start development server
yarn dev
```

To get a Mapbox token, sign up at [Mapbox](https://www.mapbox.com/).

### Project Structure

```
metrostory/
├── data/                    # JSON data files
│   ├── stations/            # Station information
│   ├── lines/               # Line information
│   └── sources/             # Bibliographic references
├── src/
│   ├── lib/
│   │   ├── components/      # Svelte components
│   │   ├── data/            # Data loaders
│   │   └── types/           # TypeScript types
│   └── routes/              # Pages (SvelteKit)
└── docs/                    # Additional documentation
```

### Data

Project data is stored as JSON in the `/data/` folder:

- `data/stations/stations.json` - Station information
- `data/lines/lines.json` - Line information
- `data/sources/sources.json` - Bibliographic references

All data must include verifiable sources. See the [Data Guide](./docs/data-guide.md).

### Contributing

Contributions are welcome! You can help in several ways:

- **Data:** Improve historical information, add fun facts, fix errors
- **Code:** New features, UX improvements, bug fixes
- **Documentation:** Improve guides, translate content

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Community

- [Discord](https://discord.gg/YOUR_INVITE) - Discussion and proposals

### License

MIT - See [LICENSE](./LICENSE)

### Inspiration

This project is inspired by [The Weekendest](https://github.com/blahblahblah-/theweekendest), an app that shows real-time New York subway service.
