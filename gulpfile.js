/**
 * my gulp file
 * @author chen
 * @email chen.orange@aliyun.com
 * @website http://findchen.com
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var del = require('del');

/** sass **/
gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('cache/css')) // compile to cache css
        //.pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({stream:true}));
});

/** js **/
gulp.task('js', function(){
    return gulp.src('src/js/**/*.+(js|json)')
        .pipe(gulp.dest('cache/js')) //compile to cache js
        //.pipe(gulp.dest('docs/js'))
        .pipe(browserSync.reload({stream:true}));
});


/** images **/
gulp.task('images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(gulp.dest('cache/img')); // copy to cache
        //.pipe(imagemin())
        //.pipe(gulp.dest('docs/img'));
});

/** fonts **/
gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('cache/fonts')); // copy to cache
        //.pipe(gulp.dest('docs/fonts'));
});

/** clean for build **/
gulp.task('clean', function(){
    return del.sync(['docs', 'cache']);
});


/** useref **/
gulp.task('useref', function(){
    return gulp.src('cache/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('docs'));
});

/** page **/
gulp.task('page', function(){
  return gulp.src('src/page/**/*.html')
    .pipe(gulp.dest('src/templates'))
    .pipe(browserSync.reload({stream:true}));
});

/** components **/
gulp.task('components', function(){
  return gulp.src('src/components/**/*.html')
    .pipe(gulp.dest('src/templates'))
    .pipe(browserSync.reload({stream:true}));
});

/** nunjucksRender **/
gulp.task('nunjucksRender', function(){
    return gulp.src('src/templates/*.html')
        .pipe(nunjucksRender({
            path: 'src/templates'
        }))
        .pipe(gulp.dest('cache'))
        .pipe(browserSync.reload({stream:true}));
});

/** browserSync **/
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            //baseDir: 'cache'
          baseDir: 'src'
        }
    });
});

/** default **/
gulp.task('default', ['sass', 'js', 'nunjucksRender', 'browserSync'], function(){
    console.log('Hello Chen');
    //gulp.watch('src/page/**/*.html', ['page']);
    //gulp.watch('src/components/**/*.html', ['components']);
    gulp.watch(['src/scss/**/*.scss','src/page/**/*.scss','src/components/**/*.scss'], ['sass']);
    gulp.watch(['src/js/*.js','src/page/**/*.js','src/components/**/*.js'], ['js']);
    gulp.watch('src/templates/**/*.html', ['nunjucksRender']);
});

/** build **/
gulp.task('build', ['clean', 'sass', 'js', 'nunjucksRender', 'fonts', 'images', 'useref'], function(){
    console.log('Building files...');
})
