import { stations } from '$lib/data/stations';
import { lines, futureLines } from '$lib/data/lines';
import { sources } from '$lib/data/sources';
import { artworks, rollingStock } from '$lib/data/loader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		stations,
		lines,
		futureLines,
		sources,
		artworks,
		rollingStock,
		stats: {
			stationCount: stations.length,
			lineCount: lines.length,
			futureLineCount: futureLines.length,
			sourceCount: sources.length,
			artworkCount: artworks.length,
			rollingStockCount: rollingStock.length,
			transferCount: stations.filter((s) => s.isTransfer).length,
			ghostCount: stations.filter((s) => s.isGhost).length
		}
	};
};
