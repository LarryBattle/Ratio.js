
/**
 * @project Ratio.js
 * @purpose Provides a Ratio(Fraction) object for Javascript. Similar to Fraction.py for Python.
 * @author Larry Battle , <http://bateru.com/news/>
 * @date May 23, 2012
 * @license MIT and GPL 3.0
 * MIT License <http://www.opensource.org/licenses/mit-license>
 * GPL v3 <http://opensource.org/licenses/GPL-3.0>
 * @info Project page: <https://github.com/LarryBattle/Ratio.js/>
 * @version Beta 0.1.2, 2012.05.23
 */
//
// Todo: Test scientific notation compatiblity. <br/>
// Todo: Decide if it's ok for there to be scientific notation in the rationals. If yes, then will this cause problems?<br/>
// Todo: Decide if it's ok for there to be decimals inside the rational.<br/>
// Todo: Separate Core functionals with extras.<br/>
// Todo: Have Ratio methods parse the arguments instead of a parameter. <br/>
// Todo: Make new Ratio and cloning a lot easier to copy over all the properties of the previous object. All clone should have the same divSign.
// Todo: Fix Ratio.parse() to support the arguments. <br/>
// Todo: Try to convert to jsdocs.
// Todo: Change new Ratio() to Ratio() <br/>
// Todo: Ratio.prototype.descale, could produce decimals in numerator or denominator <br/>
// Todo: change the way Ratio.js find and use decimals, since scientistic notation is a valid number.<br/>
// Todo: Have testcases for all methods.<br/>
// Todo; Pass testcases.<br/>
//

// Note: Ratio.METHOD_NAME is used when this isn't contained within the bottom.
// Note: Use Ratio.prototype.METHOD_NAME if this is required in the bottom of the method.

