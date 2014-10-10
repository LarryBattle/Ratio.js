##Ratio.js Release Notes##
__Project Page:__ <https://github.com/LarryBattle/Ratio.js>  <br/>

__@Version: 0.4.1__ - 09/10/2014<br/>

- Bug Fix: Ratio.gcd() now returns the correct value for when one input is 0.
- Bug Fix: Ratio.gcd() now returns the first argument for when one of the arguments is 0.
- Note: Ratio.gcd() will now return the first element if the argument.length is < 2.
- Bug fix: fixed corrupted .gitignore
- Enhancement: npm run format now formats gulpfile.js and all js files in ./test.
- Enhancement: Switched from jake to gulp
- Enhancement: Added npm run build to build new releases
- Enhancement: Added npm run lint to run jshint on ./lib/Ratio-beta.js
- Enhancement: Added npm run format to format js in ./lib
- Project Structure: Switched from MIT and GPL 3 license to only MIT license.
- Project Structure: The dist folder will now contain the release files
- Project Structure: ./lib/Ratio-beta.js will now contain the latest edge release of Ratio.js

__@Version: 0.4__ - 4/21/2013<br/>
- Added a logo for Ratio.js, located at `images/ratiojs-logo.png`<br/>
- Added `Ratio.getStandardRatioArray()`<br/>
- Added: `Ratio.prototype.numerator()` [Issue 37](https://github.com/LarryBattle/Ratio.js/issues/37)<br/>
- Added: `Ratio.prototype.denominator()` [Issue 37](https://github.com/LarryBattle/Ratio.js/issues/37)<br/>
- Bugfix: [Issue 43](https://github.com/LarryBattle/Ratio.js/issues/43), Subtraction modifies subtrahend Ratio object<br/>
- Bugfix: [Issue 41](https://github.com/LarryBattle/Ratio.js/issues/41), Ratio object visibility<br/>
- Bugfix: [issued 35](https://github.com/LarryBattle/Ratio.js/issues/35) Ratio.parse("0 a/b").toString() returns -a/b<br/>
- BugFix: [Issue 38](https://github.com/LarryBattle/Ratio.js/issues/38) Reexamine Ratio.regex<br/>
- <b>Deprecated</b> `Ratio.prototype.reduce()`, renamed to to `Ratio.prototype.simplify()`.<br>
- <b>Deprecated</b> the instance properties `.numerator` and `.denominator`. They are now functions. This helps to hide implemtation.<br/>
- <b>Note</b>: The instance `.divSign` will soon be deprecated.

__@Version: 0.3.11__ - 12/18/2012<br/>
- Added: `.gitignore`<br/>
- Added: `devDependencies` to `.\package.json`<br/>
- Added: `Ratio.prototype.isNaN()`<br/>
- Bugfix: `Ratio.prototype.deepEquals` now compares `this.divSign` and `this.alwaysReduce`.<br/>
- Bugfix: [Issue 33](https://github.com/LarryBattle/Ratio.js/issues/33), `Ratio.parse(0,0).reduce().toString()` now returns `0/0`.<br/>
- Updated: documentation.<br/>

__@Version: 0.3.10__ - 12/10/2012<br/>
- Added: `.\dev\jake removeMin`, removes old min files in `.\lib`.<br/>
- Added: `vendors` and `vendors/qunit`. This makes it's easier to develop offline.<br/>
- Added: `Ratio.simplifyENotation()`.<br/>
- Bug Fix: `index.html` now shows the latest version of Ratio.js.<br/>
- Buf Fix: `test\Ratio-benchmark.html` now points to the ratio benchmark script.<br/>
- Updated: Corrected examples in documentation.<br/>
- Updated: Increase the iterations for the benchmarks to 10,000<br/>
- Updated: `Ratio.prototype.valueOf()` to use `Ratio.simplifyENotation()`


__@Version: 0.3.9__ - 12/7/2012<br/>
- Updated: Build script to change the main scripts location for dependent pages.<br/>
- Added: Calculate PI user case test and additional constant testcases.<br/>

__@Version: 0.3.8__ - 12/6/2012<br/>
- Added: Three new constants. `Ratio.MAX_PRECISION`, `Ratio.MAX_VALUE`, and `Ratio.MIN_VALUE`.<br/>
- Removed: The vendor folder. Qunit will be downloaded from the qunit CDN link. Also YUI wasn't used.<br/>
- Renamed: `Ratio.getTypeGuess` to `Ratio.guessType()`<br/>
- Updated: Documentation text.<br/>

__@Version: 0.3.7__ - 12/6/2012<br/>
- Renamed: `lib/Ratio.js` and `lib/Ratio.min.js` files to include the version number at the end of the file names.<br/>
- Changed: node example to point to `package.json` instead of `lib\Ratio.js`. <br/>
- Added: `Ratio.random()` <br/>

__@Version: 0.3.6__ - 12/5/2012<br/>
- Added: `Ratio.prototype.floor()`, `Ratio.prototype.ceil()`, `Ratio.prototype.makeProper()`.<br/>
- Bug Fix: Ratio.getTypeGuess() now accepts ratio string as "Infinity/x", where x is a numeric value, as a fraction.<br/>
- Bug Fix: The reduced ratio form of 0/x, where x is any non-zero, is 0/1.<br/>
- Bug Fix: All methods can be called without arguments without an error being thrown.<br/>
- Test cases were restructured and updated.<br/>

__@Version: 0.3.5.1__ - 11/14/2012<br/>
- Renamed the `docs` folder to `doc`
- Changes all `docs` references to `doc`

__@Version: 0.3.5__ - 11/2/2012<br/>
- Added: `Ratio.regex.*` to store all complex regular expressions.<br/>
- Added: `Ratio.getCombinedRatio()`.<br/>
<br/>
- Changed: The `Ratio` object is now wrapped inside a closure to provided support for "user strict".<br/>
- Changed: General methods with arguments now accept the same parameters.
The methods are as followed.<br/>

	Ratio.prototype.add()
	Ratio.prototype.descale()
	Ratio.prototype.divide()
	Ratio.prototype.multiply()
	Ratio.prototype.pow()
	Ratio.prototype.scale()
	Ratio.prototype.subtract()

<br/>
- Fixed: "`b`" was global.<br/>
- Fixed: testcases removing the closure wrapper and "use strict".<br/>
<br/>
- Removed: node.js test script. Use browser instead to view test results.<br/>
- Removed: `Ratio.prototype.approximateTo()` and merged it with `Ratio.prototype.toQuantityOf()`.<br/>
<br/>
- Updated: Documentation<br/>
- Updated: README.md examples and removed refernces to `type`.<br/>
- Updated: Passed JSHINT wiht 4 warnings.<br/>
- Updated: testcases<br/>

__@Version: 0.3.4__ - 10/30/2012<br/>
- Conformed to node.js module standards. [issue page](https://github.com/LarryBattle/Ratio.js/issues/14)<br/>
- Added test script to `package.json`.<br/>
- Removed the `type` property from Ratio instances.<br/>
- `Ratio.getTypeGuess()` and `Ratio.parseToArray()` is more fuzzy when parsing fractions and mixed number.

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
