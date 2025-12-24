import type { MetroLine } from '$lib/types';

export const lines: MetroLine[] = [
	{
		id: 'L1',
		name: 'Línea 1',
		color: '#D60D27',
		textColor: '#FFFFFF',
		inauguratedAt: '1975-09-15',
		terminals: ['san-pablo', 'los-dominicos'],
		length: 20.0,
		stationCount: 27
	},
	{
		id: 'L2',
		name: 'Línea 2',
		color: '#FAB515',
		textColor: '#000000',
		inauguratedAt: '1978-03-31',
		terminals: ['vespucio-norte', 'la-cisterna'],
		length: 20.5,
		stationCount: 22
	},
	{
		id: 'L3',
		name: 'Línea 3',
		color: '#9A5B29',
		textColor: '#FFFFFF',
		inauguratedAt: '2019-01-22',
		terminals: ['los-libertadores', 'fernando-castillo-velasco'],
		length: 21.7,
		stationCount: 22
	},
	{
		id: 'L4',
		name: 'Línea 4',
		color: '#2D2B73',
		textColor: '#FFFFFF',
		inauguratedAt: '2005-11-30',
		terminals: ['tobalaba', 'plaza-de-puente-alto'],
		length: 24.7,
		stationCount: 22
	},
	{
		id: 'L4A',
		name: 'Línea 4A',
		color: '#0471B9',
		textColor: '#FFFFFF',
		inauguratedAt: '2006-08-16',
		terminals: ['la-cisterna', 'vicuna-mackenna'],
		length: 7.7,
		stationCount: 6
	},
	{
		id: 'L5',
		name: 'Línea 5',
		color: '#179859',
		textColor: '#FFFFFF',
		inauguratedAt: '1997-04-05',
		terminals: ['plaza-de-maipu', 'vicente-valdes'],
		length: 30.0,
		stationCount: 30
	},
	{
		id: 'L6',
		name: 'Línea 6',
		color: '#9A3488',
		textColor: '#FFFFFF',
		inauguratedAt: '2017-11-02',
		terminals: ['cerrillos', 'los-leones'],
		length: 15.3,
		stationCount: 10
	}
];

export const linesById = Object.fromEntries(lines.map((line) => [line.id, line]));

export function getLineColor(lineId: string): string {
	return linesById[lineId]?.color ?? '#888888';
}
