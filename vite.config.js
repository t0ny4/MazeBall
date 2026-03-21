import PreprocessorDirectives from 'unplugin-preprocessor-directives/vite'

export default {
	base: './',
	plugins: [
		PreprocessorDirectives(),
	],
	build: {
		//minify: false,
		rollupOptions: {
			output: {
				manualChunks: {
					three: ['three'],
					threeaddons: ['three/addons'],
					keystrokes: ['@rwh/keystrokes'],
					planck: ['planck'],
				}
			}
		},
    	target: 'esnext',
    	chunkSizeWarningLimit: '533K', // this is how big three.js r174 is
	},
	appType: 'mpa', // enable 404 for missing files
}
