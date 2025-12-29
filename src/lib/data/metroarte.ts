/**
 * Programa MetroArte - Obras de arte en el Metro de Santiago
 * Re-exportado desde el loader centralizado (JSON)
 *
 * Para contribuir datos, edita: data/metroarte/artworks.json
 * Ver: docs/data-guide.md
 */

export { artworks as metroArte, getArtworksByStation, getAllArtworks } from './loader';

// Compatibilidad: artworksByStation ahora se calcula desde el campo stationId en cada artwork
import { artworks } from './loader';
import type { MetroArte } from '$lib/types';

export const artworksByStation: Record<string, MetroArte[]> = artworks.reduce(
	(acc, artwork) => {
		if (artwork.stationId) {
			if (!acc[artwork.stationId]) {
				acc[artwork.stationId] = [];
			}
			acc[artwork.stationId].push(artwork);
		}
		return acc;
	},
	{} as Record<string, MetroArte[]>
);
