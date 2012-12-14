/**
* Quick hack to provides benchmark data for Ratio.js
*
* @author Larry Battle <bateru.com/news>
* @date July 11, 2012
* @requires Ratio.js and Browser with console.time and console.profile.
* @todo Make metrics browser independent. 
*	Try using YUI 3 profiler<http://yuilibrary.com/yui/docs/profiler/> and benchmark.js <https://github.com/bestiejs/benchmark.js>.
*/
(function(){
	var checkDependencies = (function(){
		// Sorry but right now the tests are dependent of a browser.
		if( !((typeof console === "object" ) && console.log && console.profile ) ){
			alert( "Oh no... console wasn't found.\n Try using 'Google Chrome Dev tools' or 'Firefox with Firebug'." );
			return false;
		}
		if( !(Ratio() instanceof Ratio) || typeof Ratio !== "function"){
			alert("Where's Ratio.js? Include Ratio.js to run this script.");
			return false;
		}
		return true;
	}());
	var benchmarkIt = function( name, func ){
		console.time( name );
		func();
		console.timeEnd( name );
	};
	var profileIt = function( name, func ){
		console.profile( name );		
		func();
		console.profileEnd( name );
	};
	// Test Class
	var Test = function( name, func, delay){
		this.name = name || "";
		this.func = func;
		this.delay = delay;
	};
	Test.prototype.run = function(){
		var that = this;
		setTimeout(function(){
			//profileIt( that.name, that.func );
			benchmarkIt( that.name, that.func );
		}, this.delay );
	};
	// Suite Class
	var Suite = function(){
		this.tests = [];
	};
	Suite.prototype.add = function( name, func ){
		this.tests.push( 
			new Test( name, func, (this.tests.length + 1) * 2000 ) 
		);
	};
	Suite.prototype.run = function(){
		var i, len;
		for( i = 0, len = this.tests.length; i < len; i++){
			this.tests[i].run();
		}
	};
	// ********************** //
	var tests = new Suite();
	tests.add( "Ratio()", function(){
		var i = 1e5;
		while( i-- ){
			Ratio(3);
			Ratio(1,3);
			Ratio(-3,-3);
			Ratio(10,-10);
			Ratio(-400,5);
		}
	});
	tests.add( "Ratio.gcd()", function(){
		var func = Ratio.gcd,
			i = 1e5;
		while( i-- ){
			func(1,20);
			func(111,111);
			func(4e3,20e3);
			func(1e3,270);
			func(134,200);
		}
	});
	tests.add( "Ratio.parse()", function(){
		var func = Ratio.parse,
			i = 1e5;
		while( i-- ){
			func("1/2");
			func("1/-2");
			func("1.333333333333333333");
			func(-23.1e43,443);
			func(0.234,0.24432);
			func("54/34","12/3");
		}
	});
	tests.add( "Ratio.prototype.clone()", function(){
		var func = function(a,b){
			Ratio(a,b).clone()
		},
			i = 1e5;
		while( i-- ){
			func(1,20);
			func(111,111);
			func(4e3,20e3);
			func(1e3,270);
			func(134,200);
		}
	});
	tests.add( "Ratio.prototype.add()", function(){
		var a = Ratio(),
		i = 1e5;
		while( i-- ){
			a.add(1,20);
			a.add(111,111);
			a.add(4e3,20e3);
			a.add(1e3,270);
			a.add(134,200);
		}
	});
	tests.add( "Ratio.prototype.subtract()", function(){
		var a = Ratio(),
			i = 1e5;
		while( i-- ){
			a.subtract(1,20);
			a.subtract(111,111);
			a.subtract(4e3,20e3);
			a.subtract(1e3,270);
			a.subtract(134,200);
		}
	});
	tests.add( "Ratio.prototype.divide()", function(){
		var a = Ratio(),
			i = 1e5;
		while( i-- ){
			a.divide(1,20);
			a.divide(111,111);
			a.divide(4e3,20e3);
			a.divide(1e3,270);
			a.divide(134,200);
		}
	});
	tests.add( "Ratio Use case", function(){
		var i = 1e5;
		while( i-- ){
			Ratio.parse(1/3).negate().add("-0.1").multiply(0xF3).divide(1,2).divide(1e-4).abs().toString()
		}
	});
	tests.run();
}());
