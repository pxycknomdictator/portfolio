import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$src: "./src/",
			$utils: "./src/utils/",
			$models: "./src/models/",
			$services: "./src/services/",
			$components: "./src/components"
		}
	}
};

export default config;
