/**
 * @project Ratio.js
 * @purpose Testcases for new Ratio.js
 * @author Larry Battle , <http://bateru.com/news/>
 * @license MIT and GPL 3.0
 */
var exports = {};
// contains all tests.
var runTests = function() {

  module("Required Static Ratio Functions");
  test("test Ratio.isNumeric()", function() {
    var func = Ratio.isNumeric;
    equal(func(null), false);
    equal(func(true), false);
    equal(func(false), false);
    equal(func("NaN"), false);
    equal(func(NaN), false);
    equal(func([]), false);
    equal(func({}), false);
    equal(func({}), false);
    equal(func(undefined), false);

    equal(func(+(12)), true);
    equal(func(1), true);
    equal(func(0x3), true);
    equal(func(1.1e10), true);
  });
  test("test Ratio.getNumeratorWithSign()", function() {
    var func = Ratio.getNumeratorWithSign;
    equal(func(1, 1), 1);
    equal(func(-1, -1), 1);
    equal(func(-1, 1), -1);
    equal(func(1, -1), -1);

    equal(func(Infinity, 1), Infinity);
    equal(func(-Infinity, -1), Infinity);
    equal(func(-Infinity, 1), -Infinity);
    equal(func(1, -Infinity), -1);
  });
  test("test Ratio.gcd()", function() {
    var func = Ratio.gcd;
    equal(func(0, 2), 2);
    equal(func(-1, 2), 1);
    equal(func(1, 1), 1);
    equal(func(1, 2), 1);
    equal(func(3, 6), 3);
    equal(func(-3, 6), 3);
    equal(func(4, 8), 4);
    equal(func(10, 20), 10);
    equal(func(41329375731, 82658751462), 41329375731);
  });
  test("test Ratio.gcd() with bad input", function() {
    var func = Ratio.gcd;

    equal(isNaN(func({}, 2)), true);
    equal(func(null, true), 1);
    equal(func(1, true), 1);
    equal(func(1), 1);
    equal(func(1, Infinity), Infinity);

  });
  test("test Ratio.gcd() edge condition", function() {
    var func = Ratio.gcd;

    equal(func(10, 0), 10);
    equal(func(0, 10), 10);
    equal(func(200, 15), 5);
    equal(func(200, 55), 5);
    equal(func(200, 50), 50);
    equal(func(2, 50), 2);
    equal(func(2, 5), 1);
  });
  test("test Ratio.getValueIfDefined()", function() {
    var func = Ratio.getValueIfDefined,
      a;
    equal(func(), a);
    equal(func(0), 0);
    equal(func(1), 1);

    equal(func(1, a), 1);
    equal(func(1, null), 1);

    deepEqual(func([]), []);
    deepEqual(func(1, []), []);
  });

  module("Ratio Global Constants");
  test("test for version number", function() {
    equal(typeof Ratio.VERSION, "string", "Ratio.VERISON is detected.");
    equal(typeof Ratio.MIN_VALUE, "number", "Ratio.MIN_VALUE is detected.");
    equal(typeof Ratio.MAX_VALUE, "number", "Ratio.MAX_VALUE is detected.");
    equal(typeof Ratio.MAX_PRECISION, "number", "Ratio.MAX_PRECISION is detected.");
  });

  module("Instantiation");
  test("test new Ratio creation", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(new Ratio(), "0");
    equal(func(), "0");
    equal(func(3), "3");
    equal(func(1, 3), "1/3");
    equal(func(3, 1), "3");
    equal(func(10, 10), "1");
    equal(func(400, 5), "80");
    equal(func(3, 2), "1 1/2");
    equal(func(1, 3), "1/3");
    equal(func(-4, 3), "-1 1/3");
    equal(func(4, -3), "-1 1/3");
    equal(func(-4, -3), "1 1/3");
  });
  test("test new Ratio creation with scientific notated numbers.", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };

    equal(func(3e30), "3e+30");
    equal(func(-3e30, 1e25), "-300000");
    equal(func(1e21, 3e30), "1e+21/3e+30");

    equal(func(1e-23), "1e-23");
    equal(func(-1e30, 1e-23), "-1e+53");
    equal(func(1e-33, 1e50), "1e-33/1e+50");
  });
  test("test Ratio creation with invalid input", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal((func()), "0");
    equal((func(null, null)), "NaN");
    equal(func(null, 2), "0");

    equal(func({}, 2), "NaN");
    equal(func([], 1), "0");
    equal(func(true, 1), "1");

    equal(func(function() {}, 2), "NaN");
    equal(func(false, 2), "0");
    equal(func(false, true), "0");

    equal(func("ten", "ten"), "NaN");
    equal(func(/ten/, 1), "NaN");
    equal(func(Infinity), Infinity);

    equal(func(Infinity, 1), Infinity);
    equal(func(Infinity, "0"), Infinity);
    equal(func(-Infinity, "0"), -Infinity);

    equal((func(Infinity, Infinity)), "NaN");
    equal((func(NaN, 0)), "NaN");
  });
  module("Cloning");
  test("test Ratio.prototype.clone with no arguments", function() {
    var a = new Ratio(1, 3),
      b = a.clone(),
      c = new Ratio(20, 9);
    equal(a.equals(b), true);
    equal(b.equals(a), true);
    equal(b.equals(c), false);
    equal(c.equals(a), false);
  });
  test("test Ratio.prototype.clone with arguments", function() {
    var func = Ratio,
      a = new Ratio(11, 12, true);

    deepEqual(a.clone(), a);
    deepEqual(a.clone(7), func(7, 12, true));
    deepEqual(a.clone(null, 7), func(11, 7, true));

    deepEqual(a.clone(null, null), func(11, 12, true));
    deepEqual(a.clone(null, null, false), func(11, 12, false));
    deepEqual(a.clone(1, null, false), func(1, 12, false));

    deepEqual(a.clone(1, 2, false), func(1, 2, false));
    deepEqual(a.clone(1, 2, false), func(1, 2, false));
  });
  test("test Ratio.prototype.clone with change to internal attributes", function() {
    var a = new Ratio(1, 3),
      b = a.clone();
    equal(a.equals(b), true);
  });

  module("toString output");
  test("test Ratio.prototype.toString() for valid input: proper fractions", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toString();
    };
    equal(func(1, 2), "1/2");
    equal(func(-1, 2), "-1/2");

    equal(func(1e23, 2e25), "1e+23/2e+25");
    equal(func(-1e23, 2e25), "-1e+23/2e+25");
  });
  test("test Ratio.prototype.toString() for valid input: whole numbers", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toString();
    };
    equal(func(), "0/1");
    equal(func(2, 1), "2/1");
    equal(func(10, 5), "10/5");
    equal(func(1, Infinity), "1/Infinity");
    equal(func(0, 3), "0/3");
    equal(func(3, 3), "3/3");
    equal(func(12, 3), "12/3");
    equal(func(1, 1e300), "1/1e+300");
    equal(func(0, 3e40), "0/3e+40");
    equal(func(3e40, 1e40), "3e+40/1e+40");

    equal(func(-1, Infinity), "-1/Infinity");
    equal(func(-0, 3), "0/3");
    equal(func(-3, 3), "-3/3");
    equal(func(-12, 3), "-12/3");
    equal(func(-1, 1e300), "-1/1e+300");
    equal(func(-0, 3e40), "0/3e+40");
  });
  test("test Ratio.prototype.toString() for valid input: Scientific notated numbers", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toString();
    };
    equal(func(9e99, 9e24), "9e+99/9e+24");
    equal(func(9e-99, 9e24), "9e-99/9e+24");

    equal(func(9e99, -9e24), "-9e+99/9e+24");
    equal(func(-9e-99, 9e24), "-9e-99/9e+24");
  });
  test("test Ratio.prototype.toString() for valid input: mixed numbers", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toString();
    };
    equal(func(3, 2), "3/2");
    equal(func(50, 4), "50/4");
    equal(func(3e+23, 29), "3e+23/29");

    equal(func(-3, 2), "-3/2");
    equal(func(-50, 4), "-50/4");
    equal(func(-3e+23, 29), "-3e+23/29");
  });
  test("test Ratio.prototype.toString() for invalid input: decimal in fraction", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toString();
    };
    equal(func(0.11, 0.3), "0.11/0.3");
  });
  test("test Ratio.prototype.toString() for invalid input: Infinity", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toString();
    };
    equal(func(1, 0), "1/0");
    equal(func(Infinity, 1), "Infinity/1");
    equal(func(Infinity, 0), "Infinity/0");
  });
  test("test Ratio.prototype.toString() for invalid input: NaN", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toString();
    };
    equal(func(Infinity, -Infinity), "-Infinity/Infinity");
    equal(func(32, "i12"), "32/NaN");
    equal(func("-i", 12), "NaN/12");
    equal(func("palm", "fist"), "NaN/NaN");
    equal(func("19", "fist"), "19/NaN");
    equal(func("palm", "o"), "NaN/NaN");
    equal(func("-i", "i"), "NaN/NaN");
  });

  module("toLocaleString output");
  test("test Ratio.prototype.toLocaleString() for valid input: proper fraction", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(func(1, 2), "1/2");
    equal(func(-1, 2), "-1/2");
    equal(func(1e23, 2e25), "1e+23/2e+25");
    equal(func(-1e23, 2e25), "-1e+23/2e+25");
  });
  test("test Ratio.prototype.toLocaleString() for valid input: whole numbers", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(func(1, Infinity), "0");
    equal(func(0, 3), "0");
    equal(func(0, 3e40), "0");
    equal(func(3, 3), "1");
    equal(func(3e40, 1e40), "3");
    equal(func(12, 3), "4");

    equal(func(-1, Infinity), "0");
    equal(func(-0, 3), "0");
    equal(func(-0, 3e40), "0");
    equal(func(-3, 3), "-1");
    equal(func(-3e40, 1e40), "-3");
    equal(func(-12, 3), "-4");
  });
  test("test Ratio.prototype.toLocaleString() for valid input: mixed numbers", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(func(3, 2), "1 1/2");
    equal(func(50, 4), "12 2/4");
    equal(func(-3, 2), "-1 1/2");
    equal(func(-50, 4), "-12 2/4");

  });
  test("test Ratio.prototype.toLocaleString() for valid input: Scientific notated numbers", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(func(1e2, 2e4), "100/20000");
    equal(func(-1e100, 4), "-2.5e+99");

    equal(func(-1e22, 21), "1e+22/21");
    equal(func(-3e+23, 29), "-3e+23/29");
    equal(func(-7e30, 3e25), "-233333 1e+30/3e+25");
    equal(func(3e+23, 29), "3e+23/29");
    equal(func(7e30, 3e25), "233333 1e+30/3e+25");
  });
  test("test Ratio.prototype.toLocaleString() for invalid input: decimal in fraction", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(func(0.11, 0.3), "0.11/0.3");
  });
  test("test Ratio.prototype.toLocaleString() for invalid input: Infinity", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(func(1, 0), "Infinity");
    equal(func(Infinity, 1), "Infinity");
    equal(func(Infinity, 0), "Infinity");
  });
  test("test Ratio.prototype.toLocaleString() for invalid input: NaN", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toLocaleString();
    };
    equal(func(Infinity, -Infinity), "NaN");
    equal(func(32, "i12"), "NaN");
    equal(func("-i", 12), "NaN");
    equal(func("palm", "fist"), "NaN");
    equal(func("19", "fist"), "NaN");
    equal(func("palm", "o"), "NaN");
    equal(func("-i", "i"), "NaN");
  });

  module("Alternative Output Formats");
  test("test Ratio.prototype.toArray()", function() {
    var func = function(a, b) {
      return new Ratio(a, b).toArray();
    };
    deepEqual(func(1, 2), [1, 2]);
    deepEqual(func(-1, -2), [1, 2]);
    deepEqual(func(0.34, 2e3), [0.34, 2e3]);
    deepEqual(func(10.23e100, -23.04), [-10.23e100, 23.04]);
  });
  test("test Ratio.prototype.valueOf()", function() {
    equal(new Ratio(2, 2), 1);
    equal(new Ratio(1, 2), 1 / 2);
    equal(new Ratio(1, 4), 1 / 4);
    equal(new Ratio(1, 3), 1 / 3);
    equal(new Ratio(1e100, 4), 1e100 / 4);
    equal(new Ratio(1e-4, 3), 1e-4 / 3);
  });

  module("Ratio Instance Property Change");
  test("test divider sign change", function() {
    var a = new Ratio(1, 2);
    equal(a.toLocaleString(), "1/2");
    a.divSign = ":";
    equal(a.toLocaleString(), "1:2");
  });
  test("test changing numerator", function() {
    var a,
      b;
    a = new Ratio(1, 2);
    b = new Ratio(3, 2);
    a.numerator(3);
    equal(a.equals(b), true);
  });
  test("test changing denominator", function() {
    var a,
      b;
    a = new Ratio(1, 2);
    b = new Ratio(1, 3);
    a.denominator(3);
    equal(a.equals(b), true);
  });

  module("Guess Input Type");
  test("test Ratio.guessType() for output as `Ratio`", function() {
    var func = Ratio.guessType;
    equal(func(new Ratio()), "Ratio");
    equal(func(new Ratio(1, 2)), "Ratio");
    equal(func(new Ratio(2e3)), "Ratio");
  });
  test("test Ratio.guessType() for output as `number`", function() {
    var func = Ratio.guessType;
    equal(func(23), "number");
    equal(func(+23), "number");
    equal(func(-23), "number");
  });
  test("test Ratio.guessType() for output as `decimal`", function() {
    var func = Ratio.guessType;

    equal(func(1.1), "decimal");
    equal(func("-1.1"), "decimal");
    equal(func("+1.1"), "decimal");
  });
  test("test Ratio.guessType() for output as `e`", function() {
    var func = Ratio.guessType;

    equal(func(1.1e30), "e");
    equal(func(-1.1e-23), "e");
    equal(func(+1.1e+23), "e");
  });
  test("test Ratio.guessType() for output as `mixed`", function() {
    var func = Ratio.guessType;

    equal(func("10 1/2"), "mixed");
    equal(func("-10 -1/2"), "mixed");
    equal(func("+10 -1/+2"), "mixed");
  });
  test("test Ratio.guessType() for output as `fraction`", function() {
    var func = Ratio.guessType;

    equal(func("+1/2"), "fraction");
    equal(func("-1e12/+2e103"), "fraction");
    equal(func("+2.3e32/23.3"), "fraction");

    equal(func("-Infinity/1"), "fraction");
    equal(func("- Infinity/1"), "fraction");
    equal(func("+ Infinity/1"), "fraction");

    equal(func("-23/Infinity"), "fraction");
  });
  test("test Ratio.guessType() for output as `NaN`", function() {
    var func = Ratio.guessType;

    equal(func(), "NaN");
    equal(func(function() {}), "NaN");
    equal(func("E"), "NaN");

    equal(func(NaN), "NaN");
    equal(func("10e-"), "NaN");
    equal(func(Math), "NaN");

    equal(func("o"), "NaN");

    equal(func("1.1.1"), "NaN");
    equal(func("1e1e"), "NaN");

    equal(func("10 a/b"), "NaN");
    equal(func("a/b"), "NaN");

  });

  module("Parse Value to Array");
  test("test Ratio.parseToArray() with invalid input", function() {
    var func = Ratio.parseToArray;

    deepEqual(func({}), [NaN, 1]);
    deepEqual(func("apple"), [NaN, 1]);
    deepEqual(func("apples"), [NaN, 1]);
    deepEqual(func(NaN), [NaN, 1]);
    deepEqual(func("happy"), [NaN, 1]);
    deepEqual(func("1.1e1.1"), [NaN, 1]);
  });
  test("test Ratio.parseToArray() with whole numbers", function() {
    var func = Ratio.parseToArray;

    deepEqual(func(null), [0, 1]);
    deepEqual(func([]), [0, 1]);
    deepEqual(func("0"), [0, 1]);
    deepEqual(func("15"), [15, 1]);
    deepEqual(func(1), [1, 1]);
    deepEqual(func(0), [0, 1]);
    deepEqual(func(123), [123, 1]);
    deepEqual(func(423), [423, 1]);
    deepEqual(func("3"), [3, 1]);
    deepEqual(func(" 3  "), [3, 1]);
    deepEqual(func(-1), [-1, 1]);
  });

  test("test Ratio.parseToArray() with Ratio objects", function() {
    var func = Ratio.parseToArray;
    deepEqual(func((new Ratio(4, 3))), [4, 3]);
    deepEqual(func((new Ratio(-4, 3))), [-4, 3]);
    deepEqual(func((new Ratio(4, -3))), [-4, 3]);
    deepEqual(func((new Ratio(-4, -3))), [4, 3]);
  });
  test("test Ratio.parseToArray() with decimals", function() {
    var func = Ratio.parseToArray;

    deepEqual(func(Number(1.12)), [112, 100]);
    deepEqual(func(0.771), [771, 1000]);

    deepEqual(func("0.112"), [112, 1000]);
    deepEqual(func("23.0"), [23, 1]);
    deepEqual(func("23.123"), [23123, 1000]);

    deepEqual(func(1.2e6), [1200000, 1]);
    deepEqual(func(0.231), [231, 1000]);
    deepEqual(func(-123.484), [-123484, 1000]);
  });
  test("test Ratio.parseToArray() with scientific notated numbers", function() {
    var func = Ratio.parseToArray;
    deepEqual(func(1e3), [1000, 1]);
    deepEqual(func("1e-5"), [1, 100000]);
    deepEqual(func("-1e-5"), [-1, 100000]);
    deepEqual(func(1.01e3), [1010, 1]);
    deepEqual(func(1e101), [1e101, 1]);
    deepEqual(func(1.01e-3), [101, 100000]);
    deepEqual(func(1.01e-30), [101, 1e32]);
    deepEqual(func(-1.01e-30), [-101, 1e32]);
    deepEqual(func("10"), [10, 1]);
    deepEqual(func("2e1"), [20, 1]);
    deepEqual(func("-2.0004e2"), [-20004, 100]);
    deepEqual(func("-2.0004e5"), [-200040, 1]);
    deepEqual(func("-2.0004e-2"), [-20004, 1000000]);
    deepEqual(func("-2.0004e-5"), [-20004, 1000000000]);
    deepEqual(func("-1.34e-30"), [-134, 1e+32]);
  });
  test("test Ratio.parseToArray() with fractions", function() {
    var func = Ratio.parseToArray;
    deepEqual(func(" 3/1"), [3, 1]);
    deepEqual(func("3/ 2"), [3, 2]);
    deepEqual(func("1 / 3"), [1, 3]);
    deepEqual(func("-4/ 3"), [-4, 3]);
    deepEqual(func(" 4 /-3"), [-4, 3]);
    deepEqual(func("-4 /-3"), [4, 3]);
  });
  test("test Ratio.parseToArray() with mixed numbers for sign correction", function() {
    var func = Ratio.parseToArray;

    deepEqual(func("0 1/2"), [1, 2]);
    deepEqual(func("-0 1/2"), [1, 2]);
    deepEqual(func("0 -1/2"), [-1, 2]);
    deepEqual(func("-0 -1/2"), [-1, 2]);

    deepEqual(func("1 1/2"), [3, 2]);
    deepEqual(func("-1 1/2"), [-3, 2]);
    deepEqual(func("1 -1/2"), [-3, 2], "Invalid expression, assume negative.");
    deepEqual(func("-1 -1/2"), [-3, 2], "Invalid expression, assume negative.");

  });

  module("Parsing Value to Ratio");
  test("test Ratio.parse() with single arguments.", function() {
    var func = function(a) {
      return Ratio.parse(a).toLocaleString();
    };
    equal(func("-0.125"), "-125/1000");
    equal(func(new Ratio(3)), "3");
    equal(func(3), "3");
    equal(func("-3.0e-1"), "-3/10");
    equal(func(3.0), "3");
    equal(func(new Ratio(-1, 3)), "-1/3");
  });
  test("test Ratio.parse() with double arguments.", function() {
    var func = function(a, b) {
      return Ratio.parse(a, b).toLocaleString();
    };
    equal(func(0.125, 0.5), "1250/5000");
    equal(func(0.125, "1/2"), "250/1000");
    equal(func(3, new Ratio(2)), "1 1/2");

    equal(func(3, new Ratio(1)), "3");
    equal(func(new Ratio(1), 3), "1/3");
    equal(func(new Ratio(-4), new Ratio(3)), "-1 1/3");

    equal(func(new Ratio(4, 5).toString(), new Ratio(-3, 2).toString()), "-8/15");
  });

  module("Random Ratio");
  test("test Ratio.random()", function() {
    var fn = function() {
      return Ratio.random().valueOf();
    };

    ok(fn() <= 1, "Must be less than or equal to 1");
    ok(0 <= fn(), "Must be greater than or equal to 0");
  });
  module("Clean Scientific Notated Values");
  test("test Ratio.getCleanENotation()", function() {
    var func = Ratio.getCleanENotation;
    equal(func(null), "0");
    equal(func("bear"), "0");
    equal(func("9.999999e+22"), "9.999999e+22");
    equal(func("9.999999999999999e+22"), "1e+23");
    equal(func("1.1000000000000003e-30"), "1.1e-30");
  });
  test("test Ratio.prototype.cleanFormat()", function() {
    var func = function(a, b) {
      return new Ratio(a, b).cleanFormat().toString();
    };
    equal(func(1.2, 1.5), Ratio.parse(1.2, 1.5).toString());
    equal(func(1.2e30, 1.5), Ratio.parse(1.2e30, 1.5).toString());
    equal(func(1.00000000000000009e30, 1.5), Ratio.parse(1.0e30, 1.5).toString());
    equal(func(-1.2e-10, 1.5e15), new Ratio(-1.2e-10, 1.5e15).toString());
  });

  module("Comparison Functions");
  test("test Ratio.prototype.equals() against self using `.valueOf()`, `.toString()`, and `.toLocaleString()`", function() {
    var func = function(a, b) {
        var x = new Ratio(a, b),
          errMsg = "";
        errMsg = x.equals(x.valueOf()) ? "" : "x.equals( x.valueOf() )";
        errMsg = x.equals(x.toString()) ? "" : "x.equals( x.toString() )";
        errMsg = x.equals(x.toLocaleString()) ? "" : "x.equals( x.toLocaleString() )";
        if (errMsg) {
          errMsg = "x = " + x.toString() + ", problem with " + errMsg;
        }
        return errMsg;
      },
      check = function(a, b) {
        equal(func(a, b), "", "checking for a = " + a + " and b = " + b);
      };
    check(0);
    check(1);
    check(109);
    check(40, 3);
    check(3, 40);
    check(40, 40);
    check(1, 7);
    check(7, 6);
  });
  test("test Ratio.prototype.equals() against self using `.valueOf()`, `.toString()`, and `.toLocaleString()`", function() {
    var func = function(a, b) {
        var x = Ratio.parse(a, b),
          errMsg = "";
        errMsg = x.equals(x.valueOf()) ? "" : "x.equals( x.valueOf() )";
        errMsg = x.equals(x.toString()) ? "" : "x.equals( x.toString() )";
        errMsg = x.equals(x.toLocaleString()) ? "" : "x.equals( x.toLocaleString() )";
        if (errMsg) {
          errMsg = "x = " + x.toString() + ", problem with " + errMsg;
        }
        return errMsg;
      },
      check = function(a, b) {
        equal(func(a, b), "", "checking for a = " + a + " and b = " + b);
      };
    check("0/4");
    check("1/1");
    check("109");
    check("40/3");
    check("3/40");
    check("40/40");
    check("1/7");
    check("7/6");
  });
  test("test Ratio.prototype.equals() for false comparisons", function() {
    var func = function(a, b, c) {
      return Ratio.parse(a, b).equals(c);
    };
    equal(func(1, 2, 2), false);
    equal(func(1, 2, "1/22"), false);
    equal(func(1, 5, "5"), false);
  });
  test("test Ratio.prototype.deepEquals()", function() {
    var func = function(a, b, c) {
        return Ratio.parse(a, b).deepEquals(c);
      },
      x = new Ratio(1, 2);

    equal(func(1, 2, x), true);
    equal(func(1e40, 2, Ratio.parse(1e40, 2)), true);
    equal(func(4, 4, Ratio.parse(4, 4)), true);

    equal(func(1e20, 1, Ratio.parse(1e40, 2)), false);
    equal(func(2, 2, Ratio.parse(4, 4)), false);
  });
  test("test equivalance using Ratio.prototype.equals and ==", function() {
    var a = new Ratio(),
      b = new Ratio(),
      c = new Ratio(3, 4),
      d = new Ratio(3, 4),
      e = new Ratio(12, 12),
      f = new Ratio(12, 12);

    equal(a.equals(a), true, "identity check using equals");
    equal(b.equals(b), true, "identity check using equals");
    equal(c.equals(c), true, "identity check using equals");
    equal(d.equals(d), true, "identity check using equals");

    equal(a.equals(b), true, "identity check using equals");
    equal(+a === +b, true, "identity check using ==");

    equal(c.equals(d), true, "identity check using equals");
    equal(+c === +d, true, "identity check using ==");

    equal(a.equals(c), false, "identity check");
    equal(+a === +c, false, "identity check");

    equal(e.equals(c), false, "identity check");
    equal(f.equals(c), false, "identity check");
  });
  test("test comparison, Ratio.prototype.valueOf() is called", function() {
    var a = new Ratio(1, 2),
      b = new Ratio(1, 4),
      c = new Ratio(150, 3);
    ok(a > b);
    ok(c >= b);
    ok(c >= a);
    ok(b < a);
    ok(b <= c);
  });
  test("test Ratio.prototype.isNaN()", function() {
    var fn = function(a, b) {
      return Ratio.parse(a, b).isNaN();
    }
    equal(fn(1, 0), true);
    equal(fn(Infinity, 0), true);
    equal(fn(Infinity, -Infinity), true);
    equal(fn("apples", "oranges"), true);
    equal(fn(1, 2), false);
    equal(fn(1e49, 22.34), false);
    equal(fn(1, -2), false);
    equal(fn(-1e-50), false);
  });
  module("Math Operations Requiring Extra Terms");
  test("test addition with +, Ratio.prototype.valueOf() is called", function() {
    var func = function(a, b, c, d) {
        return (new Ratio(a, b) + new Ratio(c, d));
      },
      x;
    equal(func(), 0);
    equal(func(0, x, 0, x), 0);
    equal(func(-1, x, 1, x), 0);
    equal(func(1, x, 2, x), 3);
    equal(func(40, x, 2, x), 42);
    equal(func(20001, 40002, 400, 800), 1);
    equal(func(1, 2, 1, 2), 1);
    equal(func(1, x, 1, 2), 1.5);
    equal(func(1, x, 1, 3), 4 / 3);
    equal(func(1, 3, -1, 3), 0);
  });
  test("test Ratio.prototype.add()", function() {
    var func = function(a, b, c, d) {
        return new Ratio(a, b).add(new Ratio(c, d)).toLocaleString();
      },
      x;
    equal(func(), "0");
    equal(func(0, x, 0, x), "0");
    equal(func(0, x, 1, 2), "1/2");
    equal(func(1, 2, 0, x), "1/2");
    equal(func(2, 4, 4, 8), "1");
    equal(func(2, 4, 4, 8), "1");
    equal(func(1, 2, 1, 2), "1");
    equal(func(1, x, 1, x), "2");
    equal(func(1, x, 2, x), "3");
    equal(func(40, x, 2, x), "42");
    equal(func(1, x, 1, 2), "1 1/2");
    equal(func(2, 5, 3, 4), "1 3/20");
    equal(func(1, 3, 3, 9), "6/9");
    equal(func(4, 9, 3, 9), "7/9");
  });
  test("test addition with -, Ratio.prototype.valueOf() is called", function() {
    var func = function(a, b, c, d) {
      return (new Ratio(a, b) - new Ratio(c, d));
    };
    equal(func(), 0);
    equal(func(1, 4, 1, 4), 0);
    equal(func(1, 5, 1, 2), "-0.3");
    equal(func(1, 20, 1, 100), "0.04");
  });
  test("test Ratio.prototype.subtract()", function() {
    var func = function(a, b, c, d) {
        return new Ratio(a, b).subtract(new Ratio(c, d)).toLocaleString();
      },
      x;
    equal(func(), "0");
    equal(func(0, x, 0, 0), "NaN", "0 - 0/0 is NaN");
    equal(func(0, x, 0, x), "0");

    equal(func(0, 0, 1, 2), "NaN");
    equal(func(0, 0, 0, 0), "NaN");
    equal(func(1, 2, 0, 0), "NaN");
    equal(func(1, 2, 0, x), "1/2");

    equal(func(0, x, 1, 2), "-1/2");
    equal(func(1, 2, 0, x), "1/2");
    equal(func(1, 3, 3, 9), "0");
    equal(func(2, 4, 4, 8), "0");
    equal(func(1, x, 1, 2), "1/2");
    equal(func(4, x, 1, x), "3");
    equal(func(4, 9, 3, 9), "1/9");
    equal(func(10, 2, 9, 19), "4 20/38");
    equal(func(1, x, 3, 2), "-1/2");
    equal(func(1, x, 4, x), "-3");
    equal(func(2, 5, 3, 4), "-7/20");
    equal(func(1, 9, 4, 9), "-3/9");
  });
  test("test Ratio.prototype.multiply()", function() {
    var func = function(a, b, c, d) {
      return (new Ratio(a, b)).multiply(c, d).toLocaleString();
    };
    equal(func(1, 1, 1, 1), "1");
    equal(func(1, 1, 2, 1), "2");
    equal(func(-100, 1, 432, -1), "43200");
    equal(func(2, 3, 4, 9), "8/27");
    equal(func(12, 34, 2, -54), "-24/" + (34 * 54));
    equal(func(12, 34, 2, -54), "-24/" + (34 * 54));
    equal(func(-213, -423, -123, -123), (213 * 123) + "/" + (123 * 423));
    equal(func(-213, -423, 0, 0), "NaN");
  });
  test("test Ratio.prototype.divide()", function() {
    var func = function(a, b, c, d) {
      return (new Ratio(a, b)).divide(c, d).toLocaleString();
    };
    equal(func(0, 1, 1, 10), "0");
    equal(func(1, 1, 1, 1), "1");
    equal(func(10, 3, 100, 30), "1");
    equal(func(1, 4, 1, 20), "5");
    equal(func(-10, 23, 13, -39), "1 91/299");
    equal(func(-12, -34, -45, -67), (12 * 67) + "/" + (45 * 34));
  });
  test("test Ratio.prototype.descale", function() {
    var func = function(a, b, c) {
      return (new Ratio(a, b)).descale(c).toLocaleString();
    };
    equal(func(25, 100, 5), "5/20");
    equal(func(5, 100, 5), "1/20");
    equal(func(5, 100, 5.0), "1/20");
    notEqual(func(5, 100, 5.1), "1/20");
  });
  test("test Ratio.prototype.scale()", function() {
    var func = function(a, b, c) {
      return (new Ratio(a, b)).scale(c).toLocaleString();
    };
    equal(func(2, 3, 5), "10/15");
    equal(func(2, 3, 3e-10), "6e-10/9e-10");
    equal(func(1, 2, 5), "5/10");
    equal(func(1, 2, 2.5), "2.5/5");
  });

  module("Math Operations Performed on Self");
  test("test Ratio.prototype.abs()", function() {
    var func = function(a, b) {
      return (new Ratio(a, b)).abs().toLocaleString();
    };
    equal(func(1, 2), "1/2");
    equal(func(-1, 2), "1/2");
    equal(func(-1, -2), "1/2");
    equal(func(1, 2), "1/2");
  });
  test("test Ratio.prototype.mod()", function() {
    var func = function(a, b) {
      return (new Ratio(a, b)).mod().toLocaleString();
    };
    equal(func(5, 0), "NaN");
    equal(func(5, 1), "0");
    equal(func(5, 2), "1");
    equal(func(5, 20), "5");
    equal(func(5e2, 21), "17");
  });
  test("test Ratio.prototype.negate()", function() {
    var func = function(a, b) {
      return (new Ratio(a, b)).negate().toLocaleString();
    };
    equal(func(1, 2), "-1/2");
    equal(func(-1, 2), "1/2");
    equal(func(1, -2), "1/2");
    equal(func(-1e-10, 2e22), "1e-10/2e+22");
  });
  test("test Ratio.prototype.ceil()", function() {
    var func = function(a, b) {
      return (new Ratio(a, b)).ceil().toString();
    };
    equal(func(1, 2), "1/1");
    equal(func(-1, 2), "0/1");
    equal(func(1, -2), "0/1");
    equal(func(-1e-10, 2e22), "0/1");
  });
  test("test Ratio.prototype.floor()", function() {
    var func = function(a, b) {
      return (new Ratio(a, b)).floor().toString();
    };
    equal(func(1, 2), "0/1");
    equal(func(-1, 2), "-1/1");
    equal(func(1, -2), "-1/1");
    equal(func(-1e-10, 2e22), "-1/1");
  });
  test("test Ratio.prototype.reciprocal()", function() {
    equal(new Ratio(1, 2).reciprocal().toString(), "2/1");
  });

  module("Finding the repeating decimals");
  test("test Ratio.getRepeatProps() with invalid input", function() {
    var func = Ratio.getRepeatProps;
    deepEqual(func(""), []);
    deepEqual(func([]), []);
    deepEqual(func({}), []);
    deepEqual(func(Math.PI), []);
    deepEqual(func(null), []);
    deepEqual(func(true), []);
    deepEqual(func(Infinity), []);
    deepEqual(func(NaN), []);
    deepEqual(func(1 / 5), []);
    deepEqual(func(1 / 100), []);
    deepEqual(func("1.2.3"), []);
    deepEqual(func("1.333333"), []);
  });
  test("test Ratio.getRepeatProps() with decimal numbers as string", function() {
    var func = Ratio.getRepeatProps;

    deepEqual(func("1.1111111111"), ["1", "", "1"]);
    deepEqual(func("1234.11111111111"), ["1234", "", "1"]);
    deepEqual(func("1.12312311111111"), ["1", "123123", "1"]);

    deepEqual(func("12.12121212121212"), ["12", "", "12"]);
    deepEqual(func("1234.1111212121212"), ["1234", "111", "12"]);
    deepEqual(func("2.123412341234"), ["2", "", "1234"]);

    deepEqual(func("3534.3344512341234"), ["3534", "33445", "1234"]);
  });
  test("test Ratio.getRepeatProps() with computed decimal numbers", function() {
    var func = Ratio.getRepeatProps;
    deepEqual(func(1 / 333), ["0", "", "003"]);
    deepEqual(func(7 / 13), ["0", "5384", "615384"]);
    deepEqual(func(1 / 111), ["0", "", "009"]);
    deepEqual(func(11 / 111), ["0", "", "099"]);
    deepEqual(func(100 / 11), ["9", "", "09"]);
    deepEqual(func(100 / 13), ["7", "692", "307692"]);
    deepEqual(func(1 / 3), ["0", "", "3"]);
    deepEqual(func(4 / 3), ["1", "", "3"]);
  });

  module("Ratio Reduction Functions");
  test("test Ratio.simplify()", function() {
    var func = Ratio.simplify;
    deepEqual(func(0, 200), [0, 1]);
    deepEqual(func(1, 2), [1, 2]);
    deepEqual(func(4, 8), [1, 2]);
    deepEqual(func(100, 200), [1, 2]);
    deepEqual(func(-42, 42), [-1, 1]);
    deepEqual(func(134, -3), [-134, 3]);
  });
  test("test Ratio.prototype.simplify()", function() {
    var func = function(a, b) {
      return Ratio.parse(a, b).simplify().toString();
    };
    equal(func(), "NaN/NaN");
    equal(func(0), "0/1");
    equal(func(0, 200), "0/1");

    equal(func(1), "1/1");
    equal(func(1, 3), "1/3");
    equal(func(3, 9), "1/3");

    equal(func(1 / 100), "1/100");
    equal(func(7 / 3), "7/3");
    equal(func(1 / 111), "1/111");
    equal(func(1 / 333), "1/333");
  });

  module("Use Cases");
  test("test user case 1", function() {
    var a = new Ratio(1, 2);

    equal(a.toString(), "1/2");
    a = a.add(3);
    equal(a.toString(), "7/2");
    a = a.subtract(2);
    equal(a.toString(), "3/2");
    a = a.divide("3/2");
    equal(a.toLocaleString(), "1");
    equal(a.multiply(12).simplify().toLocaleString(), 12);
    equal(a.toLocaleString(), "1");
  });
  test("test user case 2: Calculate PI", function() {
    var a = Ratio(16).multiply(Ratio(Math.atan(Ratio(1) / Ratio(5)))),
      b = Ratio(4).multiply(Ratio(Math.atan(Ratio(1) / Ratio(239)))),
      computedPI = a.subtract(b);

    equal(Math.PI <= computedPI, true, "Math.PI(" + Math.PI + ") <= computedPI(" + computedPI + ")");
  });
  // test("test user case 3: 2x2 Matrix of Ratios ", function () {
  // });
  // test("test user case 4: ?", function () {
  // });
  // test("test user case 5: ?", function () {
  // });

  module("Proper");
  test("test Ratio.prototype.isProper()", function() {
    var func = function(a, b) {
      return (new Ratio(a, b)).isProper();
    };
    equal(func(1, 2), true);
    equal(func(1e2, 2e2), true);
    equal(func(10, 2), false);
    equal(func(1e5, 2e2), false);
  });
  test("test Ratio.prototype.makeProper()", function() {
    var func = function(a, b) {
      return Ratio.parse(a, b).makeProper().toString();
    };
    equal(func(1, 2), "1/2");
    equal(func(7, 5), "2/5");
    equal(func(100, 200), "100/200");

    equal(func(10, 2), "0/2");
    equal(func(4.2), "2/10");

    equal(func(-1, 2), "-1/2");
    equal(func(-7, 5), "-2/5");
    equal(func(-100, 200), "-100/200");
    equal(func(-10, 2), "0/2");

    equal(func(1e34, 200), "0/200");
    equal(func(-1e34, 200), "0/200");
  });

  module("Find Prime Factors");
  test("test Ratio.getPrimeFactors()", function() {
    var func = Ratio.getPrimeFactors;
    deepEqual(func(Infinity), []);
    deepEqual(func({}), []);
    deepEqual(func(null), []);
    deepEqual(func(-1), []);
    deepEqual(func(0), []);
    deepEqual(func(1), []);
    deepEqual(func(2), [2]);
    deepEqual(func(6), [2, 3]);
    deepEqual(func(9), [3, 3]);
    deepEqual(func("729"), [3, 3, 3, 3, 3, 3]);
    deepEqual(func(3333333791), [2347, 1420253]);
    deepEqual(func(123456789), [3, 3, 3607, 3803]);
    deepEqual(func(9876543210), [2, 3, 3, 5, 17, 17, 379721]);
    deepEqual(func("103103103"), [3, 103, 333667]);
  });

  module("Find x");
  test("test Ratio.prototype.findX() with invalid input", function() {
    var func = function(a, b, str) {
      return (new Ratio(a, b)).findX(str);
    };
    equal(func(1, 2, "10"), null);
    equal(func(1, 2, "10/10"), null);
    equal(func(1, 2, "Infinity"), null);
    equal(func(1, 2, "Infinity/1e40"), null);
    equal(func(1, 2, "x10"), null);
    equal(func(1, 2, "x/1/2"), null);
    equal(func(1, 2, "I like turtles"), null);
  });
  test("test Ratio.prototype.findX() with valid input", function() {
    var func = function(a, b, str) {
      return (new Ratio(a, b)).findX(str).simplify().toString();
    };
    equal(func(1, 2, "x/10"), "5/1");
    equal(func(1, 2, "x/1"), "1/2");
    equal(func(5, -2, "x/24"), "-60/1");

    equal(func(3, 7, "10/x"), "70/3");
    equal(func(11, -9, "10/x"), "-90/11");
    equal(func(1, -201, "10/x"), "-2010/1");
    equal(func(1, 4, "-1e+8/x"), "-400000000/1");

    equal(func(1, 4, "Infinity / x"), "NaN");
    equal(func(1, -4, "Infinity / -x"), "NaN");
  });

  module("Quantify Approximation");
  test("test Ratio.prototype.toQuantityOf() with invalid input", function() {
    var func = function(a, b, base) {
      return Ratio.parse(a, b).toQuantityOf(base).toString();
    };
    equal(func(1, 3, {}), "NaN/3");
    equal(func(1, 3, "ten"), "NaN/3");
    equal(Ratio.parse(1, 3).toQuantityOf().toString(), "NaN/3");
  });
  test("test Ratio.prototype.toQuantityOf() with single arguments", function() {
    var func = function(a, b, base) {
      return Ratio.parse(a, b).toQuantityOf(base).toString();
    };
    equal(func(1, 2, 2), "1/2");
    equal(func(1, 2, 3), "2/3");
    equal(func(5, 10, 2), "1/2");
    equal(func(5, 10, 7), "4/7");
    equal(func(27, 100, 3), "1/3");
    equal(func(77, 100, 3), "2/3");
    equal(func(99, 100, 9), "9/9");
    equal(func(1, 100, 1e6), "10000/1000000");
    equal(func(97, -100, 3), "-3/3");
    equal(func(-27, 100, 3), "-1/3");
  });
  test("Ratio.prototype.toQuantityOf() with multiple arguments", function() {
    var func = function(a, b, units) {
      var x = Ratio.parse(a, b);
      return x.toQuantityOf.apply(x, units).toString();
    };
    equal(func(3, 8, [2, 3, 4]), "1/3");
    equal(func(1, 3, [2, 4, 8]), "3/8");
    equal(func(1, 2, [1, 2, 3, 4]), "1/2");
  });

  module("Common.js Support");
  test("test Nodes.js( NPM ) support", function() {
    ok(exports.Ratio === Ratio, "The Ratio object is the export object.");
    ok(exports.Ratio.VERSION, "Ratio was added to exports.");
  });

  module("Empty Argument Calls");
  test("test Ratio static methods for errors when functions with required arguments aren't supplied when called.", function() {
    var fn;
    for (var fnName in Ratio) {
      fn = Ratio[fnName];
      if (typeof fn !== "function" || fn.length === 0) {
        continue;
      }
      try {
        equal(true, true, "Ratio." + fnName + "() returns " + String(fn()));
      } catch (e) {
        equal(true, false, "Ratio." + fnName + "() throw an error. Error = " + e.toString());
      }
    }
  });
  test("test Ratio.prototype methods for errors when functions with required arguments aren't supplied when called.", function() {
    var a = new Ratio();
    for (var fnName in a) {
      if (typeof a[fnName] !== "function" || a[fnName].length === 0) {
        continue;
      }
      try {
        equal(true, true, "Ratio.prototype." + fnName + "() returns " + String(a[fnName]()));
      } catch (e) {
        equal(true, false, "Ratio.prototype." + fnName + "() throw an error. Error = " + e.toString());
      }
    }
  });
  module("Non-destructive Method Calls");
  test("test that non-destructive methods don't modify passed objects", function() {
    var makeStatement = function(a, b, c) {
      return a.toString() + " + " + b.toString() + " = " + c.toString();
    };
    var avoidThese = {
      numerator: 1,
      denominator: 1
    };
    var a = new Ratio(5, 4),
      b = new Ratio(1, 2),
      c = new Ratio(3, 4),
      str = makeStatement(a, b, c);

    for (var fnName in Ratio.prototype) {
      if (avoidThese[fnName] || typeof a[fnName] !== "function" || a[fnName].length === 0 || a[fnName] === Ratio) {
        continue;
      }
      a = new Ratio(5, 4);
      b = new Ratio(1, 2);
      c = new Ratio(3, 4);
      a[fnName](b, c);
      equal(str, makeStatement(a, b, c), "Ratio.prototype." + fnName + " is non-destructive.");
    }
  });
};
var reRunTests = function() {
  QUnit.reset(); // should clear the DOM
  QUnit.init(); // resets the qunit test environment
  QUnit.start(); // allows for the new test to be captured.
  runTests();
};
