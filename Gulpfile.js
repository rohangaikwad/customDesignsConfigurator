const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssCustomProperties = require('postcss-custom-properties');

gulp.task('common-bundle-js', (done) => {
    let dest = "public/js";
    var _files = [
        'src/js/libs/jquery-3.4.1.min.js',
        'src/js/libs/fabric-2.4.6.min.js',
        'src/js/libs/canvas2image.js',
        'src/js/libs/pickr.es5.min.js',
        'src/js/main.js'
    ];

    gulp.src(_files)
        .pipe(concat('common.js'))
        //.pipe(gulp.dest(dest))
        .pipe(uglify({compress: {drop_debugger: false}}))
        .on('error', function (err) { console.log( err.toString() ); })
        .pipe(rename('common.min.js'))
        .pipe(gulp.dest(dest));
    done();
});

gulp.task('styles', (done) => {
    let dest = "src/css";
    gulp.src(["src/css/style.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(postcss([postcssCustomProperties()]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(dest))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(dest))
    .pipe(gulp.dest('public/css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
    done();
});

gulp.task('default', (done) => {
    // bundle.js is created via browserify
    gulp.watch(['src/css/style.scss'], gulp.series('styles'));
    gulp.watch(['src/js/main.js'], gulp.series('common-bundle-js'));
    done();
});