## Ratio.js ##
Provides a Fraction / Rational / Ratio object for javascript.

**Why use Ratio.js?**

By keeping values in a rational form, you can maintain precision and can avoid common floating point operation errors in Javascript.

- [Simple Demo](http://larrybattle.github.com/Ratio.js/examples/demo-basic.html)
- [Documentation](http://larrybattle.github.com/Ratio.js/doc/classes/Ratio.html)
- [Testcase](http://larrybattle.github.com/Ratio.js/test/Ratio.js_testcases.html)
- [Release Notes](http://larrybattle.github.com/Ratio.js/history.md)

**Support:**

Node.js, Chrome 19+, Firefox 12+, IE 7+, and Opera 11+.

Note: Run the test cases to check for additional browser compatibility.

##Current version
<span id="ratioVersion">0.4.0</span>

## Installation ##
Just include the Ratio.js script. There are no dependencies.

<b>Browser:</b>

	<script src="./lib/Ratio-0.4.0.js"></script>

Install from npm

	npm install lb-ratio

Include in project 

	var Ratio = require("lb-ratio");



##Examples

1. What is `12.12121212121212` as a fraction?

	Solution:

		var result = Ratio.parse( 12.12121212121212 ).simplify().toString();
		result === "400/33";

2. Evaluate ( 0.1 + 0.2 )/( 1/3 * 12 )?

	Solution:

		var a = Ratio.parse(0.1).add(0.2).divide( Ratio(1,3).multiply(12) );
		var result = a.toString();
		result === "3/40"

3. Does Math.PI equal 22/7?

	Solution:
		
		var result = Ratio.parse( "22/7" ).equals( Math.PI );
		result === false;
		
## Short Tutorial ##

### Ratio Constructor ###

Ratio.js introduces a global constructor called `Ratio`.

`new` is not require to make a new object since it's done for you. <br/>
Thus `new Ratio()` and `Ratio()` are both valid to instantiate an object.<br/>
	
### Ratio Properties ###

The default value of the numerator is 0 and denominator is 1.

	var a = Ratio();
	a.toString() === "0/1";
	a.numerator() === 0;
	a.denominator() === 1;

Examples:

	// Good Values
	Ratio().toString() === "0/1"
	Ratio(4).toString() === "4/1"
	Ratio(4,5).toString() === "4/5"
	
	// Bad Values
	Ratio("five").toString() === "NaN/1"
	Ratio(1,"ten").toString() === "1/NaN"
	Ratio("five","ten").toString() === "NaN/NaN"

### Ratio values ###

To retrieve the value inside a Ratio object you can use `toString()`, `toLocaleString()`, `toArray()` or `valueOf()`.<br/>
`toString()` - returns string "numerator/denominator".<br/>
`toArray()` - returns [ numerator, denominator ].<br/>
`valueOf()` - returns (numerator/denominator).<br/>
`toLocaleString()` - returns string mixed number, whole number or proper fraction.<br/>

	var a = Ratio(30,10);
	a.toString() === "30/10";
	a.toLocaleString() === "3";
	a.toArray() // returns [30,10];
	a.valueOf() === 3; // same as +a or Number(a)
	
### Ratio Comparison ###

valueOf() is called when inequality comparisons are made on a Ratio object.<br/>
However, equalivance( `==` ) will compare the object and not the value of the object. Use `.equals()` instead.<br/>
Thus you can do the following.

	var a = Ratio(15,3), 
		b = Ratio(3,15);

	(a > b) === true;
	(a < b) === false;
	( a == b ) === false; 
	a.equals( a ) === true;
	a.equals( b ) === false;

### Creating new Ratio Objects ###

There are various ways to create a new Ratio object. Ratio.parse() is the prefered methods.

**`Ratio()`**

	// "0/1" is the default ratio
	Ratio().toString() === "0/1";
	
	// Accepts whole numbers
	Ratio(1).toString() === "1/1";
	
	// Accepts an numerator and denominator
	Ratio(1,2).toString() === "1/2";
	
**`Ratio.parse( value )`**

	// Use Ratio.parse() to parse any other values that aren't whole numbers.
	
	// Accepts decimals
	Ratio.parse(1/2).toString() === "1/2";

	// Accepts fractions as strings
	Ratio.parse("1/2").toString() === "1/2";
	
	// Accepts mixed numbers as strings
	Ratio.parse( "1 1/2" ).toString() === "3/2";

	// Accepts a Ratio object
	Ratio.parse( Ratio(1/2) ).toString() === "1/2";
	
**`Ratio.parse( value1, value2 )`**<br/>
This is the same as `value1 / value2` or `Ratio.parse(value1).divide(value2)`
	
	// Converts the Ratio objects to a single fraction.
	Ratio.parse( Ratio(1), Ratio(2) ).toString() === "1/2";
	
	// Accepts 
	// (1/2) / (1/3) = 3/2
	Ratio.parse( "1/2", "1/3" ).toString() === "3/2";
		
### Methods ###

All proproty methods are non-destructive and return a new Ratio object.

	var a = Ratio(1,3);
	a.toString() === "1/3"
	a.add(1,5).toString() === "8/15"
	a.toString() === "1/3"
	
Refer to the documentation for a complete method list.

## Additional Examples ##

	// in Javascript
    var a = 0.1 + 0.2;
    var b = 0.3;
    ( a == b ) === false;
    a === 0.30000000000000004;
	
	var a = Ratio();
	a.toString() === "0/1";
	
	// Ratio operations
	var c = Ratio.parse(1/3).negate().add("-0.1").multiply(0xF3).divide(1,2).divide(1e-4).abs();
	c.toString() === "1053/5";

    // in Ratio.js
    var a = Ratio( 0.1 ).add( 0.2 );
    var b = Ratio( 0.3 );
    (+a == +b ) === true;
    
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

## Known Issues ##

- Precision is lost for values passed +/- 9007199254740992. <a href="http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-t">stackoverflow.com</a> <br/>
