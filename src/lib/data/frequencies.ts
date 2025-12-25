// Frecuencias del Metro de Santiago basadas en datos GTFS oficiales
// Headway = tiempo entre trenes en segundos

export interface TimeSlot {
	start: string; // HH:MM
	end: string;
	headwaySecs: number;
}

export interface LineFrequency {
	lineId: string;
	weekday: TimeSlot[];
	saturday: TimeSlot[];
	sunday: TimeSlot[];
}

// Frecuencias por línea (días laborales - servicio "L")
// Datos extraídos de GTFS PO06dic
export const lineFrequencies: LineFrequency[] = [
	{
		lineId: 'L1',
		weekday: [
			{ start: '06:00', end: '07:00', headwaySecs: 150 },
			{ start: '07:00', end: '09:00', headwaySecs: 103 }, // Punta mañana
			{ start: '09:00', end: '18:00', headwaySecs: 164 }, // Valle
			{ start: '18:00', end: '20:00', headwaySecs: 103 }, // Punta tarde
			{ start: '20:00', end: '21:00', headwaySecs: 129 },
			{ start: '21:00', end: '23:00', headwaySecs: 257 }
		],
		saturday: [{ start: '07:00', end: '23:00', headwaySecs: 235 }],
		sunday: [{ start: '07:30', end: '23:00', headwaySecs: 360 }]
	},
	{
		lineId: 'L2',
		weekday: [
			{ start: '06:00', end: '07:00', headwaySecs: 240 },
			{ start: '07:00', end: '09:00', headwaySecs: 180 }, // Punta mañana
			{ start: '09:00', end: '18:00', headwaySecs: 257 }, // Valle
			{ start: '18:00', end: '20:00', headwaySecs: 180 }, // Punta tarde
			{ start: '20:00', end: '21:00', headwaySecs: 199 },
			{ start: '21:00', end: '23:00', headwaySecs: 300 }
		],
		saturday: [{ start: '07:00', end: '23:00', headwaySecs: 280 }],
		sunday: [{ start: '07:30', end: '23:00', headwaySecs: 375 }]
	},
	{
		lineId: 'L3',
		weekday: [
			{ start: '06:00', end: '07:00', headwaySecs: 327 },
			{ start: '07:00', end: '09:00', headwaySecs: 257 }, // Punta mañana
			{ start: '09:00', end: '18:00', headwaySecs: 327 }, // Valle
			{ start: '18:00', end: '20:00', headwaySecs: 257 }, // Punta tarde
			{ start: '20:00', end: '21:00', headwaySecs: 300 },
			{ start: '21:00', end: '23:00', headwaySecs: 327 }
		],
		saturday: [{ start: '07:00', end: '23:00', headwaySecs: 327 }],
		sunday: [{ start: '07:30', end: '23:00', headwaySecs: 400 }]
	},
	{
		lineId: 'L4',
		weekday: [
			{ start: '06:00', end: '07:00', headwaySecs: 300 },
			{ start: '07:00', end: '09:00', headwaySecs: 171 }, // Punta mañana
			{ start: '09:00', end: '18:00', headwaySecs: 327 }, // Valle
			{ start: '18:00', end: '20:00', headwaySecs: 171 }, // Punta tarde
			{ start: '20:00', end: '21:00', headwaySecs: 171 },
			{ start: '21:00', end: '23:00', headwaySecs: 257 }
		],
		saturday: [{ start: '07:00', end: '23:00', headwaySecs: 280 }],
		sunday: [{ start: '07:30', end: '23:00', headwaySecs: 450 }]
	},
	{
		lineId: 'L4A',
		weekday: [
			{ start: '06:00', end: '07:00', headwaySecs: 1200 },
			{ start: '07:00', end: '23:00', headwaySecs: 327 }
		],
		saturday: [{ start: '07:00', end: '23:00', headwaySecs: 327 }],
		sunday: [{ start: '07:30', end: '23:00', headwaySecs: 327 }]
	},
	{
		lineId: 'L5',
		weekday: [
			{ start: '06:00', end: '07:00', headwaySecs: 200 },
			{ start: '07:00', end: '09:00', headwaySecs: 164 }, // Punta mañana
			{ start: '09:00', end: '18:00', headwaySecs: 240 }, // Valle
			{ start: '18:00', end: '20:00', headwaySecs: 157 }, // Punta tarde
			{ start: '20:00', end: '21:00', headwaySecs: 157 },
			{ start: '21:00', end: '23:00', headwaySecs: 240 }
		],
		saturday: [{ start: '07:00', end: '23:00', headwaySecs: 280 }],
		sunday: [{ start: '07:30', end: '23:00', headwaySecs: 380 }]
	},
	{
		lineId: 'L6',
		weekday: [
			{ start: '06:00', end: '07:00', headwaySecs: 360 },
			{ start: '07:00', end: '09:00', headwaySecs: 277 }, // Punta mañana
			{ start: '09:00', end: '18:00', headwaySecs: 400 }, // Valle
			{ start: '18:00', end: '20:00', headwaySecs: 257 }, // Punta tarde
			{ start: '20:00', end: '21:00', headwaySecs: 327 },
			{ start: '21:00', end: '23:00', headwaySecs: 400 }
		],
		saturday: [{ start: '07:00', end: '23:00', headwaySecs: 400 }],
		sunday: [{ start: '07:30', end: '23:00', headwaySecs: 450 }]
	}
];

