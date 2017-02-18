const gulp = require('gulp');
const sass = require('gulp-ruby-sass');

gulp.task('sass', () => {
	return sass('./src/*.scss', { style: 'expanded' })
			.on('error', sass.logError)
			.pipe(gulp.dest('./extension'));
});

gulp.task('sass:min', () => {
	return sass('./src/*.scss', { style: 'compressed' })
			.on('error', sass.logError)
			.pipe(gulp.dest('./extension'));
});

gulp.task('default', ['sass']);
