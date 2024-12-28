export default {
	base: './',
	build: {
		//minify: false,
		rollupOptions: {
			output: {
				manualChunks: {
					three: ['three', 'three/addons'],
					keystrokes: ['@rwh/keystrokes'],
					planck: ['planck'],
				}
			}
		},
		
	},
	appType: 'mpa', // enable 404 for missing files
}
