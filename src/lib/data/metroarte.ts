import type { MetroArte } from '$lib/types';

// Programa MetroArte - Obras de arte en el Metro de Santiago
// Las estaciones con arte público registran tasas significativamente menores de vandalismo
export const metroArte: MetroArte[] = [
	{
		id: 'memoria-visual',
		title: 'Memoria Visual de una Nación',
		artist: 'Mario Toral',
		year: 1999,
		description:
			'Mural monumental de 1200 m² que narra la historia de Chile en dos partes: "Pasado" (mundo indígena, conquista, violencia) y "Presente/Futuro" (modernidad, poesía). Es considerada la obra cumbre del sistema Metro.',
		type: 'mural',
		size: '1200 m²',
		location: 'Zona de combinación L1-L3'
	},
	{
		id: 'verbo-america',
		title: 'Verbo América',
		artist: 'Roberto Matta',
		year: 2000,
		description:
			'Mural de cerámica policromada que trae el surrealismo cósmico de Matta al espacio público. Originalmente destinado a una exposición itinerante, encontró su hogar definitivo en la vasta nave de Quinta Normal.',
		type: 'ceramica',
		location: 'Estación Quinta Normal'
	},
	{
		id: 'rostros-bicentenario',
		title: 'Rostros del Bicentenario',
		artist: 'Guillermo Lorca',
		year: 2010,
		description:
			'Óleos gigantescos que retratan a chilenos anónimos y diversos, observando a los pasajeros desde las alturas, invirtiendo el rol de espectador.',
		type: 'mural',
		location: 'Estación Baquedano L5'
	},
	{
		id: 'via-suecia',
		title: 'Vía Suecia',
		artist: 'Luciano Escanilla',
		year: 2017,
		description:
			'Diseño lúdico en el túnel de combinación que homenajea la cultura sueca y la cooperación internacional, dado el nombre de la avenida en superficie.',
		type: 'instalacion',
		location: 'Túnel de combinación Los Leones L1-L6'
	}
];

// Mapeo de obras por estación
export const artworksByStation: Record<string, MetroArte[]> = {
	'universidad-de-chile': [metroArte.find((a) => a.id === 'memoria-visual')!],
	'quinta-normal': [metroArte.find((a) => a.id === 'verbo-america')!],
	baquedano: [metroArte.find((a) => a.id === 'rostros-bicentenario')!],
	'los-leones': [metroArte.find((a) => a.id === 'via-suecia')!]
};

export function getArtworksByStation(stationId: string): MetroArte[] {
	return artworksByStation[stationId] || [];
}

export function getAllArtworks(): MetroArte[] {
	return metroArte;
}
