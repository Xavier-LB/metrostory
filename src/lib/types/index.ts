export type Rodadura = 'neumatica' | 'ferrea';
export type LineStatus = 'operational' | 'construction' | 'planned';
export type AutomationLevel = 'manual' | 'GoA2' | 'GoA4'; // GoA4 = sin conductor

export interface MetroLine {
	id: string;
	name: string;
	color: string;
	textColor: string;
	inauguratedAt: string;
	terminals: [string, string];
	length: number;
	stationCount: number;
	// Campos adicionales de la investigación
	rodadura: Rodadura;
	automationLevel: AutomationLevel;
	status: LineStatus;
	constructionMethod?: string; // 'trinchera_abierta' | 'tunel_profundo' | 'viaducto' | 'NATM'
	description?: string;
	historicalNote?: string;
	sources?: string[]; // IDs de fuentes
}

export interface Station {
	id: string;
	name: string;
	coordinates: [number, number]; // [lng, lat]
	lines: string[];
	inauguratedAt: string;
	history: string;
	architect?: string;
	dailyPassengers?: number;
	isTransfer: boolean;
	isTerminal: boolean;
	isAccessible: boolean;
	images?: StationImage[];
	// Campos adicionales de la investigación
	nameOrigin?: string; // Origen del nombre
	pictogram?: string; // Descripción del pictograma (L3/L6)
	curiosity?: string; // Dato curioso
	artworks?: MetroArte[]; // Obras de arte en la estación
	isGhost?: boolean; // Estación fantasma
	ghostInfo?: GhostStationInfo; // Info de estación fantasma
	sources?: string[]; // IDs de fuentes
	commune?: string; // Comuna donde se ubica
	formerName?: string; // Nombre anterior si aplica
}

export interface StationImage {
	url: string;
	caption: string;
	year?: number;
	source?: string;
}

export interface HistoricalEvent {
	id: string;
	date: string;
	type: 'inauguration' | 'extension' | 'incident' | 'milestone';
	title: string;
	description: string;
	lineId?: string;
	stationIds?: string[];
}

export interface MapConfig {
	accessToken: string;
	style: string;
	center: [number, number];
	zoom: number;
}

export interface GeoJSONFeature {
	type: 'Feature';
	properties: Record<string, unknown>;
	geometry: {
		type: 'Point' | 'LineString' | 'Polygon';
		coordinates: number[] | number[][] | number[][][];
	};
}

export interface GeoJSONCollection {
	type: 'FeatureCollection';
	features: GeoJSONFeature[];
}

// Información de estación fantasma
export interface GhostStationInfo {
	status: 'obra_terminada' | 'obra_gruesa' | 'oculta';
	reason: string; // Razón del cierre
	visibility: 'visible' | 'oculta' | 'parcial';
	currentState?: string; // Estado actual
}

// Referencia a una fuente de información
export interface SourceReference {
	id: string; // ej: "[1]", "[Wikipedia-L1]"
	title: string;
	url?: string;
	consultedAt?: string; // Fecha de consulta
}

// Obras de arte del programa MetroArte
export interface MetroArte {
	id: string;
	title: string;
	artist: string;
	year?: number;
	description: string;
	type: 'mural' | 'escultura' | 'instalacion' | 'ceramica' | 'otro';
	size?: string; // ej: "1200 m²"
	location?: string; // Ubicación específica en la estación
	imageUrl?: string;
}

// Material rodante (trenes)
export interface RollingStock {
	id: string;
	model: string;
	manufacturer: string;
	country: string;
	yearIntroduced: number;
	rodadura: Rodadura;
	lines: string[];
	characteristics: string[];
	hasAirConditioning: boolean;
	isAutomatic: boolean;
	status: 'active' | 'retiring' | 'retired' | 'upcoming';
	imageUrl?: string;
}
