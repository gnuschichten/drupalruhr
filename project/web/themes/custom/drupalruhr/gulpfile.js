var gulp = require('gulp');
var sass = require('gulp-dart-sass');
var cleancss = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var watchDir = 'src/scss/**/*.scss';
var srcDir = 'src/scss/*.scss';
var destDir = 'dist/css';

var paths = {
  source: srcDir
};

function watch() {
  return gulp.src(paths.source)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(destDir))
    .pipe(cleancss())
    .pipe(browserSync.stream({match: '**/*.css'}));
}

gulp.task('browserSync', function () {
  browserSync.init({
    proxy: 'drupalruhr.local',
    port: 3000,
    open: false,
    injectChanges: true,
  });
});

gulp.task('sass', function () {
  return gulp.src(paths.source)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(destDir))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destDir));
});

gulp.task('sass:watch', function () {
  gulp.watch(watchDir, watch);
});

gulp.task('dev', gulp.series(gulp.parallel('sass:watch', 'browserSync')));
gulp.task('build', gulp.series('sass'));
