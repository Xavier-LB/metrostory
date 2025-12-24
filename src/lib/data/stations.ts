import type { Station } from '$lib/types';

// Estaciones de ejemplo - Se completarán con datos de Wikipedia
export const stations: Station[] = [
	// Línea 1
	{
		id: 'san-pablo',
		name: 'San Pablo',
		coordinates: [-70.7247, -33.4252],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		history:
			'Nombrada por la calle San Pablo, una de las vías más antiguas de Santiago que conectaba el centro con Pudahuel.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true
	},
	{
		id: 'la-moneda',
		name: 'La Moneda',
		coordinates: [-70.6538, -33.4423],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		history:
			'Recibe su nombre del Palacio de La Moneda, sede del poder ejecutivo de Chile, ubicado sobre la estación.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 45000,
		isTransfer: false,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'universidad-de-chile',
		name: 'Universidad de Chile',
		coordinates: [-70.6494, -33.4418],
		lines: ['L1'],
		inauguratedAt: '1977-03-31',
		history:
			'Nombrada por la Casa Central de la Universidad de Chile, la universidad más antigua del país fundada en 1842.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 85000,
		isTransfer: false,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'baquedano',
		name: 'Baquedano',
		coordinates: [-70.6344, -33.4378],
		lines: ['L1', 'L5'],
		inauguratedAt: '1977-03-31',
		history:
			'Honra al general Manuel Baquedano, comandante en jefe del ejército chileno durante la Guerra del Pacífico. La estación se ubica bajo Plaza Italia.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 98000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'los-leones',
		name: 'Los Leones',
		coordinates: [-70.6112, -33.4262],
		lines: ['L1', 'L6'],
		inauguratedAt: '1980-08-15',
		history:
			'Nombrada por la calle homónima, que a su vez debe su nombre a dos estatuas de leones que existían en la zona.',
		dailyPassengers: 52000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'tobalaba',
		name: 'Tobalaba',
		coordinates: [-70.5939, -33.4206],
		lines: ['L1', 'L4'],
		inauguratedAt: '1980-08-15',
		history:
			'Nombre de origen mapuche que significa "lugar de tobalas" (un tipo de arbusto). Era el nombre de una antigua hacienda de la zona.',
		dailyPassengers: 75000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'los-dominicos',
		name: 'Los Dominicos',
		coordinates: [-70.5229, -33.4115],
		lines: ['L1'],
		inauguratedAt: '2010-02-26',
		history:
			'Nombrada por la Iglesia de Los Dominicos, convento y templo colonial fundado en 1747 por la orden de los Dominicos.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true
	},

	// Línea 2
	{
		id: 'vespucio-norte',
		name: 'Vespucio Norte',
		coordinates: [-70.6075, -33.3591],
		lines: ['L2'],
		inauguratedAt: '2004-12-13',
		history:
			'Nombrada por la Avenida Américo Vespucio, el anillo vial que circunda Santiago, en honor al navegante italiano.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true
	},
	{
		id: 'los-heroes',
		name: 'Los Héroes',
		coordinates: [-70.6575, -33.4468],
		lines: ['L1', 'L2'],
		inauguratedAt: '1978-03-31',
		history:
			'Rinde homenaje a los héroes de la Guerra del Pacífico. Sobre ella se encuentra el Paseo de los Héroes con estatuas de figuras militares.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 110000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'la-cisterna',
		name: 'La Cisterna',
		coordinates: [-70.6584, -33.5299],
		lines: ['L2', 'L4A'],
		inauguratedAt: '1978-03-31',
		history:
			'Nombrada por la comuna de La Cisterna, cuyo nombre proviene de una antigua cisterna de agua que existía en el sector.',
		dailyPassengers: 45000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},

	// Línea 3
	{
		id: 'plaza-de-armas',
		name: 'Plaza de Armas',
		coordinates: [-70.6517, -33.4378],
		lines: ['L3', 'L5'],
		inauguratedAt: '2019-01-22',
		history:
			'Nombrada por la Plaza de Armas de Santiago, fundada en 1541 por Pedro de Valdivia como el centro de la ciudad colonial.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'cal-y-canto',
		name: 'Cal y Canto',
		coordinates: [-70.6492, -33.4318],
		lines: ['L2', 'L3'],
		inauguratedAt: '2019-01-22',
		history:
			'Recuerda al antiguo Puente de Cal y Canto, construido sobre el río Mapocho en 1779 y demolido en 1888.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},

	// Línea 5
	{
		id: 'plaza-de-maipu',
		name: 'Plaza de Maipú',
		coordinates: [-70.7564, -33.5116],
		lines: ['L5'],
		inauguratedAt: '2011-02-03',
		history:
			'Ubicada junto a la Plaza de Armas de Maipú, en la comuna donde se libró la batalla que selló la independencia de Chile.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true
	},
	{
		id: 'santa-ana',
		name: 'Santa Ana',
		coordinates: [-70.6575, -33.4385],
		lines: ['L2', 'L5'],
		inauguratedAt: '1997-04-05',
		history:
			'Nombrada por la Iglesia de Santa Ana, templo colonial del siglo XVIII ubicado en las cercanías.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'vicente-valdes',
		name: 'Vicente Valdés',
		coordinates: [-70.5975, -33.4878],
		lines: ['L4', 'L4A', 'L5'],
		inauguratedAt: '2006-08-16',
		history:
			'Homenajea a Vicente Valdés Freire, empresario y político chileno, dueño de terrenos en el sector.',
		dailyPassengers: 65000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},

	// Línea 6
	{
		id: 'cerrillos',
		name: 'Cerrillos',
		coordinates: [-70.7144, -33.4925],
		lines: ['L6'],
		inauguratedAt: '2017-11-02',
		history:
			'Nombrada por la comuna de Cerrillos, cuyo nombre proviene de los pequeños cerros que existían en la zona.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true
	},
	{
		id: 'nunoa',
		name: 'Ñuñoa',
		coordinates: [-70.6044, -33.4535],
		lines: ['L3', 'L6'],
		inauguratedAt: '2017-11-02',
		history:
			'Nombrada por la comuna de Ñuñoa. El nombre es de origen quechua y significa "flor amarilla" o "lugar de ñuños".',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	},
	{
		id: 'irarrazaval',
		name: 'Irarrázaval',
		coordinates: [-70.6203, -33.4535],
		lines: ['L3', 'L5'],
		inauguratedAt: '2019-01-22',
		history:
			'Nombrada por la Avenida Irarrázaval, que honra al político y empresario Manuel José Irarrázaval Larraín.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true
	}
];

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
