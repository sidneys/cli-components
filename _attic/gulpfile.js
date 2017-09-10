var gulp   = require('gulp');
var clean  = require('gulp-clean');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');

var ts     = require('gulp-typescript');
var eventStream = require('event-stream');

var paths = {
    tscripts : { src : ['src/index.ts', 'src/io.ts', 'src/file.ts', 'src/config.ts', 'src/cache.ts'], //['src/**/*.ts'],
    // tscripts : { src : ['src/index.ts', 'src/io.ts', 'src/file.ts'],
                dest : 'build' }
};

gulp.task('default', ['build']);


// ** Running ** //

gulp.task('run', shell.task([ 'node build/index.js' ]));

gulp.task('buildrun', function (cb) { runseq('build', 'run', cb); });

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

// ** Watching ** //


gulp.task('watch', function () {
    gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

gulp.task('watchrun', function () {
    gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
    var tsResult = gulp.src(paths.tscripts.src)
                       .pipe(ts({
                           declarationFiles: true,
                           noExternalResolve: true,
                           target: "ES6",
                           module: "commonjs",

                       }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    );
    // return gulp.src(paths.tscripts.src)
    //             .pipe(tsc({
    //                 module: "commonjs",
    //                 emitError: false,
    //                 // out: "concatenated.js",
    //                 outDir: "build",
    //                 sourcemap: true,
    //                 removeComments: false,
    //                 sourceRoot: "./src",
    //                 declaration: true,
    //                 target: "ES6",
    //             }))
    //             .pipe(gulp.dest(paths.tscripts.dest));
});



