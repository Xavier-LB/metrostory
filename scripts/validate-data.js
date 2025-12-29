#!/usr/bin/env node
/**
 * Script de validación de datos JSON contra schemas
 * Ejecutar con: yarn validate:data
 */

import Ajv from 'ajv';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Crear nueva instancia de AJV para cada validación (evita conflictos de schema IDs)
function createAjv() {
	return new Ajv({ allErrors: true, strict: false });
}

// Colores para la consola
const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m'
};

function log(color, message) {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

// Archivos a validar
const validations = [
	{
		name: 'Estaciones',
		dataFile: 'data/stations/stations.json',
		schemaFile: 'data/stations/stations.schema.json'
	},
	{
		name: 'Líneas',
		dataFile: 'data/lines/lines.json',
		schemaFile: 'data/lines/lines.schema.json'
	},
	{
		name: 'Líneas futuras',
		dataFile: 'data/lines/future-lines.json',
		schemaFile: 'data/lines/lines.schema.json'
	},
	{
		name: 'Fuentes',
		dataFile: 'data/sources/sources.json',
		schemaFile: 'data/sources/sources.schema.json'
	}
];

console.log('\n📋 Validando datos de MetroStory...\n');

let hasErrors = false;
let totalItems = 0;

for (const { name, dataFile, schemaFile } of validations) {
	const dataPath = join(rootDir, dataFile);
	const schemaPath = join(rootDir, schemaFile);

	// Verificar que los archivos existen
	if (!existsSync(dataPath)) {
		log('yellow', `⚠ ${name}: Archivo de datos no encontrado (${dataFile})`);
		continue;
	}

	if (!existsSync(schemaPath)) {
		log('yellow', `⚠ ${name}: Schema no encontrado (${schemaFile})`);
		continue;
	}

	try {
		const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
		const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

		const validate = createAjv().compile(schema);
		const valid = validate(data);

		if (valid) {
			const count = Array.isArray(data) ? data.length : 1;
			totalItems += count;
			log('green', `✓ ${name}: ${count} items válidos`);
		} else {
			hasErrors = true;
			log('red', `✗ ${name}: Errores de validación`);
			validate.errors.forEach((err) => {
				console.log(`   - ${err.instancePath || '/'}: ${err.message}`);
			});
		}
	} catch (err) {
		hasErrors = true;
		log('red', `✗ ${name}: Error al procesar - ${err.message}`);
	}
}

console.log('');

// Validaciones adicionales
console.log('🔗 Verificando referencias cruzadas...\n');

try {
	const stations = JSON.parse(
		readFileSync(join(rootDir, 'data/stations/stations.json'), 'utf-8')
	);
	const sources = JSON.parse(readFileSync(join(rootDir, 'data/sources/sources.json'), 'utf-8'));

	const sourceIds = new Set(sources.map((s) => s.id));
	let missingRefs = 0;

	for (const station of stations) {
		if (station.sources) {
			for (const sourceId of station.sources) {
				if (!sourceIds.has(sourceId)) {
					log('yellow', `⚠ Estación "${station.name}": fuente "${sourceId}" no existe`);
					missingRefs++;
				}
			}
		}
	}

	if (missingRefs === 0) {
		log('green', '✓ Todas las referencias de fuentes son válidas');
	} else {
		log('yellow', `⚠ ${missingRefs} referencias a fuentes no encontradas`);
	}
} catch (err) {
	log('red', `✗ Error verificando referencias: ${err.message}`);
}

console.log('');

if (hasErrors) {
	log('red', '❌ Validación fallida - corrige los errores antes de continuar\n');
	process.exit(1);
} else {
	log('green', `✅ Validación exitosa - ${totalItems} items procesados\n`);
	process.exit(0);
}