// Obtener la frecuencia actual para una línea
export function getCurrentHeadway(lineId: string): number {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

	const dayOfWeek = now.getDay();
	const lineFreq = lineFrequencies.find((f) => f.lineId === lineId);

	if (!lineFreq) return 180; // Default: 3 minutos

	let slots: TimeSlot[];
	if (dayOfWeek === 0) {
		slots = lineFreq.sunday;
	} else if (dayOfWeek === 6) {
		slots = lineFreq.saturday;
	} else {
		slots = lineFreq.weekday;
	}

	for (const slot of slots) {
		if (currentTime >= slot.start && currentTime < slot.end) {
			return slot.headwaySecs;
		}
	}

	return 300; // Default fuera de horario
}

// Calcular velocidad de animación basada en frecuencia
// A mayor frecuencia (menor headway), más trenes y/o más rápido
export function getAnimationSpeed(lineId: string, lineLength: number): number {
	const headway = getCurrentHeadway(lineId);

	// Velocidad promedio del metro: ~35 km/h = 0.01 km/s
	// Tiempo de recorrido completo = lineLength / 35 * 3600 segundos
	// Progreso por frame (60fps) = 1 / (tiempo_recorrido * 60)

	const avgSpeedKmH = 35;
	const tripTimeSeconds = (lineLength / avgSpeedKmH) * 3600;
	const progressPerFrame = 1 / (tripTimeSeconds * 60);

	// Ajustar velocidad basada en headway (para visualización)
	// Menor headway = más trenes, podemos ir un poco más rápido para que se note el movimiento
	const headwayFactor = Math.max(0.5, Math.min(2, 200 / headway));

	return progressPerFrame * headwayFactor * 2; // Factor 2 para hacer la animación más visible
}

// Calcular número de trenes basado en frecuencia y longitud de línea
export function getTrainCount(lineId: string, lineLength: number): number {
	const headway = getCurrentHeadway(lineId);

	// Velocidad promedio: 35 km/h
	// Tiempo de recorrido completo (ida y vuelta): lineLength * 2 / 35 horas
	const tripTimeHours = (lineLength * 2) / 35;
	const tripTimeSeconds = tripTimeHours * 3600;

	// Número de trenes = tiempo de vuelta / headway
	const numTrains = Math.ceil(tripTimeSeconds / headway);

	// Limitar para no sobrecargar la visualización
	return Math.max(2, Math.min(numTrains, 8));
}

// Mapeo de nombre de línea (GeoJSON) a ID de línea
export function normalizeLineId(lineaName: string): string {
	const mapping: Record<string, string> = {
		'LINEA 1': 'L1',
		'LINEA 2': 'L2',
		'LINEA 3': 'L3',
		'LINEA 4': 'L4',
		'LINEA 4A': 'L4A',
		'LINEA 5': 'L5',
		'LINEA 6': 'L6',
		'Linea 1': 'L1',
		'Linea 2': 'L2',
		'Linea 3': 'L3',
		'Linea 4': 'L4',
		'Linea 4A': 'L4A',
		'Linea 5': 'L5',
		'Linea 6': 'L6'
	};
	return mapping[lineaName] || 'L1';
}
