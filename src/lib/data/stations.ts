/**
 * Datos de estaciones del Metro de Santiago
 * Re-exportado desde el loader centralizado (JSON)
 *
 * Para contribuir datos, edita: data/stations/stations.json
 * Ver: docs/data-guide.md
 */

export {
	stations,
	stationsById,
	getStation,
	getStationsByLine,
	getTransferStations,
	getGhostStations,
	getStationsWithArt,
	ghostStations,
	allStations
} from './loader';

// Re-exportar para acceso directo (compatibilidad)
import { getArtworksByStation } from './loader';
export { getArtworksByStation };
