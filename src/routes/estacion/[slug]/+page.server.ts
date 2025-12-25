import { stationsById, linesById, allLinesById } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const station = stationsById[params.slug];

	if (!station) {
		throw error(404, {
			message: `Estación "${params.slug}" no encontrada`
		});
	}

	// Get line information for the station
	const stationLines = station.lines.map((lineId) => allLinesById[lineId]).filter(Boolean);

	return {
		station,
		stationLines
	};
};
