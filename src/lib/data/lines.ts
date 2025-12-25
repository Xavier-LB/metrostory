import type { MetroLine } from '$lib/types';

// Datos de líneas del Metro de Santiago
// Información recopilada con asistencia de IA - consultar fuentes para verificación

export const lines: MetroLine[] = [
	{
		id: 'L1',
		name: 'Línea 1',
		color: '#D60D27',
		textColor: '#FFFFFF',
		inauguratedAt: '1975-09-15',
		terminals: ['san-pablo', 'los-dominicos'],
		length: 20.4,
		stationCount: 27,
		rodadura: 'neumatica',
		automationLevel: 'manual',
		status: 'operational',
		constructionMethod: 'trinchera_abierta',
		description:
			'El eje fundacional del Metro, siguiendo el corredor histórico Alameda-Providencia-Apoquindo. Narra el desplazamiento del centro económico hacia el oriente. Es la columna vertebral del transporte metropolitano.',
		historicalNote:
			'Inaugurada el 15 de septiembre de 1975 bajo el gobierno militar. Las primeras estaciones fueron diseñadas con estilo de funcionalismo brutalista por el arquitecto Peter Himmel. El método de construcción de "trinchera abierta" implicó abrir la Avenida Alameda durante años, modernizando toda la infraestructura subterránea de la ciudad.',
		sources: ['wikipedia-l1', 'la-tercera-himmel', 'memoria-chilena']
	},
	{
		id: 'L2',
		name: 'Línea 2',
		color: '#FAB515',
		textColor: '#000000',
		inauguratedAt: '1978-03-31',
		terminals: ['vespucio-norte', 'hospital-el-pino'],
		length: 25.9,
		stationCount: 26,
		rodadura: 'neumatica',
		automationLevel: 'manual',
		status: 'operational',
		constructionMethod: 'trinchera_abierta',
		description:
			'El corredor Norte-Sur que rompió la lógica subterránea estricta con estaciones a nivel de calle o hundidas a cielo abierto. Primera línea en cruzar subterráneamente el río Mapocho (2004).',
		historicalNote:
			'Gran parte del tramo original se construyó en la trinchera central de la Avenida Norte-Sur (hoy Autopista Central). Contiene el famoso "andén fantasma" de Cal y Canto y fue la primera en llegar a San Bernardo (2023).',
		sources: ['wikipedia-l2', 'memoria-chilena']
	},
	{
		id: 'L3',
		name: 'Línea 3',
		color: '#9A5B29',
		textColor: '#FFFFFF',
		inauguratedAt: '2019-01-22',
		terminals: ['plaza-quilicura', 'fernando-castillo-velasco'],
		length: 25.0,
		stationCount: 21,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'operational',
		constructionMethod: 'NATM',
		description:
			'Segunda línea completamente automática del sistema (tras L6). Trenes sin conductor y puertas de andén. Conecta comunas del norte con La Reina.',
		historicalNote:
			'Representa el estado del arte mundial en metros. Utiliza catenaria rígida (1500 VCC) en lugar del tercer riel tradicional. Extendida a Quilicura en septiembre de 2023.',
		sources: ['wikipedia-l3', 'msgg-l3']
	},
	{
		id: 'L4',
		name: 'Línea 4',
		color: '#2D2B73',
		textColor: '#FFFFFF',
		inauguratedAt: '2005-11-30',
		terminals: ['tobalaba', 'plaza-de-puente-alto'],
		length: 24.7,
		stationCount: 23,
		rodadura: 'ferrea',
		automationLevel: 'manual',
		status: 'operational',
		constructionMethod: 'tunel_profundo',
		description:
			'Primera línea con rodado férreo (ruedas de acero). Conecta el centro financiero "Sanhattan" con Puente Alto, permitiendo velocidades mayores en tramos largos.',
		historicalNote:
			'El cambio a ruedas de acero fue necesario por la gran longitud de la línea (más de 24 km), reduciendo costos de mantenimiento y permitiendo mayor velocidad. Los trenes AS-2002 pueden alcanzar velocidades superiores a los neumáticos.',
		sources: ['wikipedia-l4', 'wikipedia-material-rodante']
	},
	{
		id: 'L4A',
		name: 'Línea 4A',
		color: '#0471B9',
		textColor: '#FFFFFF',
		inauguratedAt: '2006-08-16',
		terminals: ['la-cisterna', 'vicuna-mackenna'],
		length: 7.7,
		stationCount: 6,
		rodadura: 'ferrea',
		automationLevel: 'manual',
		status: 'operational',
		constructionMethod: 'trinchera_abierta',
		description:
			'Anillo transversal que corre por la trinchera de la Autopista Vespucio Sur. Es la línea más corta del sistema, conectando L2 y L4.',
		historicalNote:
			'Contiene la estación fantasma Echeverría, la más visible del sistema, con andenes en obra gruesa observables desde los trenes y la autopista.',
		sources: ['wikipedia-l4', 'la-cuarta-fantasmas']
	},
	{
		id: 'L5',
		name: 'Línea 5',
		color: '#179859',
		textColor: '#FFFFFF',
		inauguratedAt: '1997-04-05',
		terminals: ['plaza-de-maipu', 'vicente-valdes'],
		length: 30.0,
		stationCount: 30,
		rodadura: 'neumatica',
		automationLevel: 'manual',
		status: 'operational',
		constructionMethod: 'viaducto',
		description:
			'Marcó el retorno de las grandes obras tras la crisis de los 80. Es la línea más larga del sistema. Innovó con el viaducto elevado sobre Vicuña Mackenna, ofreciendo vistas panorámicas de los Andes.',
		historicalNote:
			'Contiene la estación fantasma Libertad en el Barrio Yungay, con andenes, mesaninas y accesos construidos pero cerrados. La estación Baquedano L5 es famosa por su inmensa nave central de arquitectura monumental.',
		sources: ['wikipedia-l5', 'la-tercera-libertad']
	},
	{
		id: 'L6',
		name: 'Línea 6',
		color: '#9A3488',
		textColor: '#FFFFFF',
		inauguratedAt: '2017-11-02',
		terminals: ['cerrillos', 'los-leones'],
		length: 15.0,
		stationCount: 10,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'operational',
		constructionMethod: 'NATM',
		description:
			'Primera línea completamente automática de Chile. Introdujo puertas de andén, climatización eficiente y pictogramas icónicos para cada estación.',
		historicalNote:
			'Junto con la L3, representa la nueva era de automatización GoA4 (sin conductor). Túneles construidos íntegramente de forma subterránea mediante método NATM, minimizando la disrupción en superficie.',
		sources: ['wikipedia-l6', 'fundacion-futuro']
	}
];

