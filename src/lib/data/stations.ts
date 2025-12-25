import type { Station } from '$lib/types';
import { getArtworksByStation } from './metroarte';

// Estaciones del Metro de Santiago con información histórica detallada
// Datos recopilados con asistencia de IA - consultar fuentes para verificación
export const stations: Station[] = [
	// ===== LÍNEA 1 (ROJA) =====
	{
		id: 'san-pablo',
		name: 'San Pablo',
		coordinates: [-70.7247, -33.4252],
		lines: ['L1', 'L5'],
		inauguratedAt: '1975-09-15',
		commune: 'Lo Prado',
		history:
			'Terminal poniente original del Metro. Severamente incendiada en octubre 2019 durante el estallido social, reabierta en julio 2020.',
		nameOrigin:
			'Nombrada por la Avenida San Pablo, antiguo Camino a Valparaíso, que recuerda a Pablo de Tarso, apóstol del cristianismo.',
		curiosity: 'Fue escenario de uno de los primeros atentados terroristas del Metro en 1983.',
		isTransfer: true,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l1', 'wikipedia-historia']
	},
	{
		id: 'neptuno',
		name: 'Neptuno',
		coordinates: [-70.7156, -33.4282],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Lo Prado',
		history:
			'Estación en trinchera ubicada junto a los Talleres Neptuno, donde se realiza el mantenimiento de los trenes.',
		nameOrigin:
			'Por la Avenida Neptuno, que evoca al dios romano del mar de la mitología latina.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'pajaritos',
		name: 'Pajaritos',
		coordinates: [-70.7134, -33.4578],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Lo Prado',
		history:
			'Estación intermodal importante que conecta con buses hacia el aeropuerto Arturo Merino Benítez y Valparaíso.',
		nameOrigin:
			'Según la tradición popular, los carretones de semillas transitaban por este camino rural y las semillas caían por los baches, atrayendo a pequeños pájaros que las comían.',
		curiosity: 'El nombre evoca el comercio histórico en la ruta colonial hacia la costa.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-pajaritos', 'wikipedia-l1']
	},
	{
		id: 'las-rejas',
		name: 'Las Rejas',
		coordinates: [-70.7018, -33.4344],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Lo Prado/Estación Central',
		history:
			'Aquí comenzaron las obras del Metro de Santiago el 29 de mayo de 1969, marcando el inicio de la construcción del sistema.',
		nameOrigin:
			'Por el antiguo Fundo Las Rejas que ocupaba gran parte del sector durante la época colonial.',
		curiosity: 'Primera palada del Metro de Santiago se dio en este lugar.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1', 'lub-upc']
	},
	{
		id: 'ecuador',
		name: 'Ecuador',
		coordinates: [-70.6901, -33.4381],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Estación Central',
		history: 'Estación del tramo fundacional que sirve al barrio con nomenclatura latinoamericana.',
		nameOrigin:
			'Por la Calle Ecuador, parte de la nomenclatura de calles del sector que honra a países latinoamericanos.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'san-alberto-hurtado',
		name: 'San Alberto Hurtado',
		coordinates: [-70.6922, -33.4542],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Estación Central',
		formerName: 'Pila del Ganso (1975-2005)',
		history:
			'Originalmente llamada "Pila del Ganso". Renombrada en 2005 tras la canonización del Padre Hurtado.',
		nameOrigin:
			'Honra a San Alberto Hurtado Cruchaga (1901-1952), sacerdote jesuita chileno canonizado en 2005, fundador del Hogar de Cristo ubicado en las cercanías.',
		curiosity:
			'El nombre original "Pila del Ganso" provenía de una fuente colonial con una figura de ganso que existía en el sector.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'universidad-de-santiago',
		name: 'Universidad de Santiago',
		coordinates: [-70.6845, -33.4502],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Estación Central',
		history:
			'Sirve al campus principal de la Universidad de Santiago de Chile (USACH), una de las principales universidades estatales del país.',
		nameOrigin:
			'Por la Universidad de Santiago de Chile (USACH), cuyo campus principal se ubica junto a la estación.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'estacion-central',
		name: 'Estación Central',
		coordinates: [-70.6799, -33.4508],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Estación Central',
		history:
			'Nodo crítico de intermodalidad con el ferrocarril al sur (EFE Tren Central). Su arquitectura subterránea dialoga con la gran estructura de acero de la estación de trenes en superficie.',
		nameOrigin:
			'Por la Estación Central de Ferrocarriles, el principal terminal ferroviario de Chile inaugurado en 1884. La comuna adoptó el nombre de la estación.',
		curiosity:
			'La estación de trenes sobre ella presenta una estructura metálica de la época, y es Monumento Nacional.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 65000,
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1', 'la-tercera-himmel']
	},
	{
		id: 'union-latinoamericana',
		name: 'Unión Latinoamericana',
		coordinates: [-70.6715, -33.4478],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Santiago',
		history: 'Estación del tramo fundacional en el sector poniente del centro de Santiago.',
		nameOrigin:
			'Por la calle homónima que expresa el ideal de integración de los pueblos de América Latina.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'republica',
		name: 'República',
		coordinates: [-70.6655, -33.4458],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Santiago',
		history:
			'Sirve al tradicional barrio universitario de República, con múltiples sedes universitarias.',
		nameOrigin:
			'Por la Avenida República, que honra la forma de gobierno republicana de Chile.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'los-heroes',
		name: 'Los Héroes',
		coordinates: [-70.6575, -33.4468],
		lines: ['L1', 'L2'],
		inauguratedAt: '1975-09-15',
		commune: 'Santiago',
		history:
			'Primera estación de combinación de la red. Sobre ella se encuentra el Paseo de los Héroes con estatuas de figuras militares.',
		nameOrigin:
			'Por el Monumento a los Héroes de La Concepción, encargado en 1920 a la escultora Rebeca Matte para honrar a los 77 soldados caídos en la Batalla de La Concepción (1882) durante la Guerra del Pacífico.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 110000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1', 'wikipedia-l2']
	},
	{
		id: 'la-moneda',
		name: 'La Moneda',
		coordinates: [-70.6538, -33.4423],
		lines: ['L1'],
		inauguratedAt: '1975-09-15',
		commune: 'Santiago',
		history:
			'Terminal del primer tramo inaugurado. Concebida como la estación institucional por excelencia, ubicada bajo el palacio de gobierno. Alberga murales de Guillermo Muñoz Vera.',
		nameOrigin:
			'Recibe su nombre del Palacio de La Moneda, sede del poder ejecutivo de Chile, ubicado sobre la estación.',
		curiosity:
			'El nombre del palacio proviene de que originalmente fue la Casa de Moneda, donde se acuñaban las monedas del reino desde el siglo XVIII.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 45000,
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1', 'somos-tour']
	},
	{
		id: 'universidad-de-chile',
		name: 'Universidad de Chile',
		coordinates: [-70.6494, -33.4418],
		lines: ['L1', 'L3'],
		inauguratedAt: '1977-03-31',
		commune: 'Santiago',
		history:
			'Alberga el mural "Memoria Visual de una Nación" de Mario Toral, obra cumbre de 1.200 m² que narra la historia de Chile. Reconocida por Lonely Planet y BBC como una de las estaciones más artísticas del mundo.',
		nameOrigin:
			'Por la Casa Central de la Universidad de Chile, la universidad más antigua del país fundada en 1842, ubicada frente a la estación.',
		curiosity:
			'El mural de Toral se divide en "Pasado" (conquista, violencia) y "Presente/Futuro" (modernidad, poesía). Es el mural más grande de Latinoamérica.',
		pictogram: 'Fachada de la Casa Central',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 85000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		artworks: getArtworksByStation('universidad-de-chile'),
		sources: ['wikipedia-l1', 'somos-tour', 'lonely-planet']
	},
	{
		id: 'santa-lucia',
		name: 'Santa Lucía',
		coordinates: [-70.6449, -33.4408],
		lines: ['L1'],
		inauguratedAt: '1977-03-31',
		commune: 'Santiago',
		history:
			'Ubicada junto al Cerro Santa Lucía y la Biblioteca Nacional de Chile. Futura combinación con Línea 9.',
		nameOrigin:
			'Por el Cerro Santa Lucía, llamado "Huelén" por los pueblos originarios y renombrado por Pedro de Valdivia, quien desde su cima fundó Santiago el 12 de febrero de 1541.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1', 'wikipedia-santa-lucia']
	},
	{
		id: 'universidad-catolica',
		name: 'Universidad Católica',
		coordinates: [-70.6399, -33.4411],
		lines: ['L1'],
		inauguratedAt: '1977-03-31',
		commune: 'Santiago',
		history:
			'Sirve a la Casa Central de la Pontificia Universidad Católica de Chile, ubicada sobre la estación.',
		nameOrigin:
			'Por la Pontificia Universidad Católica de Chile, fundada en 1888, cuya Casa Central se ubica sobre la estación.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'baquedano',
		name: 'Baquedano',
		coordinates: [-70.6344, -33.4378],
		lines: ['L1', 'L5'],
		inauguratedAt: '1977-03-31',
		commune: 'Santiago/Providencia',
		history:
			'Diseñada como un gran nodo de distribución bajo Plaza Italia. La estación L5 es famosa por su inmensa nave central y arquitectura monumental. Primera estación digital del sistema (2018).',
		nameOrigin:
			'Honra al General Manuel Baquedano (1823-1897), comandante en jefe del ejército chileno durante la Guerra del Pacífico. Su estatua ecuestre presidía la plaza hasta 2020.',
		curiosity:
			'Es el epicentro de celebraciones y protestas. La Plaza Italia sobre ella fue renombrada popularmente "Plaza Dignidad" durante el estallido social de 2019.',
		architect: 'Juan Parrochia Beguin',
		dailyPassengers: 98000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		artworks: getArtworksByStation('baquedano'),
		sources: ['wikipedia-l1', 'metro-baquedano']
	},
	{
		id: 'salvador',
		name: 'Salvador',
		coordinates: [-70.6268, -33.4338],
		lines: ['L1'],
		inauguratedAt: '1977-03-31',
		commune: 'Providencia',
		history: 'Terminal del segundo tramo del Metro (1977-1980). Sirve al sector oriente de Providencia.',
		nameOrigin: 'Por la Calle Salvador, que honra a Jesucristo (El Salvador).',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'manuel-montt',
		name: 'Manuel Montt',
		coordinates: [-70.6209, -33.4296],
		lines: ['L1'],
		inauguratedAt: '1980-08-31',
		commune: 'Providencia',
		history: 'Parte de la extensión de 1980 hacia Escuela Militar.',
		nameOrigin:
			'Por Manuel Montt Torres (1809-1880), presidente de Chile entre 1851 y 1861, conocido por impulsar la educación pública.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'pedro-de-valdivia',
		name: 'Pedro de Valdivia',
		coordinates: [-70.6153, -33.4267],
		lines: ['L1'],
		inauguratedAt: '1980-08-31',
		commune: 'Providencia',
		history:
			'Destaca por la obra de arte "El Cielo" de Juan Santiago Tapia, una bóveda de vitrales de 900 m².',
		nameOrigin:
			'Por Pedro de Valdivia (1497-1553), conquistador español fundador de Santiago y primer Gobernador de Chile.',
		artworks: getArtworksByStation('pedro-de-valdivia'),
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1', 'wikipedia-pedro-valdivia']
	},
	{
		id: 'los-leones',
		name: 'Los Leones',
		coordinates: [-70.6112, -33.4262],
		lines: ['L1', 'L6'],
		inauguratedAt: '1980-08-31',
		commune: 'Providencia',
		history:
			'El túnel de combinación alberga la obra "Vía Suecia" de Luciano Escanilla, homenaje a la cultura sueca.',
		nameOrigin:
			'Por el antiguo Fundo "Los Leones" perteneciente al alcalde Ricardo Lyon. El fundo se llamaba así por estatuas de leones que adornaban su entrada, réplicas del escudo heráldico familiar.',
		curiosity:
			'La obra de arte en el túnel celebra la cooperación internacional, dado el nombre de la avenida en superficie (Av. Suecia).',
		dailyPassengers: 52000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		artworks: getArtworksByStation('los-leones'),
		sources: ['wikipedia-l1', 'fandom-los-leones']
	},
	{
		id: 'tobalaba',
		name: 'Tobalaba',
		coordinates: [-70.5939, -33.4206],
		lines: ['L1', 'L4'],
		inauguratedAt: '1980-08-31',
		commune: 'Providencia/Las Condes',
		history:
			'Punto de inflexión que anticipaba el futuro centro financiero "Sanhattan". Estación más concurrida de la red con más de 84.000 pasajeros diarios. Sufrió atentado terrorista del FPMR el 16/06/1986.',
		nameOrigin:
			'Del mapudungun "tuva laf-quen" que significa "tierra de totoras junto al agua" o "lugar de tórtolas". Era el nombre de una antigua hacienda de la zona.',
		dailyPassengers: 84000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'el-golf',
		name: 'El Golf',
		coordinates: [-70.5864, -33.4149],
		lines: ['L1'],
		inauguratedAt: '1980-08-31',
		commune: 'Las Condes',
		history: 'Sirve al distrito financiero de Santiago, conocido como "Sanhattan".',
		nameOrigin:
			'Por el Barrio El Golf, distrito financiero nombrado por el Club de Golf Los Leones que existía en el sector.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'alcantara',
		name: 'Alcántara',
		coordinates: [-70.5783, -33.4115],
		lines: ['L1'],
		inauguratedAt: '1980-08-31',
		commune: 'Las Condes',
		history: 'Sirve al barrio residencial y comercial de Las Condes.',
		nameOrigin:
			'Por la Orden de Alcántara, orden militar religiosa española fundada en el siglo XII, que nombra a la calle del sector.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'escuela-militar',
		name: 'Escuela Militar',
		coordinates: [-70.5694, -33.4079],
		lines: ['L1'],
		inauguratedAt: '1980-08-31',
		commune: 'Las Condes',
		history:
			'Terminal de la línea entre 1980 y 2010. Posee el mayor número de accesos de la red. Ubicada bajo la Rotonda Pérez Zujovic.',
		nameOrigin:
			'Por la Escuela Militar del Libertador Bernardo O\'Higgins, institución fundada en 1817, cuyo campus se ubica cerca de la estación.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'manquehue',
		name: 'Manquehue',
		coordinates: [-70.5554, -33.4051],
		lines: ['L1'],
		inauguratedAt: '2010-01-07',
		commune: 'Las Condes',
		history:
			'Parte de la última extensión de L1 (2010) que consolidó la conquista del barrio alto. Arquitectura moderna con grandes espacios y luz natural.',
		nameOrigin:
			'Del mapudungun "mankü we" que significa "lugar de cóndores" o "nido de cóndores", en referencia al Cerro Manquehue visible desde el sector.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'hernando-de-magallanes',
		name: 'Hernando de Magallanes',
		coordinates: [-70.5379, -33.4042],
		lines: ['L1'],
		inauguratedAt: '2010-01-07',
		commune: 'Las Condes',
		history: 'Extensión de 2010 con arquitectura moderna y accesibilidad universal desde el diseño.',
		nameOrigin:
			'Por Fernando de Magallanes (1480-1521), navegante portugués que descubrió el estrecho que lleva su nombre y lideró la primera circunnavegación del mundo.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},
	{
		id: 'los-dominicos',
		name: 'Los Dominicos',
		coordinates: [-70.5229, -33.4115],
		lines: ['L1'],
		inauguratedAt: '2010-01-07',
		commune: 'Las Condes',
		history:
			'Terminal oriente con arquitectura moderna, grandes espacios, luz natural y diseño que priorizó la accesibilidad universal desde el inicio.',
		nameOrigin:
			'Por la Iglesia y Convento de Los Dominicos, fundado por la Orden de Predicadores, y el tradicional Pueblito Los Dominicos (centro artesanal).',
		curiosity: 'Parte de la última extensión de L1 que consolidó la conquista del barrio alto.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l1']
	},

	// ===== LÍNEA 2 (AMARILLA) =====
	{
		id: 'vespucio-norte',
		name: 'Vespucio Norte',
		coordinates: [-70.6075, -33.3591],
		lines: ['L2'],
		inauguratedAt: '2006-12-22',
		commune: 'Recoleta/Huechuraba',
		history:
			'Terminal norte de la Línea 2. Estación intermodal con conexión a buses urbanos, interurbanos e internacionales.',
		nameOrigin:
			'Por la Avenida Américo Vespucio, circunvalación de Santiago nombrada por el navegante italiano Américo Vespucio (1454-1512). "Norte" la diferencia de otras estaciones en la misma avenida.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l2', 'wikipedia-vespucio-norte']
	},
	{
		id: 'zapadores',
		name: 'Zapadores',
		coordinates: [-70.6134, -33.3698],
		lines: ['L2'],
		inauguratedAt: '2006-12-22',
		commune: 'Recoleta',
		history: 'Parte de la extensión norte de 2006.',
		nameOrigin:
			'Por la Avenida Los Zapadores, referencia a las unidades militares de ingeniería (soldados zapadores especializados en construcción).',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'fandom-zapadores']
	},
	{
		id: 'dorsal',
		name: 'Dorsal',
		coordinates: [-70.6201, -33.3798],
		lines: ['L2'],
		inauguratedAt: '2006-12-22',
		commune: 'Recoleta',
		history: 'Parte de la extensión norte de 2006.',
		nameOrigin: 'Por la Avenida Dorsal, importante vía del sector norte de Santiago.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'einstein',
		name: 'Einstein',
		coordinates: [-70.6287, -33.3892],
		lines: ['L2'],
		inauguratedAt: '2005-11-25',
		commune: 'Recoleta',
		history: 'Inaugurada con la extensión norte de 2005.',
		nameOrigin:
			'Por Albert Einstein (1879-1955), físico alemán ganador del Premio Nobel, conocido por la Teoría de la Relatividad.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'fandom-einstein']
	},
	{
		id: 'cementerios',
		name: 'Cementerios',
		coordinates: [-70.6378, -33.3978],
		lines: ['L2'],
		inauguratedAt: '2005-11-25',
		commune: 'Recoleta',
		history: 'Ubicada frente a los principales cementerios de Santiago.',
		nameOrigin:
			'Por el Cementerio General de Santiago (el más grande del país, fundado en 1821), el Cementerio Católico y el Cementerio Israelita ubicados en el sector.',
		curiosity: 'Nombre original proyectado: "Valdivieso".',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'wikipedia-cementerios']
	},
	{
		id: 'cerro-blanco',
		name: 'Cerro Blanco',
		coordinates: [-70.6432, -33.4078],
		lines: ['L2'],
		inauguratedAt: '2004-09-08',
		commune: 'Recoleta',
		history:
			'Hito de ingeniería al ser la primera estación en cruzar el río Mapocho de forma subterránea.',
		nameOrigin:
			'Por el Cerro Blanco, formación rocosa históricamente utilizada como cantera para construir el Puente Cal y Canto y la Iglesia Santo Domingo.',
		curiosity: 'Nombre original: "Santos Dumont".',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'wikipedia-cerro-blanco']
	},
	{
		id: 'patronato',
		name: 'Patronato',
		coordinates: [-70.6451, -33.4198],
		lines: ['L2'],
		inauguratedAt: '2004-09-08',
		commune: 'Recoleta',
		history:
			'Sirve al tradicional barrio comercial de Patronato y da acceso a la Vega Central de Santiago.',
		nameOrigin:
			'Por el Barrio Patronato, tradicional barrio comercial. Originalmente habitado por inmigrantes palestinos y árabes, actualmente con fuerte presencia de comerciantes asiáticos.',
		curiosity: 'Nombre original: "La Recoleta".',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'wikipedia-patronato']
	},
	{
		id: 'cal-y-canto',
		name: 'Cal y Canto',
		coordinates: [-70.6492, -33.4318],
		lines: ['L2', 'L3'],
		inauguratedAt: '1987-09-15',
		commune: 'Santiago',
		history:
			'Obra maestra de ingeniería compleja, situada junto al Río Mapocho. Una de las estaciones más profundas de la red (33 metros). Contiene el famoso "andén fantasma", una estructura construida en los años 80 anticipando la Línea 3, que permaneció oculta por más de 30 años.',
		nameOrigin:
			'Recuerda al histórico Puente de Cal y Canto (1767-1888), obra maestra colonial construida con cal de Polpaico, rocas del Cerro Blanco y miles de huevos como aglutinante.',
		curiosity:
			'Originalmente llamada "Mapocho", se renombró al descubrirse restos del puente durante la construcción. El viejo andén para la L3 original quedó inservible cuando la nueva L3 cambió a ruedas de acero.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'lugares-que-ver', 'cmn-cal-y-canto']
	},
	{
		id: 'santa-ana',
		name: 'Santa Ana',
		coordinates: [-70.6575, -33.4385],
		lines: ['L2', 'L5'],
		inauguratedAt: '1986-07-25',
		commune: 'Santiago',
		history: 'Combinación entre L2 y L5 en el centro de Santiago.',
		nameOrigin:
			'Por la Basílica de Santa Ana, construida en 1806. En esta parroquia fueron bautizadas Santa Teresa de los Andes y la Beata Laura Vicuña.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'toesca',
		name: 'Toesca',
		coordinates: [-70.6561, -33.4545],
		lines: ['L2'],
		inauguratedAt: '1978-03-31',
		commune: 'Santiago',
		history: 'Parte del tramo fundacional de la Línea 2.',
		nameOrigin:
			'Por Joaquín Toesca e Ricci (1745-1799), arquitecto italiano que diseñó el Palacio de La Moneda y los tajamares del río Mapocho.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'itchile-toesca']
	},
	{
		id: 'parque-ohiggins',
		name: "Parque O'Higgins",
		coordinates: [-70.6564, -33.4604],
		lines: ['L2'],
		inauguratedAt: '1978-03-31',
		commune: 'Santiago',
		history:
			'Sirve al parque más grande de Santiago. Diseñada para eventos masivos como la Parada Militar y Fiestas Patrias.',
		nameOrigin:
			"Por el Parque O'Higgins (antes Parque Cousiño), inaugurado en 1873 y rebautizado en honor al libertador Bernardo O'Higgins (1778-1842).",
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'fandom-parque-ohiggins']
	},
	{
		id: 'rondizzoni',
		name: 'Rondizzoni',
		coordinates: [-70.6559, -33.4699],
		lines: ['L2'],
		inauguratedAt: '1978-03-31',
		commune: 'Santiago',
		history:
			'Estación que sirve a grandes equipamientos recreativos, diseñada para manejar flujos masivos de personas en eventos.',
		nameOrigin:
			'Por Giuseppe Rondizzoni (1788-1866), militar italiano veterano de las guerras napoleónicas que participó en la independencia de Chile, alcanzando el grado de general.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'itchile-toesca']
	},
	{
		id: 'franklin',
		name: 'Franklin',
		coordinates: [-70.6491, -33.4764],
		lines: ['L2', 'L6'],
		inauguratedAt: '1978-03-31',
		commune: 'Santiago',
		history:
			'Originalmente estación de paso en un barrio comercial popular (Matadero Franklin), hoy transformada en combinación vital con la Línea 6.',
		nameOrigin:
			'Por la calle Franklin, nombrada en honor a Benjamin Franklin (1706-1790), político y científico estadounidense, padre fundador de EEUU, famoso por sus estudios sobre la electricidad.',
		curiosity:
			'El barrio Franklin es famoso por su mercado persa (Persa Bío Bío) y el comercio popular de antigüedades.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'fandom-franklin']
	},
	{
		id: 'el-llano',
		name: 'El Llano',
		coordinates: [-70.6521, -33.4901],
		lines: ['L2'],
		inauguratedAt: '1978-12-21',
		commune: 'San Miguel',
		history: 'Parte de la primera extensión sur de 1978.',
		nameOrigin:
			'Por el Parque El Llano Subercaseaux. Ramón Subercaseaux compró un fundo en 1849 y cedió parte para uso público.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'wikipedia-el-llano']
	},
	{
		id: 'san-miguel',
		name: 'San Miguel',
		coordinates: [-70.6512, -33.4978],
		lines: ['L2'],
		inauguratedAt: '1978-12-21',
		commune: 'San Miguel',
		history: 'Sirve al centro de la comuna de San Miguel.',
		nameOrigin:
			'Por la Comuna de San Miguel. Según la tradición, Gaspar Banda Aguilar se encomendó al Arcángel Miguel para librarse de la Inquisición, prometiendo levantar una ermita en su nombre.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'fandom-san-miguel']
	},
	{
		id: 'lo-vial',
		name: 'Lo Vial',
		coordinates: [-70.6534, -33.5067],
		lines: ['L2'],
		inauguratedAt: '1978-12-21',
		commune: 'San Miguel',
		history: 'Parte de la extensión sur de 1978.',
		nameOrigin:
			'Por la Avenida Lo Vial. Los nombres con prefijo "Lo" derivan de antiguos fundos coloniales.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'departamental',
		name: 'Departamental',
		coordinates: [-70.6545, -33.5145],
		lines: ['L2'],
		inauguratedAt: '1978-12-21',
		commune: 'San Miguel',
		history: 'Parte de la extensión sur de 1978.',
		nameOrigin: 'Por la Avenida Departamental.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'ciudad-del-nino',
		name: 'Ciudad del Niño',
		coordinates: [-70.6558, -33.5218],
		lines: ['L2'],
		inauguratedAt: '1978-12-21',
		commune: 'San Miguel',
		history: 'Parte de la extensión sur de 1978.',
		nameOrigin:
			'Por la Ciudad del Niño Presidente Juan Antonio Ríos, extinto hogar de acogida para niños abandonados fundado en 1943.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'lo-ovalle',
		name: 'Lo Ovalle',
		coordinates: [-70.6572, -33.5289],
		lines: ['L2'],
		inauguratedAt: '1978-12-21',
		commune: 'La Cisterna',
		history: 'Terminal sur de la Línea 2 entre 1978 y 2004.',
		nameOrigin:
			'Por el Poblado de Puente Lo Ovalle, originado hacia 1880. El nombre del fundo viene de la tradicional familia santiaguina Ovalle.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2', 'wikipedia-lo-ovalle']
	},
	{
		id: 'el-parron',
		name: 'El Parrón',
		coordinates: [-70.6584, -33.5356],
		lines: ['L2'],
		inauguratedAt: '2004-12-22',
		commune: 'La Cisterna',
		history: 'Parte de la extensión sur de 2004.',
		nameOrigin:
			'Por la Avenida El Parrón. "Parrón" hace referencia a las estructuras de parras de uva típicas de Chile.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'la-cisterna',
		name: 'La Cisterna',
		coordinates: [-70.6584, -33.5299],
		lines: ['L2', 'L4A'],
		inauguratedAt: '2004-12-22',
		commune: 'La Cisterna',
		history: 'Importante nodo de combinación entre L2 y L4A. Estación intermodal del sector sur.',
		nameOrigin:
			'Por la Comuna de La Cisterna. Una "cisterna" es un depósito para almacenar agua, sugiriendo que el fundo original tenía esta infraestructura.',
		dailyPassengers: 45000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'el-bosque',
		name: 'El Bosque',
		coordinates: [-70.6598, -33.5545],
		lines: ['L2'],
		inauguratedAt: '2023-11-27',
		commune: 'El Bosque',
		history: 'Primera estación que lleva el metro a la comuna de El Bosque.',
		nameOrigin: 'Por la Comuna de El Bosque.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'observatorio',
		name: 'Observatorio',
		coordinates: [-70.6612, -33.5634],
		lines: ['L2'],
		inauguratedAt: '2023-11-27',
		commune: 'El Bosque',
		history: 'Parte de la extensión sur a San Bernardo de 2023.',
		nameOrigin: 'Por la Avenida Observatorio.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'copa-lo-martinez',
		name: 'Copa Lo Martínez',
		coordinates: [-70.6625, -33.5712],
		lines: ['L2'],
		inauguratedAt: '2023-11-27',
		commune: 'El Bosque',
		history: 'Parte de la extensión sur a San Bernardo de 2023.',
		nameOrigin:
			'Por la Avenida Lo Martínez. "Copa" hace referencia a un complejo deportivo del sector.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},
	{
		id: 'hospital-el-pino',
		name: 'Hospital El Pino',
		coordinates: [-70.6638, -33.5789],
		lines: ['L2'],
		inauguratedAt: '2023-11-27',
		commune: 'San Bernardo',
		history:
			'Terminal sur actual. Primera estación del metro en la comuna de San Bernardo. Sirve al Hospital El Pino.',
		nameOrigin:
			'Por el Hospital El Pino, establecimiento de salud ubicado en el límite entre El Bosque y San Bernardo.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l2']
	},

	// ===== LÍNEA 3 (CAFÉ) =====
	{
		id: 'plaza-quilicura',
		name: 'Plaza Quilicura',
		coordinates: [-70.7321, -33.3589],
		lines: ['L3'],
		inauguratedAt: '2023-09-25',
		commune: 'Quilicura',
		history: 'Terminal norte de la Línea 3, parte de la extensión a Quilicura de 2023.',
		nameOrigin: 'Por la Plaza de Armas de Quilicura, centro cívico de la comuna.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'lo-cruzat',
		name: 'Lo Cruzat',
		coordinates: [-70.7234, -33.3678],
		lines: ['L3'],
		inauguratedAt: '2023-09-25',
		commune: 'Quilicura',
		history: 'Parte de la extensión a Quilicura de 2023.',
		nameOrigin: 'Por el Sector Lo Cruzat de Quilicura.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'ferrocarril',
		name: 'Ferrocarril',
		coordinates: [-70.7156, -33.3756],
		lines: ['L3'],
		inauguratedAt: '2023-09-25',
		commune: 'Quilicura',
		history: 'Parte de la extensión a Quilicura de 2023. Futura conexión con el Tren Santiago-Batuco.',
		nameOrigin: 'Por la proximidad a la línea férrea.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'los-libertadores',
		name: 'Los Libertadores',
		coordinates: [-70.6789, -33.3845],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Quilicura/Huechuraba',
		history: 'Terminal norte original de la Línea 3 (2019-2023).',
		nameOrigin:
			'Por la Autopista Los Libertadores y la Villa Los Libertadores. Homenaje a los libertadores de Chile tras la Batalla de Chacabuco.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'cardenal-caro',
		name: 'Cardenal Caro',
		coordinates: [-70.6645, -33.3912],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Conchalí',
		history: 'Parte del tramo inaugural de la Línea 3.',
		nameOrigin:
			'Por José María Caro Rodríguez (1866-1958), Arzobispo de Santiago y primer cardenal chileno (1946).',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'vivaceta',
		name: 'Vivaceta',
		coordinates: [-70.6512, -33.3989],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Conchalí',
		history: 'Parte del tramo inaugural de la Línea 3.',
		nameOrigin:
			'Por Fermín Vivaceta Rupio (1829-1890), arquitecto autodidacta que diseñó la torre de la Iglesia de San Francisco y el Mercado Central de Santiago.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'conchali',
		name: 'Conchalí',
		coordinates: [-70.6489, -33.4067],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Conchalí',
		history: 'Sirve al centro de la comuna de Conchalí.',
		nameOrigin:
			'Por la Comuna de Conchalí. Del mapuche "Conchalí" que significa "colliguay amarillo" o lugar de juncos.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'plaza-chacabuco',
		name: 'Plaza Chacabuco',
		coordinates: [-70.6478, -33.4145],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Conchalí/Independencia',
		history: 'Sirve a la Plaza Chacabuco, importante punto histórico.',
		nameOrigin:
			'Por la Plaza Chacabuco, donde el Ejército Libertador se estableció tras la Batalla de Chacabuco (13 de febrero de 1817), victoria decisiva para la independencia.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'hospitales',
		name: 'Hospitales',
		coordinates: [-70.6562, -33.4177],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Independencia',
		history:
			'Sirve al barrio médico más importante de Chile: Hospital Clínico de la U. de Chile, Hospital San José, Roberto del Río, Instituto Nacional del Cáncer.',
		nameOrigin:
			'Nombre funcional que agrupa a la concentración de centros hospitalarios del sector.',
		pictogram: 'Cruz médica y edificio',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3', 'la-tercera-nombres']
	},
	{
		id: 'plaza-de-armas',
		name: 'Plaza de Armas',
		coordinates: [-70.6517, -33.4378],
		lines: ['L3', 'L5'],
		inauguratedAt: '2019-01-22',
		commune: 'Santiago',
		history:
			'Estación bajo el corazón histórico de Santiago. Posee las escaleras mecánicas más largas de la red (15,6 m). Una de las más profundas (33 metros).',
		nameOrigin:
			'Por la Plaza de Armas de Santiago, fundada en 1541 por Pedro de Valdivia como el centro de la ciudad colonial, corazón histórico de Chile.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'parque-almagro',
		name: 'Parque Almagro',
		coordinates: [-70.6478, -33.4501],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Santiago',
		history: 'Sirve al Parque Almagro y sector sur del centro.',
		nameOrigin:
			'Por Diego de Almagro (1475-1538), conquistador español considerado el descubridor de Chile (1536).',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'matta',
		name: 'Matta',
		coordinates: [-70.6423, -33.4578],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Santiago',
		history: 'Futura combinación con Línea 9.',
		nameOrigin:
			'Por Manuel Antonio Matta Goyenechea (1826-1892), político y escritor, cofundador del Partido Radical de Chile.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'irarrazaval',
		name: 'Irarrázaval',
		coordinates: [-70.6203, -33.4535],
		lines: ['L3', 'L5'],
		inauguratedAt: '2019-01-22',
		commune: 'Ñuñoa',
		history: 'Combinación entre L3 y L5 en el eje de la avenida Irarrázaval.',
		nameOrigin:
			'Por Manuel José Irarrázaval Larraín (1835-1896), político conservador, Ministro de Estado y promotor de reformas sociales.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'monsenor-eyzaguirre',
		name: 'Monseñor Eyzaguirre',
		coordinates: [-70.6098, -33.4512],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Ñuñoa',
		history: 'Nombre preliminar: "Tegualda".',
		nameOrigin:
			'Por José Ignacio Eyzaguirre Portales (1817-1875), eclesiástico, historiador y político chileno.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3', 'wikipedia-eyzaguirre']
	},
	{
		id: 'nunoa',
		name: 'Ñuñoa',
		coordinates: [-70.6044, -33.4535],
		lines: ['L3', 'L6'],
		inauguratedAt: '2017-11-02',
		commune: 'Ñuñoa',
		history: 'Combinación clave entre L3 y L6. Una de las más profundas (33 metros).',
		nameOrigin:
			'Por la comuna de Ñuñoa. Del mapudungun "Ñuñohue" que significa "lugar de ñuños" (hierbas medicinales/flores amarillas).',
		pictogram: 'Una flor de Ñuño estilizada',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3', 'wikipedia-l6']
	},
	{
		id: 'chile-espana',
		name: 'Chile España',
		coordinates: [-70.5978, -33.4523],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Ñuñoa',
		history: 'Futura combinación con Línea 8. Nombre preliminar: "Plaza Armenia".',
		nameOrigin:
			'Por la Avenida Chile España, que conmemora las relaciones bilaterales entre ambos países.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'villa-frei',
		name: 'Villa Frei',
		coordinates: [-70.5889, -33.4501],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'Ñuñoa',
		history: 'Sirve al conjunto habitacional Villa Presidente Frei, declarado Zona Típica en 2015.',
		nameOrigin:
			'Por la Villa Presidente Frei, conjunto habitacional inaugurado en 1968 durante el gobierno de Eduardo Frei Montalva.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},
	{
		id: 'plaza-egana',
		name: 'Plaza Egaña',
		coordinates: [-70.5756, -33.4478],
		lines: ['L3', 'L4'],
		inauguratedAt: '2019-01-22',
		commune: 'Ñuñoa/La Reina',
		history:
			'Estación más grande de L3 (15.960 m²), única construida en curva. Combinación con Línea 4.',
		nameOrigin:
			'Por Mariano Egaña Fabres (1793-1846), jurista y diplomático, autor de la Constitución de 1833.',
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l3', 'msgg-l3']
	},
	{
		id: 'fernando-castillo-velasco',
		name: 'Fernando Castillo Velasco',
		coordinates: [-70.5634, -33.4456],
		lines: ['L3'],
		inauguratedAt: '2019-01-22',
		commune: 'La Reina',
		history: 'Terminal oriente de la Línea 3.',
		nameOrigin:
			'Por Fernando Castillo Velasco (1918-2013), arquitecto, primer rector laico de la Universidad Católica elegido democráticamente, y alcalde de La Reina. Promotor del desarrollo urbano humanista.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l3']
	},

	// ===== LÍNEA 5 (VERDE) =====
	{
		id: 'plaza-de-maipu',
		name: 'Plaza de Maipú',
		coordinates: [-70.7564, -33.5116],
		lines: ['L5'],
		inauguratedAt: '2011-02-03',
		commune: 'Maipú',
		history: 'Terminal poniente de la Línea 5, consolidando la conexión con la populosa comuna de Maipú.',
		nameOrigin:
			'Ubicada junto a la Plaza de Armas de Maipú, en la comuna donde se libró la batalla que selló la independencia de Chile (5 de abril de 1818).',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l5']
	},
	{
		id: 'quinta-normal',
		name: 'Quinta Normal',
		coordinates: [-70.68, -33.4403],
		lines: ['L5'],
		inauguratedAt: '1997-04-05',
		commune: 'Quinta Normal',
		history:
			'Alberga el mural "Verbo América" de Roberto Matta, obra de cerámica policromada con surrealismo cósmico.',
		nameOrigin:
			'Por el Parque Quinta Normal, espacio que funcionaba como quinta de experimentación agrícola desde 1842.',
		curiosity:
			'El parque alberga varios museos y fue sede de exposiciones internacionales en el siglo XIX.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		artworks: getArtworksByStation('quinta-normal'),
		sources: ['wikipedia-l5', 'metroarte-org']
	},
	{
		id: 'mirador',
		name: 'Mirador',
		coordinates: [-70.6061, -33.5131],
		lines: ['L5'],
		inauguratedAt: '1997-04-05',
		commune: 'La Florida',
		history:
			'Estación elevada sobre viaducto con arquitectura de acero y vidrio, ofreciendo vistas panorámicas de la Cordillera de los Andes.',
		nameOrigin: 'Por las vistas panorámicas que ofrece desde el viaducto elevado.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l5']
	},
	{
		id: 'bellavista-de-la-florida',
		name: 'Bellavista de La Florida',
		coordinates: [-70.5987, -33.5206],
		lines: ['L5'],
		inauguratedAt: '1997-04-05',
		commune: 'La Florida',
		history:
			'Estación elevada que sirve a la populosa comuna de La Florida, con arquitectura moderna de acero y vidrio.',
		nameOrigin: 'Por el sector Bellavista de la comuna de La Florida.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l5']
	},
	{
		id: 'vicente-valdes',
		name: 'Vicente Valdés',
		coordinates: [-70.5975, -33.4878],
		lines: ['L4', 'L4A', 'L5'],
		inauguratedAt: '2006-08-16',
		commune: 'La Florida',
		history:
			'Nodo triple de combinación entre L4, L4A y L5. Una de las estaciones más complejas del sistema.',
		nameOrigin:
			'Homenajea a Vicente Valdés Freire, empresario y político chileno, dueño de terrenos en el sector.',
		dailyPassengers: 65000,
		isTransfer: true,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l5', 'wikipedia-l4']
	},

	// ===== LÍNEA 6 (VIOLETA) =====
	{
		id: 'cerrillos',
		name: 'Cerrillos',
		coordinates: [-70.7144, -33.4925],
		lines: ['L6'],
		inauguratedAt: '2017-11-02',
		commune: 'Cerrillos',
		history: 'Terminal sur de la Línea 6, primera línea completamente automática de Chile.',
		nameOrigin:
			'Por la comuna de Cerrillos, cuyo nombre proviene de los pequeños cerros que existían en la zona.',
		isTransfer: false,
		isTerminal: true,
		isAccessible: true,
		sources: ['wikipedia-l6']
	},
	{
		id: 'bio-bio',
		name: 'Bío Bío',
		coordinates: [-70.6421, -33.4763],
		lines: ['L6'],
		inauguratedAt: '2017-11-02',
		commune: 'Santiago',
		history: 'Estación que sirve al histórico barrio Franklin y sector Bío Bío, famoso por su persa.',
		nameOrigin:
			'Por el barrio histórico, pero evoca al río y la onomatopeya mapuche del canto del pájaro fío-fío.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: true,
		sources: ['wikipedia-l6']
	}
];

