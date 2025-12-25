import type { RollingStock } from '$lib/types';

// Material rodante del Metro de Santiago
// Datos basados en investigación histórica y técnica
export const rollingStock: RollingStock[] = [
	{
		id: 'ns-74',
		model: 'NS-74',
		manufacturer: 'Alsthom',
		country: 'Francia',
		yearIntroduced: 1975,
		rodadura: 'neumatica',
		lines: ['L2', 'L5'],
		characteristics: [
			'Los pioneros del Metro de Santiago',
			'Sin aire acondicionado original (algunos reacondicionados)',
			'Icónicos por su sonido característico y durabilidad',
			'En proceso de retiro gradual o overhaul profundo'
		],
		hasAirConditioning: false,
		isAutomatic: false,
		status: 'retiring'
	},
	{
		id: 'ns-88',
		model: 'NS-88',
		manufacturer: 'Concarril',
		country: 'México',
		yearIntroduced: 1988,
		rodadura: 'neumatica',
		lines: ['L2'],
		characteristics: [
			'Modelo "unicornio" - solo existe un tren',
			'Comprado para reemplazar un NS-74 destruido en un atentado',
			'Pieza única del sistema'
		],
		hasAirConditioning: false,
		isAutomatic: false,
		status: 'active'
	},
	{
		id: 'ns-93',
		model: 'NS-93',
		manufacturer: 'GEC Alsthom',
		country: 'Francia',
		yearIntroduced: 1996,
		rodadura: 'neumatica',
		lines: ['L1', 'L5'],
		characteristics: [
			'Introducidos con la Línea 5',
			'Más anchos y luminosos que los NS-74',
			'Pasillos de interconexión parciales entre coches'
		],
		hasAirConditioning: false,
		isAutomatic: false,
		status: 'active'
	},
	{
		id: 'as-2002',
		model: 'AS-2002',
		manufacturer: 'Alstom',
		country: 'Brasil',
		yearIntroduced: 2004,
		rodadura: 'ferrea',
		lines: ['L4', 'L4A'],
		characteristics: [
			'Primeros trenes con ruedas de acero',
			'Configuración modular',
			'Diseñados para tramos largos y rápidos',
			'Mayor velocidad que los neumáticos'
		],
		hasAirConditioning: false,
		isAutomatic: false,
		status: 'active'
	},
	{
		id: 'ns-2004',
		model: 'NS-2004',
		manufacturer: 'Alstom',
		country: 'Francia',
		yearIntroduced: 2007,
		rodadura: 'neumatica',
		lines: ['L2'],
		characteristics: [
			'Evolución del modelo NS-93',
			'Destinados a reforzar la Línea 2',
			'Mejoras en sistemas de tracción'
		],
		hasAirConditioning: false,
		isAutomatic: false,
		status: 'active'
	},
	{
		id: 'ns-2007',
		model: 'NS-2007',
		manufacturer: 'CAF',
		country: 'España',
		yearIntroduced: 2009,
		rodadura: 'neumatica',
		lines: ['L1'],
		characteristics: [
			'Modernización de la Línea 1',
			'Primeros con mejoras significativas en ventilación forzada',
			'Pre-aire acondicionado masivo'
		],
		hasAirConditioning: false,
		isAutomatic: false,
		status: 'active'
	},
	{
		id: 'ns-2012',
		model: 'NS-2012',
		manufacturer: 'CAF',
		country: 'España',
		yearIntroduced: 2012,
		rodadura: 'neumatica',
		lines: ['L1'],
		characteristics: [
			'Primeros con Aire Acondicionado de fábrica',
			'Cambiaron el estándar de confort',
			'Operan en la línea más calurosa del sistema'
		],
		hasAirConditioning: true,
		isAutomatic: false,
		status: 'active'
	},
	{
		id: 'as-2014',
		model: 'AS-2014',
		manufacturer: 'CAF',
		country: 'España',
		yearIntroduced: 2016,
		rodadura: 'ferrea',
		lines: ['L3', 'L6'],
		characteristics: [
			'Conducción Automática (UTO/GoA4)',
			'Sin cabina de conductor',
			'Evacuación frontal de emergencia',
			'Cámaras CCTV internas',
			'Alimentación por catenaria rígida 1500 VCC'
		],
		hasAirConditioning: true,
		isAutomatic: true,
		status: 'active'
	},
	{
		id: 'ns-2016',
		model: 'NS-2016',
		manufacturer: 'Alstom',
		country: 'Chile',
		yearIntroduced: 2018,
		rodadura: 'neumatica',
		lines: ['L2', 'L5'],
		characteristics: [
			'Armados en Chile (Talleres Neptuno)',
			'Trenes "Boa" - pasillo continuo total',
			'Aire acondicionado',
			'Pantallas informativas digitales',
			'Mayor capacidad de pasajeros'
		],
		hasAirConditioning: true,
		isAutomatic: false,
		status: 'active'
	},
	{
		id: 'as-2022',
		model: 'AS-2022',
		manufacturer: 'Alstom',
		country: 'Francia',
		yearIntroduced: 2025,
		rodadura: 'ferrea',
		lines: ['L7'],
		characteristics: [
			'Próximos a debutar con la Línea 7',
			'Completamente automáticos (GoA4)',
			'Puertos USB para pasajeros',
			'Ciberseguridad avanzada',
			'Tecnología de última generación'
		],
		hasAirConditioning: true,
		isAutomatic: true,
		status: 'upcoming'
	}
];

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
