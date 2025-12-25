import { allLinesById, lines, futureLines } from '$lib/data/lines';
import { getStationsByLine } from '$lib/data/stations';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const lineId = params.id.toUpperCase();
	const line = allLinesById[lineId];

	if (!line) {
		throw error(404, {
			message: `Línea "${params.id}" no encontrada`
		});
	}

	// Get stations for this line
	const lineStations = getStationsByLine(lineId);

	return {
		line,
		lineStations
	};
};
