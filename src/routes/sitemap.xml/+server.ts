import { stations, lines } from '$lib';
import type { RequestHandler } from './$types';

const SITE_URL = 'https://metrostory.lebaux.co';

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];

	const staticPages = [
		{ url: '', priority: '1.0', changefreq: 'weekly', lastmod: today }
	];

	const stationPages = stations.map((station) => ({
		url: `/estacion/${station.id}`,
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: today
	}));

	const linePages = lines.map((line) => ({
		url: `/linea/${line.id.toLowerCase()}`,
		priority: '0.9',
		changefreq: 'monthly',
		lastmod: today
	}));

	const allPages = [...staticPages, ...linePages, ...stationPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages
	.map(
		(page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
