var gulp = require("gulp");
var yuidoc = require("gulp-yuidoc");
var del = require("del");

var paths = {};
paths.src = "./lib/*.js";
paths.docDir = "./doc/";

gulp.task("buildDoc", function(){
  del( [ paths.docDir ] );
  return gulp.src( paths.src )
    .pipe(yuidoc())
    .pipe(gulp.dest( paths.docDir ));
});
gulp.task("build", [ "buildDoc" ]);
