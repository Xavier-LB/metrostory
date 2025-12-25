/**
 * Datos de la Memoria Integrada 2024 de Metro de Santiago
 * Fuente oficial: https://www.metro.cl/gobierno-corporativo/memoria
 * Período: 1 de enero al 31 de diciembre de 2024
 */

export interface NetworkStats {
	extension: number;
	stations: number;
	lines: number;
	trains: number;
}

export interface PassengerStats {
	annualTrips: number;
	dailyAverage: number;
	yearOverYearGrowth: number;
	transportOfferCompliance: number;
	record: {
		daily: number;
		dailyDate: string;
		annual: number;
		annualYear: number;
	};
}

export interface SustainabilityStats {
	renewableEnergy: number;
	carbonNeutral: boolean;
	carbonNeutralAchievedYear: number;
	totalCarbonFootprint: number;
	carbonReduction: number;
	carbonIntensity: number;
	wasteRecycled: number;
	paperlessSaved: number;
	treesSaved: number;
}

export interface ExpansionStats {
	futureExtension: number;
	futureLines: number;
	futureStations: number;
	totalInvestment: number;
	targetYear: number;
}

export interface WorkforceStats {
	totalEmployees: number;
	securityPersonnel: number;
	womenPercentage: number;
	womenInLeadership: number;
}

export interface SecurityStats {
	safetyPerception: number;
	safetyPerception2023: number;
	safetyPerception2022: number;
}

export interface CultureStats {
	metroArteWorks: number;
	metroArteSurface: number;
	largestMural: number;
}

export interface Memoria2024Data {
	network: NetworkStats;
	passengers: PassengerStats;
	sustainability: SustainabilityStats;
	expansion: ExpansionStats;
	workforce: WorkforceStats;
	security: SecurityStats;
	culture: CultureStats;
}

export const memoria2024: Memoria2024Data = {
	network: {
		extension: 149, // km
		stations: 143,
		lines: 7,
		trains: 215
	},
	passengers: {
		annualTrips: 640_000_000, // 640 millones
		dailyAverage: 2_400_000, // 2.4 millones
		yearOverYearGrowth: 6.8, // %
		transportOfferCompliance: 97, // %
		record: {
			daily: 2_951_962,
			dailyDate: '2019-05-03',
			annual: 721_000_000,
			annualYear: 2018
		}
	},
	sustainability: {
		renewableEnergy: 100, // %
		carbonNeutral: true,
		carbonNeutralAchievedYear: 2024, // 1 año antes de lo previsto
		totalCarbonFootprint: 109_100, // ton CO2e
		carbonReduction: 12, // % vs 2023
		carbonIntensity: 15.5, // gr CO2/km por pasajero
		wasteRecycled: 80, // %
		paperlessSaved: 83_000_000, // vouchers eliminados
		treesSaved: 498
	},
	expansion: {
		futureExtension: 225, // km para 2033
		futureLines: 10,
		futureStations: 197,
		totalInvestment: 8_700, // millones USD
		targetYear: 2033
	},
	workforce: {
		totalEmployees: 4_600,
		securityPersonnel: 1_900,
		womenPercentage: 30.3,
		womenInLeadership: 25.3
	},
	security: {
		safetyPerception: 66, // % 2024
		safetyPerception2023: 60,
		safetyPerception2022: 43
	},
	culture: {
		metroArteWorks: 81,
		metroArteSurface: 11_000, // m²
		largestMural: 1_200 // m² - Mario Toral
	}
};

