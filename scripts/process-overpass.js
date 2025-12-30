/**
 * Script para procesar datos de Overpass y generar GeoJSON para el mapa
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../data/251229-data-overpass.geojson');
const linesOutput = path.join(__dirname, '../static/lines.geojson');
const stopsOutput = path.join(__dirname, '../static/stops.geojson');

// Mapeo de refs de línea a nombres normalizados
const lineRefToName = {
	L1: 'LINEA 1',
	L2: 'LINEA 2',
	L3: 'LINEA 3',
	L4: 'LINEA 4',
	L4A: 'LINEA 4A',
	L5: 'LINEA 5',
	L6: 'LINEA 6'
};

// Colores oficiales de cada línea
const lineColors = {
	'LINEA 1': '#D60D27',
	'LINEA 2': '#FAB515',
	'LINEA 3': '#9A5B29',
	'LINEA 4': '#2D2B73',
	'LINEA 4A': '#0471B9',
	'LINEA 5': '#179859',
	'LINEA 6': '#9A3488'
};

// Estaciones de combinación (donde se cruzan múltiples líneas)
const combinaciones = new Set([
	'LOS HÉROES',
	'LOS HEROES',
	'BAQUEDANO',
	'SANTA ANA',
	'PUENTE CAL Y CANTO',
	'CAL Y CANTO',
	'UNIVERSIDAD DE CHILE',
	'PLAZA DE ARMAS',
	'TOBALABA',
	'VICENTE VALDÉS',
	'VICENTE VALDES',
	'LA CISTERNA',
	'VICUÑA MACKENNA',
	'VICUNA MACKENNA',
	'FRANKLIN',
	'ÑUBLE',
	'NUBLE',
	'LOS LEONES',
	'IRARRÁZAVAL',
	'IRARRAZAVAL',
	'ÑUÑOA',
	'NUNOA',
	'PLAZA EGAÑA',
	'PLAZA EGANA',
	'SAN PABLO'
]);

// Leer el archivo de entrada
console.log('Leyendo archivo de Overpass...');
const data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

// Arrays para almacenar las features procesadas
const lineFeatures = [];
const stationFeatures = [];

// Mapa para rastrear qué estaciones ya fueron procesadas (evitar duplicados)
const processedStations = new Map();

// Mapa para almacenar la mejor ruta por línea (evitar duplicados)
const linesByRef = new Map();

// Procesar cada feature
for (const feature of data.features) {
	const props = feature.properties;

	// Identificar rutas de metro (líneas)
	if (props.type === 'route' && props.route === 'subway') {
		const ref = props.ref;
		const lineName = lineRefToName[ref];

		if (lineName && feature.geometry.type === 'LineString') {
			// Solo guardar una ruta por línea (la más larga o la primera encontrada)
			// Evitar rutas "verde" y "roja" que son variantes
			const isVariant =
				props.name?.toLowerCase().includes('verde') || props.name?.toLowerCase().includes('roja');

			if (!isVariant) {
				const existingLine = linesByRef.get(lineName);
				const currentLength = feature.geometry.coordinates.length;

				// Guardar si no existe o si esta ruta tiene más puntos (más detallada)
				if (!existingLine || currentLength > existingLine.geometry.coordinates.length) {
					linesByRef.set(lineName, {
						type: 'Feature',
						properties: {
							linea: lineName,
							nombre: lineName,
							ref: ref,
							color: lineColors[lineName] || props.colour,
							from: props.from,
							to: props.to,
							start_date: props.start_date
						},
						geometry: feature.geometry
					});
					console.log(`Línea encontrada: ${lineName} (${feature.geometry.coordinates.length} puntos)`);
				}
			}
		}
	}

	// Identificar estaciones
	if (props.railway === 'station' && props.station === 'subway') {
		const name = props.name;
		const coords = feature.geometry.coordinates;
		const coordKey = `${coords[0].toFixed(4)},${coords[1].toFixed(4)}`;

		// Evitar duplicados basados en coordenadas similares
		if (!processedStations.has(coordKey)) {
			processedStations.set(coordKey, {
				name: name,
				coords: coords,
				props: props
			});
		}
	}
}

// Correcciones manuales para líneas con coordenadas imprecisas
const lineCorrections = {
	'LINEA 3': [
		// Plaza de Armas: mover punto cercano a la estación
		{ from: [-70.6526867, -33.4374529], to: [-70.6512777, -33.4374154] },
		// Universidad de Chile: mover puntos cercanos a la estación
		{ from: [-70.6521816, -33.4409522], to: [-70.6510, -33.4409522] },
		{ from: [-70.6517706, -33.4439597], to: [-70.6506654, -33.443867] },
		{ from: [-70.6517488, -33.4441232], to: [-70.6506, -33.4441232] }
	]
};

// Aplicar correcciones a las líneas
function applyLineCorrections(lineFeature) {
	const lineName = lineFeature.properties.linea;
	const corrections = lineCorrections[lineName];
	if (!corrections) return lineFeature;

	const newCoords = lineFeature.geometry.coordinates.map(coord => {
		for (const correction of corrections) {
			// Si el punto está muy cerca del punto a corregir, reemplazarlo
			const dx = Math.abs(coord[0] - correction.from[0]);
			const dy = Math.abs(coord[1] - correction.from[1]);
			if (dx < 0.0001 && dy < 0.0001) {
				console.log(`  Corrigiendo punto de ${lineName}: [${coord}] -> [${correction.to}]`);
				return correction.to;
			}
		}
		return coord;
	});

	return {
		...lineFeature,
		geometry: {
			...lineFeature.geometry,
			coordinates: newCoords
		}
	};
}

// Convertir el mapa de líneas a array y aplicar correcciones
for (const [lineName, lineFeature] of linesByRef) {
	const correctedFeature = applyLineCorrections(lineFeature);
	lineFeatures.push(correctedFeature);
}

// Para cada estación, encontrar la línea más cercana
function findNearestLine(stationCoords, lineFeatures) {
	let nearestLine = null;
	let minDistance = Infinity;

	for (const lineFeature of lineFeatures) {
		const lineCoords = lineFeature.geometry.coordinates;
		for (const coord of lineCoords) {
			const dx = coord[0] - stationCoords[0];
			const dy = coord[1] - stationCoords[1];
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < minDistance) {
				minDistance = distance;
				nearestLine = lineFeature.properties.linea;
			}
		}
	}

	return nearestLine;
}

// Crear features de estaciones con línea asignada
let stationId = 1;
for (const [coordKey, stationData] of processedStations) {
	const nearestLine = findNearestLine(stationData.coords, lineFeatures);
	const nombreUpper = stationData.name.toUpperCase();
	const esCombinacion = combinaciones.has(nombreUpper);

	stationFeatures.push({
		type: 'Feature',
		properties: {
			FID: stationId,
			nombre: nombreUpper,
			linea: nearestLine || 'LINEA 1',
			combinacion: esCombinacion,
			estacion: 'EXISTENTE',
			tipo: 'ESTACION METRO',
			start_date: stationData.props.start_date,
			wikidata: stationData.props.wikidata,
			wheelchair: stationData.props.wheelchair
		},
		geometry: {
			type: 'Point',
			coordinates: stationData.coords
		}
	});

	console.log(`Estación: ${stationData.name} -> ${nearestLine}${esCombinacion ? ' (combinación)' : ''}`);
	stationId++;
}

// Crear GeoJSON de líneas
const linesGeoJSON = {
	type: 'FeatureCollection',
	name: 'Lineas_de_metro_de_Santiago',
	crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
	features: lineFeatures
};

// Crear GeoJSON de estaciones
const stopsGeoJSON = {
	type: 'FeatureCollection',
	name: 'Estaciones_Metro_de_Santiago',
	crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
	features: stationFeatures
};

// Escribir archivos de salida
console.log('\nEscribiendo archivos de salida...');
fs.writeFileSync(linesOutput, JSON.stringify(linesGeoJSON, null, 2));
console.log(`Líneas guardadas en: ${linesOutput}`);
console.log(`  - ${lineFeatures.length} segmentos de línea`);

fs.writeFileSync(stopsOutput, JSON.stringify(stopsGeoJSON, null, 2));
console.log(`Estaciones guardadas en: ${stopsOutput}`);
console.log(`  - ${stationFeatures.length} estaciones`);

console.log('\n¡Procesamiento completado!');
