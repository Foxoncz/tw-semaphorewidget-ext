'use strict'
//utils
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var merge = require("merge-stream");
var exec = require('child_process');

//js
var uglify = require('gulp-uglify');

//less
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var comstrip = require('gulp-strip-css-comments');

var dist = 'dist/'

var widgets = {
  semaphore: {
    in: {
	  folder: 'semaphore/',
	  idejs: ['semaphore/semaphore.ide.js'],
      runtimejs: ['semaphore/semaphore.runtime.js'],
	  depjs: ['semaphore/semaphore.js'],
      idescss: ['semaphore/semaphore.scss'],
      runtimescss: ['semaphore/semaphore.scss'],
    },
    out: {
	  folder: './../ui/semaphore/',
	  idejs: 'semaphore.ide.js',
      runtimejs: 'semaphore.runtime.js',
	  depjs: 'semaphore.js',
      idecss: 'semaphore.ide.css',
      runtimecss: 'semaphore.runtime.css'
	}
  }
};

gulp.task('ide:scss', function() {
    return	gulp.src(widgets.semaphore.in.idescss)
					.pipe(sass())
					.pipe(comstrip({
						preserve: false
					}))
					.pipe(autoprefixer({
						browsers: ['last 5 versions']
					}))
					.pipe(csso())
					.pipe(rename(widgets.semaphore.out.idecss))
					.pipe(gulp.dest(widgets.semaphore.out.folder))
});

gulp.task('runtime:scss', function() {
    return	gulp.src(widgets.semaphore.in.runtimescss)
					.pipe(sass())
					.pipe(comstrip({
						preserve: false
					}))
					.pipe(autoprefixer({
						browsers: ['last 5 versions']
					}))
					.pipe(csso())
					.pipe(rename(widgets.semaphore.out.runtimecss))
					.pipe(gulp.dest(widgets.semaphore.out.folder))
});

gulp.task('build:css', ['ide:scss', 'runtime:scss']);

gulp.task('ide:js', function() {
    return gulp.src(widgets.semaphore.in.idejs)
        .pipe(concat(widgets.semaphore.out.idejs))
        //.pipe(uglify())
        .pipe(gulp.dest(widgets.semaphore.out.folder));
});

gulp.task('runtime:js', function() {
    return gulp.src(widgets.semaphore.in.runtimejs)
        .pipe(concat(widgets.semaphore.out.runtimejs))
        //.pipe(uglify())
        .pipe(gulp.dest(widgets.semaphore.out.folder));
});

gulp.task('dep:js', function() {
    return gulp.src(widgets.semaphore.in.depjs)
        .pipe(concat(widgets.semaphore.out.depjs))
        //.pipe(uglify())
        .pipe(gulp.dest(widgets.semaphore.out.folder));
});

gulp.task('build:js', ['ide:js', 'runtime:js', 'dep:js']);

gulp.task('build:extension', ['build:js', 'build:css'], function() {
	return exec.exec('ant build -f ./../build-extension.xml', function (err, stdout, stderr) {
				//console.log(stdout);
				console.log(stderr);
			  });
});

gulp.task('default', ['build:js', 'build:css', 'build:extension']);