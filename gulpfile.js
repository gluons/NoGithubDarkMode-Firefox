/* eslint-disable arrow-body-style */

const gulp = require('gulp');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const sass = require('gulp-ruby-sass');

const del = require('del');

const addonDistPath = './addon';
const addonCssFileName = 'NoDarkMode.css';

// Clean task
gulp.task('clean', () => del(`${addonDistPath}/*`));

// Asset task
gulp.task('asset', ['clean'], () => {
	return gulp.src(['./asset/**/*'])
		.pipe(gulp.dest(addonDistPath));
});

// Content SCSS tasks
gulp.task('content:scss', () => {
	return sass('./src/content/scss/*.scss', { style: 'expanded' })
		.on('error', sass.logError)
		.pipe(concat(addonCssFileName))
		.pipe(gulp.dest(addonDistPath));
});
gulp.task('content:scss:min', () => {
	return sass('./src/content/scss/*.scss', { style: 'expanded' })
		.on('error', sass.logError)
		.pipe(concat(addonCssFileName))
		.pipe(postcss())
		.pipe(gulp.dest(addonDistPath));
});

// Watch tasks
gulp.task('watch:asset', ['asset'], () => {
	return gulp.watch('./asset/**/*', ['asset']);
});
gulp.task('watch:content:scss', ['content:scss'], () => {
	return gulp.watch('./src/content/scss/*.scss', ['content:scss']);
});
gulp.task('watch', ['watch:asset', 'watch:content:scss']);

// Build tasks
gulp.task('build', ['asset', 'content:scss:min']);

// Default task
gulp.task('default', ['watch']);
