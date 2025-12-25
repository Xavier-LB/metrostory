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
export const futureLines: MetroLine[] = [
	{
		id: 'L7',
		name: 'Línea 7',
		color: '#F5A000',
		textColor: '#000000',
		inauguratedAt: '2027',
		terminals: ['renca', 'vitacura'],
		length: 26.0,
		stationCount: 19,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'construction',
		constructionMethod: 'NATM',
		description:
			'Diseñada para descongestionar la saturada Línea 1, corriendo paralela a ella hacia el norte. Llevará el metro por primera vez a Renca, conectándola con Vitacura.',
		historicalNote:
			'Utilizará los nuevos trenes AS-2022. Un hito social al conectar comunas históricamente segregadas con el sector oriente de la ciudad.',
		sources: ['wikipedia-l7', 'gob-l8']
	},
	{
		id: 'L8',
		name: 'Línea 8',
		color: '#00B4D8',
		textColor: '#000000',
		inauguratedAt: '2032',
		terminals: ['puente-alto', 'los-leones'],
		length: 20.0,
		stationCount: 16,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'planned',
		constructionMethod: 'NATM',
		description:
			'Conectará Puente Alto y La Florida con Providencia (Los Leones) a través de los ejes La Florida y Macul.',
		historicalNote:
			'Se prevé su entrega en tramos escalonados entre 2032 y 2033. Generará nuevas combinaciones con L3, L5 y L6.',
		sources: ['gob-l8']
	},
	{
		id: 'L9',
		name: 'Línea 9',
		color: '#6B5B95',
		textColor: '#FFFFFF',
		inauguratedAt: '2033',
		terminals: ['la-pintana', 'cal-y-canto'],
		length: 18.5,
		stationCount: 14,
		rodadura: 'ferrea',
		automationLevel: 'GoA4',
		status: 'planned',
		constructionMethod: 'NATM',
		description:
			'La línea de mayor impacto social proyectada. Conectará La Pintana, comuna históricamente segregada, con el centro de Santiago en menos de 30 minutos, reduciendo tiempos de viaje en un 70%.',
		historicalNote:
			'Transformará a Puente Cal y Canto en la "Estación Central" del sistema subterráneo con cuádruple combinación (L2, L3, L7, L9). Un hito de justicia territorial.',
		sources: ['gob-l9']
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
