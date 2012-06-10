*Work in Progress*
## Ratio.js ##
Provides a Fraction/Rational/Ratio object for javascript.

Why should I use Ratio.js?<br/>
By keeping values in a rational form, you can maintain the precision and can avoid common floating point operation errors in javascript.

Support:
Firefox 12, Chrome 19, IE 7+, and Opera 11+.
Note: Run the Ratio test cases to check for browser capability.

Alternatives:
1. [Fraction.js](http://hypervolu.me/~erik/fraction.js/)
2. [Rational.js](http://code.google.com/p/crumble/source/browse/trunk/rational.js?spec=svn4&r=4)
3. [Math.Rational](http://blog.livedoor.jp/dankogai/js/rational.txt)

## Version ##
	0.2

## Installation ##
`<script type="Ratio.js"/>`

## Usage ##

Example: 
What's ( 0.1 + 0.2 )/( 1/3 * 12 ) as a fraction?

Solution:
	var result = Ratio(0.1).add(0.2).divide( Ratio(1/3).multiply(12) );
	"answer = " + result.toString() // shows "answer = 3/40"
	
## Quick Start Guide ##

Once your include Ratio.js, it introduces a global constructor called `Ratio`.
`new` is not require to make a new object since it's done for you.
Thus `new Ratio()` and `Ratio()` are both valid to instantiate an object.
	
All Ratio objects have a `numerator`, `denominator`, `type` and `divSign` property members.

	var a = Ratio();
	a.toString() == "0/1"
	a.numerator == 0;
	a.denominator == 1;
	a.type == "";
	a.divSign == "/"

All proproty methods are non-destructive and return a new Ratio object.

	var a = Ratio(1,3);
	a.toString() == "1/3"
	a.add(1,5).toString() == "8/15"
	a.toString() == "1/3"
	
Here are a list of the methods.
`toArray`, `valueOf`, `toLocaleString`, `toString`, `clone`, `reduce`, `add`, `divide`, `equals`, `multiply`, `subtract`, `descale`, `pow`, `scale`, `cleanFormat`, `abs`, `mod`, `negate`, and `isProper`.

The following steps are needed to add functionality to Ratio.js.
1. Create a test case for the new feature in `tests\Ratio_testcases.html`.
2. Add functionality to Ratio.js while making your testcases pass.
3. Once complete, refactor.
4. Push request.
Note: If the feature requires the use a `this`, then attach it the prototype methods. Otherwise it should be a static method on the Ratio constructor.

## Documentation ##
Refer to docs/Ratio.js_documentation.html
	
## Usage ##
	// in Javascript
    var a = 0.1 + 0.2;
    var b = 0.3;
    ( a == b ) == false;
    a == 0.30000000000000004;
	
	var a = Ratio();
	a.toString() == "0/1"
	a.divSign = ":";
	a.toString() == "0:1"
	
	// Ratio operations
	Ratio.parse(1/3).negate().add("-0.1").multiply(0xF3).divide(1,2).divide(1e-4).abs().toString()
	

    // in Ratio.js
    var a = new Ratio( 0.1 ).add( 0.2 );
    var b = new Ratio( 0.3 );
    (+a == +b )  == true
    
    // another way of writing it.
    new Ratio( "0.1" ).add( 0.2 ).equals( 0.3 ); // true!
    
    // And another.
    var a = new Ratio(1,10);
    var b = new Ratio(2,10);
    var c = new Ratio(3,10);
    a.add( b ).toString() === c.toString() // true!
    
    a.toString() === "1/10"
    +a === 0.1
    ( +a === a.valueOf() ) 
    a.toArray() // returns [ 1, 10 ]

## License ##
License: MIT and GPL 3.0 <br/>
[MIT License] <http://www.opensource.org/licenses/mit-license><br/>
[GPL v3] <http://opensource.org/licenses/GPL-3.0>

## Test cases ##
<a href="http://jsfiddle.net/jKu4q/2/" title="Testcases">Current Testcases result</a><br/>	
Test cases are located in the test folder.

## Project page: ##
<https://github.com/LarryBattle/Ratio.js/><br/>

## Todo ##
Document a warning about the difference between Ratio() vs Ratio.parse(). use 1/3 as an example.