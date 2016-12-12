/**
 * my gulp file
 * @author chen
 * @email chen.orange@aliyun.com
 * @website http://www.findchen.com
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
        .pipe(browserSync.reload({stream:true}));
});

/** js **/
gulp.task('js', function(){
    return gulp.src(['src/js/**/*.+(js|json)', 'src/components/**/*.+(js|json)'])
        .pipe(gulp.dest('cache/js')) //compile to cache js
        //.pipe(uglify()) // compress
        //.pipe(rename('app.min.js')) //rename
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
gulp.task('dist:images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'));
});


/** fonts **/
gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('cache/fonts')); // copy to cache
        //.pipe(gulp.dest('docs/fonts'));
});
gulp.task('dist:fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('docs/fonts'));
});


/** clean for build **/
gulp.task('clean:docs', function(){
    return del.sync('docs');
});

/** clean cache **/
gulp.task('clean:cache', function(){
    return del.sync('cache');
});


/** useref **/
gulp.task('useref', function(){
    return gulp.src('cache/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('docs'));
});

/** nunjucksRender **/
gulp.task('nunjucksRender', function(){
    //return gulp.src(['src/templates/*.html','src/pages/**/*.html', 'src/components/**/*.html'])
    //return gulp.src(['src/*.html', 'src/pages/**/*.html', 'src/components/**/*.html'])
    return gulp.src('src/**/*.html')
        .pipe(nunjucksRender({
            path: 'src'
        }))
        .pipe(gulp.dest('cache'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('dist:html', function(){
    return gulp.src('cache/**/*.html')
        .pipe(gulp.dest('docs'))
});

/** browserSync **/
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'cache'
        }
    });
});

/** default **/
gulp.task('default', ['clean:cache', 'sass', 'js', 'fonts', 'images', 'nunjucksRender', 'browserSync'], function(){
    console.log('Hello Chen');
    gulp.watch(['src/scss/**/*.scss','src/pages/**/*.scss','src/components/**/*.scss'], ['sass']);
    gulp.watch(['src/js/*.js','src/page/**/*.js','src/components/**/*.js'], ['js']);
    //gulp.watch(['src/templates/**/*.html', 'src/pages/**/*.html'], ['nunjucksRender']);
    gulp.watch('src/**/*.html', ['nunjucksRender']);
});

/** build **/
gulp.task('build', ['clean:docs', 'sass', 'js', 'nunjucksRender', 'dist:fonts', 'dist:images', 'dist:html', 'useref'], function(){
    console.log('Building files...');
})
