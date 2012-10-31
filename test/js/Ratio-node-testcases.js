var Ratio = require("../../");

console.log("## Use `test/Ratio.js_testcases.html` instead.");
return;
if(Ratio){
	var tests = require("./Ratio-testcases");
	tests.setRatio(Ratio);
	tests.runTests();
}