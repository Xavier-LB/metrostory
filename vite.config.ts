import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		fs: {
			allow: [
				searchForWorkspaceRoot(process.cwd()),
				// Allow Yarn PnP virtual modules
				'.yarn'
			]
		}
	}
});
