var del = require("del");
var info = require("./package.json");
var gulp = require("gulp");
var rename = require("gulp-rename");
var template = require("gulp-template");
var uglify = require("gulp-uglify");
var wrapper = require("gulp-wrapper");
var yuidoc = require("gulp-yuidoc");

var paths = {};
paths.src = "./lib/*.js";
paths.docDir = "./doc/";
paths.dist = "./dist";
paths.distRatio = paths.dist + "/Ratio-VERSION.js".replace("VERSION", info.version);
paths.libRatio = "./lib/Ratio-beta.js";

gulp.task("makeMin", [ "makeDist" ], function(){
  gulp.src( paths.distRatio )
    .pipe( uglify() )
    .pipe( wrapper({ header: "/*Ratio.js version:"+ info.version+" by Larry Battle*/\n"}) )
    .pipe( rename({
      suffix : ".min"
    }) )
    .pipe( gulp.dest( paths.dist ) );
});

gulp.task("makeDist", function(){
  del( [ paths.dist ], function(){
    gulp.src( paths.libRatio )
      .pipe( rename({
        basename : "Ratio-",
        suffix : info.version
      }))
      .pipe( template(info) )
      .pipe(gulp.dest( paths.dist ));
  });
});

gulp.task("buildDoc", function(){
  del( [ paths.docDir ], function(){
    gulp.src( paths.distRatio )
      .pipe(yuidoc())
      .pipe(gulp.dest( paths.docDir ));
  });
});

gulp.task("format", function({
  gulp.src([ paths.src ])
    .pipe()
    .pipe( gulp.dest() );
});

gulp.task("build", [ "format", "makeDist", "makeMin", "buildDoc" ]);
