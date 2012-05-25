# Ratio.js #
By Larry Battle <http://bateru.com/news/contact-me><br/>
Version Beta 0.1.2, 2012.05.23<br/>
**Work in progress**<br/>
<a href="http://jsfiddle.net/jKu4q/2/" title="Testcases">Current Testcases result</a><br/>

License: MIT and GPL 3.0 <br/>
[MIT License] <http://www.opensource.org/licenses/mit-license><br/>
[GPL v3] <http://opensource.org/licenses/GPL-3.0>

What's Ratio.js?<br/>
Provides a Fraction/Rational/Ratio object for javascript.

Why is this called Ratio.js?<br/>
Because Rational.js and Fraction.js are taken. 

Why should I use Ratio.js?<br/>
By keeping values in a rational form, you can maintain the precision and can avoid common floating point operation errors in javascript.

Examples:

    // in Javascript
    var a = 0.1 + 0.2;
    var b = 0.3;
    ( a == b ) == false;
    a == 0.30000000000000004;

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

Browser Support:
Firefox, Chrome, IE 6+, Safari and Opera.

Tutorial:
Read the annotated source code or the test cases for help.
-Work in Progress-

Project page: <https://github.com/LarryBattle/Ratio.js/><br/>

Alternatives:
1. [Fraction.js](http://hypervolu.me/~erik/fraction.js/)
2. [Rational.js](http://code.google.com/p/crumble/source/browse/trunk/rational.js?spec=svn4&r=4)
3. [Math.Rational](http://blog.livedoor.jp/dankogai/js/rational.txt)
