import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		laravel({
			input: ['resources/css/app.css', 'resources/js/main.tsx'],
			refresh: true,
		}),
		// tailwindcss(),
	],
	server: {
		host: '0.0.0.0',
		hmr: {
			host: 'localhost'
		},
		watch: {
			ignored: ['**/storage/framework/views/**'],
		},
		cors: {
			origin: [
				'http://localhost:5173',
				'http://localhost:8000',
				'https://huggingface.co',
			],
		}
	},
});
