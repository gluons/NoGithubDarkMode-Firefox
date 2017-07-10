/* eslint-disable arrow-body-style */

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const sass = require('gulp-ruby-sass');
const uglify = require('gulp-uglify');

const del = require('del');
const spawn = require('cross-spawn');

const addonJSSrcPath = './src/js/addon';
const addonSCSSSrcPath = './src/scss/addon';
const addonDistPath = './addon';
const addonCssFileName = 'NoDarkMode.css';

const targetBrowsers = ['Firefox >= 48', 'FirefoxAndroid >= 48'];

// Clean task
gulp.task('clean', () => del(`${addonDistPath}/*`));

// Manifest task
gulp.task('manifest', () => gulp.src('./asset/manifest.json').pipe(gulp.dest(addonDistPath)));

// JS task
gulp.task('js', () => gulp.src(`${addonJSSrcPath}/*.js`).pipe(gulp.dest(`${addonDistPath}/content`)));
gulp.task('js:min', () => {
	return gulp.src(`${addonJSSrcPath}/*.js`)
		.pipe(babel({
			presets: [
				['env', {
					targets: {
						browsers: targetBrowsers,
						uglify: true
					}
				}]
			]
		}))
		.pipe(uglify())
		.pipe(gulp.dest(`${addonDistPath}/content`));
});

// SCSS tasks
gulp.task('scss', () => {
	return sass(`${addonSCSSSrcPath}/*.scss`, { style: 'expanded' })
		.on('error', sass.logError)
		.pipe(concat(addonCssFileName))
		.pipe(gulp.dest(`${addonDistPath}/content`));
});
gulp.task('scss:min', () => {
	return sass(`${addonSCSSSrcPath}/*.scss`, { style: 'expanded' })
		.on('error', sass.logError)
		.pipe(concat(addonCssFileName))
		.pipe(postcss())
		.pipe(gulp.dest(`${addonDistPath}/content`));
});

// Options page tasks
gulp.task('options', done => {
	spawn.sync('npm', ['run', 'build:poi'], {
		stdio: 'inherit'
	});

	done();
});

// Watch tasks
gulp.task('watch:manifest', () => {
	return gulp.watch('./asset/manifest.json', ['manifest']);
});
gulp.task('watch:js', () => {
	return gulp.watch(`${addonJSSrcPath}/*.js`, ['js']);
});
gulp.task('watch:scss', () => {
	return gulp.watch(`${addonSCSSSrcPath}/*.scss`, ['scss']);
});
gulp.task('watch:options', () => {
	return gulp.watch(['./src/view/*', './src/options.js'], ['options']);
});
gulp.task('watch', ['watch:manifest', 'watch:js', 'watch:scss', 'watch:options']);

// Build tasks
gulp.task('build', ['manifest', 'js', 'scss']);
gulp.task('build:min', ['manifest', 'js:min', 'scss:min']);

// Default task
gulp.task('default', ['watch']);
