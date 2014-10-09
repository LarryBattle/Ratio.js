var del = require("del");
var fs = require("fs");
var info = require("./package.json");
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var stylish = require('jshint-stylish');
var prettify = require("gulp-jsbeautifier");
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
paths.packageInfo = "./package.json";
paths.readme = "./readme.md";
paths.index = "./examples/index.html";

var readAndUpdateVersion = function (filePath, updateFunc) {
  console.log("Updating version number in %s", filePath);
  var file = fs.readFileSync(filePath).toString(),
  updatedFile = updateFunc(file, info.version);
  fs.writeFileSync(filePath, updatedFile);
};

var updateRatioFilePathFunc = function (str, version) {
  return ("" + str).replace(/(\/Ratio-)([\d.]+[^\.]+)(.js)/, "$1" + version + "$3");
};

gulp.task("makeMin", [ "makeDist" ], function(){
  gulp.src( paths.distRatio )
    .pipe( uglify() )
    .pipe( wrapper({ header: "/*Ratio.js version:"+ info.version+" by Larry Battle*/\n"}) )
    .pipe( rename({
      suffix : ".min"
    }) )
    .pipe( gulp.dest( paths.dist ) );
});

gulp.task("makeDist", ["lint"], function(){
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

gulp.task("format", function(){
  gulp.src([ paths.src ], {base: "./" })
    .pipe( prettify({ js : { indentSize : 2} }) )
    .pipe( gulp.dest( "./" ) );
});

gulp.task("lint", function(cb){
  return gulp.src([ paths.src ] )
    .pipe(jshint())
    .pipe(jshint.reporter( stylish ))
    .pipe(jshint.reporter( "fail" ));
});

gulp.task("updateLinks", function(){
  readAndUpdateVersion(paths.readme, function (str, version) {
    return ("" + str).replace(/("ratioVersion"\s*>)([^<]+)(<\/)/, "$1" + version + "$3");
  });
  "packageInfo,readme,index".split(",").forEach(function (pathName) {
    readAndUpdateVersion(paths[pathName], updateRatioFilePathFunc);
  });
});

gulp.task("build", [ "lint", "format", "makeDist", "makeMin", "buildDoc", "updateLinks" ]);
