/**
* Quick hack to provides benchmark data for Ratio.js
* @author Larry Battle <bateru.com/news>
* @date April 21, 2013
* @requires Ratio.js
*/
(function(){
	// Test Class
	var Test = function( name, func, delay){
		this.name = name || "";
		this.func = func;
		this.startTime = 0;
		this.endTime = 0;
		this.duration = 0;
	};
	Test.prototype.run = function(){
		this.startTime = +(new Date());
		this.func();
		this.endTime = +(new Date());
		this.duration = this.endTime - this.startTime;
	};
	// Suite Class
	var Suite = function(){
		this.tests = [];
	};
	Suite.prototype.add = function( name, func ){
		this.tests.push( 
			new Test( name, func ) 
		);
	};
	Suite.prototype.run = function(){
		this.forEachTest(function(test){
			test.run();
		});
	};
	Suite.prototype.forEachTest = function(fn){
		var i, len;
		for( i = 0, len = this.tests.length; i < len; i++){
			fn( this.tests[i] );
		}
	};
	var createRow = function(arr){
		var row = "<tr>";
		for(var i = 0, len = arr.length; i < len; i++){
			row += "<td>";
			row += arr[i];
			row += "</td>";
		}
		row += "</tr>";
		return row;
	};
	var createTableHeader = function(){
		return "<thead>" + createRow(["Name", "Description"]) + "</thead>"; 
	};
	Suite.prototype.printResults = function(){
		var el = document.getElementById("results");
		var html = "<table>" + createTableHeader();
		this.forEachTest(function(test){
			// html += "<li>"+test.name + " : " + test.duration + "ms </li>";
			html += createRow([test.name, test.duration+" ms"]);
		});
		el.innerHTML = html + "</table>";
	};
	
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
			Ratio(a,b).clone();
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
	tests.add("add and subtract", function () {
		var addAndSubtract = function (a) {
			return Ratio.parse(a).add(a).subtract(a).equals(a);
		};	
		for (var i = 0, len = 1e5; i < len; i++) {
			addAndSubtract((Math.random() * 1e4).toFixed(3));
		}
	});
	tests.add( "Ratio.prototype.divide()", function(){
		var a = Ratio(),
			i = 1e5;
			a.divide(1,20);
		while( i-- ){
			a.divide(111,111);
			a.divide(4e3,20e3);
			a.divide(1e3,270);
			a.divide(134,200);
		}
	});
	tests.add( "Ratio Use case", function(){
		var i = 1e5;
		while( i-- ){
			Ratio.parse(1/3).negate().add("-0.1").multiply(0xF3).divide(1,2).divide(1e-4).abs().toString();
		}
	});
	tests.run();
	tests.printResults();
}());
