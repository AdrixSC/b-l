// Dependencias
var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-csso');
var plumber = require('gulp-plumber');
var liveReload = require('gulp-livereload');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

// Compila + añade prefijos
gulp.task('css-des', function() {
    return gulp.src('src/less/**/*.less')
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css'))
        .pipe(liveReload())
});

// Compila + añade prefijos + minimiza
gulp.task('css-dist', function() {
    return gulp.src('src/less/**/*.less')
        .pipe(plumber(function(error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(less({ modifyVars: { '@bg-color': 'red', '@font-color': '#147' } }))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

// Copia html a dist y remplaza la extension .css por .min.css
gulp.task('html-dist', function() {
    return gulp.src('src/**/*.html')
        .pipe(replace('.css">', '.min.css">'))
        .pipe(gulp.dest('dist'))
});

// Observa los archivos .less y cuando cambian ejecuta la tarea css
gulp.task('watch', function() {
    liveReload.listen();
    gulp.watch('src/less/*.less', ['css-des', 'css-dist']);
});

// Distribuir
gulp.task('dist', ['html-dist', 'css-dist']);

// Tarea por defecto si no se indica nada
gulp.task('default', ['watch']);