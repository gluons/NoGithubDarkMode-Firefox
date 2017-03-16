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

gulp.task('watch:sass', () => {
	return gulp.watch('./src/*.scss', ['sass']);
});

gulp.task('watch', ['watch:sass']);

gulp.task('build', ['sass']);

gulp.task('build:min', ['sass:min']);

gulp.task('default', ['watch']);
