/**
	@project Ratio.js
	@purpose Provides a Ratio(Fraction) object for Javascript. Similar to Fraction.py for Python.
	@author Larry Battle , <http://bateru.com/news/>
	@date May 30, 2012
	@license MIT and GPL 3.0
	MIT License <http://www.opensource.org/licenses/mit-license>
	GPL v3 <http://opensource.org/licenses/GPL-3.0>
	@info Project page: <https://github.com/LarryBattle/Ratio.js/>
	@version Beta 0.1.5, 2012.05.30
	@todo Test scientific notation compatiblity. 
	@todo Make new Ratio and cloning a lot easier to copy over all the properties of the previous object.<br/>
		All clone should have the same divSign.
	@todo Try to convert to jsdocs.
 */
 
/**
	@classdesc {Ratio} Ratio - Ratio is an object that has a numerator and denominator, corresponding to a/b.
	@arg {Object} a - can be a Ratio object or numeric value.
	@arg {Object} b - can be a Ratio object or numeric value.
	@arg {string} type - can be either a "string" or "decimal". `type` forces a type on the Ratio object.
	@arg {boolean} alwaysReduce - If true, then the Ratio object and the child of it will always represent the simplified form of the rational.
	@returns {Ratio} object that has a numerator and denominator, corresponding to a/b.
	@example Ex. Ratio(2,4).toString() = Ratio("2/4").toString() = "2/4"
*/
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
/**
	@desc Checks if value is a finite number. <br/> Borrowed from jQuery 1.7.2 <br/>
	@arg {Object}
	@returns {Boolean}
	@example Ratio.isNumeric("1.0e3") == true
*/
Ratio.isNumeric = function (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
};
/**
	@desc Find the Greatest Common Factor between two numbers using "Euler Method".
	@arg {Number} a
	@returns {Number} b
	@example Ratio.gcd(20,12) == 4
*/
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
/**
	@desc Returns the numerator with the corresponding sign of (top/bottom). <br/>
		Use to force `top` to designate the sign of the Ratio.
	@arg {Number} top
	@arg {Number} bottom
	@returns {Number}
	@example Ratio.getNumeratorWithSign(1,-2) == -1
*/
Ratio.getNumeratorWithSign = function (top, bottom) {
	var x = (+top||1), y = (+bottom||1), a = "" + x*y;
	return ('-' != a[0]) ? Math.abs(+top) : -Math.abs(+top);
};
/**
	@desc Converts a decimal value to a ratio in the form of [top, bottom], such that top/bottom is the decimal value.
	@arg {Number|String} obj - Numeric Object containing a decimal point.
	@returns {Array[Number, Number]}
	@example Ratio.parseDecimal( "-0.25" ) == [-25,100]
*/
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
/**
	@desc Converts a scientific notated value to a ratio in the for of [top, bottom], such that top/bottom is the scientific notated value.
	@arg {Number|String} obj - Numeric Object containing a character `e`.
	@returns {Array[Number, Number]}
	@example Ratio.parseENotation(-2.5e23) == [-2.5e+24, 10]
*/
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

