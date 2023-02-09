import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: './',
	resolve: {
		alias: [
			{
				find: '@components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{
				find: '@assets',
				replacement: path.resolve(__dirname, 'src/assets'),
			},
			{
				find: '@pages',
				replacement: path.resolve(__dirname, 'src/pages'),
			},
			{
				find: '@store',
				replacement: path.resolve(__dirname, 'src/store'),
			},
			{
				find: '@queries',
				replacement: path.resolve(__dirname, 'src/queries'),
			},
			{
				find: '@layouts',
				replacement: path.resolve(__dirname, 'src/layouts'),
			},
		],
	},
});
