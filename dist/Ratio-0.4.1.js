/**
 * Ratio.js, provides a Ratio(Fraction) object for Javascript.
 * Created by Larry Battle, https://github.com/LarryBattle
 * license MIT, http://www.opensource.org/licenses/mit-license
 * Project Page: https://github.com/LarryBattle/Ratio.js
 *
 * @module Ratio
 **/
var Ratio = (function() {
    "use strict";
    /**
     * Ratio is an object that has a numerator and denominator, corresponding to a/b.<br/>
     * Note that the keyword `new` is not required to create a new instance of the Ratio object, since this is done for you.<br/>
     * In otherwords, `new Ratio( value )` is the same as `Ratio( value )`.
     *
     * @class Ratio
     * @constructor
     * @chainable
     * @param {Ratio|String|Number} [numerator=0] can be a Ratio object or numeric value.
     * @param {Ratio|String|Number} [denominator=1] can be a Ratio object or numeric value.
     * @param {Boolean} [alwaysReduce] if true, then the Ratio object and the children from it will always represent the simplified form of the rational.
     * @return {Ratio} object that has a numerator and denominator, corresponding to a/b.
     * @example
    Ratio(2,4).toString() === "2/4";
    Ratio("2/4").toString() === "NaN/1" // Use Ratio.parse()!
     **/
    var Ratio = function(numerator, denominator, alwaysReduce) {
      if (!(this instanceof Ratio)) {
        return new Ratio(numerator, denominator, alwaysReduce);
      }
      this.divSign = "/";
      this.alwaysReduce = !!alwaysReduce;
      var arr = Ratio.getStandardRatioArray(numerator, denominator, this.alwaysReduce);
      this._n = arr[0];
      this._d = arr[1];
      return this;
    };
    /**
     * Represents the maximum amount of precision avaiable. <br/>
     * Any value with more digits will become estimations.
     *
     * @property Ratio.MAX_PRECISION
     * @type {Number}
     */
    Ratio.MAX_PRECISION = (1 / 3).toString().length - 2;
    /**
     * Represents the largest value that stored without loss of precision. <br/>
     * Any value larger will become estimations.
     * Source: "http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-t"
     *
     * @property Ratio.MAX_VALUE
     * @type {Number}
     */
    Ratio.MAX_VALUE = Math.pow(2, 53);
    /**
     * Represents the smallest value that stored without loss of precision. <br/>
     * Any value smaller will become estimations.
     * Source: "http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-t"
     *
     * @property Ratio.MIN_VALUE
     * @type {Number}
     */
    Ratio.MIN_VALUE = -Math.pow(2, 53);
    /**
     * Stores complex regular expressions.
     *
     * @property Ratio.regex
     * @type {Object}
     */
    Ratio.regex = {
      divSignCheck: /(\d|Infinity)\s*\//,
      divSignSplit: /\//,
      cleanFormat: /^\d+\.\d+$/,
      mixedNumbers: /(\S+)\s+(\S[\w\W]*)/,
      repeatingDecimals: /[^\.]+\.\d*(\d{2,})+(?:\1)$/,
      repeatingNumbers: /^(\d+)(?:\1)$/
    };
    /**
     * Version number of Ratio.js
     *
     * @property Ratio.VERSION
     * @type String
     **/
    Ratio.VERSION = "0.4.1";
    /**
     * Checks if value is a finite number. <br/> Borrowed from jQuery 1.7.2 <br/>
     *
     * @method Ratio.isNumeric
     * @param {Object} obj
     * @return {Boolean}
     * @example
    Ratio.isNumeric("1.0e3") === true
     **/
    Ratio.isNumeric = function(obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    };
    /**
     * Returns the default value if the provided new value is undefined or null.
     *
     * @method Ratio.getValueIfDefined
     * @param {Object} backup - default value
     * @param {Object} value
     * @return {Object}
     * @example
    Ratio.getValueIfDefined( 4, null ) === 4
     **/
    Ratio.getValueIfDefined = function(backup, value) {
      return typeof value !== "undefined" && value !== null ? value : backup;
    };
    /**
     * Find the Greatest Common Factor between two numbers using the Euler Method.
     * Will return the first argument if only one argument is passed.
     *
     * @method Ratio.gcd
     * @param {Number} a
     * @param {Number} b
     * @return {Number}
     * @example
    Ratio.gcd(20,12) === 4
     **/
    Ratio.gcd = function(a, b) {
      if (arguments.length < 2) {
        return a;
      }
      var c;
      a = +a;
      b = +b;
      // Same as isNaN() but faster
      if (a !== a || b !== b) {
        return NaN;
      }
      //Same as !isFinite() but faster
      if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
        return Infinity;
      }
      // Checks if a or b are decimals
      if ((a % 1 !== 0) || (b % 1 !== 0)) {
        throw new Error("Can only operate on integers");
      }
      while (b) {
        c = a % b;
        a = b;
        b = c;
      }
      return (0 < a) ? a : -a;
    };
    /**
     * Returns the numerator with the corresponding sign of (top/bottom).<br/>
     *
     * @method Ratio.getNumeratorWithSign
     * @param {Number} top
     * @param {Number} bottom
     * @return {Number}
     * @example
    Ratio.getNumeratorWithSign(1,-2) === -1
     **/
    Ratio.getNumeratorWithSign = function(top, bottom) {
      var sign = (+top * (+bottom || 1)) < 0 ? -1 : 1;
      return Math.abs(+top) * sign;
    };
    /**
     * Provides a quick way to find out the numeric type of an object.
     * Types include: `NaN`, `Ratio`, `number`, `e`, `decimal`, `mixed` and `fraction`
     *
     * @method Ratio.guessType
     * @param {*} obj
     * @return {String} type
     * @example
    Ratio.guessType("1/3") === "fraction";
     **/
    Ratio.guessType = function(obj) {
      var type = "NaN";
      if (obj instanceof Ratio) {
        type = "Ratio";
      } else if (!isNaN(obj)) {
        type = "number";
        if (-1 < (+obj).toString().indexOf("e")) {
          type = "e";
        } else if (obj % 1) {
          type = "decimal";
        }
      } else if (Ratio.regex.divSignCheck.test(obj)) {
        if (/\d\s+[+\-]?\d/.test(obj)) {
          type = "mixed";
        } else {
          type = "fraction";
        }
      }
      return type;
    };
    /**
     * Converts a numeric value to an array in the form of [top, bottom], such that top/bottom evaluates to the passed value.
     *
     * @method Ratio.parseToArray
     * @param {Number|String} obj Numeric Object.
     * @return {Array[Number, Number]}
     * @example
    Ratio.parseToArray( 0.125 ) // returns [125, 1000]
     **/
    Ratio.parseToArray = function(obj) {
      var parts = [],
        sign,
        index,
        arr = [],
        top;
      switch (Ratio.guessType(obj)) {
        case "mixed":
          parts = obj.match(Ratio.regex.mixedNumbers);
          arr = Ratio.parseToArray(parts[2]);
          sign = (+parts[1] < 0 || +arr[0] < 0) ? -1 : 1;
          arr[0] = sign * (Math.abs(arr[0]) + Math.abs(parts[1] * arr[1]));
          break;
        case "fraction":
          parts = obj.split(Ratio.regex.divSignSplit);
          arr[0] = Ratio.getNumeratorWithSign(parts[0], parts[1]);
          arr[1] = Math.abs(+parts[1]);
          break;
        case "decimal":
          parts = (+obj).toString().split(".");
          arr[1] = Math.pow(10, parts[1].length);
          arr[0] = Math.abs(parts[0]) * arr[1] + (+parts[1]);
          arr[0] = (-1 < (parts[0]).indexOf("-")) ? -arr[0] : arr[0];
          break;
        case "number":
          arr = [+obj, 1];
          break;
        case "e":
          parts = (+obj).toString().split(/e/i);
          top = Ratio.parseToArray(parts[0]);
          index = (Math.abs(+obj) < 1) ? [0, 1] : [1, 0];
          arr[index[0]] = top[index[0]];
          arr[index[1]] = Number(top[index[1]] + "e" + Math.abs(+parts[1]));
          break;
        case "Ratio":
          arr = [obj._n, obj._d];
          break;
        default:
          arr = [NaN, 1];
      }
      return arr;
    };
    /**
     * Converts a numeric value to a Ratio object.
     * Supports mixed numbers, whole numbers, decimals, scientific numbers and Ratio objects.
     *
     * @method Ratio.parse
     * @chainable
     * @param {Ratio|Number|String} obj - numerator
     * @param {Ratio|Number|String} [obj] - denominator
     * @return {Ratio}
     * @example
    Ratio.parse(22,7).toString() === "22/7"; //whole numbers

    Ratio.parse("3 1/7").toString() === "22/7"; // mixed numbers

    Ratio.parse(22/7).simplify().toLocaleString() === "3 1/7"; // decimals

    Ratio.parse("22/7").toLocaleString() === "3 1/7"; // fractions

    Ratio.parse("22e31/70e30").simplify().toLocaleString() === "3 1/7"; // scientific notated numbers
     **/
    Ratio.parse = function(obj, obj2) {
      var arr = Ratio.parseToArray(obj),
        arr2;
      if (arr.length && obj2 !== undefined && obj2 !== null) {
        arr2 = Ratio.parseToArray(obj2);
        arr[0] *= arr2[1];
        arr[1] *= arr2[0];
      }
      return new Ratio(arr[0], arr[1]);
    };
    /**
     * Returns an array of two numbers that represent ratio of the passed values.
     *
     * @method Ratio.simplify
     * @param {Ratio|Number|String} obj
     * @param {Ratio|Number|String} [obj]
     * @return {Array[ Number, Number ]}
     * @example
    Example 1:

    Ratio.simplify( Ratio(36,-36) ); // returns [-1,1]

    Example 2:

    Ratio.simplify( "9/12" ); // returns [3,4]

    Example 3:

    Ratio.simplify( "10/4", "5/3" ); // returns [3,2] because ("10/4", "5/3") => ("6/4")
    Ratio.simplify( "6/4" ); // returns [3,2]
     **/
    Ratio.simplify = function(obj, obj2) {
      obj = Ratio.parse(obj, obj2);
      var top = obj._n,
        bottom = top || !obj._d ? obj._d : 1,
        arr = Ratio.getRepeatProps(top / bottom),
        factor;
      if (arr.length) {
        top = Number(arr.join('')) - Number(arr[0] + String(arr[1]));
        bottom = Math.pow(10, arr[1].length) * (Math.pow(10, arr[2].length) - 1);
      }
      factor = Ratio.gcd(top, bottom);
      return [top / factor, bottom / factor];
    };
    /**
     * This function divides a repeating decimal into 3 parts. If the value passed is not a repeating decimal then an empty array is returned.<br/>
     * For repeating decimals, the return value is an array which contains the numeric value split into 3 parts like, <br/>
     * [ "numbers before decimal", "numbers before repeating pattern", "repeating pattern." ].<br/>
     * Here's another explanation. <br/>
     * The return value is [i, x, r] for the repeating decimal value.<br/>
     * where i are the values to the left of the decimal point. <br/>
     * x are the decimals to the right of the decimal point and to the left of the repeating pattern.<br/>
     * r is the unique repeating patterns for the repeating decimal.<br/>
     * Example. 22/7 = 3.142857142857143 = 3.14-285714-285714-3, i = 3, x = 14, r = 285714<br/>
     * It should be noted that the last digit might be removed to avoid rounding errors.
     *
     * @method Ratio.getRepeatProps
     * @param {Number} val
     * @return {Array[String, String, String]} - Must return strings because of zeros in pattern.
     * @example
    Ratio.getRepeatProps( 22/7 ) // returns ["3", "14", "285714"]
     **/
    Ratio.getRepeatProps = function(val) {
      val = String(val || "");
      var arr = [],
        match = Ratio.regex.repeatingDecimals.exec(val),
        RE2_RE1AtEnd,
        RE3_RepeatingNums = Ratio.regex.repeatingNumbers;
      if (!match) {
        val = val.replace(/\d$/, "");
        match = Ratio.regex.repeatingDecimals.exec(val);
      }
      if (match && 1 < match.length && /\.\d{10}/.test(match[0])) {
        match[1] = RE3_RepeatingNums.test(match[1]) ? RE3_RepeatingNums.exec(match[1])[1] : match[1];
        RE2_RE1AtEnd = new RegExp("(" + match[1] + ")+$");
        arr = val.split(/\./).concat(match[1]);
        arr[1] = arr[1].replace(RE2_RE1AtEnd, "");
      }
      return arr;
    };
    /**
     * Returns the prime factors of a number. <br/>
     * More info <http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/>
     *
     * @method Ratio.getPrimeFactors
     * @param {Number} num
     * @return {Array} an array of numbers
     * @example
    Ratio.getPrimeFactors(20).join(',') === "2,2,5"
     **/
    Ratio.getPrimeFactors = function(num) {
      num = Math.floor(num);
      var root,
        factors = [],
        x,
        sqrt = Math.sqrt,
        doLoop = 1 < num && isFinite(num);
      while (doLoop) {
        root = sqrt(num);
        x = 2;
        if (num % x) {
          x = 3;
          while ((num % x) && ((x += 2) < root)) {}
        }
        x = (root < x) ? num : x;
        factors.push(x);
        doLoop = (x !== num);
        num /= x;
      }
      return factors;
    };
    /**
     * Rounds up a scientific notated number with 8+ trailing 0s or 9s.<br/>
     *
     * @method Ratio.getCleanENotation
     * @param {Number} num
     * @return {String} - Returns number as string to preserve value.
     * @example
    Example 1
    Ratio.getCleanENotation( "1.1000000000000003e-30" ) === "1.1e-30";

    Example 2
    Ratio.getCleanENotation( "9.999999999999999e+22" ) === "1e+23";
     **/
    Ratio.getCleanENotation = function(num) {
      num = (+num || 0).toString();
      if (/\.\d+(0|9){8,}\d?e/.test(num)) {
        var i = num.match(/(?:\d+\.)(\d+)(?:e[\w\W]*)/)[1].replace(/(0|9)+\d$/, '').length + 1;
        num = (+num).toPrecision(i).toString();
      }
      return num;
    };
    /**
     * Moves all the zeros for scientific numbers to the first or second element.</br>
     * The most takes all. This helps simplify computational errors with `SN`s. *Need to reword*
     *
     * @param {Number} top
     * @param {Number} bottom
     * @return {Array} - Pair of numbers
     * @method Ratio.simplifyENotation
     * @example
    Ratio.simplifyENotation(3e80,3e35); // returns [3e45,3]
     */
    Ratio.simplifyENotation = function(top, bottom) {
      var val = top / bottom,
        re = /[eE]/;
      if (!isNaN(val) && re.test(top) && re.test(bottom)) {
        var arr = (top).toString().split("e"),
          arr2 = (bottom).toString().split("e");
        if (Number(arr2[1]) < Number(arr[1])) {
          arr[1] = Number(arr[1]) + (-1 * arr2[1]);
          arr2[1] = 0;
        } else {
          arr2[1] = Number(arr2[1]) + (-1 * arr[1]);
          arr[1] = 0;
        }
        top = Number(arr.join("e"));
        bottom = Number(arr2.join("e"));
      }
      return [top, bottom];
    };
    /**
     * Used to combine two ratios into one.
     *
     * @method Ratio.getCombinedRatio
     * @chainable
     * @param {Ratio|String|Number} [obj]
     * @param {Ratio|String|Number} [obj]
     * @return {Ratio} [obj]
     * @example
    Ratio.getCombinedRatio("1/2","1/3").toString() === "3/2"
     **/
    Ratio.getCombinedRatio = function(obj, obj2) {
      if (!(obj instanceof Ratio) || obj2 !== undefined) {
        obj = Ratio.parse(obj, obj2);
      }
      return obj;
    };
    /**
     * Returns a new Ratio with random values for the numerator and denominator.
     * Values range from [0, 1]
     *
     * @method Ratio.random
     * @chainable
     * @return {Ratio}
     * @example
    Ratio.random().toString(); // might return "1/4"
     */
    Ratio.random = function() {
      var value = (Math.random()).toFixed(Math.floor(Math.random() * 16));
      return Ratio.parse(value).simplify();
    };
    /**
     * Returns an ratio as an array with the first element containing the sign of the fraction. 
     * @method Ratio.getStandardRatioArray()
     *
     * @param {Number} a - numerator
     * @param {Number} b - denominator
     * @param {Boolean} alwaysReduce - if true, then returns the simplify fraction.
     * @return {Array} [numerator, denominator]
     * @example
    Ratio.getStandardRatioArray(-10,-20, true); // returns [1,2]
     * */
    Ratio.getStandardRatioArray = function(a, b, alwaysReduce) {
      if (typeof b === "undefined") {
        b = 1;
        if (typeof a === "undefined") {
          a = 0;
        }
      }
      var denominator = +Math.abs(b);
      var numerator = Ratio.getNumeratorWithSign(a, (b || 1));
      var arr = [numerator, denominator];
      if (arr[1] && alwaysReduce) {
        arr = Ratio.simplify(arr[0], arr[1]);
      }
      return arr;
    };
    Ratio.prototype = {
      constructor: Ratio,
      /**
       * A setter and getter for the numerator
       * @method Ratio.prototype.numerator
       * @param {Ratio|String|Number} val - numerator
       * @return {Number} - numerator
       */
      numerator: function(val) {
        if (typeof val !== "undefined") {
          this._n = Ratio.parse(val).valueOf();
        }
        return this._n;
      },
      /**
       * A setter and getter for the denominator
       * @method Ratio.prototype.denominator
       * @param {Ratio|String|Number} val - denominator
       * @return {Number} - denominator
       */
      denominator: function(val) {
        if (typeof val !== "undefined") {
          this._d = Ratio.parse(val).valueOf();
          this.correctRatio();
        }
        return this._d;
      },
      /**
         * For each ratio instance, corrects three main problems:
         * 1) Sets the numerator and denominator to default values if undefined. (Default fraction: 0/1)
         * 2) Places the sign on numerator.
         * 3) Reduces the ratio if needed.
         *
         * @method Ratio.prototype.correctRatio
         * @return {Ratio}
         * @example
        Ratio().toString() === "0/1"; // `.correctRatio()` was called internally.
         **/
      correctRatio: function() {
        var arr = Ratio.getStandardRatioArray(this._n, this._d, this.alwaysReduce);
        this._n = arr[0];
        this._d = arr[1];
        return this;
      },
      /**
         * From the Ratio instance, returns the raw values of the numerator and denominator in the form [numerator, denominator].
         *
         * @method Ratio.prototype.toArray
         * @return {Array} an array of 2 numbers.
         * @example
        Ratio(1,2).toArray().join(',') === "1,2"
         **/
      toArray: function() {
        return [this._n, this._d];
      },
      /**
         * From the Ratio instance, returns the result of the numerator divided by the denominator.
         *
         * @method Ratio.prototype.valueOf
         * @return {Number}
         * @example
        Example 1:
        Ratio(1,2).valueOf() === 0.5;
         **/
      valueOf: function() {
        var arr = Ratio.simplifyENotation(this._n, this._d);
        return arr[0] / arr[1];
      },
      /**
         * From the Ratio instance, returns a string of the Ratio in fraction form if the numerator and denominator are Rational numbers.<br/>
         * The output format can be a whole number, mixed number, NaN, proper fraction depending on the computed value of (numerator / denominator).
         *
         * @method Ratio.prototype.toLocaleString
         * @return {String}
         * @example
        Example 1:
        Ratio(1,10).toLocaleString() === "1/10"

        Example 2:
        Ratio(0,0).toLocaleString() === "NaN"
         **/
      toLocaleString: function() {
        var val = this.valueOf(),
          x,
          str;
        if (isNaN(val)) {
          str = "NaN";
        } else if (val % 1 === 0 || this._d === 1 || !isFinite(val % 1)) {
          str = String(val);
        } else if (1 < Math.abs(val)) {
          x = parseInt(val, 10);
          str = x + " " + Math.abs(this._n % this._d) + String(this.divSign) + this._d;
        } else {
          str = this._n + String(this.divSign) + this._d;
        }
        return str;
      },
      /**
         * From the Ratio instance, returns the raw values of the numerator and denominator in the form "a/b".<br/>
         * Note: The division symbol can be change by modification of the `divSign` property.
         *
         * @method Ratio.prototype.toString
         * @return {String}
         * @example
        Example 1:
        Ratio(8,2).toString() === "8/2";

        Example 2:
        var a = Ratio(8,2);
        a.divSign = ":";
        a.toString() == "8:2";
         **/
      toString: function() {
        return String(this._n + this.divSign + this._d);
      },
      /**
         * Returns a new instance of the current Ratio.<br/>
         * The clone propery value can be changed if the appropriate argument value is supplied.
         *
         * @method Ratio.prototype.clone
         * @param {Number} [top]
         * @param {Number} [bottom]
         * @param {Boolean} [alwaysReduce]
         * @return {Ratio}
         * @example
        var a = Ratio(2,4);
        var b = a.clone();
        a.equals(b) === true;
         **/
      clone: function(top, bottom, alwaysReduce) {
        var func = Ratio.getValueIfDefined;
        top = func(this._n, top);
        bottom = func(this._d, bottom);
        alwaysReduce = func(this.alwaysReduce, alwaysReduce);
        return new Ratio(top, bottom, alwaysReduce);
      },
      /**
         * Determines if a current instance value is not a number.
         *
         * @method Ratio.prototype.isNaN
         * @return {Boolean}
         * @example
        Ratio(1,2).isNaN() === false;
         */
      isNaN: function() {
        return !Ratio.isNumeric(this.valueOf());
      },
      /**
         * Returns a simplifyd ratio from the current instance.
         *
         * @method Ratio.prototype.simplify
         * @chainable
         * @return {Ratio}
         * @example
        Ratio(10,2).simplify().toString() === "5/1"
         **/
      simplify: function() {
        var arr = Ratio.simplify(this._n, this._d);
        return this.clone(arr[0], arr[1]);
      },
      /**
         * Adds the current Ratio to another Ratio.
         *
         * @method Ratio.prototype.add
         * @chainable
         * @param {Ratio|Number|String} obj
         * @param {Ratio|Number|String} [obj2]
         * @return {Ratio}
         * @example
        Ratio( 1, 3 ).add( 1,2 ).toString() === "5/6"
         **/
      add: function(obj, obj2) {
        obj = Ratio.getCombinedRatio(obj, obj2);
        var x,
          top,
          bottom;
        if (this._d === obj._d) {
          top = this._n + obj._n;
          bottom = this._d;
        } else {
          x = Ratio.gcd(this._d, obj._d);
          top = ((this._n * obj._d) + (this._d * obj._n)) / x;
          bottom = (this._d * obj._d) / x;
        }
        return this.clone(top, bottom);
      },
      /**
         * Divides the current Ratio by another Ratio.
         *
         * @method Ratio.prototype.divide
         * @chainable
         * @param {Ratio|Number|String} obj
         * @param {Ratio|Number|String} [obj2]
         * @return {Ratio}
         * @example
        Ratio( 1,2 ).divide( 3,4 ).toString() === "4/6"
         **/
      divide: function(obj, obj2) {
        obj = Ratio.getCombinedRatio(obj, obj2);
        return this.clone(this._n * obj._d, this._d * obj._n);
      },
      /**
         * Returns if the current Ratio and another object have the same numeric value.
         *
         * @method Ratio.prototype.equals
         * @param {Object} obj
         * @return {Boolean}
         * @example
        Ratio(1,2).equals( 1/2 ) === true
         **/
      equals: function(obj) {
        var val = (Ratio.isNumeric(obj) || obj instanceof Ratio) ? obj.valueOf() : Ratio.parse(obj).valueOf();
        return (this._n / this._d) === +val;
      },
      /**
         * Performs a strict comparison to determine if the current instances and passed object are identical.
         *
         * @method Ratio.prototype.deepEquals
         * @param {Object} obj
         * @return {Boolean}
         * @example
        Ratio(1,2).deepEquals( 1/2 ) === false
         */
      deepEquals: function(obj) {
        return (obj instanceof Ratio) && (this._n === obj._n) &&
          (this._d === obj._d) && (this.divSign === obj.divSign) &&
          (this.alwaysReduce === obj.alwaysReduce);
      },
      /**
         * Multiply the current Ratio by another Ratio.
         *
         * @chainable
         * @method Ratio.prototype.multiply
         * @param {Ratio|Number|String} obj
         * @param {Ratio|Number|String} [obj2]
         * @return {Ratio}
         * @example
        Ratio(2,5).multiply( 1, 2 ).toString() === "2/10"
         **/
      multiply: function(obj, obj2) {
        obj = Ratio.getCombinedRatio(obj, obj2);
        return this.clone(this._n * obj._n, this._d * obj._d);
      },
      /**
         * Subtracts the current Ratio from another Ratio.
         *
         * @method Ratio.prototype.subtract
         * @chainable
         * @param {Ratio|Number|String} obj
         * @param {Ratio|Number|String} [obj2]
         * @return {Ratio}
         * @example
        Ratio(2,3).subtract(1,7).toString() === "11/21"
         **/
      subtract: function(obj, obj2) {
        obj = Ratio.getCombinedRatio(obj, obj2);
        var x,
          top,
          bottom;
        if (this._d === obj._d) {
          top = this._n - obj._n;
          bottom = this._d;
        } else {
          x = Ratio.gcd(this._d, obj._d);
          top = ((this._n * obj._d) - (this._d * obj._n)) / x;
          bottom = (this._d * obj._d) / x;
        }
        return this.clone(top, bottom);
      },
      /**
         * Returns an new Ratio scaled down by a factor from the current instance.
         *
         * @method Ratio.prototype.descale
         * @chainable
         * @param {Ratio|Number|String} obj
         * @param {Ratio|Number|String} [obj2]
         * @return {Ratio}
         * @example
        Ratio(10,4).descale( 2 ).toString() === "5/2"
         **/
      descale: function(obj, obj2) {
        var factor = Ratio.getCombinedRatio(obj, obj2);
        return this.clone(this._n / factor, this._d / factor);
      },
      /**
         * From the Ratio instance, returns an new Ratio raised to a power.
         *
         * @method Ratio.prototype.pow
         * @chainable
         * @param {Ratio|Number|String} obj
         * @param {Ratio|Number|String} [obj2]
         * @return {Ratio}
         * @example
        Ratio(2,4).pow(4).toString() === "16/256"
         **/
      pow: function(obj, obj2) {
        var power = Ratio.getCombinedRatio(obj, obj2);
        return this.clone(Math.pow(this._n, +power), Math.pow(this._d, +power));
      },
      /**
         * From the Ratio instance, returns a new Ratio scaled up by a factor.
         *
         * @method Ratio.prototype.scale
         * @chainable
         * @param {Ratio|Number|String} obj
         * @param {Ratio|Number|String} [obj2]
         * @return {Ratio}
         * @example
        Ratio(1,10).scale(10).toString() === "10/100"
         **/
      scale: function(obj, obj2) {
        var factor = Ratio.getCombinedRatio(obj, obj2);
        return this.clone(this._n * +factor, this._d * +factor);
      },
      /**
         * From the Ratio instance, returns a new Ratio by parsing the numerator and denominator.<br/>
         * This is useful if want to ensure that the Ratio contains only whole numbers in the numerator and denominator after a caclulation.
         *
         * @method Ratio.prototype.cleanFormat
         * @chainable
         * @return {Ratio}
         * @example
        var a = Ratio(20,30).descale(3);
        a.toString() == "6.666666666666667/10";
        a.cleanFormat().toString() == "6666666666666667/10000000000000000"
         **/
      cleanFormat: function() {
        var re = Ratio.regex.cleanFormat,
          obj;
        if (re.test(this._n) || re.test(this._d)) {
          return Ratio.parse(this._n, this._d);
        }
        obj = this.clone();
        obj._n = Ratio.getCleanENotation(obj._n);
        obj._d = Ratio.getCleanENotation(obj._d);
        return obj;
      },
      /**
         * Returns a new instances that is the absolute value of the current Ratio.
         *
         * @method Ratio.prototype.abs
         * @chainable
         * @return {Ratio}
         * @example
        Ratio(-3,2).abs().toString() === "3/2"
         **/
      abs: function() {
        return this.clone(Math.abs(this._n));
      },
      /**
         * From the Ratio instance, returns a new Ratio in the form of (numerator mod denominator)/1.<br/>
         * Which is the same as Ratio( (numerator % denominator), 1 ).
         *
         * @method Ratio.prototype.mod
         * @chainable
         * @return {Ratio}
         * @example
        Ratio(3,10).mod().toString() === "3/1"
         **/
      mod: function() {
        return this.clone(this._n % this._d, 1);
      },
      /**
         * Returns a new instance of the Ratio with the sign toggled.
         *
         * @method Ratio.prototype.negate
         * @chainable
         * @return {Ratio}
         * @example
        Ratio(1,2).negate().toString() === "-1/2"
         **/
      negate: function() {
        return this.clone(-this._n);
      },
      /**
         * Determines if the current Ratio is a proper fraction.
         *
         * @method Ratio.prototype.isProper
         * @return {Boolean}
         * @example
        Ratio(12,3).isProper() == false;
         **/
      isProper: function() {
        return Math.abs(this._n) < this._d;
      },
      /**
         * Determines the value of x. Solves the following equations.<br/>
         * 1. `( a/b = x/n )` or
         * 2. `( a/b = n/x )` <br/>
         * Where a, b are the numerator and denominator respectively of the current Ratio.<br/>
         * Note: Returns null if the the string can't be split into exactly 2 elements.
         *
         * @method Ratio.prototype.findX
         * @chainable
         * @param {String} str a string representing a fraction with a 'x' in the numerator or denominator.
         * @return {Ratio}
         * @example
        Ratio(1,4).findX("x/20") == 5;
         **/
      findX: function(str) {
        var arr = String(str).split("/");
        if (arr.length !== 2 || (!isNaN(arr[0]) && !isNaN(arr[1]))) {
          return null;
        }
        return (isNaN(arr[0]) ? new Ratio(arr[1]).multiply(this) : new Ratio(arr[0]).divide(this));
      },
      /**
         * Switches the numerator and denominator positions.
         *
         * @method Ratio.prototype.reciprocal
         * @chainable
         * @return {Ratio}
         * @example
        Ratio(1,2).reciprocal().toString() == "2/1";
         **/
      reciprocal: function() {
        return this.clone(this._d, this._n);
      },
      /**
         * From the Ratio instance, approxiates the value to a new fraction with a provided denominator.
         * In otherwords, this method helps you find out what fraction with a given denominator will best
         * represent the current numeric value of the Ratio.
         * Operates on a arbitary amount of arguments and returns the Ratio with the closest match among the quantities.
         * Therefore, an approximated quantity is returned if the absolute value of the difference between the approximated quantity and actual value is
         * smaller than the error rate.
         *
         * @method Ratio.prototype.toQuantityOf
         * @chainable
         * @param {Number, ...} base
         * @return {Ratio}
         * @example
        Ratio(27,100).toQuantityOf(3).toString() == "1/3";
        Ratio(1,2).toQuantityOf(2,3,4).toString() === "1/2";
         **/
      toQuantityOf: function() {
        var val = this.valueOf(),
          x,
          diff,
          i,
          prevDiff = Infinity,
          len = arguments.length;
        for (i = 0; i < len; i += 1) {
          diff = Math.abs((Math.round(val * arguments[i]) / arguments[i]) - val);
          if (diff < prevDiff) {
            x = arguments[i];
            prevDiff = diff;
          }
        }
        return this.clone(Math.round(val * x), x);
      },
      /**
         * Returns a new Ratio from the floor of the current Ratio instance.
         *
         * @method Ratio.prototype.floor
         * @chainable
         * @return {Ratio}
         * @example
        Ratio.parse(4.2).floor().toString() === "4/1"
         */
      floor: function() {
        return this.clone(Math.floor(this.valueOf()), 1);
      },
      /**
         * Returns a new Ratio from the ceil of the current Ratio instance.
         *
         * @method Ratio.prototype.ceil
         * @chainable
         * @return {Ratio}
         * @example
        Ratio.parse(4.2).ceil().toString() === "5/1"
         */
      ceil: function() {
        return this.clone(Math.ceil(this.valueOf()), 1);
      },
      /**
         * Returns a new Ratio by removing the integer part of the current instance.
         * In otherwords, returns the decimal portion as a fraction.
         *
         * @method Ratio.prototype.makeProper
         * @chainable
         * @return {Ratio}
         * @example
        Ratio.parse(4.2).makeProper().toString() === "2/10"
         */
      makeProper: function() {
        return this.clone(this._n % this._d, this._d);
      }
      /**
       * Use Ratio.prototype.simplify() instead.
       * @deprecated
       * @method Ratio.prototype.reduce
       */
    };
    return Ratio;
  }
  ());
// Adds npm support
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Ratio;
  }
  exports.Ratio = Ratio;
} else {
  this.Ratio = Ratio;
}
