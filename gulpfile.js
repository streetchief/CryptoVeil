'use strict';

// All used modules.
var babel = require('gulp-babel');
var gulp = require('gulp');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('reloadCSS', function () {
    return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('lintJS', function () {
    return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildJS', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('testServerJS', function () {
    return gulp.src('./tests/server/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('testBrowserJS', function (done) {
    karma.start({
        configFile: __dirname + '/tests/browser/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('buildCSS', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'))
});

gulp.task('seedDB', function () {

    var users = [
        { email: 'testing@fsa.com', password: 'testing123' },
        { email: 'joe@fsa.com', password: 'rainbowkicks' },
        { email: 'obama@gmail.com', password: 'potus' }
    ];

    var dbConnected = require('./server/db');

    return dbConnected.then(function () {
        var User = require('mongoose').model('User');
        return User.create(users);
    }).then(function () {
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
    });

});

// --------------------------------------------------------------

// Extension tasks
// --------------------------------------------------------------

gulp.task('buildJSExtension', function () {
    return gulp.src(['./extension/js/application/app.js', './extension/js/application/**/*.js', './extension/js/fsa/fsa-pre-built.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./extension/js'));
});

gulp.task('buildCSSExtension', function () {
    return gulp.src('./extension/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./extension/css'));
});

gulp.task('buildExternalScripts', function () {
    return gulp.src(['./extension/js/externalscripts/externalApp.js', './extension/js/externalscripts/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('externalMain.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./extension/js'));
});

gulp.task('buildExtension', ['buildCSSExtension', 'buildJSExtension', 'buildExternalScripts']);

// --------------------------------------------------------------

// Production tasks
// --------------------------------------------------------------

gulp.task('buildCSSProduction', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'))
});

gulp.task('buildJSProduction', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);

// --------------------------------------------------------------

// Composed tasks
// --------------------------------------------------------------

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['lintJS', 'buildJS', 'buildCSS', 'buildCSSExtension', 'buildJSExtension', 'buildExternalScripts']);
    }
});

gulp.task('default', function () {

    livereload.listen();
    gulp.start('build');

    gulp.watch('extension/scss/**', function () {
        runSeq('buildCSSExtension');
    });

    gulp.watch('extension/js/**', function () {
        runSeq('buildJSExtension');
    });

    gulp.watch('extension/js/externalscripts/**', function () {
        runSeq('buildExternalScripts');
    });

    gulp.watch('browser/js/**', function () {
        runSeq('buildJS', ['testBrowserJS', 'reload']);
    });

    gulp.watch('browser/scss/**', function () {
        runSeq('buildCSS', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);
    gulp.watch(['browser/**/*.html', 'server/app/views/*.html'], ['reload']);
    gulp.watch(['tests/server/**/*.js', 'server/**/*.js'], ['testServerJS']);
    gulp.watch('tests/browser/**/*', ['testBrowserJS']);

});