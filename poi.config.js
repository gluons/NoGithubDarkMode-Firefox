module.exports = {
	entry: './src/options.js',
	dist: './addon',
	filename: {
		js: 'js/[name].js',
		css: 'css/[name].css'
	},
	html: {
		title: 'No GitHub Dark Mode - Options',
		description: 'Options page for No GitHub Dark Mode',
		filename: 'options.html'
	},
	copy: false,
	webpack(config) {
		let fileLoaderRules = config.module.rules.filter(rule => {
			let use = rule.use;
			return (use == 'file-loader') || (Array.isArray(use) && (use[0].loader == 'file-loader'));
		});
		if (fileLoaderRules.length > 0) {
			fileLoaderRules.forEach(fileLoaderRule => {
				fileLoaderRule.use[0].options = {
					name: '[name].[ext]',
					outputPath: 'media/',
					publicPath: '../'
				};
			});
		}
		return config;
	},
	homepage: './',
	sourceMap: false,
	removeDist: false
};