// Datos de inversión por proyecto de expansión
// Fuente: Memoria Integrada 2024 + actualizaciones 2025
export const expansionProjects = [
	{
		line: 'L7',
		name: 'Línea 7',
		investment: 2_528, // millones USD
		progress: 30, // % avance a junio 2025
		length: 26, // km
		stations: 19,
		beneficiaries: 1_600_000,
		travelTime: 37, // minutos entre terminales
		status: 'construction' as const,
		expectedYear: 2028,
		constructionStart: '2022-02',
		tunnelsExcavated: 12.6, // km excavados a junio 2025
		communes: ['Renca', 'Cerro Navia', 'Quinta Normal', 'Santiago', 'Recoleta', 'Providencia', 'Las Condes', 'Vitacura'],
		highlights: [
			'30% de avance a junio 2025 (12,6 km de túneles excavados)',
			'Alstom completó primer casco de tren en julio 2025',
			'Primera tuneladora urbana: "La Matucana"',
			'Trenes AS-2022 automáticos sin conductor'
		],
		sources: ['emol-l7-2025', 'alstom-l7-tren', 'metro-l7-oficial']
	},
	{
		line: 'L6-ext',
		name: 'Extensión L6 Poniente',
		investment: 244, // millones USD
		progress: 21, // % avance a abril 2025
		length: 3, // km
		stations: 1, // Lo Errázuriz (intermodal)
		beneficiaries: 90_000,
		travelTime: 3, // minutos Cerrillos-Lo Errázuriz (reducción del 87%)
		status: 'construction' as const,
		expectedYear: 2027,
		constructionStart: '2024-04-04',
		communes: ['Cerrillos'],
		highlights: [
			'21% de avance a abril 2025',
			'Nueva estación intermodal Lo Errázuriz',
			'Conexión con futuro Tren Santiago-Melipilla',
			'Excavaciones hasta junio 2026, obras civiles hasta 2027'
		],
		sources: ['meganoticias-l6-ext', 'theclinic-l6-ext']
	},
	{
		line: 'L8',
		name: 'Línea 8',
		investment: 1_899, // millones USD
		progress: 0, // En fase de ingeniería
		length: 19, // km
		stations: 14,
		beneficiaries: 1_900_000,
		travelTime: 23, // minutos Providencia-Puente Alto
		status: 'engineering' as const,
		expectedYear: 2032, // Tramo 1
		constructionStart: '2027', // Inicio construcción esperado
		communes: ['Providencia', 'Ñuñoa', 'Macul', 'Peñalolén', 'La Florida', 'Puente Alto'],
		highlights: [
			'En fase de ingeniería y diseño (2025)',
			'Construcción inicia en 2027',
			'Tramo Chile España-Mall Plaza Tobalaba: 2032',
			'Tramo norte hasta Chile España: 2033',
			'3 combinaciones: Los Leones L1/L6, Chile España L3, Macul L4'
		],
		sources: ['meganoticias-l8', 'wikipedia-l8', 'gob-l8']
	},
	{
		line: 'L9',
		name: 'Línea 9',
		investment: 2_733, // millones USD - la mayor inversión
		progress: 1, // Obras iniciadas agosto 2025
		length: 27, // km
		stations: 19,
		beneficiaries: 2_000_000,
		travelTime: 35, // minutos centro Santiago-Puente Alto
		status: 'construction' as const,
		expectedYear: 2030, // Tramo 1
		constructionStart: '2025-08-19', // Presidente Boric inició obras
		communes: ['Recoleta', 'Santiago', 'San Miguel', 'San Joaquín', 'La Granja', 'San Ramón', 'La Pintana', 'Puente Alto'],
		highlights: [
			'Construcción iniciada 19 agosto 2025 por Pdte. Boric',
			'Primer tramo: Bío Bío - Plaza de La Pintana',
			'RCA aprobada mayo 2025',
			'Entrega en 3 tramos: 2030, 2032 y 2033',
			'6 nuevas combinaciones a la red'
		],
		sources: ['prensa-presidencia-l9', 'cooperativa-l9', 'wikipedia-l9']
	}
];

// Hitos históricos
export const historicalMilestones = [
	{ year: 1969, month: 5, day: 29, event: 'Inicio de la construcción del Metro' },
	{ year: 1975, month: 9, day: 15, event: 'Inauguración Línea 1 (San Pablo - La Moneda)' },
	{ year: 1978, month: 3, day: 31, event: 'Inauguración primer tramo Línea 2' },
	{ year: 1997, event: 'Inauguración Línea 5' },
	{ year: 2005, event: 'Inauguración Línea 4' },
	{ year: 2006, event: 'Inauguración Línea 4A' },
	{ year: 2017, month: 11, day: 2, event: 'Inauguración Línea 6 (15 km automáticos)' },
	{ year: 2019, month: 1, day: 22, event: 'Inauguración Línea 3' },
	{ year: 2019, month: 5, day: 3, event: 'Récord histórico: 2.951.962 pasajeros en un día' },
	{ year: 2019, month: 10, event: 'Estallido social: 7 estaciones incendiadas, 18 parcialmente quemadas' },
	{ year: 2020, month: 9, event: 'Recuperación completa de la operación' },
	{ year: 2023, month: 9, event: 'Extensión Línea 3 hasta Quilicura' },
	{ year: 2023, month: 11, day: 27, event: 'Extensión Línea 2 hasta San Bernardo' },
	{ year: 2024, event: 'Carbono neutralidad alcanzada (1 año antes de lo previsto)' },
	{ year: 2024, month: 4, day: 4, event: 'Inicio obras Extensión L6 hacia Lo Errázuriz' },
	{ year: 2025, month: 5, event: 'Línea 9 obtiene Resolución de Calificación Ambiental' },
	{ year: 2025, month: 6, event: 'Línea 7 alcanza 30% de avance (12,6 km de túneles)' },
	{ year: 2025, month: 7, event: 'Alstom completa primer casco de tren AS-2022 para L7' },
	{ year: 2025, month: 8, day: 19, event: 'Presidente Boric inicia construcción de Línea 9' }
];

// Helper functions para formatear números
export function formatNumber(num: number): string {
	if (num >= 1_000_000_000) {
		return `${(num / 1_000_000_000).toFixed(1)}B`;
	}
	if (num >= 1_000_000) {
		return `${(num / 1_000_000).toFixed(0)}M`;
	}
	if (num >= 1_000) {
		return `${(num / 1_000).toFixed(1)}K`;
	}
	return num.toLocaleString('es-CL');
}

export function formatCurrency(millions: number): string {
	return `USD $${millions.toLocaleString('es-CL')}M`;
}
