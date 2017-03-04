const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const concat = require('gulp-concat');

gulp.task('sass', () => {
	return sass('./src/*.scss', { style: 'expanded' })
			.on('error', sass.logError)
			.pipe(concat('NoDarkMode.css'))
			.pipe(gulp.dest('./extension'));
});

gulp.task('sass:min', () => {
	return sass('./src/*.scss', { style: 'compressed' })
			.on('error', sass.logError)
			.pipe(concat('NoDarkMode.css'))
			.pipe(gulp.dest('./extension'));
});

gulp.task('default', ['sass']);