// Estaciones fantasma (no operativas pero construidas)
export const ghostStations: Station[] = [
	{
		id: 'libertad',
		name: 'Libertad',
		coordinates: [-70.67, -33.44],
		lines: ['L5'],
		inauguratedAt: '',
		commune: 'Quinta Normal',
		history:
			'Ubicada en el Barrio Yungay, entre las estaciones Cumming y Quinta Normal, bajo la Plaza Libertad. Posee andenes, mesaninas y accesos construidos, pero cerrados a la superficie.',
		nameOrigin: 'Por la Plaza Libertad del Barrio Yungay.',
		curiosity:
			'Fue diseñada proyectando una densidad habitacional que no se materializó en 2004. A pesar de estar clausurada, recibe mantenimiento básico mensual: desempolvado profundo de pisos. Vecinos exigen su apertura debido al auge inmobiliario reciente.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: false,
		isGhost: true,
		ghostInfo: {
			status: 'obra_terminada',
			reason: 'Densidad habitacional insuficiente proyectada en 2004',
			visibility: 'oculta',
			currentState: 'Recibe desempolvado profundo de pisos una vez al mes'
		},
		sources: ['la-cuarta-fantasmas', 'la-tercera-libertad']
	},
	{
		id: 'echeverria',
		name: 'Echeverría',
		coordinates: [-70.635, -33.52],
		lines: ['L4A'],
		inauguratedAt: '',
		commune: 'La Cisterna',
		history:
			'Situada en la intersección de Vespucio Sur con calle Ignacio Echeverría. Es la estación fantasma más visible del sistema.',
		nameOrigin: 'Por la calle Ignacio Echeverría.',
		curiosity:
			'Al pasar en tren o por la autopista, se pueden observar los andenes en obra gruesa y las pasarelas peatonales inconclusas.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: false,
		isGhost: true,
		ghostInfo: {
			status: 'obra_gruesa',
			reason: 'Demanda del entorno residencial (casas bajas) no justificaba detener un tren de flujo rápido',
			visibility: 'visible',
			currentState: 'Visible desde trenes y autopista, andenes en obra gruesa'
		},
		sources: ['la-cuarta-fantasmas', 'wikipedia-l4']
	},
	{
		id: 'anden-fantasma-cal-y-canto',
		name: 'Andén Fantasma Cal y Canto',
		coordinates: [-70.6492, -33.4318],
		lines: ['L2'],
		inauguratedAt: '',
		commune: 'Santiago',
		history:
			'Cuando se construyó la Línea 2 en los años 80, se dejó listo un andén completo para la futura Línea 3, perpendicular a la L2. La Línea 3 original se canceló tras el terremoto de 1985.',
		nameOrigin: 'Extensión de la estación Cal y Canto.',
		curiosity:
			'Cuando la L3 finalmente se construyó (2019), el trazado y tecnología (rueda de acero) cambiaron, haciendo inservible el viejo andén (diseñado para neumáticos). Hoy permanece oculto tras muros falsos, una cápsula del tiempo de la ingeniería de los 80.',
		isTransfer: false,
		isTerminal: false,
		isAccessible: false,
		isGhost: true,
		ghostInfo: {
			status: 'oculta',
			reason: 'Cambio de tecnología de neumáticos a ruedas de acero en la nueva L3',
			visibility: 'oculta',
			currentState: 'Oculto tras muros falsos en la estación de combinación actual'
		},
		sources: ['la-cuarta-fantasmas', 'wikipedia-l2']
	}
];

// Combinar todas las estaciones
export const allStations = [...stations, ...ghostStations];

export const stationsById = Object.fromEntries(allStations.map((s) => [s.id, s]));

export function getStation(id: string): Station | undefined {
	return stationsById[id];
}

export function getStationsByLine(lineId: string): Station[] {
	return stations.filter((s) => s.lines.includes(lineId));
}

export function getTransferStations(): Station[] {
	return stations.filter((s) => s.isTransfer);
}

export function getGhostStations(): Station[] {
	return ghostStations;
}

export function getStationsWithArt(): Station[] {
	return stations.filter((s) => s.artworks && s.artworks.length > 0);
}
