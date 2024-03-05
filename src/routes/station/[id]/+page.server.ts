export async function load({ fetch }) {
	// get static/data.csv
	const data = await fetch('static/data.csv');
	const text = await data.text();
	const rows = text.split('\n');
	const headers = rows[0].split(',');
	console.log('headers', headers);
	const stations = rows.slice(1).map((row) => {
		const station = {};
		row.split(',').forEach((cell, i) => {
			station[headers[i]] = cell;
		});
		return station;
	});
	console.log('stations', stations);
	return {
		props: {
			stations
		}
	};
	// return { id: 'LD' };
}