// Líneas futuras (en construcción o planificadas)
// Datos actualizados de Memoria Integrada 2024
export const futureLines: MetroLine[] = [
	{
		id: 'L6-ext',
		name: 'Extensión L6',
		color: '#9A3488', // Mismo color que L6
		textColor: '#FFFFFF',
		inauguratedAt: '2027',
		terminals: ['cerrillos', 'lo-errazuriz'],
		length: 3.0,
		stationCount: 1, // Lo Errázuriz (intermodal)
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'construction',
		constructionMethod: 'NATM',
		description:
			'Extensión poniente de la Línea 6. Nueva estación intermodal Lo Errázuriz conectará con el futuro Tren Santiago-Melipilla. Beneficiará a 90.000 habitantes. Inversión: USD $244 millones. 21% de avance a abril 2025.',
		historicalNote:
			'Obras iniciadas el 4 de abril de 2024. Excavaciones de piques, galerías y túneles hasta junio 2026. Obras civiles de estación de febrero 2026 a 2027.',
		sources: ['meganoticias-l6-ext', 'theclinic-l6-ext']
	},
	{
		id: 'L7',
		name: 'Línea 7',
		color: '#00A88E', // Verde turquesa oficial
		textColor: '#FFFFFF',
		inauguratedAt: '2028',
		terminals: ['renca', 'vitacura'],
		length: 26.0,
		stationCount: 19,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'construction',
		constructionMethod: 'NATM',
		description:
			'Conectará 8 comunas: Renca, Cerro Navia, Quinta Normal, Santiago, Recoleta, Providencia, Las Condes y Vitacura. Beneficiará a 1,6 millones de personas con 37 minutos entre terminales. Inversión: USD $2.528 millones. 30% de avance a junio 2025.',
		historicalNote:
			'Primera línea con tuneladora urbana "La Matucana". A junio 2025: 30% de avance con 12,6 km de túneles excavados. En julio 2025, Alstom completó el primer casco de tren AS-2022. Serán automáticos sin conductor (GoA4).',
		sources: ['emol-l7-2025', 'alstom-l7-tren', 'metro-l7-oficial']
	},
	{
		id: 'L8',
		name: 'Línea 8',
		color: '#E87C03', // Naranja oficial
		textColor: '#FFFFFF',
		inauguratedAt: '2032',
		terminals: ['los-leones', 'puente-alto'],
		length: 19.0,
		stationCount: 14,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'planned',
		constructionMethod: 'NATM',
		description:
			'Conectará 6 comunas: Providencia, Ñuñoa, Macul, Peñalolén, La Florida y Puente Alto. Beneficiará a 1,9 millones de habitantes. 23 minutos Providencia-Puente Alto. Inversión: USD $1.899 millones. En fase de ingeniería.',
		historicalNote:
			'En fase de ingeniería y diseño (2025). Construcción programada para iniciar en 2027. Tramo Chile España-Mall Plaza Tobalaba inaugurará 2032. Tramo norte hasta Los Leones inaugurará 2033. 3 combinaciones: Los Leones (L1/L6), Chile España (L3), Macul (L4).',
		sources: ['meganoticias-l8', 'wikipedia-l8', 'gob-l8']
	},
	{
		id: 'L9',
		name: 'Línea 9',
		color: '#8B4513', // Café/marrón oficial
		textColor: '#FFFFFF',
		inauguratedAt: '2030',
		terminals: ['puente-cal-y-canto', 'plaza-de-puente-alto'],
		length: 27.0,
		stationCount: 19,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'construction',
		constructionMethod: 'NATM',
		description:
			'Conectará 8 comunas: Recoleta, Santiago, San Miguel, San Joaquín, La Granja, San Ramón, La Pintana y Puente Alto. Beneficiará a 2 millones de habitantes. 35 minutos centro-Puente Alto. Inversión: USD $2.733 millones (la mayor).',
		historicalNote:
			'Construcción iniciada el 19 de agosto de 2025 por el Presidente Boric. Primer tramo Bío Bío-Plaza de La Pintana. RCA aprobada mayo 2025. Entrega en 3 tramos: 2030, 2032 y 2033. Sumará 6 combinaciones. Corre por eje Av. Santa Rosa.',
		sources: ['prensa-presidencia-l9', 'cooperativa-l9', 'wikipedia-l9']
	}
];

export const linesById = Object.fromEntries(lines.map((line) => [line.id, line]));

export const allLinesById = Object.fromEntries(
	[...lines, ...futureLines].map((line) => [line.id, line])
);

export function getLineColor(lineId: string): string {
	return allLinesById[lineId]?.color ?? '#888888';
}

export function getOperationalLines(): MetroLine[] {
	return lines.filter((l) => l.status === 'operational');
}

export function getFutureLines(): MetroLine[] {
	return futureLines;
}
