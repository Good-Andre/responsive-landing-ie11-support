let project_folder = 'public';
let source_folder = 'src';

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/images/',
    fonts: project_folder + '/fonts/',
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    css: source_folder + '/scss/styles.scss',
    js: source_folder + '/js/script.js',
    img: source_folder + '/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,tiff}',
    fonts: source_folder + '/fonts/*.{ttf,woff,eot}',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,tiff}',
  },
  clean: './' + project_folder + '/',
};

let { src, dest } = require('gulp'),
  browsersync = require('browser-sync').create(),
  del = require('del'),
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  fileinclude = require('gulp-file-include'),
  groupMedia = require('gulp-group-css-media-queries'),
  plumber = require('gulp-plumber'),
  gulpRename = require('gulp-rename'),
  scss = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify-es').default;

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/',
    },
    notify: false,
  });
}

function fonts() {
  return src(path.src.fonts)
  .pipe(dest(path.build.fonts));
};

function html() {
  return (
    src(path.src.html)
      .pipe(fileinclude())
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
  );
}

function js() {
  return (
    src(path.src.js)
      // .pipe(uglify())
      .pipe(
        gulpRename({
          extname: '.min.js',
        })
      )
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
  );
}

function vendors() {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/slick-carousel/slick/slick.min.js',
      'node_modules/jquery-circle-progress/dist/circle-progress.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      scss({
        outputStyle: 'expanded',
      })
    )
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
        grid: true,
      })
    )
    .pipe(
      cleanCss({
        compatibility: 'ie8',
        level: {
          1: {
            specialComments: 0,
            removeEmpty: true,
            removeWhitespace: true,
          },
          2: {
            mergeMedia: true,
            removeEmpty: true,
            removeDuplicateFontRules: true,
            removeDuplicateMediaBlocks: true,
            removeDuplicateRules: true,
            removeUnusedAtRules: false,
          },
        },
      })
    )
    .pipe(
      gulpRename({
        extname: '.min.css',
      })
    )
    .pipe(plumber.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function cssLibs() {
  return gulp
    .src(['node_modules/slick-carousel/slick/slick.css'])
    .pipe(concat('libs.scss'))
    .pipe(gulp.dest('src/scss'))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(
  clean,
  gulp.parallel(
    js,
    css,
    html,
    images,
    fonts,
    vendors,
    cssLibs
  ),
);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.cssLibs = cssLibs;
exports.vendors = vendors;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
