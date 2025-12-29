/**
 * Cargador centralizado de datos desde archivos JSON
 * Los datos se importan en tiempo de build (Vite los procesa)
 */

import type { Station, MetroLine, SourceReference, RollingStock, MetroArte } from '$lib/types';

// Importar datos JSON (Vite los incluye en el bundle)
import stationsData from '../../../data/stations/stations.json';
import linesData from '../../../data/lines/lines.json';
import futureLinesData from '../../../data/lines/future-lines.json';
import sourcesData from '../../../data/sources/sources.json';
import rollingStockData from '../../../data/rolling-stock/rolling-stock.json';
import artworksData from '../../../data/metroarte/artworks.json';

// Exportar datos tipados
export const stations: Station[] = stationsData as Station[];
export const lines: MetroLine[] = linesData as MetroLine[];
export const futureLines: MetroLine[] = futureLinesData as MetroLine[];
export const sources: SourceReference[] = sourcesData as SourceReference[];
export const rollingStock: RollingStock[] = rollingStockData as RollingStock[];
export const artworks: (MetroArte & { stationId?: string })[] = artworksData as (MetroArte & {
	stationId?: string;
})[];

// === Helpers de Estaciones ===

export const stationsById = Object.fromEntries(stations.map((s) => [s.id, s]));

export function getStation(id: string): Station | undefined {
	return stationsById[id];
}

export function getStationsByLine(lineId: string): Station[] {
	return stations.filter((s) => s.lines.includes(lineId));
}

export function getTransferStations(): Station[] {
	return stations.filter((s) => s.isTransfer);
}

export function getGhostStations(): Station[] {
	return stations.filter((s) => s.isGhost);
}

export function getStationsWithArt(): Station[] {
	const stationsWithArt = new Set(artworks.map((a) => a.stationId).filter(Boolean));
	return stations.filter((s) => stationsWithArt.has(s.id));
}

// Ghost stations separadas (para compatibilidad)
export const ghostStations = stations.filter((s) => s.isGhost);
export const allStations = stations;

// === Helpers de Líneas ===

export const linesById = Object.fromEntries(lines.map((l) => [l.id, l]));
export const allLinesById = Object.fromEntries([...lines, ...futureLines].map((l) => [l.id, l]));

export function getLineColor(lineId: string): string {
	return allLinesById[lineId]?.color ?? '#888888';
}

export function getOperationalLines(): MetroLine[] {
	return lines.filter((l) => l.status === 'operational');
}

export function getFutureLines(): MetroLine[] {
	return futureLines;
}

// === Helpers de Fuentes ===

export const sourcesById = Object.fromEntries(sources.map((s) => [s.id, s]));

export function getSourcesByIds(ids: string[]): SourceReference[] {
	return ids.map((id) => sourcesById[id]).filter(Boolean);
}

export const dataDisclaimer = {
	text: 'Información recopilada con asistencia de inteligencia artificial. Puede contener inexactitudes.',
	shortText: 'Datos recopilados con IA',
	sources: 'Ver fuentes en cada sección'
};

// === Helpers de Material Rodante ===

export const rollingStockById = Object.fromEntries(rollingStock.map((rs) => [rs.id, rs]));

export function getRollingStockByLine(lineId: string): RollingStock[] {
	return rollingStock.filter((rs) => rs.lines.includes(lineId));
}

export function getActiveRollingStock(): RollingStock[] {
	return rollingStock.filter((rs) => rs.status === 'active');
}

export function getRollingStockByRodadura(rodadura: 'neumatica' | 'ferrea'): RollingStock[] {
	return rollingStock.filter((rs) => rs.rodadura === rodadura);
}

// === Helpers de MetroArte ===

export function getArtworksByStation(stationId: string): MetroArte[] {
	return artworks.filter((a) => a.stationId === stationId);
}

export function getAllArtworks(): MetroArte[] {
	return artworks;
}
