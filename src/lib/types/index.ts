export interface MetroLine {
	id: string;
	name: string;
	color: string;
	textColor: string;
	inauguratedAt: string;
	terminals: [string, string];
	length: number;
	stationCount: number;
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
