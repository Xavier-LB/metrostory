/**
 * Datos de líneas del Metro de Santiago
 * Re-exportado desde el loader centralizado (JSON)
 *
 * Para contribuir datos, edita:
 * - data/lines/lines.json (líneas operativas)
 * - data/lines/future-lines.json (líneas en construcción/planificadas)
 * Ver: docs/data-guide.md
 */

export {
	lines,
	futureLines,
	linesById,
	allLinesById,
	getLineColor,
	getOperationalLines,
	getFutureLines
} from './loader';
