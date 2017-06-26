var paths = {};

var siteRoot = '_site';
// Directory locations
var appDir             = '_app/';  // The files Gulp will work on
var jekyllDir          = '';       // The files Jekyll will work on
var siteDir            = '_site/'; // The resulting static site

// Folder naming conventions
var postFolderName   = '_posts';
var draftFolderName  = '_drafts';
var imageFolderName  = 'images';
var fontFolderName   = 'fonts';
var scriptFolderName = 'js';
var stylesFolderName = 'css';

// Glob patterns by file type
var cssPattern         = '/**/*.css';
var jsPattern          = '/main.js';
var imagePattern       = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF|mp4)';
var markdownPattern    = '/**/*.+(md|MD|markdown|MARKDOWN)';
var htmlPattern        = '/**/*.html';
var xmlPattern         = '/**/*.xml';
var fontPatterns       = '/**.*';

// App files locations
var appCssFiles    = appDir  + stylesFolderName;
var appJsFiles     = appDir  + scriptFolderName;
var appImageFiles  = appDir  + imageFolderName;
var appFontFiles   = appDir  + fontFolderName;

// Jekyll files locations
var jekyllPostFiles    = jekyllDir + postFolderName;
var jekyllDraftFiles   = jekyllDir + draftFolderName;
var jekyllImageFiles   = jekyllDir + 'assets/' + imageFolderName;
var jekyllFontFiles    = jekyllDir + 'assets/' + fontFolderName;
var jekyllScriptFiles  = siteDir + 'assets/' + scriptFolderName;
var jekyllScriptFiles2  = jekyllDir + 'assets/' + scriptFolderName;
var jekyllStyleFiles   = jekyllDir + 'assets/' + stylesFolderName;
var jekyllStyleFiles2   = siteDir + 'assets/' + stylesFolderName;

// App files globs
var appCssFilesGlob      = appCssFiles      + cssPattern;
var appJsFilesGlob       = appJsFiles       + jsPattern;
var appImageFilesGlob    = appImageFiles    + imagePattern;
var appFontFilesGlob     = appFontFiles     + fontPatterns;

// Jekyll files globs
var jekyllPostFilesGlob    = jekyllPostFiles  + markdownPattern;
var jekyllDraftFilesGlob   = jekyllDraftFiles + markdownPattern;
var jekyllHtmlFilesGlob    = jekyllDir        + htmlPattern;
var jekyllXmlFilesGlob     = jekyllDir        + xmlPattern;
var jekyllImageFilesGlob   = jekyllImageFiles + imagePattern;

// Site files globs
var siteHtmlFilesGlob    = siteDir + htmlPattern;


// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    include = require('gulp-include'),
    css = require('css'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload,
    child = require('child_process'),
    postcss = require('gulp-postcss'),
    cssvariables = require('postcss-css-variables'),
    atImport = require("postcss-import"),
    customMedia = require("postcss-custom-media"),
    include = require("gulp-include"),

    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    transform = require('vinyl-transform'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    runSequence  = require('run-sequence'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    run = require('gulp-run');



// Uses Sass compiler to process styles, adds vendor prefixes, minifies,
// and then outputs file to appropriate location(s)
gulp.task('build:styles', function() {
  var processors = [
      atImport(),
      customMedia(),
      cssvariables()
  ];
  gulp.src(appCssFilesGlob)
    .pipe(postcss(processors))
    .pipe(gulp.dest(jekyllStyleFiles))
    .pipe(gulp.dest('_site/assets/css'))
    .on('error', gutil.log);
});

// Places all fonts in appropriate location(s)
gulp.task('build:fonts', function() {
  return gulp.src(appFontFilesGlob)
    .pipe(rename(function(path) {path.dirname = '';}))
    .pipe(gulp.dest(jekyllFontFiles))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
});


// Creates optimized versions of images,
// then outputs to appropriate location(s)
gulp.task('build:images', function() {
  return gulp.src(appImageFilesGlob)
    .pipe(gulp.dest(jekyllImageFiles))
    .pipe(gulp.dest('_site/assets/images'))
    .pipe(size({showFiles: true}))
    .on('error', gutil.log);
})


// Concatenates and uglifies JS files and outputs result to
// the appropriate location(s).
gulp.task('build:scripts', function() {
  var bundleStream = browserify({entries: appJsFilesGlob});

  return bundleStream.bundle()
    .on('error', function (err) {
        console.log(err.toString());
        this.emit("end");
    })
    .pipe(source("appJsFilesGlob"))
    .pipe(rename('main02.js'))
    .pipe(gulp.dest('assets/js'))
});

// Runs Jekyll build
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});


gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch('_app/css/**/*.css', ['build:styles']);
  gulp.watch('_app/js/**/*.js', ['build:scripts']);
  gulp.watch(['_app/images/**/*'], ['build:images']);

  // Watch Jekyll html files
  gulp.watch(['*.html', '_includes/**/*.html'], ['jekyll']);

});

gulp.task('default', ['build:images', 'build:scripts', 'build:fonts', 'build:styles', 'jekyll', 'serve']);
gulp.task('build', ['build:images', 'build:scripts', 'build:fonts', 'build:styles', 'jekyll']);

