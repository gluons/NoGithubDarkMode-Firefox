import gulp from 'gulp';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import sass from 'gulp-ruby-sass';

import del from 'del';

const { parallel, watch: gWatch } = gulp;

const addonDistPath = './addon';
const addonCssFileName = 'NoDarkMode.css';

// Clean task
export function clean() {
	return del(`${addonDistPath}/*`);
}

// Asset task
export function asset() {
	return gulp.src('./asset/**/*')
		.pipe(gulp.dest(addonDistPath));
}

// Content SCSS tasks
export function contentSCSS() {
	return sass('./src/content/scss/*.scss', { style: 'expanded' })
		.on('error', sass.logError)
		.pipe(concat(addonCssFileName))
		.pipe(gulp.dest(addonDistPath));
}
contentSCSS.displayName = 'content:scss';

export function contentSCSSMin() {
	return sass('./src/content/scss/*.scss', { style: 'expanded' })
		.on('error', sass.logError)
		.pipe(concat(addonCssFileName))
		.pipe(postcss())
		.pipe(gulp.dest(addonDistPath));
}
contentSCSSMin.displayName = 'content:scss:min';

// Watch tasks
export function watchAsset() {
	asset();

	return gWatch('./asset/**/*', asset);
}
watchAsset.displayName = 'watch:asset';

export function watchContentSCSS() {
	contentSCSS();

	return gWatch('./src/content/scss/*.scss', contentSCSS);
}
watchContentSCSS.displayName = 'watch:content:scss';

export const watch = parallel(watchAsset, watchContentSCSS);
watch.displayName = 'watch';

// Build tasks
export const build = parallel(asset, contentSCSSMin);

// Default task
export default watch;
