
var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
//var htmlreplace = require('gulp-html-replace');
var source = require("vinyl-source-stream");
var streamify = require("gulp-streamify");
var stringify = require("stringify");
var reactify = require("reactify");

var path = {
    HTML: "src/index.html",
    CSS: "src/css/main.css",
    TXT: "src/js/content.txt",
    JS: ['src/js/*.js', 'src/js/**/*.js'],
    MINIFIED_OUT: "main.min.js",
    OUT: "main.js",
    DEST: "dist",
    DEST_BUILD: "dist",
    DEST_SRC: "dist/js",
    DEST_SRC_CSS: "dist/css",
    ENTRY_POINT: "./src/js/main.js"
};

//Main Gulp Dev Tasks

//copy index.html to dist folder
gulp.task("copy", function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST_SRC_CSS));
    console.log("HTML and CSS Updated")
});
//browserify, stringify, and reactify (convert jsx to js). Include error mapping
gulp.task("browserify", function(){
    var browserfied = browserify(
        {
            entries: [path.ENTRY_POINT],
            transform: [stringify({extensions: ['.txt']}),reactify],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true
        }
    );
    browserfied.bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
    console.log("Browserify was run");
});

gulp.task("watch", function(){
    gulp.watch(path.HTML, ["copy"]);
    gulp.watch(path.CSS, ["copy"]);
    gulp.watch(path.JS,["browserify"]);
    gulp.watch(path.TXT, ["browserify"]);

});


//Gulp production Tasks. Same as dev excpet remove error mapping and then minify

gulp.task("build", function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [stringify({extensions: ['.txt']}), reactify]
    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));
});
/* not needed right now
*
* gulp.task("replaceHTML", function(){
*    gulp.src(path.HTML)
*        .pipe(htmlreplace({
*            "js": "build/" + path.MINIFIED_OUT
*        }))
*        .pipe(gulp.dest(path.DEST));
*});
*/


gulp.task("default", ["copy","browserify","watch"]);
//add 'replaceHTML' to this task if you want
gulp.task("production", ["build"]);
