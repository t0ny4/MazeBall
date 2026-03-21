import PreprocessorDirectives from 'unplugin-preprocessor-directives/vite'

export default {
	base: './',
	plugins: [
		PreprocessorDirectives(),
	],
	build: {
		// minify: false,
		chunkSizeWarningLimit: 572300,
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{
							name: 'keystrokes',
							test: /keystrokes/,
						},
						{
							name: 'three',
							test: /build/,
						},
						{
							name: 'planck',
							test: /planck/,
						},
						{
							name: 'threeaddons',
							test: /examples/,
						},
					]
				}
			}
		},
    	target: 'esnext',
	},
	appType: 'mpa', // enable 404 for missing files
}