/**
	@desc Bridge for Ratio.parseENotation and Ratio.parseDecimal.
	@arg {Number|String} obj - Numeric Object containing a character `e` or `.`.
	@returns {Array[Number, Number]}
	@example Ratio.parseNumber( NaN ) == [];
*/
Ratio.parseNumber = function (obj) {
    if (!Ratio.isNumeric(obj)) {
		return [];
	}
	return (/e/i.test(obj)) ? Ratio.parseENotation(obj) : Ratio.parseDecimal(obj);
};
/**
@desc Converts a scientific notated value to a ratio in the for of [top, bottom], such that top/bottom is the scientific notated value.
	@desc Converts a numeric value to a ration in the form of [top, bottom], such that top/
	@arg {Number|String} obj - Numeric Object.
	@returns {Array[Number, Number]}
	@example Ratio.parseToArray( 0.125 ) == [125, 1000]
*/
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
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.parse = function (obj, obj2) {
	var arr = Ratio.parseToArray(obj), arr2;
    if ( arr.length && typeof obj2 != "undefined" && obj2 !== null) {
        arr2 = Ratio.parseToArray(obj2);
        arr[0] *= arr2[1];
        arr[1] *= arr2[0];
    }
    return new Ratio(arr[0], arr[1]);
};
// Converts input into a Ratio object then returns the reduced ratio.<br/>
// Ex. new Ratio.reduce( "10/4" ).toString() == "5/2";
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.reduce = function (obj,obj2) {
	return Ratio.parse(obj,obj2).reduce();
};
// To simplify a repeating decimal, divide the value into three parts.
// dec = i.xr, where i are the values to the left of the decimal point. 
// x are the decimals to the right of the decimal point and to the left of the repeating pattern.
// r is the unique repeating patterns for the repeating decimal.
// Ex. 22/7 = 3.14285714285714, i = 3, x = 1, r = 4285714
// If the value is not a repeating decimal, then returns empty array.
// Otherwise returns array = [ "numbers before decimal", "numbers before repeating pattern", "repeating pattern." ].
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.getRepeatProps = function( val ){
	val = (val || "").toString();
	var RE1_getRepeatDecimals = /(?:[^\.]+\.\d*)(\d{2,})+(?:\1)$/,
		arr = [], 
		match = RE1_getRepeatDecimals.exec( val ), 
		RE2_RE1AtEnd,
		RE3_RepeatingNums = /^(\d+)(?:\1)$/;
	if( !match ){
		val = val.replace( /\d$/, "" );
		match = RE1_getRepeatDecimals.exec( val );
	}
	if( match && 1 < match.length && /\.\d{10}/.test(match[0]) ){
		match[1] = RE3_RepeatingNums.test(match[1]) ? RE3_RepeatingNums.exec(match[1])[1] : match[1];
		RE2_RE1AtEnd = new RegExp( "("+ match[1] +")+$" );
		arr = val.replace( RE2_RE1AtEnd, "" ).split( /\./ ).concat( match[1] );
	}
	return arr;
}
// Returns the ratio as a/b
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.toFraction = function(){
	return "" + this.numerator + this.divSign + this.denominator;
};
// Returns an array form of the Ratio.
// Ex. new Ratio(1,2).toArray() == [1,2]
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.toArray = function () {
    return [this.numerator, this.denominator];
};
// Returns the computed value of numerator / denominator
// Ex. new Ratio(1,2).valueOf() == 0.5
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.valueOf = function (showValue) {
    return (!showValue && this.type == "string") ? this.toString() : (this.numerator / this.denominator);
};
// Returns a string of the Ratio in fraction form if the numerator and denominator are Rational numbers. <br/>
// Otherwise, returns a string of the computed value a/b. <br/>
// Note: x/1 is shown as x, and 0/x is 0.<br/>
// Ex. new Ratio(1,10).toString() == "1/10"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
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
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.clone = function () {
    return new Ratio(this.numerator, this.denominator, this.type, this.alwaysReduce);
};
// Reduces the Ratio. <br/> x*a / x*b => a / b <br/>
// Ex. var a = new Ratio(0.5); <br/>
// a.toString() == "5/10"; <br/>
// a.reduce().toString() == "1/2";
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
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
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
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
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.divide = function (obj) {
    if (!(obj instanceof Ratio)) {
        obj = Ratio.parse.apply(this, arguments);
    }
    return new Ratio(this.numerator * obj.denominator, this.denominator * obj.numerator, this.type, this.alwaysReduce);
};
// Compares if the current Ratio and another object have the same value.<br/>
// Ex. new Ratio(1,2).equals( 1/2 ) === true
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.equals = function (obj) {
    return (this.numerator / this.denominator) == obj.valueOf();
};
// Multiply the current Ratio by another Ratio. <br/>
// Ex. new Ratio(2,5).multiply( 1, 2 ).toString() == "2/10"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.multiply = function (obj) {
    if (!(obj instanceof Ratio)) {
        obj = Ratio.parse.apply(this, arguments);
    }
    return new Ratio(this.numerator * obj.numerator, this.denominator * obj.denominator, this.type, this.alwaysReduce);
};
// Subtracts the current Ratio by another Ratio. <br/>
// Ex. new Ratio(2,3).subtract(1,7).toString() === "-1/3"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.subtract = function (obj) {
    if (!(obj instanceof Ratio)) {
        obj = Ratio.parse.apply(this, arguments);
    }
    obj.numerator = -obj.numerator;
    return this.add(obj);
};
// ###### Extras ######
// Returns an new Ratio divided by a factor. <br/>
// Ex. new Ratio(10,4).descale( 2 ).toString() === "5/2"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.descale = function (factor) {
    return new Ratio(this.numerator / factor, this.denominator / factor, this.type, this.alwaysReduce);
};
// Returns an new Ratio powered to a power. <br/>
// Ex. new Ratio(2,4).pow(4).toString() === "16/256"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.pow = function (power) {
    return new Ratio(Math.pow(this.numerator, +power), Math.pow(this.denominator, +power), this.type, this.alwaysReduce);
};
// Returns a new Ratio multiplied by a factor.<br/>
// Ex. new Ratio(1,10).scale(10).toString() === "10/100"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.scale = function (factor) {
    return new Ratio(this.numerator * +factor, this.denominator * +factor, this.type, this.alwaysReduce);
};
// Returns a new Ratio by parsing the numerator and denominator.
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.reParse = function () {
    return Ratio.parse( this.numerator, this.denominator );
};
// Returns a Ratio object with no sign. <br/>
// Ex. new Ratio(-1,-2).abs().toString() === "1/2"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.abs = function () {
    return new Ratio(Math.abs(this.numerator), this.denominator, this.type, this.alwaysReduce);
};
// Returns Ratio in the form of (numerator mod denominator)/1 <br/>
// Ex. new Ratio(3,10).mod().toString() == 3
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.mod = function () {
    return new Ratio(this.numerator % this.denominator, 1, this.type, this.alwaysReduce);
};
// Returns Ratio that has toggled sign.
// Ex. new Ratio(1,2).negate().toString() == "-1/2"
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.negate = function () {
    return new Ratio( -this.numerator, this.denominator, this.type, this.alwaysReduce);
};
// Returns wheather the Ratio is proper.
// Ex. new Ratio(1,2).isProper() == true
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
Ratio.prototype.isProper = function () {
    return Math.abs(this.numerator) < this.denominator;
};
// Returns an array of the prime factors of a number. <br/>
// Ex. new Ratio.getPrimeFactors(20) returns [2,2,5] <br/>
// More info <http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/>
/**
	@desc 
	@arg {} -
	@returns
	@example
*/
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
