# package.json #
	{
		"name" : "Ratio.js",
		"description" : "Provides a Fraction \/ Rational \/ Ratio object for javascript.",
		"version" : "0.2",
		"author" : "Larry Battle <http:\/\/bateru.com\/news\/contact-me>",
		"contributors" : [{
				"name" : "Larry Battle",
				"email" : "http:\/\/bateru.com\/news\/contact-me"
			}
		],
		"main" : ".\/src\/Ratio.js",
		"keywords" : ["Ratio", "fraction", "rational", "numbers", "Math"],
		"scripts" : "",
		"repository" : "git:\/\/github.com\/LarryBattle\/Ratio.js",
		"engines" : {
			"node" : "*"
		},
		"directories" : ""
	}

# Readme.txt #

*Work in Progress*
## Ratio.js ##
Provides a Fraction/Rational/Ratio object for javascript.

Why should I use Ratio.js?<br/>
By keeping values in a rational form, you can maintain the precision and can avoid common floating point operation errors in javascript.

Support:
Firefox, Chrome, IE 6+, Safari and Opera.

Alternatives:
1. [Fraction.js](http://hypervolu.me/~erik/fraction.js/)
2. [Rational.js](http://code.google.com/p/crumble/source/browse/trunk/rational.js?spec=svn4&r=4)
3. [Math.Rational](http://blog.livedoor.jp/dankogai/js/rational.txt)

## Version ##
	0.2

## Installation ##
`<script type="Ratio.js"/>`

## Documentation ##
*Work in Process*
	
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