// Returns an Ratio(Fraction) object that has a numerator and denominator, corresponding to a/b.<br/>
// Ex. Ratio(2,4).toString() = Ratio("2/4").toString() = "2/4" <br/>
var Ratio = function (a, b, type, alwaysReduce) {
	if(!(this instanceof Ratio)){
		return new Ratio(a, b, type, alwaysReduce);
	}
    this.divSign = "/";
    this.alwaysReduce = !!alwaysReduce;
    this.type = ""+type;
    this.denominator = isNaN("" + b) ? 1 : Math.abs(b);
    this.numerator = isNaN("" + a) ? 0 : Ratio.getNumeratorWithSign(a,(b||1));
    return this.denominator && this.alwaysReduce ? Ratio.reduce(this) : this;
};
// Borrowed from jQuery 1.7.2 <br/>
// Returns true if the value is finite number. <br/>
// Ex. new Ratio.isNumeric("1.0e3") == true
Ratio.isNumeric = function (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
};
// Returns the greatest common factors between two numbers using "Euler Method".<br/>
// Ex. new Ratio.gcd(20,12) == 4 <br/>
Ratio.gcd = function (a, b) {
    var c;
    b = (+b && +a) ? +b : 0;
    a = b ? a : 1;
    while (b) {
        c = a % b;
        a = b;
        b = c;
    }
    return Math.abs(a);
};
// Returns an array of the prime factors of a number. <br/>
// Ex. new Ratio.getPrimeFactors(20) returns [2,2,5] <br/>
// More info <http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/>
Ratio.getPrimeFactors = function (num) {
    num = Math.floor(num);
    var root, factors = [], x, sqrt = Math.sqrt, doLoop = 1 < num && isFinite(num);
    while (doLoop) {
        root = sqrt(num);
        x = 2;
        if (num % x) {
            x = 3;
            while ((num % x) && ((x += 2) < root));

        }
        
        x = (x > root) ? num : x;
        factors.push(x);
        doLoop = (x != num);
        num /= x;
    }
    return factors;
};
Ratio.getNumeratorWithSign = function (top, bottom) {
	var x = (+top||1), y = (+bottom||1), a = "" + x*y;
	return ('-' != a[0]) ? Math.abs(+top) : -Math.abs(+top);
};
Ratio.parseDecimal = function (obj) {
    var arr = [], base, parts;
	if(!Ratio.isNumeric(obj)){
		return arr;
	}
	obj = +obj;
    if (/\d+\.\d+$/.test(obj)) {
		parts = obj.toString().split(/\./);
		arr[1] = Math.pow(10, parts[1].length);
		arr[0] = Math.abs(parts[0]) * arr[1] + (+parts[1]);
		arr[0] = (/\-/.test(parts[0])) ? -arr[0] : arr[0];
	}else{
		arr = [obj, 1];
	}
    return arr;
};
Ratio.parseENotation = function (obj) {
    var arr = [], top, parts;
    if(!Ratio.isNumeric(obj)){
		return arr;
	}
	obj = +obj;
	if( /e/i.test(obj) ){
		parts = obj.toString().split(/e/i);
		top = Ratio.parseDecimal(parts[0]);
		if (Math.abs(obj) < 1) {
			arr[0] = top[0];
			arr[1] = +(top[1] + "e" + Math.abs(+parts[1]));
		} else {
			arr[0] = +(top[0] + "e" + Math.abs(+parts[1]));
			arr[1] = top[1];
		}
	}else{
		arr = Ratio.parseDecimal( obj );
	}
    return arr;
};
Ratio.parseNumber = function (obj) {
    var arr = [];
    if (!Ratio.isNumeric(obj)) {
		return arr;
	}
	if (/e/i.test(obj)) {
		arr = Ratio.parseENotation(obj);
	}else {
		arr = Ratio.parseDecimal(obj);
	}
    return arr;
};
Ratio.parseToArray = function (obj) {
    var arr = [], parts;
    if (typeof obj == "undefined" || obj === null) {
        return arr;
    }
    if (obj instanceof Ratio) {
        arr[0] = Ratio.getNumeratorWithSign(obj.numerator, obj.denominator);
        arr[1] = Math.abs(obj.denominator);
    } else {
        if (/\//.test(obj)) {
            parts = obj.split(/\//);
            arr[0] = Ratio.getNumeratorWithSign(parts[0], parts[1]);
            arr[1] = Math.abs(+parts[1]);
        } else {
            arr = Ratio.parseNumber(obj);
        }
    }
    return arr;
};
// Converts input to a Ratio object. <br/>
// Invalid numbers return NaN
// Ex. new Ratio.parse( "3/4" ).numerator == "3"
Ratio.parse = function (obj, obj2) {
	var arr = Ratio.parseToArray(obj), arr2;
    if ( !arr.length ){
        return NaN;
    }
    if (typeof obj2 != "undefined" && obj2 !== null) {
        arr2 = Ratio.parseToArray(obj2);
        arr[0] *= arr2[1];
        arr[1] *= arr2[0];
    }
    return new Ratio(arr[0], arr[1]);
};
// Converts input into a Ratio object then returns the reduced ratio.<br/>
// Ex. new Ratio.reduce( "10/4" ).toString() == "5/2";
Ratio.reduce = function (obj) {
	return Ratio.parse(obj).reduce();
};

Ratio.repeatingDec2Ratio = function (val) {	
    var a = Ratio.parse(val),
    top = a.numerator,
    bottom = a.denominator,
    repeatVal = Ratio.getRepeatingDecimals(a);
    var d = (+a).toString();
    if (repeatVal) {
        // calculate b
        var r = repeatVal;
        // Todo fix and test this.
        var re = new RegExp("\\.(\\d+?)" + r);
        var x = d.match(re)[1];
        var b = Math.pow(10, x.length);
        x = d.split('.')[1].split(d.indexOf(r))[0];
        // top = Math.pow(10, r.length * b);
        // bottom = Math.pow(10,r.length + x.length) - Math.pow(10,x.length);
    }
    return new Ratio(top, bottom);
};
// Returns wheather a value has repeating decimals.
// Ex. new Ratio.hasRepeatingDecimals(1/3) == true
Ratio.hasRepeatingDecimals = function (val) {
    var matches = false,
    re = /(\d+?)\1$/;
    if (!isNaN("" + val) && /\.\d{5}/.test((+val).toString())) {
        matches = !!(+val).toString().replace(/\d$/, "").match(re);
    }
    return matches;
};
// Returns the repeating decimals from a repeating decimal value.
// Ex. new Ratio.getRepeatingDecimals(1/3) == "3"
Ratio.getRepeatingDecimals = function (val) {
	var match = null, re = /(\d+?)(?:\1+)/;
    if (!Ratio.hasRepeatingDecimals(val)) {
        return match;
    }
    match = (+val).toString().replace(/\d$/, "").match(re)[1];
    return match;
};
// Returns the ratio as a/b
Ratio.prototype.toFraction = function(){
	return "" + this.numerator + this.divSign + this.denominator;
};
// Returns an array form of the Ratio.
// Ex. new Ratio(1,2).toArray() == [1,2]
Ratio.prototype.toArray = function () {
    return [this.numerator, this.denominator];
};
// Returns the computed value of numerator / denominator
// Ex. new Ratio(1,2).valueOf() == 0.5
Ratio.prototype.valueOf = function (showValue) {
    return (!showValue && this.type == "string") ? this.toString() : (this.numerator / this.denominator);
};
// Returns a string of the Ratio in fraction form if the numerator and denominator are Rational numbers. <br/>
// Otherwise, returns a string of the computed value a/b. <br/>
// Note: x/1 is shown as x, and 0/x is 0.<br/>
// Ex. new Ratio(1,10).toString() == "1/10"
Ratio.prototype.toString = function () {
    var str = "" + this.numerator, val = this.valueOf(true);
    if ( +(this.numerator) && this.denominator != 1) {
        str += this.divSign + Math.abs(this.denominator);
    }
	if ( +this.denominator == 0 || (this.numerator % this.denominator) == 0 ) {
		str = val;
	}
    return (isNaN(val) || this.type == "decimal") ? val.toString() : str;
};
// Returns a new copy of the Ratio with a specified type.<br/>
// Ex. new Ratio(1,2).clone().toString() === "1/2"
Ratio.prototype.clone = function () {
    return new Ratio(this.numerator, this.denominator, this.type, this.alwaysReduce);
};
// Reduces the Ratio. <br/> x*a / x*b => a / b <br/>
// Ex. var a = new Ratio(0.5); <br/>
// a.toString() == "5/10"; <br/>
// a.reduce().toString() == "1/2";
Ratio.prototype.reduce = function () {
    var top = this.numerator, bottom = this.denominator, arr = Ratio.getRepeatProps(top/bottom);
    if ( arr.length ) {
		top = +(arr.join('')) - +(arr[0]+""+arr[1]);
		bottom = Math.pow(10, arr[1].length ) * ( Math.pow(10, arr[2].length ) - 1);
    }
	var factor = Ratio.gcd(top, bottom);
    return new Ratio( top / factor, bottom / factor );
};
// Adds the current Ratio by another Ratio.<br/>
// Ex. new Ratio( 1, 3 ).add( 1,2 ).toString() == "5/6"
Ratio.prototype.add = function (obj) {
    if (!(obj instanceof Ratio)) {
        obj = Ratio.parse.apply(this, arguments);
    }
    var x, top, bottom;

    if (this.denominator == obj.denominator) {
        top = this.numerator + obj.numerator;
        bottom = this.denominator;
    } else {
        x = Ratio.gcd(this.denominator, obj.denominator),
        top = ((this.numerator * obj.denominator) + ( this.denominator *obj.numerator)) / x,
        bottom = (this.denominator * obj.denominator) / x;
    }
    return new Ratio(top, bottom, this.type, this.alwaysReduce);
};
// Divides the current Ratio by another Ratio. <br/>
// Ex. new Ratio( 1,2 ).divide( 3,4 ).toString() == "2/3"
Ratio.prototype.divide = function (obj) {
    if (!(obj instanceof Ratio)) {
        obj = Ratio.parse.apply(this, arguments);
    }
    return new Ratio(this.numerator * obj.denominator, this.denominator * obj.numerator, this.type, this.alwaysReduce);
};
// Compares if the current Ratio and another object have the same value.<br/>
// Ex. new Ratio(1,2).equals( 1/2 ) === true
Ratio.prototype.equals = function (obj) {
    return (this.numerator / this.denominator) == obj.valueOf();
};
// Multiply the current Ratio by another Ratio. <br/>
// Ex. new Ratio(2,5).multiply( 1, 2 ).toString() == "2/10"
Ratio.prototype.multiply = function (obj) {
    if (!(obj instanceof Ratio)) {
        obj = Ratio.parse.apply(this, arguments);
    }
    return new Ratio(this.numerator * obj.numerator, this.denominator * obj.denominator, this.type, this.alwaysReduce);
};
// Subtracts the current Ratio by another Ratio. <br/>
// Ex. new Ratio(2,3).subtract(1,7).toString() === "-1/3"
Ratio.prototype.subtract = function (obj) {
    if (!(obj instanceof Ratio)) {
        obj = Ratio.parse.apply(this, arguments);
    }
    obj.numerator = -obj.numerator;
    return this.add(obj);
};
// ######
// Extras
// ######
// Returns an new Ratio divided by a factor. <br/>
// Ex. new Ratio(10,4).descale( 2 ).toString() === "5/2"
Ratio.prototype.descale = function (factor) {
    return new Ratio(this.numerator / +factor, this.denominator / +factor, this.type, this.alwaysReduce);
};
// Returns an new Ratio powered to a power. <br/>
// Ex. new Ratio(2,4).pow(4).toString() === "16/256"
Ratio.prototype.pow = function (power) {
    return new Ratio(Math.pow(this.numerator, +power), Math.pow(this.denominator, +power), this.type, this.alwaysReduce);
};
// Returns an new Ratio multiplied by a factor.<br/>
// Ex. new Ratio(1,10).scale(10).toString() === "10/100"
Ratio.prototype.scale = function (factor) {
    return new Ratio(this.numerator * +factor, this.denominator * +factor, this.type, this.alwaysReduce);
};
// Returns a Ratio object with no sign. <br/>
// Ex. new Ratio(-1,-2).abs().toString() === "1/2"
Ratio.prototype.abs = function () {
    return new Ratio(Math.abs(this.numerator), this.denominator, this.type, this.alwaysReduce);
};
// Returns Ratio in the form of (numerator mod denominator)/1 <br/>
// Ex. new Ratio(3,10).mod().toString() == 3
Ratio.prototype.mod = function () {
    return new Ratio(this.numerator % this.denominator, 1, this.type, this.alwaysReduce);
};
// Returns Ratio that has toggled sign.
// Ex. new Ratio(1,2).negate().toString() == "-1/2"
Ratio.prototype.negate = function () {
    return new Ratio( -this.numerator, this.denominator, this.type, this.alwaysReduce);
};
// Returns wheather the Ratio is proper.s
// Ex. new Ratio(1,2).isProper() == true
Ratio.prototype.isProper = function () {
    return Math.abs(this.numerator) < this.denominator;
};



Ratio.getRepeatProps = function( val ){
	var RE1_getRepeatDecimals = /(?:[^\.]+\.\d*)(\d+)+(?:\1)$/, 
		arr = [], 
		match = RE1_getRepeatDecimals.exec( val ), 
		RE2_RE1AtEnd;
	if( !match ){
		val = (val || "" ).toString().replace( /\d$/, "" );
		match = RE1_getRepeatDecimals.exec( val );
	}
	if( match && typeof match[1] != "undefined" && /\.\d{10}/.test(match[0]) ){
		RE2_RE1AtEnd = new RegExp( "("+ match[1] +")+$" );
		arr = val.toString().replace( RE2_RE1AtEnd, "" ).split( /\./ ).concat( match[1] );
	}
	return arr;
}







