import { dest, parallel, src, watch as gWatch } from 'gulp';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';

import del from 'del';
import Fiber from 'fibers';
import dartSass from 'sass';

const addonDistPath = './addon';
const addonCssFileName = 'NoDarkMode.css';

sass.compiler = dartSass;

// Clean task
export function clean() {
	return del(`${addonDistPath}/*`);
}

// Asset task
export function asset() {
	return src('./asset/**/*').pipe(dest(addonDistPath));
}

// Content SCSS tasks
export function contentSCSS() {
	return src('./src/content/scss/*.scss')
		.pipe(
			sass({
				fiber: Fiber,
				outputStyle: 'expanded'
			}).on('error', sass.logError)
		)
		.pipe(concat(addonCssFileName))
		.pipe(dest(addonDistPath));
}
contentSCSS.displayName = 'content:scss';

export function contentSCSSMin() {
	return src('./src/content/scss/*.scss')
		.pipe(
			sass({
				fiber: Fiber,
				outputStyle: 'expanded'
			}).on('error', sass.logError)
		)
		.pipe(concat(addonCssFileName))
		.pipe(postcss())
		.pipe(dest(addonDistPath));
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
