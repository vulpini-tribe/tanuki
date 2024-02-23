import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

const buildTime = new Date().toLocaleDateString('ru-RU', {
	timeZoneName: 'short',
	hour: '2-digit',
	minute: '2-digit'
});

const config = ({ mode }) => {
	process.env = {
		...process.env,
		...loadEnv(mode, process.cwd()),
		VITE_BUILD_TIME: buildTime
	};

	const proxyConfig = {
		'/api': {
			target: process.env.VITE_REACT_APP_API_URL,
			changeOrigin: true
		}
	};

	return defineConfig({
		plugins: [svgr(), react()],
		resolve: {
			alias: {
				'@src': fileURLToPath(new URL('./src', import.meta.url)),
				'@api': fileURLToPath(new URL('./src/core/api', import.meta.url)),
				'@core': fileURLToPath(new URL('./src/core', import.meta.url)),
				'@routes': fileURLToPath(new URL('./src/core/routes', import.meta.url)),
				'@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
				'@features': fileURLToPath(new URL('./src/features', import.meta.url)),
				'@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
				'@hooks': fileURLToPath(new URL('./src/utils/hooks', import.meta.url)),
				'@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
				'@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
				'@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
				'@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
				'@fonts': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
				'@yup': fileURLToPath(new URL('./src/utils/yup', import.meta.url))
			}
		},
		server: {
			port: 3000,
			open: true,
			proxy: proxyConfig
		},
		preview: {
			port: 3030,
			proxy: proxyConfig
		}
	});
};

export default config;
