/**
* Build for Ratio.js
* Type `jake` to run the build.
*
* @author Larry Battle
* @date Sept 09, 2012
* @requires jake.js, yuidoc.js, uglify.js, node.js
*/
// check for required modules
// require('uglify-js');
// require('yuidoc');

var fs = require('fs'),
	basePath = "../",
	projectInfo = require( basePath + "package.json" ),
	paths = {
		doc : basePath + "doc",
		min : basePath + "src/Ratio.min.js",
		src : basePath + "src",
		uncompressed : basePath + "src/Ratio.js",
		readme : basePath + "readme.md"
	};

var readAndUpdateVersion = function( filePath, updateFunc ){
	var file = fs.readFileSync( filePath ).toString(),
		updatedFile = updateFunc( file, projectInfo.version );
		
	console.log( "\nUpdating version number in %s", filePath );	
	
    fs.writeFileSync( filePath, updatedFile );
};
var getMinimizedCode = function(orig_code){
	var ug = require("uglifyjs"),
		ast = ug.jsp.parse(orig_code);
		
	ast = ug.pro.ast_mangle(ast); 
	ast = ug.pro.ast_squeeze(ast); 
	return ug.pro.gen_code(ast);
};
desc( "Default task" );
task( "default", function(){
	console.log( "Starting build." );
	jake.Task.updateVersion.invoke();
	jake.Task.makeDoc.invoke();
	jake.Task.compress.invoke();
	console.log( "All task complete." );
});

desc( "Updated version information in Ratio.js" );
task("updateVersion", function(){
	readAndUpdateVersion( paths.uncompressed,  function getUpdatedVersionSource(str, version){
		var RE_comment = /(\s*@version\s+)(.*)/i,
			RE_property = /(\s*Ratio.VERSION\s*=\s*['"])(.*)(['"];?)/i;
		return (""+str).replace( RE_comment, "$1" + version ).replace( RE_property, "$1" + version + "$3" );
	});
	readAndUpdateVersion( paths.readme, function(str, version){
		return (""+str).replace( /("ratioVersion"\s*>)([^<]+)(<\/)/, "$1"+version+"$3" );
	});
});

desc( "Using yuidoc.js to generate documentation." );
task( "makeDoc", function(){
	console.log( "\nGenerating documentation." );
	jake.exec( "yuidoc " + paths.src + " -o " + paths.doc );
});

desc("Using uglify.js to minimize Ratio.js to Ratio.min.js.");
task("compress", function(){
	console.log( "\nCompressing %s to %s", paths.uncompressed, paths.min );
	jake.exec( "uglifyjs " + paths.uncompressed + " > " + paths.min );
	// var file = fs.readFileSync( paths.uncompressed ).toString(),
		// updatedFile = getMinimizedCode( file );
		
    // fs.writeFileSync( paths.uncompressed, updatedFile );
});
