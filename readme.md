## Ratio.js ##
Provides a Fraction / Rational / Ratio object for javascript.

**Why use Ratio.js?**

By keeping values in a rational form, you can maintain precision and can avoid common floating point operation errors in Javascript.

**Support:**

Chrome 19, Firefox 12, IE 7+, and Opera 11+.

Note: Run the test cases to check for additional browser compatibility.

## Current Version ## <br/> `0.2.3`

## Installation ##
Just include the Ratio.js script. Like so, 
    `<script src="Ratio.js"/>`

##Examples

1. What is `12.12121212121212` as a fraction?

	Solution:

		var result = Ratio.parse( 12.12121212121212 ).reduce().toString();
		result == "400/33";

2. Evaluate ( 0.1 + 0.2 )/( 1/3 * 12 ) as a Ratio?

	Solution:

		var a = Ratio.parse(0.1).add(0.2).divide( Ratio(1,3).multiply(12) );
		a.divSign = ":";
		var result = a.toString();
		result == "3:40"

3. Does Math.PI equal 22/7?

	Solution:
		
		var result = Ratio.parse( "22/7" ).equals( Math.PI );
		result == false;
		
## Short Tutorial ##

### Ratio Constructor ###

Ratio.js introduces a global constructor called `Ratio`.

`new` is not require to make a new object since it's done for you. <br/>
Thus `new Ratio()` and `Ratio()` are both valid to instantiate an object.<br/>
	
### Ratio Properties ###

All Ratio objects have a `numerator`, `denominator`, `type` and `divSign` property.
The default value of the numerator is 0 and denominator is 1.

	var a = Ratio();
	a.toString() == "0/1";
	a.numerator == 0;
	a.denominator == 1;
	a.type == "";
	a.divSign == "/";
	
### Ratio values ###

To retrieve the value inside a Ratio object you can use `toString()`, `toLocaleString()`, `toArray()` or `valueOf()`.<br/>
`toString()` - returns string "numerator/denominator".<br/>
`toArray()` - returns [ numerator, denominator ].<br/>
`valueOf()` - returns (numerator/denominator).<br/>
`toLocaleString()` - returns string "numerator/denominator" unless the value is a whole number, which would return the latter.<br/>

	var a = Ratio(30,10);
	a.toString() == "30/10";
	a.toLocaleString() == "3";
	a.toArray() == [30,10];
	a.valueOf() == 3; // same as +a
	
### Ratio Comparison ###

valueOf() is called when inequality comparisons are made on a Ratio object.<br/>
However, Equalivances will compare the objects not values. Use `equals()` instead.<br/>
Thus you can do the following.

	var a = Ratio(15,3), b = Ratio(3,15);
	a > b == true;
	a < b == false;
	( a == b ) == false; 
	a.equals( a ) == true;
	a.equals( b ) == false;

### Creating new Ratio Objects ###

There are various ways to create a new Ratio object. Ratio.parse() is the prefered methods.

	var a = Ratio(1,2);
	a.toString() == "1/2";

	// accepts numbers as the numerator and denominator
	a = Ratio.parse(1,2);
	a.toString() == "1/2";

	// converts decimal values into the form of a fraction.
	a = Ratio.parse(1/2);
	a.toString() == "1/2";

	// converts strings in the form of "a/b" to a fraction a/b.
	a = Ratio.parse( "1/2" );
	a.toString() == "1/2";

	// Converts a Ratio object to a single fraction.
	a = Ratio.parse( Ratio(1/2) );
	a.toString() == "1/2";
	
	// Converts Ratio objects to a single fraction.
	a = Ratio.parse( Ratio(1), Ratio(2) );
	a.toString() == "1/2";
	
	a = Ratio.parse( "1/2", "1/3" ); // same as (1/2) / (1/3)
	a.toString() == "3/2";
	
### Methods ###

All proproty methods are non-destructive and return a new Ratio object.

	var a = Ratio(1,3);
	a.toString() == "1/3"
	a.add(1,5).toString() == "8/15"
	a.toString() == "1/3"
	
Here are a list of the methods.
`toArray`, `valueOf`, `toLocaleString`, `toString`, `clone`, `reduce`, `add`, `divide`, `equals`, `multiply`, `subtract`, `descale`, `pow`, `scale`, `cleanFormat`, `abs`, `mod`, `negate`, and `isProper`.


## Documentation ##

Refer to the `docs` folder.<br/>
Also you can read the source code, which is well documented.
	
## Additional Examples ##

	// in Javascript
    var a = 0.1 + 0.2;
    var b = 0.3;
    ( a == b ) == false;
    a == 0.30000000000000004;
	
	var a = Ratio();
	a.toString() == "0/1";
	a.divSign = ":";
	a.toString() == "0:1";
	
	// Ratio operations
	var c = Ratio.parse(1/3).negate().add("-0.1").multiply(0xF3).divide(1,2).divide(1e-4).abs();
	c.toString() == "1053/5";

    // in Ratio.js
    var a = Ratio( 0.1 ).add( 0.2 );
    var b = Ratio( 0.3 );
    (+a == +b ) == true;
    
    // another way of writing it.
    Ratio( "0.1" ).add( 0.2 ).equals( 0.3 ); // true!
    
    // And another.
    var a = Ratio(1,10);
    var b = Ratio(2,10);
    var c = Ratio(3,10);
    a.add( b ).toString() === c.toString(); // true!
    
    a.toString() === "1/10";
    +a === 0.1;
    ( +a === a.valueOf() ) ;
    a.toArray(); // returns [ 1, 10 ]


## License ##

License: [MIT License](http://www.opensource.org/licenses/mit-license) and [GPL v3](http://opensource.org/licenses/GPL-3.0)

## Test cases ##
Test cases are located in the test folder.

## Adding Features ##

The following steps are strongly encouraged when adding functionality to Ratio.js.

1. Create a test case for the new feature in `tests\Ratio_testcases.html`.
2. Add functionality to Ratio.js while making your testcases pass.
3. Refactor once test pass.
4. Fix any errors found by [JSLint.com](http://jslint.com).
5. Analyze Ratio.js with [JSMeter.info](http://jsmeter.info). If the "Program Level" is red, then refactor and break your function(s) into small methods.
6. Once all steps are complete then send a pull request.

Note: If the feature requires the use a `this`, then attach it the prototype methods. Otherwise it should be a static method on the Ratio constructor.

## Project page: ##

<https://github.com/LarryBattle/Ratio.js/><br/>

## Alternatives:##

1. [Fraction.js](http://hypervolu.me/~erik/fraction.js/)
2. [Rational.js](http://code.google.com/p/crumble/source/browse/trunk/rational.js?spec=svn4&r=4)
3. [Math.Rational](http://blog.livedoor.jp/dankogai/js/rational.txt)
