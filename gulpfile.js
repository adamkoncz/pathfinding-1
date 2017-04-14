var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    exec = require('child_process').execSync,
    path = require('path');


//copy .ts into ./dist
gulp.task('make-ts', function (callback) {
    var error;
    try{
        exec('tsc -p .');
    }catch(err){
       error = err;
    }
    callback();
    
});

gulp.task('uglify', function(){
        gulp.src(['./dist/**/*.js', '!./dist/**/*.min.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['make-ts','uglify'], function () {
    //do stuff here  
    console.log('BUILD DONE')
});