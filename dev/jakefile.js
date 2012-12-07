/**
 * Build for Ratio.js
 * Type `jake` to run the build.
 *
 * @author Larry Battle
 * @requires jake.js, yuidoc.js, uglify.js, node.js
 */
var fs = require('fs'),
basePath = "../",
projectInfo = require(basePath + "package.json"),
paths = {
	packageInfo : basePath + "/package.json",
	doc : basePath + "doc",
	min : basePath + "lib/Ratio-" + projectInfo.version + ".min.js",
	lib : basePath + "lib",
	demo : basePath + "examples/demo-basic.html",
	test : basePath + "test/Ratio.js_testcases.html",
	metrics : basePath + "test/Ratio.js_metrics.html",
	uncompressed : basePath + "lib/Ratio-" + projectInfo.version + ".js",
	readme : basePath + "readme.md"
};

var readAndUpdateVersion = function (filePath, updateFunc) {
	var file = fs.readFileSync(filePath).toString(),
	updatedFile = updateFunc(file, projectInfo.version);
	
	console.log("\nUpdating version number in %s", filePath);
	
	fs.writeFileSync(filePath, updatedFile);
};
var getMinimizedCode = function (orig_code) {
	var ug = require("uglifyjs"),
	ast = ug.jsp.parse(orig_code);
	
	ast = ug.pro.ast_mangle(ast);
	ast = ug.pro.ast_squeeze(ast);
	return ug.pro.gen_code(ast);
};

var updateRatioFilePathFunc = function (str, version) {
	str = ("" + str).replace(/(lib\/Ratio-)([\d.]+[^\.]+)(.js)/, "$1" + version + "$3");
	return str;
};

desc("Default task");
task("default", function () {
	console.log("Starting build.");
	jake.Task.updateVersion.invoke();
	jake.Task.makeDoc.invoke();
	jake.Task.compress.invoke();
	console.log("Build complete.");
});

desc("Updated version information in Ratio-*.js");
task("updateVersion", function () {
	readAndUpdateVersion(paths.uncompressed, function getUpdatedVersionSource(str, version) {
		var RE_comment = /(\s*@version\s+)(.*)/i,
		RE_property = /(\s*Ratio.VERSION\s*=\s*['"])(.*)(['"];?)/i;
		return ("" + str).replace(RE_comment, "$1" + version).replace(RE_property, "$1" + version + "$3");
	});
	readAndUpdateVersion(paths.readme, function (str, version) {
		str = ("" + str).replace(/("ratioVersion"\s*>)([^<]+)(<\/)/, "$1" + version + "$3");
		return str;
	});
	"packageInfo,readme,demo,test,metrics".split(",").forEach(function (pathName) {
		readAndUpdateVersion(paths[pathName], updateRatioFilePathFunc);
	});
});

desc("Using yuidoc.js to generate documentation.");
task("makeDoc", function () {
	console.log("\nGenerating documentation.");
	jake.exec("yuidoc " + paths.lib + " -o " + paths.doc);
});

desc("Using uglify.js to minimize Ratio-*.js to Ratio-*.min.js.");
task("compress", function () {
	console.log("\nCompressing %s to %s", paths.uncompressed, paths.min);
	jake.exec("uglifyjs " + paths.uncompressed + " > " + paths.min);
});
