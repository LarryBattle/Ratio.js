	/**
	* @project Ratio.js
	* @purpose Provides a Ratio(Fraction) object for Javascript. Similar to Fraction.py for Python.
	* @author Larry Battle , <http://bateru.com/news/>
	* @date May 10, 2012
	* @license MIT and GPL 3.0 
	* MIT License <http://www.opensource.org/licenses/mit-license>
	* GPL v3 <http://opensource.org/licenses/GPL-3.0>
	* @info Project page: <https://github.com/LarryBattle/Ratio.js/>
	* @version Beta 0.1, 2012.05.12
	*/

*Work in progress*

What's Ratio.js?
Provides a Fraction/Rational/Ratio object for your javascript evironment.

Why is this called Ratio.js?
Because Rational.js and Fraction.js are taken. 

Why should I use Ratio.js?
Floating points operations are a b*tch in javascript. Why not use a Ratio.js?

Examples:
	// in Javascript
	var a = 0.1 + 0.2;
	var b = 0.3;
	a == b	// False. 
	a == 0.30000000000000004

	// in Ratio.js
	var a = Ratio( 0.1 ).add( 0.2 );
	var b = Ratio( 0.3 );
	a == b

	// or

	Ratio( "0.1" ).add( 0.2 ).equals( 0.3 ); // true!

	// or

	var a = Ratio(1,10);
	var b = Ratio(2,10);
	var c = Ratio(3,10);
	a.add( b ).toString() === "3/10"

	Answer this.
	If I bought 4 cookies for $2.20, how many could I get for $5 excluding tax.
	var cookiePerDollar = Ration(4, 2.2);
	var amountOf5DollarCookies = cookiePerDollar.multiply(5).reduce();
	amountOf5DollarCookies == ?

Browser Support:
Firefox, Chrome, IE 8+, Safari and Opera.

Support:
-Work in Progress-

Tutorial:
-Work in Progress-

Alternatives:
	Fraction.js
		http://hypervolu.me/~erik/fraction.js/
		
	Rational.js
		http://code.google.com/p/crumble/source/browse/trunk/rational.js?spec=svn4&r=4
		
	Math.ratinoal: 
		http://blog.livedoor.jp/dankogai/js/rational.txt
		