/**
* Build for Ratio.js
* Type `jake` to run the build.
*
* @author Larry Battle
* @date July 13, 2012
* @requires jake.js, yuidoc.js, uglify.js, node.js
*/

desc( "Default task" );
task( "default", function(){
	console.log( "Starting build." );
	jake.Task["makeDoc"].invoke();
	jake.Task["compress"].invoke();
	console.log( "All task complete." );
});

desc( "Updated version information in Ratio.js" );
task("updateVersion", function(){
	//??? Might try using a template file.
});

desc( "Using yuidoc.js to generate documentation." );
task( "makeDoc", function(){
	// need to delete Ratio.min.js so it doesn't document it.
	console.log( "Generating documentation." );
	jake.exec( "yuidoc ./src -o ./docs" );
});

desc("Using uglify.js to minimize Ratio.js to Ratio.min.js.");
task("compress",function(){
	console.log( "Compressing src/Ratio.js to src/Ratio.min.js" );
	jake.exec( "uglifyjs src/Ratio.js > src/Ratio.min.js" );
});