/**
* @project Ratio.js
* @purpose Testcases for new Ratio.js
* @author Larry Battle , <http://bateru.com/news/>
* @date May 23, 2012
* @license MIT and GPL 3.0 
* MIT License <http://www.opensource.org/licenses/mit-license>
* GPL v3 <http://opensource.org/licenses/GPL-3.0>
* @info Project page: <https://github.com/LarryBattle/Ratio.js/>
* @version Beta 0.1.2, 2012.05.23
*/
$(function(){
	test( "test Ratio.getRepeatingDecimals", function(){
		var func = Ratio.getRepeatingDecimals;
		equal( func(1/10), null );
		equal( func(1/40), null );
		equal( func(1/32), null );
		equal( func(1/3), "3" );
		equal( func(2/3), "6" );
		equal( func(1/7), "142857" );
		equal( func(1/9), "1" );
	});
	test( "test Ratio.hasRepeatingDecimals", function(){
		var func = Ratio.hasRepeatingDecimals;
		equal( func( 1/333 ), true );
		equal( func( 7/13 ), true );
		equal( func( 100/11 ), true );
		equal( func( 100/13 ), true );
		equal( func( 1/3 ), true );
		equal( func( 1/7 ), true );
		equal( func( "0.33333" ), true );
		
		equal( func( 1/5 ), false );
		equal( func( 1/100 ), false );		
		equal( func( "0.3333" ), false );
		equal( func( Math.PI ), false );
		equal( func( {} ), false );
		equal( func( null ), false );
		equal( func( true ), false );
		equal( func( Infinity ), false );
		equal( func( NaN ), false );
	});

	test( "test new Ratio creation", function(){
		var a = new Ratio( new Ratio(1,3) );
		equal( a.toString(), "1/3" );
		equal( new Ratio().toString(), "0" );
		equal( new Ratio(3).toString(), "3" );
		equal( new Ratio(3,1).toString(), "3" );
		equal( new Ratio(10,10).toString(), "1" );
		equal( new Ratio(400,5).toString(), "400/5" );
		equal( new Ratio(3,2).toString(), "3/2" );
		equal( new Ratio(1,3).toString(), "1/3" );
		equal( new Ratio(-4,3).toString(), "-4/3" );
		equal( new Ratio(4,-3).toString(), "-4/3" );
		equal( new Ratio(-4,-3).toString(), "4/3" );
	});
	test( "test crazy forms of creating a new Ratio", function(){
		equal( new Ratio(0.125,0.5).toString(), "1/4" );
		equal( new Ratio(0.125,"1/2").toString(), "1/4" );
		equal( new Ratio(3, new Ratio(2)).toString(), "3/2" );
		equal( new Ratio(3, new Ratio(1)).toString(), "3" );
		equal( new Ratio(new Ratio(1),3).toString(), "1/3" );
		equal( new Ratio(new Ratio(-4),new Ratio(3)).toString(), "-4/3" );
		equal( new Ratio(new Ratio(4,5).toString(),new Ratio(-3,2).toString()).toString(), "-4/3" );
	});
	test( "test Ratio.parseToArray()", function(){
		deepEqual( Ratio.parseToArray("apples"), []);
		deepEqual( Ratio.parseToArray(true), []);
		deepEqual( Ratio.parseToArray([]), [] );
		
		deepEqual( Ratio.parseToArray( 0 ), [0,1] );
		deepEqual( Ratio.parseToArray( 123 ), [123, 1]);
		deepEqual( Ratio.parseToArray( 423 ), [ 423, 1 ]);
		
		deepEqual( Ratio.parseToArray( "3" ), [ 3, 1 ]);
		deepEqual( Ratio.parseToArray( " 3  " ), [ 3, 1 ]);
		deepEqual( Ratio.parseToArray(" 3/1"), [ 3, 1 ]);
		
		deepEqual( Ratio.parseToArray("3/ 2"), [ 3, 2 ]);
		deepEqual( Ratio.parseToArray("1 / 3"), [1, 3 ]);
		deepEqual( Ratio.parseToArray("-4/ 3"), [-4, 3 ]);
		
		deepEqual( Ratio.parseToArray(" 4 /-3"), [-4, 3 ]);
		deepEqual( Ratio.parseToArray("-4 /-3"), [4, 3 ]);
		deepEqual( Ratio.parseToArray( (new Ratio(4,3)) ), [4,3 ]);
		
		deepEqual( Ratio.parseToArray( (new Ratio(-4,3)) ), [-4,3 ]);
		deepEqual( Ratio.parseToArray( (new Ratio(4,-3)) ), [-4,3 ]);
		deepEqual( Ratio.parseToArray( (new Ratio(-4,-3)) ), [4,3 ]);
		
		deepEqual( Ratio.parseToArray(Number(1.12)), [112,100 ]);
		deepEqual( Ratio.parseToArray(0.771), [771,1000 ]);
		deepEqual( Ratio.parseToArray(1e3), [1000, 1 ]);
		
		deepEqual( Ratio.parseToArray("1e-5"), [1,100000 ]);
		deepEqual( Ratio.parseToArray("-1e-5"), [-1,100000 ]);
		deepEqual( Ratio.parseToArray(1.01e3), [ 1010,1 ]);
		
		deepEqual( Ratio.parseToArray(1e101), [ 1e101, 1 ]);
		deepEqual( Ratio.parseToArray(1.01e-3), [101, 100000]);
		deepEqual( Ratio.parseToArray(1.01e-30), [101, 1e32]);
		
		deepEqual( Ratio.parseToArray(-1.01e-30), [-101, 1e32]);
	});
	test( "test Ratio creation with invalid input", function(){
		equal( (new Ratio()).toString(), "0" );
		equal( (new Ratio(null,null)).toString(), "0" );
		equal( new Ratio(null,2).toString(), "0" );
		equal( new Ratio({},2).toString(), "0" );
		equal( new Ratio([],1).toString(), "0" );
		equal( new Ratio(true,1).toString(), "0" );
		equal( new Ratio(function(){},2).toString(), "0" );
		equal( new Ratio(false,2).toString(), "0" );
		equal( new Ratio(false,true).toString(), "0" );
		equal( new Ratio("ten", "ten").toString(), "0" );
		equal( new Ratio(/ten/,1).toString(), "0" );
		equal( new Ratio(Infinity).toString(), Infinity );
		equal( new Ratio(Infinity,1).toString(), Infinity );
		equal( new Ratio(Infinity,"0").toString(), Infinity );
		equal( new Ratio(-Infinity,"0").toString(), -Infinity );
		equal( (new Ratio(Infinity,Infinity)).toString(), "NaN" );
		equal( (new Ratio(NaN,0)).toString(), "NaN" );
	});
	test( "test equivalance using Ratio.prototype.equals and ==", function(){
		var a, b, c, d, e;
		a = new Ratio();
		b = new Ratio();
		c = new Ratio(3,4);
		d = new Ratio(3,4);
		e = new Ratio(12,12);
		f = new Ratio(12,12);
		
		equal( a.equals(a), true, "identity check using equals" );
		equal( b.equals(b), true, "identity check using equals" );
		equal( c.equals(c), true, "identity check using equals" );
		equal( d.equals(d), true, "identity check using equals" );
		
		equal( a.equals(b), true, "identity check using equals" );
		equal( +a == +b, true, "identity check using ==" );
		
		equal( c.equals(d), true, "identity check using equals" );
		equal( +c == +d, true, "identity check using ==" );
		
		equal( a.equals(c), false, "identity check" );
		equal( +a == +c, false, "identity check" );
		
		equal( e.equals(c), false, "identity check" );
		equal( f.equals(c), false, "identity check" );
	});
	test( "test comparison", function(){
		var a = new Ratio(1,2);
		var b = new Ratio(1,4);
		var c = new Ratio(150,3);
		ok( a > b );
		ok( c >= b );
		ok( c >= a );
		ok( b < a );
		ok( b <= c );
	});
	test( "test changing numerator", function(){
		var a, b;
		a = new Ratio(1,2);
		b = new Ratio(3,2);
		a.numerator = 3;
		equal( a.equals(b), true );
	});
	test( "test changing denominator", function(){
		var a, b;
		a = new Ratio(1,2);
		b = new Ratio(1,3);
		a.denominator = 3;
		equal( a.equals(b), true );
	});
	test( "test addition with +", function(){
		equal( new Ratio() + new Ratio(), 0 );
		equal( new Ratio(0) + new Ratio(0), 0);
		equal( new Ratio(-1) + new Ratio(1), 0 );
		equal( new Ratio(1) + new Ratio(2), 3 );
		equal( new Ratio(40) + new Ratio(2), 42 );
		equal( new Ratio(20001,40002) + new Ratio(400,800), 1 );
		equal( new Ratio(1,2) + new Ratio(1,2), 1 );
		equal( new Ratio(1) + new Ratio(1,2), 1.5 );
		equal( new Ratio(1) + new Ratio(1,3), 4/3 );
		equal( new Ratio(1,3) + new Ratio(-1,3), 0 );
	});
	test( "test Ratio.prototype.add()", function(){
		equal( new Ratio().add(new Ratio()).toString(), "0" );
		equal( new Ratio(0).add(new Ratio(0)).toString(), "0" );
		equal( new Ratio(2,4).add(new Ratio(4,8)).toString(), "1" );
		equal( new Ratio(1,2).add(new Ratio(1,2)).toString(), "1" );
		equal( new Ratio(1).add(new Ratio(1)).toString(), "2" );
		equal( new Ratio(1).add(new Ratio(2)).toString(), "3" );
		equal( new Ratio(40).add(new Ratio(2)).toString(), "42" );
		equal( new Ratio(1).add(new Ratio(1,2)).toString(), "3/2" );
		equal( new Ratio(2,5).add(new Ratio(3,4)).toString(), "23/20" );
		equal( new Ratio(1,3).add(new Ratio(3,9)).toString(), "6/9" );
		equal( new Ratio(4,9).add(new Ratio(3,9)).toString(), "7/9" );
	});
		test( "test addition with -", function(){
		equal( new Ratio() - new Ratio(), 0 );
		equal( new Ratio(1,4) - new Ratio(1,4), 0 );
		equal( new Ratio(1,5) - new Ratio(1,2), "-0.3" );
		equal( new Ratio(1,20) - new Ratio(1,100), "0.04" );
	});
	test( "test Ratio.prototype.subtract()", function(){
		equal( new Ratio().subtract(new Ratio()).toString(), "0" );
		equal( new Ratio(0).subtract(new Ratio(0)).toString(), "0" );
		equal( new Ratio(1,3).subtract(new Ratio(3,9)).toString(), "0" );
		equal( new Ratio(2,4).subtract(new Ratio(4,8)).toString(), "0" );
		equal( new Ratio(1).subtract(new Ratio(1,2)).toString(), "1/2" );
		equal( new Ratio(4).subtract(new Ratio(1)).toString(), "3" );
		equal( new Ratio(4,9).subtract(new Ratio(3,9)).toString(), "1/9" );
		equal( new Ratio(10,2).subtract(new Ratio(9,19)).toString(), "172/38" );
		equal( new Ratio(1).subtract(new Ratio(3,2)).toString(), "-1/2" );
		equal( new Ratio(1).subtract(new Ratio(4)).toString(), "-3" );
		equal( new Ratio(2,5).subtract(new Ratio(3,4)).toString(), "-7/20" );
		equal( new Ratio(1,9).subtract(new Ratio(4,9)).toString(), "-3/9" );
	});
	test( "test Ratio.prototype.descale", function(){
		equal( new Ratio( 25, 100 ).descale(5).toString(), "5/20" );
		equal( new Ratio( 5, 100 ).descale(5).toString(), "1/20" );
	});
	test( "test Ratio.prototype.getPrimeFactors", function(){
		var func = Ratio.getPrimeFactors;
		deepEqual( func.call(this, Infinity ), [] );
		deepEqual( func.call(this, {} ), [] );
		deepEqual( func.call(this, null ), [] );
		deepEqual( func.call(this, -1 ), [] );
		deepEqual( func.call(this, 0 ), [] );
		deepEqual( func.call(this, 1 ), [] );
		deepEqual( func.call(this, 2 ), [2] );
		deepEqual( func.call(this, 6 ), [2,3] );		
		deepEqual( func.call(this, 9 ), [3,3] );
		deepEqual( func.call(this, "729" ), [3,3,3,3,3,3] );
		deepEqual( func.call(this, 3333333791 ), [2347, 1420253] );
		deepEqual( func.call(this, 123456789 ), [3,3,3607,3803] );
		deepEqual( func.call(this, 9876543210 ), [2,3,3,5,17,17,379721] );
		deepEqual( func.call(this, "103103103" ), [3,103,333667] );
	});
	test( "test Ratio.gcd", function(){
		var func = Ratio.gcd;
		equal( func(0, 2), 1 );
		equal( func({}, 2), 1 );
		equal( func(null, true), 1 );
		equal( func(1, true), 1 );
		equal( func(1), 1 );
		equal( func(1, Infinity ), 1 );
		equal( func(-1, 2), 1 );
		equal( func(1, 1), 1 );
		equal( func(1, 2), 1 );
		equal( func(3, 6), 3 );
		equal( func(-3, 6), 3 );
		equal( func(4, 8), 4 );
		equal( func(10, 20), 10 );
		equal( func(41329375731, 82658751462), 41329375731 );
	});
	test( "test Ratio.prototype.multiply", function(){
		equal( new Ratio(1,1).multiply(new Ratio(1,1)).toString(), "1" );
		equal( new Ratio(1,1).multiply(new Ratio(2,1)).toString(), "2" );
		equal( new Ratio(-100,1).multiply(new Ratio(432,-1)).toString(), "43200" );
		equal( new Ratio(2,3).multiply(new Ratio(4,9)).toString(), "8/27" );
		equal( new Ratio(12,34).multiply(new Ratio(2,-54)).toString(), "-24/"+(34*54) );
		equal( new Ratio(12,34).multiply(new Ratio(2,-54)).toString(), "-24/"+(34*54) );
		equal( new Ratio(-213,-423).multiply(new Ratio(-123,-123)).toString(), (213*123)+"/"+(123*423) );
		equal( new Ratio(-213,-423).multiply(new Ratio(0,0)).toString(), "NaN" );
	});
	test( "test Ratio.prototype.divide", function(){
		equal( new Ratio(0,1).divide(new Ratio(1,10)).toString(), "0" );
		equal( new Ratio(1,1).divide(new Ratio(1,1)).toString(), "1" );
		equal( new Ratio(10,3).divide(new Ratio(100,30)).toString(), "1" );
		equal( new Ratio(1,4).divide(new Ratio(1,20)).toString(), "20/4" );
		equal( new Ratio(-10,23).divide(new Ratio(13,-39)).toString(), (39*10)+"/"+(13*23) );
		equal( new Ratio(-12,-34).divide(new Ratio(-45,-67)).toString(), (12*67)+"/"+(45*34) );
	});
	test( "test Ratio.dec2Ratio", function(){
		var func = Ratio.dec2Ratio;
		equal( func(1).toString(), "1" );
		equal( func(2).toString(), "2" );
		equal( func(434).toString(), "434" );
		equal( func(1/2).toString(), "5/10" );
		equal( func(1/3).toString(), "3333333333333333/10000000000000000" );
		equal( func(1/4).toString(), "25/100" );
		equal( func(1/5).toString(), "2/10" );
		equal( func(1/6).toString(), "16666666666666666/100000000000000000" );
		equal( func(1/7).toString(), "14285714285714284/100000000000000000" );
		equal( func(1/8).toString(), "125/1000" );
		equal( func(1/9).toString(), "1111111111111111/10000000000000000" );
		equal( func(1/10).toString(), "1/10" );
		equal( func(1/30).toString(), "3333333333333333/100000000000000000" );
		equal( func(1/111).toString(), "9009009009009008/1000000000000000000" );
		equal( func(49/20).toString(), "245/100" );
		equal( func(9/4).toString(), "225/100" );
		equal( func(7/3).toString(), "23333333333333336/10000000000000000" );
	});
	test( "test Ratio.prototype.reduce()", function(){
		equal( new Ratio().reduce().toString(), "0");
		equal( new Ratio(0).reduce().toString(), "0");
		equal( new Ratio(1).reduce().toString(), "1");
		equal( new Ratio(1,3).reduce().toString(), "1/3");
		equal( new Ratio(3,9).reduce().toString(), "1/3");
		equal( new Ratio(1/100).reduce().toString(), "1/100");
		equal( new Ratio(7/3).reduce().toString(), "7/3");
		equal( new Ratio(1/111).reduce().toString(), "1/111");
		equal( new Ratio(1/333).reduce().toString(), "1/333");
	});
	test( "test Ratio.prototype.copy", function(){
		var a = new Ratio(1/3);
		var b = a.copy();
		var c = new Ratio(20,9);
		equal( a.equals( b ), true );
		equal( b.equals( a ), true );
		equal( b.equals( c ), false );
		equal( c.equals( a ), false );
	});
	test( "test Ratio.prototype.copy", function(){
		var a = new Ratio(1,4);
		a.type = "string";
		equal( 1+a, "11/4" );
		equal( "Ratio = "+a, "Ratio = 1/4" );
		equal( isNaN( a ), true );
		
		a.type = "decimal";
		equal( 1+a, 1.25 );
		equal( "Ratio = "+a, "Ratio = 0.25" );
		equal( isNaN( a ), false );
		
		a.type = "";
		equal( 1+a, 1.25 );
		equal( "Ratio = "+a, "Ratio = 0.25" );
		equal( "Ratio = "+a.toString(), "Ratio = 1/4" );
		equal( isNaN( a ), false );
	});
	test( "test user case", function(){
		var a = new Ratio(1,2, "string");
		equal( a, "1/2" );
		a = a.add(3);
		equal( a, "7/2" );
		a = a.subtract(2);
		equal( a, "3/2" );
		a = a.divide("3/2");
		equal( a, "1" );
		//equal( a.multiply(12).reduce(), 12 );
		equal( a, "1" );
	});
});
