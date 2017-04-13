var gulp = require('gulp'),
    exec = require('child_process').exec,
    path = require('path')


//copy .ts into ./dist
gulp.task('make-ts', function (callback) {
    exec('tsc -p .', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        callback(err);
    });
});

gulp.task('build', ['make-ts'], function () {
    //do stuff here  
});