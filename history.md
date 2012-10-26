##Ratio.js Release Notes##
__Project Page:__ <https://github.com/LarryBattle/Ratio.js>  <br/>

__@Version: 0.3.3__  - 10/25/2012 <br/>
- Changed documentation to point to `Ratio.prototype.reciprocal` instead of `Ratio.prototype.flip`.
- Refactored the Ratio prototype to an object literal to save space.
- Updated readme.md to `require("lb-ratio")` for node installation example.

__@Version: 0.3.2__  - 10/21/2012 <br/>
- Pushed to the npm repository under the name `lb-ratio`.<br/>
- Added `Ratio.prototype.reciprocal` to point to `Ratio.prototype.flip`<br/>
- Added `demo\node-test-Ratio.js` for testing node.js.<br/>
- Bug Fix: Ratio has be been exported to the `module` directly. [issue page](https://github.com/shesek/Ratio.js/commit/67312b7feed98474960198cbfa693e699c3e4530)<br/>
- Updated documentation to fix format issue with the examples and provided more details on `Ratio.parse()`<br/>
- Built documentation with YUIDocjs version `0.3.29`.<br/>

__@Version: 0.3__  - 10/15/2012 <br/>
* Added: `Ratio.prototype.toQuantityOf`, picks the best approximate ratio within a given list of quantities(units) to estimate with.
* Bug fix: `Ratio.prototype.approximateTo()` now returns a clone if an argument isn't passed.
* Changed: `Ratio.prototype.approximateTo()` to only accept numbers.

__@Version: 0.2.9__  - 10/14/2012 <br/>
* Bug fix: Passed true to all the `this.valueOf()` references to force all values to be numeric.<br/>
* Bug Fix: `Ratio.parseToArray()` failed for mixed numbers where the faction had a negative value [issue ticket](https://github.com/LarryBattle/Ratio.js/issues/10)<br/>
* Refactored: `Ratio.prototype.findX` and `Ratio.prototype.approximateTo`<br/>
* Updated testcases<br/>
* Build script how updates the version in `readme.md`

__@Version: 0.2.8__ - 10/12/2012<br/>
* Added Ratio.js in the `demo` folder.<br/>
* Added `Ratio.prototype.approximateTo` to approximate values to new fraction with a given denominator.<br/>
* Changed the export object for node.js so that Ratio is the export object instead of exporting an object that points to Ratio.<br/>
* Added testcase for `Ratio.prototype.approximateTo`.<br/>

__@Version: 0.2.7__ <br/>
* Added `Ratio.prototype.correctRatio()` to simplify the Ratio constructor.<br/>
* Refactored `Ratio.getNumeratorWithSign()`<br/>

__@Version: 0.2.6__ <br/>
* Added detailed testcases for `.toLocaleString()`.<br/>
* Removed `.toRaw()`<br/>
* Updated testcases to use `.toString()` instead of `.toRaw()`<br/>
* Passed more testcases for `.toLocaleString()`<br/>

__@Version: 0.2.5__ <br/>
* Default value for Ratio.parse() is now `NaN` instead of 0/1<br/>
* Note that null, true and false are treatied as numbers.<br/>
* Improved Ratio.prototype.equals() to support all numeric types.<br/>
* Added: Ratio.prototype.deepEquals() for a strict comparison check.<br/>
* Added: Document comments for YUI-DOCS<br/>
* Updated: testcases.<br/>

__@Version: 0.2.4__ <br/>
* Ratio.parse now supports mixed numbers. <br/>
* Changed the behavior of the Ratio constructor.<br/>
	- Default values Ratio().toRaw() === "0/1"<br/>
	- Supplied input for the numerator or denominator will eval to NaN if not a number.
* Added: Ratio.getTypeGuess(), used to simplify the parsing functions.<br/>
* Deleted: Ratio.parseENotation(), Ratio.parseNumber(), and Ratio.parseDecimal()<br/>
* Updated Ratio.parseToArray() to include all the delete parsing functionality.<br/>
* Updated documentation.<br/>

__@Version: 0.2.3__ <br/>
* Changed the overall folder scripts to make it smaller and easier to understand.<br/>
* Updated: Build script, `dev/jakeFile.js`. Read the source for the requirements.<br/>
	Build script features:
	
	- Updated version information in Ratio.js
	- Minimize Ratio.js to Ratio.min.js
	- Updated documentation using YUI Docs.
<br/>
* Added: `Ratio.prototype.flip()`<br/>
* Added: `Ratio.prototype.toMixedNumber()`<br/>

__@Version: 0.2.2__ <br/>
* Added: `jakefile.js` for automation. <br/>
* Replaced `doc` folder with output from yuidoc. <br/> <br/>

File: tests\Ratio_testcases.html <br/>
* Feature: Allow for `src\Ratio.js` and `src\Ratio.min.js` to be tested without reloading or editing the page. <br/>

File: .\jakefile.js <br/>
* Feature: Added a compress option to create Ratio.min.js <br/>
* Feature: Added a documentation option to create the doc folder. <br/>

Folder: .\metrics\ <br/>
* Added: Simple metrics cases for Ratio.js. <br/>

Folder: .\vendor\YUI <br/>
* Added: Will be used for metrics. <br/>

__@Version: 0.2.1__ <br/>
File: "release notes.md" <br/>
* Added: "release notes.md" to keep track of changes. <br/>
 <br/>
File: src/Ratio.js <br/>
* Added: Ratio.prototype.findX. <br/> <br/>
File: test/js/Ratio_testcases.js <br/>
* Added: tests for Ratio.prototype.getPrimeFactors. <br/>
* Added: tests for Ratio.prototype.findX. <br/>
* Enhancement: Added more tests for scientific notation compatibility. <br/>
 <br/>
File: test/Ratio.js_testcases.html <br/>
* Added: UTF-8 as the character set. <br/>
 <br/>
File: vendor/qunit/ <br/>
* Upgraded to qUnit 1.9.0pre. <br/>
 <br/>

__@Version: Version <= 0.2__ <br/>
Refer to the change log in git for release notes of previous version. <br/>