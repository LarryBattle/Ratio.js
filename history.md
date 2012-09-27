##Ratio.js Release Notes##
__Project Page:__ <https://github.com/LarryBattle/Ratio.js>  <br/>
__Date:__ 09/27/12 <br/>

__@Version: 0.2.6__ <br/>
* Added detailed testcases for `.toLocaleString()`.
* Removed `.toRaw()`
* Updated testcases to use `.toString()` instead of `.toRaw()`
* Passed more testcases for `.toLocaleString()`

__@Version: 0.2.5__ <br/>
* Default value for Ratio.parse() is now `NaN` instead of 0/1
* Note that null, true and false are treatied as numbers.
* Improved Ratio.prototype.equals() to support all numeric types.
* Added: Ratio.prototype.deepEquals() for a strict comparison check.
* Added: Document comments for YUI-DOCS
* Updated: testcases.

__@Version: 0.2.4__ <br/>
* Ratio.parse now supports mixed numbers. 
* Changed the behavior of the Ratio constructor.
	- Default values Ratio().toRaw() === "0/1"
	- Supplied input for the numerator or denominator will eval to NaN if not a number.
* Added: Ratio.getTypeGuess(), used to simplify the parsing functions.
* Deleted: Ratio.parseENotation(), Ratio.parseNumber(), and Ratio.parseDecimal()
* Updated Ratio.parseToArray() to include all the delete parsing functionality.
* Updated documentation.

__@Version: 0.2.3__ <br/>
* Changed the overall folder scripts to make it smaller and easier to understand.<br/>
* Updated: Build script, `dev/jakeFile.js`. Read the source for the requirements.<br/>
	Build script features:
	
	- Updated version information in Ratio.js
	- Minimize Ratio.js to Ratio.min.js
	- Updated documentation using YUI Docs.
	
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