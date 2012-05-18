# Ratio.js #
Version Beta 0.1, 2012.05.12

Provides a Ratio/Rational/Fraction object for Javascript. Similar to Fraction.py for Python.
By Larry Battle <http://bateru.com/news/contact-me>

License: MIT and GPL 3.0 
[MIT License] <http://www.opensource.org/licenses/mit-license>
[GPL v3] <http://opensource.org/licenses/GPL-3.0>

Project page: <https://github.com/LarryBattle/Ratio.js/>

##Work in progress##

What's Ratio.js?<br/>
Provides a Fraction/Rational/Ratio object for javascript.

Why is this called Ratio.js?<br/>
Because Rational.js and Fraction.js are taken. 

Why should I use Ratio.js?<br/>
Floating points operations are a b*tch in javascript. Why not use a Ratio.js?

Examples:
    // in Javascript
    var a = 0.1 + 0.2;
    var b = 0.3;
    ( a == b ) == false;
    a == 0.30000000000000004;

    // in Ratio.js
    var a = Ratio( 0.1 ).add( 0.2 );
    var b = Ratio( 0.3 );
    (+a == +b )  == true
    
    // another way of writing it.
    Ratio( "0.1" ).add( 0.2 ).equals( 0.3 ); // true!
    
    // And another.
    var a = Ratio(1,10);
    var b = Ratio(2,10);
    var c = Ratio(3,10);
    a.add( b ).toString() === "3/10"

Browser Support:
Firefox, Chrome, IE 8+, Safari and Opera.

Tutorial:
Read the annotated source code or the test cases for help.
-Work in Progress-

Alternatives:
[Fraction.js] <http://hypervolu.me/~erik/fraction.js/>
    
[Rational.js] <http://code.google.com/p/crumble/source/browse/trunk/rational.js?spec=svn4&r=4>
    
[Math.Rational]<http://blog.livedoor.jp/dankogai/js/rational.txt>
    