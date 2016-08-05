var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('src/assets/styles/**/*.scss')
        .pipe(sass({ includePaths : ['src/assets/styles'] }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/client/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('src/assets/styles/**/*.scss',['styles']);
});