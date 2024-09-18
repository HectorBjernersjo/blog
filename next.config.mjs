// import path from 'path';
// import { fileURLToPath } from 'url';
//
// // Simulate __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// const nextConfig = {
// 	output: 'standalone',
// 	assetPrefix: '/static', // Ensures that static files are served from the current path
// 	webpack(config) {
// 		config.module.rules.push({
// 			test: /\.svg$/,
// 			use: ['@svgr/webpack'],
// 		});
//
// 		return config;
// 	},
// };
//
// export default nextConfig;
//
const nextConfig = {
	output: 'export',
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
}

export default nextConfig;
