/**
 * Script de conversión de datos TypeScript a JSON
 * Ejecutar con: npx tsx scripts/convert-to-json.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Importar datos desde los archivos TypeScript
import { stations as stationsData } from '../src/lib/data/stations.js';
import { lines, futureLines } from '../src/lib/data/lines.js';
import { sources } from '../src/lib/data/sources.js';
import { rollingStock } from '../src/lib/data/rollingStock.js';
import { metroArte, artworksByStation } from '../src/lib/data/metroarte.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Función para escribir JSON con formato legible
function writeJSON(path: string, data: unknown) {
	writeFileSync(path, JSON.stringify(data, null, '\t') + '\n');
	console.log(`✓ Escrito: ${path}`);
}

// Crear directorios si no existen
const dirs = [
	'data/stations',
	'data/lines',
	'data/sources',
	'data/rolling-stock',
	'data/metroarte'
];

dirs.forEach((dir) => {
	mkdirSync(join(rootDir, dir), { recursive: true });
});

console.log('\n📦 Convirtiendo datos TypeScript a JSON...\n');

// Exportar estaciones (sin la propiedad artworks que se calcula dinámicamente)
const stations = stationsData.map(({ artworks, ...station }) => station);
writeJSON(join(rootDir, 'data/stations/stations.json'), stations);

// Exportar líneas
writeJSON(join(rootDir, 'data/lines/lines.json'), lines);
writeJSON(join(rootDir, 'data/lines/future-lines.json'), futureLines);

// Exportar fuentes
writeJSON(join(rootDir, 'data/sources/sources.json'), sources);

// Exportar material rodante
writeJSON(join(rootDir, 'data/rolling-stock/rolling-stock.json'), rollingStock);

// Exportar MetroArte con mapeo de estaciones
const artworksWithStations = metroArte.map((artwork) => {
	// Encontrar en qué estación está esta obra
	const stationId = Object.entries(artworksByStation).find(([, artworks]) =>
		artworks.some((a) => a.id === artwork.id)
	)?.[0];

	return {
		...artwork,
		stationId
	};
});
writeJSON(join(rootDir, 'data/metroarte/artworks.json'), artworksWithStations);

console.log('\n✅ Conversión completada!\n');
console.log('Archivos generados:');
console.log('  - data/stations/stations.json');
console.log('  - data/lines/lines.json');
console.log('  - data/lines/future-lines.json');
console.log('  - data/sources/sources.json');
console.log('  - data/rolling-stock/rolling-stock.json');
console.log('  - data/metroarte/artworks.json');
