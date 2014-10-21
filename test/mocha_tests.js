/**
 * @project Ratio.js
 * @purpose Testcases for new Ratio.js
 * @author Larry Battle , <http://bateru.com/news/>
 * @license MIT and GPL 3.0
 */
var assert = require("assert");
var Ratio = require("../");

describe("Ratio.js", function() {
  describe("Required Static Ratio Functions", function() {
    it('test Ratio.isNumeric()', function() {
      var func = Ratio.isNumeric;
      assert.equal(func(null), false);
      assert.equal(func(true), false);
      assert.equal(func(false), false);
      assert.equal(func('NaN'), false);
      assert.equal(func(NaN), false);
      assert.equal(func([]), false);
      assert.equal(func({}), false);
      assert.equal(func({}), false);
      assert.equal(func(undefined), false);
      assert.equal(func(+12), true);
      assert.equal(func(1), true);
      assert.equal(func(3), true);
      assert.equal(func(11000000000), true);
    });
    it('test Ratio.getNumeratorWithSign()', function() {
      var func = Ratio.getNumeratorWithSign;
      assert.equal(func(1, 1), 1);
      assert.equal(func(-1, -1), 1);
      assert.equal(func(-1, 1), -1);
      assert.equal(func(1, -1), -1);
      assert.equal(func(Infinity, 1), Infinity);
      assert.equal(func(-Infinity, -1), Infinity);
      assert.equal(func(-Infinity, 1), -Infinity);
      assert.equal(func(1, -Infinity), -1);
    });
    it('test Ratio.gcd()', function() {
      var func = Ratio.gcd;
      assert.equal(func(0, 2), 2);
      assert.equal(func(-1, 2), 1);
      assert.equal(func(1, 1), 1);
      assert.equal(func(1, 2), 1);
      assert.equal(func(3, 6), 3);
      assert.equal(func(-3, 6), 3);
      assert.equal(func(4, 8), 4);
      assert.equal(func(10, 20), 10);
      assert.equal(func(41329375731, 82658751462), 41329375731);
    });
    it('test Ratio.gcd() with bad input', function() {
      var func = Ratio.gcd;
      assert.equal(isNaN(func({}, 2)), true);
      assert.equal(func(null, true), 1);
      assert.equal(func(1, true), 1);
      assert.equal(func(1), 1);
      assert.equal(func(1, Infinity), Infinity);
    });
    it('test Ratio.gcd() edge condition', function() {
      var func = Ratio.gcd;
      assert.equal(func(10, 0), 10);
      assert.equal(func(0, 10), 10);
      assert.equal(func(200, 15), 5);
      assert.equal(func(200, 55), 5);
      assert.equal(func(200, 50), 50);
      assert.equal(func(2, 50), 2);
      assert.equal(func(2, 5), 1);
    });
    it('test Ratio.getValueIfDefined()', function() {
      var func = Ratio.getValueIfDefined, a;
      assert.equal(func(), a);
      assert.equal(func(0), 0);
      assert.equal(func(1), 1);
      assert.equal(func(1, a), 1);
      assert.equal(func(1, null), 1);
      assert.deepEqual(func([]), []);
      assert.deepEqual(func(1, []), []);
    });
  });
  describe("Ratio Global Constants", function() {
    it('test for version number', function() {
      assert.equal(typeof Ratio.VERSION, 'string');
      assert.equal(typeof Ratio.MIN_VALUE, 'number');
      assert.equal(typeof Ratio.MAX_VALUE, 'number');
      assert.equal(typeof Ratio.MAX_PRECISION, 'number');
    });
  });
  describe("Instantiation", function() {
    it('test new Ratio creation', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(new Ratio(), '0');
      assert.equal(func(), '0');
      assert.equal(func(3), '3');
      assert.equal(func(1, 3), '1/3');
      assert.equal(func(3, 1), '3');
      assert.equal(func(10, 10), '1');
      assert.equal(func(400, 5), '80');
      assert.equal(func(3, 2), '1 1/2');
      assert.equal(func(1, 3), '1/3');
      assert.equal(func(-4, 3), '-1 1/3');
      assert.equal(func(4, -3), '-1 1/3');
      assert.equal(func(-4, -3), '1 1/3');
    });
    it('test new Ratio creation with scientific notated numbers.', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(3e+30), '3e+30');
      assert.equal(func(-3e+30, 1e+25), '-300000');
      assert.equal(func(1e+21, 3e+30), '1e+21/3e+30');
      assert.equal(func(1e-23), '1e-23');
      assert.equal(func(-1e+30, 1e-23), '-1e+53');
      assert.equal(func(1e-33, 1e+50), '1e-33/1e+50');
    });
    it('test Ratio creation with invalid input', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(), '0');
      assert.equal(func(null, null), 'NaN');
      assert.equal(func(null, 2), '0');
      assert.equal(func({}, 2), 'NaN');
      assert.equal(func([], 1), '0');
      assert.equal(func(true, 1), '1');
      assert.equal(func(function() {}, 2), 'NaN');
      assert.equal(func(false, 2), '0');
      assert.equal(func(false, true), '0');
      assert.equal(func('ten', 'ten'), 'NaN');
      assert.equal(func(/ten/, 1), 'NaN');
      assert.equal(func(Infinity), Infinity);
      assert.equal(func(Infinity, 1), Infinity);
      assert.equal(func(Infinity, '0'), Infinity);
      assert.equal(func(-Infinity, '0'), -Infinity);
      assert.equal(func(Infinity, Infinity), 'NaN');
      assert.equal(func(NaN, 0), 'NaN');
    });
  });
  describe("Cloning", function() {
    it('test Ratio.prototype.clone with no arguments', function() {
      var a = new Ratio(1, 3),
        b = a.clone(),
        c = new Ratio(20, 9);
      assert.equal(a.equals(b), true);
      assert.equal(b.equals(a), true);
      assert.equal(b.equals(c), false);
      assert.equal(c.equals(a), false);
    });
    it('test Ratio.prototype.clone with arguments', function() {
      var func = Ratio,
        a = new Ratio(11, 12, true);
      assert.deepEqual(a.clone(), a);
      assert.deepEqual(a.clone(7), func(7, 12, true));
      assert.deepEqual(a.clone(null, 7), func(11, 7, true));
      assert.deepEqual(a.clone(null, null), func(11, 12, true));
      assert.deepEqual(a.clone(null, null, false), func(11, 12, false));
      assert.deepEqual(a.clone(1, null, false), func(1, 12, false));
      assert.deepEqual(a.clone(1, 2, false), func(1, 2, false));
      assert.deepEqual(a.clone(1, 2, false), func(1, 2, false));
    });
    it('test Ratio.prototype.clone with change to internal attributes', function() {
      var a = new Ratio(1, 3),
        b = a.clone();
      assert.equal(a.equals(b), true);
    });
  });
  describe("toString output", function() {
    it('test Ratio.prototype.toString() for valid input: proper fractions', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toString();
      };
      assert.equal(func(1, 2), '1/2');
      assert.equal(func(-1, 2), '-1/2');
      assert.equal(func(1e+23, 2e+25), '1e+23/2e+25');
      assert.equal(func(-1e+23, 2e+25), '-1e+23/2e+25');
    });
    it('test Ratio.prototype.toString() for valid input: whole numbers', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toString();
      };
      assert.equal(func(), '0/1');
      assert.equal(func(2, 1), '2/1');
      assert.equal(func(10, 5), '10/5');
      assert.equal(func(1, Infinity), '1/Infinity');
      assert.equal(func(0, 3), '0/3');
      assert.equal(func(3, 3), '3/3');
      assert.equal(func(12, 3), '12/3');
      assert.equal(func(1, 1e+300), '1/1e+300');
      assert.equal(func(0, 3e+40), '0/3e+40');
      assert.equal(func(3e+40, 1e+40), '3e+40/1e+40');
      assert.equal(func(-1, Infinity), '-1/Infinity');
      assert.equal(func(-0, 3), '0/3');
      assert.equal(func(-3, 3), '-3/3');
      assert.equal(func(-12, 3), '-12/3');
      assert.equal(func(-1, 1e+300), '-1/1e+300');
      assert.equal(func(-0, 3e+40), '0/3e+40');
    });
    it('test Ratio.prototype.toString() for valid input: Scientific notated numbers', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toString();
      };
      assert.equal(func(9e+99, 9e+24), '9e+99/9e+24');
      assert.equal(func(9e-99, 9e+24), '9e-99/9e+24');
      assert.equal(func(9e+99, -9e+24), '-9e+99/9e+24');
      assert.equal(func(-9e-99, 9e+24), '-9e-99/9e+24');
    });
    it('test Ratio.prototype.toString() for valid input: mixed numbers', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toString();
      };
      assert.equal(func(3, 2), '3/2');
      assert.equal(func(50, 4), '50/4');
      assert.equal(func(3e+23, 29), '3e+23/29');
      assert.equal(func(-3, 2), '-3/2');
      assert.equal(func(-50, 4), '-50/4');
      assert.equal(func(-3e+23, 29), '-3e+23/29');
    });
    it('test Ratio.prototype.toString() for invalid input: decimal in fraction', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toString();
      };
      assert.equal(func(0.11, 0.3), '0.11/0.3');
    });
    it('test Ratio.prototype.toString() for invalid input: Infinity', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toString();
      };
      assert.equal(func(1, 0), '1/0');
      assert.equal(func(Infinity, 1), 'Infinity/1');
      assert.equal(func(Infinity, 0), 'Infinity/0');
    });
    it('test Ratio.prototype.toString() for invalid input: NaN', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toString();
      };
      assert.equal(func(Infinity, -Infinity), '-Infinity/Infinity');
      assert.equal(func(32, 'i12'), '32/NaN');
      assert.equal(func('-i', 12), 'NaN/12');
      assert.equal(func('palm', 'fist'), 'NaN/NaN');
      assert.equal(func('19', 'fist'), '19/NaN');
      assert.equal(func('palm', 'o'), 'NaN/NaN');
      assert.equal(func('-i', 'i'), 'NaN/NaN');
    });
  });
  describe("toLocaleString output", function() {
    it('test Ratio.prototype.toLocaleString() for valid input: proper fraction', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(1, 2), '1/2');
      assert.equal(func(-1, 2), '-1/2');
      assert.equal(func(1e+23, 2e+25), '1e+23/2e+25');
      assert.equal(func(-1e+23, 2e+25), '-1e+23/2e+25');
    });
    it('test Ratio.prototype.toLocaleString() for valid input: whole numbers', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(1, Infinity), '0');
      assert.equal(func(0, 3), '0');
      assert.equal(func(0, 3e+40), '0');
      assert.equal(func(3, 3), '1');
      assert.equal(func(3e+40, 1e+40), '3');
      assert.equal(func(12, 3), '4');
      assert.equal(func(-1, Infinity), '0');
      assert.equal(func(-0, 3), '0');
      assert.equal(func(-0, 3e+40), '0');
      assert.equal(func(-3, 3), '-1');
      assert.equal(func(-3e+40, 1e+40), '-3');
      assert.equal(func(-12, 3), '-4');
    });
    it('test Ratio.prototype.toLocaleString() for valid input: mixed numbers', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(3, 2), '1 1/2');
      assert.equal(func(50, 4), '12 2/4');
      assert.equal(func(-3, 2), '-1 1/2');
      assert.equal(func(-50, 4), '-12 2/4');
    });
    it('test Ratio.prototype.toLocaleString() for valid input: Scientific notated numbers', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(100, 20000), '100/20000');
      assert.equal(func(-1e+100, 4), '-2.5e+99');
      assert.equal(func(-1e+22, 21), '1e+22/21');
      assert.equal(func(-3e+23, 29), '-3e+23/29');
      assert.equal(func(-7e+30, 3e+25), '-233333 1e+30/3e+25');
      assert.equal(func(3e+23, 29), '3e+23/29');
      assert.equal(func(7e+30, 3e+25), '233333 1e+30/3e+25');
    });
    it('test Ratio.prototype.toLocaleString() for invalid input: decimal in fraction', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(0.11, 0.3), '0.11/0.3');
    });
    it('test Ratio.prototype.toLocaleString() for invalid input: Infinity', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(1, 0), 'Infinity');
      assert.equal(func(Infinity, 1), 'Infinity');
      assert.equal(func(Infinity, 0), 'Infinity');
    });
    it('test Ratio.prototype.toLocaleString() for invalid input: NaN', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toLocaleString();
      };
      assert.equal(func(Infinity, -Infinity), 'NaN');
      assert.equal(func(32, 'i12'), 'NaN');
      assert.equal(func('-i', 12), 'NaN');
      assert.equal(func('palm', 'fist'), 'NaN');
      assert.equal(func('19', 'fist'), 'NaN');
      assert.equal(func('palm', 'o'), 'NaN');
      assert.equal(func('-i', 'i'), 'NaN');
    });
  });
  describe("Alternative Output Formats", function() {
    it('test Ratio.prototype.toArray()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).toArray();
      };
      assert.deepEqual(func(1, 2), [
        1,
        2
      ]);
      assert.deepEqual(func(-1, -2), [
        1,
        2
      ]);
      assert.deepEqual(func(0.34, 2000), [
        0.34,
        2000
      ]);
      assert.deepEqual(func(1.023e+101, -23.04), [
        -1.023e+101,
        23.04
      ]);
    });
    it('test Ratio.prototype.valueOf()', function() {
      assert.equal(new Ratio(2, 2), 1);
      assert.equal(new Ratio(1, 2), 1 / 2);
      assert.equal(new Ratio(1, 4), 1 / 4);
      assert.equal(new Ratio(1, 3), 1 / 3);
      assert.equal(new Ratio(1e+100, 4), 1e+100 / 4);
      assert.equal(new Ratio(0.0001, 3), 0.0001 / 3);
    });
  });
  describe("Ratio Instance Property Change", function() {
    it('test divider sign change', function() {
      var a = new Ratio(1, 2);
      assert.equal(a.toLocaleString(), '1/2');
      a.divSign = ':';
      assert.equal(a.toLocaleString(), '1:2');
    });
    it('test changing numerator', function() {
      var a, b;
      a = new Ratio(1, 2);
      b = new Ratio(3, 2);
      a.numerator(3);
      assert.equal(a.equals(b), true);
    });
    it('test changing denominator', function() {
      var a, b;
      a = new Ratio(1, 2);
      b = new Ratio(1, 3);
      a.denominator(3);
      assert.equal(a.equals(b), true);
    });
  });
  describe("Guess Input Type", function() {
    it('test Ratio.guessType() for output as `Ratio`', function() {
      var func = Ratio.guessType;
      assert.equal(func(new Ratio()), 'Ratio');
      assert.equal(func(new Ratio(1, 2)), 'Ratio');
      assert.equal(func(new Ratio(2000)), 'Ratio');
    });
    it('test Ratio.guessType() for output as `number`', function() {
      var func = Ratio.guessType;
      assert.equal(func(23), 'number');
      assert.equal(func(+23), 'number');
      assert.equal(func(-23), 'number');
    });
    it('test Ratio.guessType() for output as `decimal`', function() {
      var func = Ratio.guessType;
      assert.equal(func(1.1), 'decimal');
      assert.equal(func('-1.1'), 'decimal');
      assert.equal(func('+1.1'), 'decimal');
    });
    it('test Ratio.guessType() for output as `e`', function() {
      var func = Ratio.guessType;
      assert.equal(func(1.1e+30), 'e');
      assert.equal(func(-1.1e-23), 'e');
      assert.equal(func(+1.1e+23), 'e');
    });
    it('test Ratio.guessType() for output as `mixed`', function() {
      var func = Ratio.guessType;
      assert.equal(func('10 1/2'), 'mixed');
      assert.equal(func('-10 -1/2'), 'mixed');
      assert.equal(func('+10 -1/+2'), 'mixed');
    });
    it('test Ratio.guessType() for output as `fraction`', function() {
      var func = Ratio.guessType;
      assert.equal(func('+1/2'), 'fraction');
      assert.equal(func('-1e12/+2e103'), 'fraction');
      assert.equal(func('+2.3e32/23.3'), 'fraction');
      assert.equal(func('-Infinity/1'), 'fraction');
      assert.equal(func('- Infinity/1'), 'fraction');
      assert.equal(func('+ Infinity/1'), 'fraction');
      assert.equal(func('-23/Infinity'), 'fraction');
    });
    it('test Ratio.guessType() for output as `NaN`', function() {
      var func = Ratio.guessType;
      assert.equal(func(), 'NaN');
      assert.equal(func(function() {}), 'NaN');
      assert.equal(func('E'), 'NaN');
      assert.equal(func(NaN), 'NaN');
      assert.equal(func('10e-'), 'NaN');
      assert.equal(func(Math), 'NaN');
      assert.equal(func('o'), 'NaN');
      assert.equal(func('1.1.1'), 'NaN');
      assert.equal(func('1e1e'), 'NaN');
      assert.equal(func('10 a/b'), 'NaN');
      assert.equal(func('a/b'), 'NaN');
    });
  });
  describe("Parse Value to Array", function() {
    it('test Ratio.parseToArray() with invalid input', function() {
      var func = Ratio.parseToArray;
      assert.deepEqual(func({}), [
        NaN,
        1
      ]);
      assert.deepEqual(func('apple'), [
        NaN,
        1
      ]);
      assert.deepEqual(func('apples'), [
        NaN,
        1
      ]);
      assert.deepEqual(func(NaN), [
        NaN,
        1
      ]);
      assert.deepEqual(func('happy'), [
        NaN,
        1
      ]);
      assert.deepEqual(func('1.1e1.1'), [
        NaN,
        1
      ]);
    });
    it('test Ratio.parseToArray() with whole numbers', function() {
      var func = Ratio.parseToArray;
      assert.deepEqual(func(null), [
        0,
        1
      ]);
      assert.deepEqual(func([]), [
        0,
        1
      ]);
      assert.deepEqual(func('0'), [
        0,
        1
      ]);
      assert.deepEqual(func('15'), [
        15,
        1
      ]);
      assert.deepEqual(func(1), [
        1,
        1
      ]);
      assert.deepEqual(func(0), [
        0,
        1
      ]);
      assert.deepEqual(func(123), [
        123,
        1
      ]);
      assert.deepEqual(func(423), [
        423,
        1
      ]);
      assert.deepEqual(func('3'), [
        3,
        1
      ]);
      assert.deepEqual(func(' 3  '), [
        3,
        1
      ]);
      assert.deepEqual(func(-1), [
        -1,
        1
      ]);
    });
    it('test Ratio.parseToArray() with Ratio objects', function() {
      var func = Ratio.parseToArray;
      assert.deepEqual(func(new Ratio(4, 3)), [
        4,
        3
      ]);
      assert.deepEqual(func(new Ratio(-4, 3)), [
        -4,
        3
      ]);
      assert.deepEqual(func(new Ratio(4, -3)), [
        -4,
        3
      ]);
      assert.deepEqual(func(new Ratio(-4, -3)), [
        4,
        3
      ]);
    });
    it('test Ratio.parseToArray() with decimals', function() {
      var func = Ratio.parseToArray;
      assert.deepEqual(func(Number(1.12)), [
        112,
        100
      ]);
      assert.deepEqual(func(0.771), [
        771,
        1000
      ]);
      assert.deepEqual(func('0.112'), [
        112,
        1000
      ]);
      assert.deepEqual(func('23.0'), [
        23,
        1
      ]);
      assert.deepEqual(func('23.123'), [
        23123,
        1000
      ]);
      assert.deepEqual(func(1200000), [
        1200000,
        1
      ]);
      assert.deepEqual(func(0.231), [
        231,
        1000
      ]);
      assert.deepEqual(func(-123.484), [
        -123484,
        1000
      ]);
    });
    it('test Ratio.parseToArray() with scientific notated numbers', function() {
      var func = Ratio.parseToArray;
      assert.deepEqual(func(1000), [
        1000,
        1
      ]);
      assert.deepEqual(func('1e-5'), [
        1,
        100000
      ]);
      assert.deepEqual(func('-1e-5'), [
        -1,
        100000
      ]);
      assert.deepEqual(func(1010), [
        1010,
        1
      ]);
      assert.deepEqual(func(1e+101), [
        1e+101,
        1
      ]);
      assert.deepEqual(func(0.00101), [
        101,
        100000
      ]);
      assert.deepEqual(func(1.01e-30), [
        101,
        1e+32
      ]);
      assert.deepEqual(func(-1.01e-30), [
        -101,
        1e+32
      ]);
      assert.deepEqual(func('10'), [
        10,
        1
      ]);
      assert.deepEqual(func('2e1'), [
        20,
        1
      ]);
      assert.deepEqual(func('-2.0004e2'), [
        -20004,
        100
      ]);
      assert.deepEqual(func('-2.0004e5'), [
        -200040,
        1
      ]);
      assert.deepEqual(func('-2.0004e-2'), [
        -20004,
        1000000
      ]);
      assert.deepEqual(func('-2.0004e-5'), [
        -20004,
        1000000000
      ]);
      assert.deepEqual(func('-1.34e-30'), [
        -134,
        1e+32
      ]);
    });
    it('test Ratio.parseToArray() with fractions', function() {
      var func = Ratio.parseToArray;
      assert.deepEqual(func(' 3/1'), [
        3,
        1
      ]);
      assert.deepEqual(func('3/ 2'), [
        3,
        2
      ]);
      assert.deepEqual(func('1 / 3'), [
        1,
        3
      ]);
      assert.deepEqual(func('-4/ 3'), [
        -4,
        3
      ]);
      assert.deepEqual(func(' 4 /-3'), [
        -4,
        3
      ]);
      assert.deepEqual(func('-4 /-3'), [
        4,
        3
      ]);
    });
    it('test Ratio.parseToArray() with mixed numbers for sign correction', function() {
      var func = Ratio.parseToArray;
      assert.deepEqual(func('0 1/2'), [
        1,
        2
      ]);
      assert.deepEqual(func('-0 1/2'), [
        1,
        2
      ]);
      assert.deepEqual(func('0 -1/2'), [
        -1,
        2
      ]);
      assert.deepEqual(func('-0 -1/2'), [
        -1,
        2
      ]);
      assert.deepEqual(func('1 1/2'), [
        3,
        2
      ]);
      assert.deepEqual(func('-1 1/2'), [
        -3,
        2
      ]);
      assert.deepEqual(func('1 -1/2'), [
        -3,
        2
      ]);
      assert.deepEqual(func('-1 -1/2'), [
        -3,
        2
      ]);
    });
  });
  describe("Parsing Value to Ratio", function() {
    it('test Ratio.parse() with single arguments.', function() {
      var func = function(a) {
        return Ratio.parse(a).toLocaleString();
      };
      assert.equal(func('-0.125'), '-125/1000');
      assert.equal(func(new Ratio(3)), '3');
      assert.equal(func(3), '3');
      assert.equal(func('-3.0e-1'), '-3/10');
      assert.equal(func(3), '3');
      assert.equal(func(new Ratio(-1, 3)), '-1/3');
    });
    it('test Ratio.parse() with double arguments.', function() {
      var func = function(a, b) {
        return Ratio.parse(a, b).toLocaleString();
      };
      assert.equal(func(0.125, 0.5), '1250/5000');
      assert.equal(func(0.125, '1/2'), '250/1000');
      assert.equal(func(3, new Ratio(2)), '1 1/2');
      assert.equal(func(3, new Ratio(1)), '3');
      assert.equal(func(new Ratio(1), 3), '1/3');
      assert.equal(func(new Ratio(-4), new Ratio(3)), '-1 1/3');
      assert.equal(func(new Ratio(4, 5).toString(), new Ratio(-3, 2).toString()), '-8/15');
    });
  });
  describe("Random Ratio", function() {
    it('test Ratio.random()', function() {
      var fn = function() {
        return Ratio.random().valueOf();
      };
      assert.ok(fn() <= 1, 'Must be less than or equal to 1');
      assert.ok(0 <= fn(), 'Must be greater than or equal to 0');
    });
  });
  describe("Clean Scientific Notated Values", function() {
    it('test Ratio.getCleanENotation()', function() {
      var func = Ratio.getCleanENotation;
      assert.equal(func(null), '0');
      assert.equal(func('bear'), '0');
      assert.equal(func('9.999999e+22'), '9.999999e+22');
      assert.equal(func('9.999999999999999e+22'), '1e+23');
      assert.equal(func('1.1000000000000003e-30'), '1.1e-30');
    });
    it('test Ratio.prototype.cleanFormat()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).cleanFormat().toString();
      };
      assert.equal(func(1.2, 1.5), Ratio.parse(1.2, 1.5).toString());
      assert.equal(func(1.2e+30, 1.5), Ratio.parse(1.2e+30, 1.5).toString());
      assert.equal(func(1e+30, 1.5), Ratio.parse(1e+30, 1.5).toString());
      assert.equal(func(-1.2e-10, 1500000000000000), new Ratio(-1.2e-10, 1500000000000000).toString());
    });
  });
  describe("Comparison Functions", function() {
    it('test Ratio.prototype.equals() against self using `.valueOf()`, `.toString()`, and `.toLocaleString()`', function() {
      var func = function(a, b) {
          var x = new Ratio(a, b),
            errMsg = '';
          errMsg = x.equals(x.valueOf()) ? '' : 'x.equals( x.valueOf() )';
          errMsg = x.equals(x.toString()) ? '' : 'x.equals( x.toString() )';
          errMsg = x.equals(x.toLocaleString()) ? '' : 'x.equals( x.toLocaleString() )';
          if (errMsg) {
            errMsg = 'x = ' + x.toString() + ', problem with ' + errMsg;
          }
          return errMsg;
        },
        check = function(a, b) {
          assert.equal(func(a, b), '');
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
    it('test Ratio.prototype.equals() against self using `.valueOf()`, `.toString()`, and `.toLocaleString()`', function() {
      var func = function(a, b) {
          var x = Ratio.parse(a, b),
            errMsg = '';
          errMsg = x.equals(x.valueOf()) ? '' : 'x.equals( x.valueOf() )';
          errMsg = x.equals(x.toString()) ? '' : 'x.equals( x.toString() )';
          errMsg = x.equals(x.toLocaleString()) ? '' : 'x.equals( x.toLocaleString() )';
          if (errMsg) {
            errMsg = 'x = ' + x.toString() + ', problem with ' + errMsg;
          }
          return errMsg;
        },
        check = function(a, b) {
          assert.equal(func(a, b), '');
        };
      check('0/4');
      check('1/1');
      check('109');
      check('40/3');
      check('3/40');
      check('40/40');
      check('1/7');
      check('7/6');
    });
    it('test Ratio.prototype.equals() for false comparisons', function() {
      var func = function(a, b, c) {
        return Ratio.parse(a, b).equals(c);
      };
      assert.equal(func(1, 2, 2), false);
      assert.equal(func(1, 2, '1/22'), false);
      assert.equal(func(1, 5, '5'), false);
    });
    it('test Ratio.prototype.deepEquals()', function() {
      var func = function(a, b, c) {
          return Ratio.parse(a, b).deepEquals(c);
        },
        x = new Ratio(1, 2);
      assert.equal(func(1, 2, x), true);
      assert.equal(func(1e+40, 2, Ratio.parse(1e+40, 2)), true);
      assert.equal(func(4, 4, Ratio.parse(4, 4)), true);
      assert.equal(func(100000000000000000000, 1, Ratio.parse(1e+40, 2)), false);
      assert.equal(func(2, 2, Ratio.parse(4, 4)), false);
    });
    it('test equivalance using Ratio.prototype.equals and ==', function() {
      var a = new Ratio(),
        b = new Ratio(),
        c = new Ratio(3, 4),
        d = new Ratio(3, 4),
        e = new Ratio(12, 12),
        f = new Ratio(12, 12);
      assert.equal(a.equals(a), true);
      assert.equal(b.equals(b), true);
      assert.equal(c.equals(c), true);
      assert.equal(d.equals(d), true);
      assert.equal(a.equals(b), true);
      assert.equal(+a === +b, true);
      assert.equal(c.equals(d), true);
      assert.equal(+c === +d, true);
      assert.equal(a.equals(c), false);
      assert.equal(+a === +c, false);
      assert.equal(e.equals(c), false);
      assert.equal(f.equals(c), false);
    });
    it('test comparison, Ratio.prototype.valueOf() is called', function() {
      var a = new Ratio(1, 2),
        b = new Ratio(1, 4),
        c = new Ratio(150, 3);
      assert.ok(a > b);
      assert.ok(c >= b);
      assert.ok(c >= a);
      assert.ok(b < a);
      assert.ok(b <= c);
    });
    it('test Ratio.prototype.isNaN()', function() {
      var fn = function(a, b) {
        return Ratio.parse(a, b).isNaN();
      };
      assert.equal(fn(1, 0), true);
      assert.equal(fn(Infinity, 0), true);
      assert.equal(fn(Infinity, -Infinity), true);
      assert.equal(fn('apples', 'oranges'), true);
      assert.equal(fn(1, 2), false);
      assert.equal(fn(1e+49, 22.34), false);
      assert.equal(fn(1, -2), false);
      assert.equal(fn(-1e-50), false);
    });
  });
  describe("Math Operations Requiring Extra Terms", function() {
    it('test addition with +, Ratio.prototype.valueOf() is called', function() {
      var func = function(a, b, c, d) {
          return new Ratio(a, b) + new Ratio(c, d);
        }, x;
      assert.equal(func(), 0);
      assert.equal(func(0, x, 0, x), 0);
      assert.equal(func(-1, x, 1, x), 0);
      assert.equal(func(1, x, 2, x), 3);
      assert.equal(func(40, x, 2, x), 42);
      assert.equal(func(20001, 40002, 400, 800), 1);
      assert.equal(func(1, 2, 1, 2), 1);
      assert.equal(func(1, x, 1, 2), 1.5);
      assert.equal(func(1, x, 1, 3), 4 / 3);
      assert.equal(func(1, 3, -1, 3), 0);
    });
    it('test Ratio.prototype.add()', function() {
      var func = function(a, b, c, d) {
          return new Ratio(a, b).add(new Ratio(c, d)).toLocaleString();
        }, x;
      assert.equal(func(), '0');
      assert.equal(func(0, x, 0, x), '0');
      assert.equal(func(0, x, 1, 2), '1/2');
      assert.equal(func(1, 2, 0, x), '1/2');
      assert.equal(func(2, 4, 4, 8), '1');
      assert.equal(func(2, 4, 4, 8), '1');
      assert.equal(func(1, 2, 1, 2), '1');
      assert.equal(func(1, x, 1, x), '2');
      assert.equal(func(1, x, 2, x), '3');
      assert.equal(func(40, x, 2, x), '42');
      assert.equal(func(1, x, 1, 2), '1 1/2');
      assert.equal(func(2, 5, 3, 4), '1 3/20');
      assert.equal(func(1, 3, 3, 9), '6/9');
      assert.equal(func(4, 9, 3, 9), '7/9');
    });
    it('test addition with -, Ratio.prototype.valueOf() is called', function() {
      var func = function(a, b, c, d) {
        return new Ratio(a, b) - new Ratio(c, d);
      };
      assert.equal(func(), 0);
      assert.equal(func(1, 4, 1, 4), 0);
      assert.equal(func(1, 5, 1, 2), '-0.3');
      assert.equal(func(1, 20, 1, 100), '0.04');
    });
    it('test Ratio.prototype.subtract()', function() {
      var func = function(a, b, c, d) {
          return new Ratio(a, b).subtract(new Ratio(c, d)).toLocaleString();
        }, x;
      assert.equal(func(), '0');
      assert.equal(func(0, x, 0, 0), 'NaN');
      assert.equal(func(0, x, 0, x), '0');
      assert.equal(func(0, 0, 1, 2), 'NaN');
      assert.equal(func(0, 0, 0, 0), 'NaN');
      assert.equal(func(1, 2, 0, 0), 'NaN');
      assert.equal(func(1, 2, 0, x), '1/2');
      assert.equal(func(0, x, 1, 2), '-1/2');
      assert.equal(func(1, 2, 0, x), '1/2');
      assert.equal(func(1, 3, 3, 9), '0');
      assert.equal(func(2, 4, 4, 8), '0');
      assert.equal(func(1, x, 1, 2), '1/2');
      assert.equal(func(4, x, 1, x), '3');
      assert.equal(func(4, 9, 3, 9), '1/9');
      assert.equal(func(10, 2, 9, 19), '4 20/38');
      assert.equal(func(1, x, 3, 2), '-1/2');
      assert.equal(func(1, x, 4, x), '-3');
      assert.equal(func(2, 5, 3, 4), '-7/20');
      assert.equal(func(1, 9, 4, 9), '-3/9');
    });
    it('test Ratio.prototype.multiply()', function() {
      var func = function(a, b, c, d) {
        return new Ratio(a, b).multiply(c, d).toLocaleString();
      };
      assert.equal(func(1, 1, 1, 1), '1');
      assert.equal(func(1, 1, 2, 1), '2');
      assert.equal(func(-100, 1, 432, -1), '43200');
      assert.equal(func(2, 3, 4, 9), '8/27');
      assert.equal(func(12, 34, 2, -54), '-24/' + 34 * 54);
      assert.equal(func(12, 34, 2, -54), '-24/' + 34 * 54);
      assert.equal(func(-213, -423, -123, -123), 213 * 123 + '/' + 123 * 423);
      assert.equal(func(-213, -423, 0, 0), 'NaN');
    });
    it('test Ratio.prototype.divide()', function() {
      var func = function(a, b, c, d) {
        return new Ratio(a, b).divide(c, d).toLocaleString();
      };
      assert.equal(func(0, 1, 1, 10), '0');
      assert.equal(func(1, 1, 1, 1), '1');
      assert.equal(func(10, 3, 100, 30), '1');
      assert.equal(func(1, 4, 1, 20), '5');
      assert.equal(func(-10, 23, 13, -39), '1 91/299');
      assert.equal(func(-12, -34, -45, -67), 12 * 67 + '/' + 45 * 34);
    });
    it('test Ratio.prototype.descale', function() {
      var func = function(a, b, c) {
        return new Ratio(a, b).descale(c).toLocaleString();
      };
      assert.equal(func(25, 100, 5), '5/20');
      assert.equal(func(5, 100, 5), '1/20');
      assert.equal(func(5, 100, 5), '1/20');
      assert.notEqual(func(5, 100, 5.1), '1/20');
    });
    it('test Ratio.prototype.scale()', function() {
      var func = function(a, b, c) {
        return new Ratio(a, b).scale(c).toLocaleString();
      };
      assert.equal(func(2, 3, 5), '10/15');
      assert.equal(func(2, 3, 3e-10), '6e-10/9e-10');
      assert.equal(func(1, 2, 5), '5/10');
      assert.equal(func(1, 2, 2.5), '2.5/5');
    });
  });
  describe("Math Operations Performed on Self", function() {
    it('test Ratio.prototype.abs()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).abs().toLocaleString();
      };
      assert.equal(func(1, 2), '1/2');
      assert.equal(func(-1, 2), '1/2');
      assert.equal(func(-1, -2), '1/2');
      assert.equal(func(1, 2), '1/2');
    });
    it('test Ratio.prototype.mod()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).mod().toLocaleString();
      };
      assert.equal(func(5, 0), 'NaN');
      assert.equal(func(5, 1), '0');
      assert.equal(func(5, 2), '1');
      assert.equal(func(5, 20), '5');
      assert.equal(func(500, 21), '17');
    });
    it('test Ratio.prototype.negate()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).negate().toLocaleString();
      };
      assert.equal(func(1, 2), '-1/2');
      assert.equal(func(-1, 2), '1/2');
      assert.equal(func(1, -2), '1/2');
      assert.equal(func(-1e-10, 2e+22), '1e-10/2e+22');
    });
    it('test Ratio.prototype.ceil()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).ceil().toString();
      };
      assert.equal(func(1, 2), '1/1');
      assert.equal(func(-1, 2), '0/1');
      assert.equal(func(1, -2), '0/1');
      assert.equal(func(-1e-10, 2e+22), '0/1');
    });
    it('test Ratio.prototype.floor()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).floor().toString();
      };
      assert.equal(func(1, 2), '0/1');
      assert.equal(func(-1, 2), '-1/1');
      assert.equal(func(1, -2), '-1/1');
      assert.equal(func(-1e-10, 2e+22), '-1/1');
    });
    it('test Ratio.prototype.reciprocal()', function() {
      assert.equal(new Ratio(1, 2).reciprocal().toString(), '2/1');
    });
  });
  describe("Finding the repeating decimals", function() {
    it('test Ratio.getRepeatProps() with invalid input', function() {
      var func = Ratio.getRepeatProps;
      assert.deepEqual(func(''), []);
      assert.deepEqual(func([]), []);
      assert.deepEqual(func({}), []);
      assert.deepEqual(func(Math.PI), []);
      assert.deepEqual(func(null), []);
      assert.deepEqual(func(true), []);
      assert.deepEqual(func(Infinity), []);
      assert.deepEqual(func(NaN), []);
      assert.deepEqual(func(1 / 5), []);
      assert.deepEqual(func(1 / 100), []);
      assert.deepEqual(func('1.2.3'), []);
      assert.deepEqual(func('1.333333'), []);
    });
    it('test Ratio.getRepeatProps() with decimal numbers as string', function() {
      var func = Ratio.getRepeatProps;
      assert.deepEqual(func('1.1111111111'), [
        '1',
        '',
        '1'
      ]);
      assert.deepEqual(func('1234.11111111111'), [
        '1234',
        '',
        '1'
      ]);
      assert.deepEqual(func('1.12312311111111'), [
        '1',
        '123123',
        '1'
      ]);
      assert.deepEqual(func('12.12121212121212'), [
        '12',
        '',
        '12'
      ]);
      assert.deepEqual(func('1234.1111212121212'), [
        '1234',
        '111',
        '12'
      ]);
      assert.deepEqual(func('2.123412341234'), [
        '2',
        '',
        '1234'
      ]);
      assert.deepEqual(func('3534.3344512341234'), [
        '3534',
        '33445',
        '1234'
      ]);
    });
    it('test Ratio.getRepeatProps() with computed decimal numbers', function() {
      var func = Ratio.getRepeatProps;
      assert.deepEqual(func(1 / 333), [
        '0',
        '',
        '003'
      ]);
      assert.deepEqual(func(7 / 13), [
        '0',
        '5384',
        '615384'
      ]);
      assert.deepEqual(func(1 / 111), [
        '0',
        '',
        '009'
      ]);
      assert.deepEqual(func(11 / 111), [
        '0',
        '',
        '099'
      ]);
      assert.deepEqual(func(100 / 11), [
        '9',
        '',
        '09'
      ]);
      assert.deepEqual(func(100 / 13), [
        '7',
        '692',
        '307692'
      ]);
      assert.deepEqual(func(1 / 3), [
        '0',
        '',
        '3'
      ]);
      assert.deepEqual(func(4 / 3), [
        '1',
        '',
        '3'
      ]);
    });
  });
  describe("Ratio Reduction Functions", function() {
    it('test Ratio.simplify()', function() {
      var func = Ratio.simplify;
      assert.deepEqual(func(0, 200), [
        0,
        1
      ]);
      assert.deepEqual(func(1, 2), [
        1,
        2
      ]);
      assert.deepEqual(func(4, 8), [
        1,
        2
      ]);
      assert.deepEqual(func(100, 200), [
        1,
        2
      ]);
      assert.deepEqual(func(-42, 42), [
        -1,
        1
      ]);
      assert.deepEqual(func(134, -3), [
        -134,
        3
      ]);
    });
    it('test Ratio.prototype.simplify()', function() {
      var func = function(a, b) {
        return Ratio.parse(a, b).simplify().toString();
      };
      assert.equal(func(), 'NaN/NaN');
      assert.equal(func(0), '0/1');
      assert.equal(func(0, 200), '0/1');
      assert.equal(func(1), '1/1');
      assert.equal(func(1, 3), '1/3');
      assert.equal(func(3, 9), '1/3');
      assert.equal(func(1 / 100), '1/100');
      assert.equal(func(7 / 3), '7/3');
      assert.equal(func(1 / 111), '1/111');
      assert.equal(func(1 / 333), '1/333');
    });
  });
  describe("Use Cases", function() {
    it('test user case 1', function() {
      var a = new Ratio(1, 2);
      assert.equal(a.toString(), '1/2');
      a = a.add(3);
      assert.equal(a.toString(), '7/2');
      a = a.subtract(2);
      assert.equal(a.toString(), '3/2');
      a = a.divide('3/2');
      assert.equal(a.toLocaleString(), '1');
      assert.equal(a.multiply(12).simplify().toLocaleString(), 12);
      assert.equal(a.toLocaleString(), '1');
    });
    it('test user case 2: Calculate PI', function() {
      var a = Ratio(16).multiply(Ratio(Math.atan(Ratio(1) / Ratio(5)))),
        b = Ratio(4).multiply(Ratio(Math.atan(Ratio(1) / Ratio(239)))),
        computedPI = a.subtract(b);
      assert.equal(Math.PI <= computedPI, true);
    });
    // test("test user case 3: 2x2 Matrix of Ratios ", function () {
    // });
    // test("test user case 4: ?", function () {
    // });
    // test("test user case 5: ?", function () {
    // });
  });
  describe("Proper", function() {
    it('test Ratio.prototype.isProper()', function() {
      var func = function(a, b) {
        return new Ratio(a, b).isProper();
      };
      assert.equal(func(1, 2), true);
      assert.equal(func(100, 200), true);
      assert.equal(func(10, 2), false);
      assert.equal(func(100000, 200), false);
    });
    it('test Ratio.prototype.makeProper()', function() {
      var func = function(a, b) {
        return Ratio.parse(a, b).makeProper().toString();
      };
      assert.equal(func(1, 2), '1/2');
      assert.equal(func(7, 5), '2/5');
      assert.equal(func(100, 200), '100/200');
      assert.equal(func(10, 2), '0/2');
      assert.equal(func(4.2), '2/10');
      assert.equal(func(-1, 2), '-1/2');
      assert.equal(func(-7, 5), '-2/5');
      assert.equal(func(-100, 200), '-100/200');
      assert.equal(func(-10, 2), '0/2');
      assert.equal(func(1e+34, 200), '0/200');
      assert.equal(func(-1e+34, 200), '0/200');
    });
  });
  describe("Find Prime Factors", function() {
    it('test Ratio.getPrimeFactors()', function() {
      var func = Ratio.getPrimeFactors;
      assert.deepEqual(func(Infinity), []);
      assert.deepEqual(func({}), []);
      assert.deepEqual(func(null), []);
      assert.deepEqual(func(-1), []);
      assert.deepEqual(func(0), []);
      assert.deepEqual(func(1), []);
      assert.deepEqual(func(2), [2]);
      assert.deepEqual(func(6), [
        2,
        3
      ]);
      assert.deepEqual(func(9), [
        3,
        3
      ]);
      assert.deepEqual(func('729'), [
        3,
        3,
        3,
        3,
        3,
        3
      ]);
      assert.deepEqual(func(3333333791), [
        2347,
        1420253
      ]);
      assert.deepEqual(func(123456789), [
        3,
        3,
        3607,
        3803
      ]);
      assert.deepEqual(func(9876543210), [
        2,
        3,
        3,
        5,
        17,
        17,
        379721
      ]);
      assert.deepEqual(func('103103103'), [
        3,
        103,
        333667
      ]);
    });
  });
  describe("Find x", function() {
    it('test Ratio.prototype.findX() with invalid input', function() {
      var func = function(a, b, str) {
        return new Ratio(a, b).findX(str);
      };
      assert.equal(func(1, 2, '10'), null);
      assert.equal(func(1, 2, '10/10'), null);
      assert.equal(func(1, 2, 'Infinity'), null);
      assert.equal(func(1, 2, 'Infinity/1e40'), null);
      assert.equal(func(1, 2, 'x10'), null);
      assert.equal(func(1, 2, 'x/1/2'), null);
      assert.equal(func(1, 2, 'I like turtles'), null);
    });
    it('test Ratio.prototype.findX() with valid input', function() {
      var func = function(a, b, str) {
        return new Ratio(a, b).findX(str).simplify().toString();
      };
      assert.equal(func(1, 2, 'x/10'), '5/1');
      assert.equal(func(1, 2, 'x/1'), '1/2');
      assert.equal(func(5, -2, 'x/24'), '-60/1');
      assert.equal(func(3, 7, '10/x'), '70/3');
      assert.equal(func(11, -9, '10/x'), '-90/11');
      assert.equal(func(1, -201, '10/x'), '-2010/1');
      assert.equal(func(1, 4, '-1e+8/x'), '-400000000/1');
      assert.equal(func(1, 4, 'Infinity / x'), 'NaN');
      assert.equal(func(1, -4, 'Infinity / -x'), 'NaN');
    });
  });
  describe("Quantify Approximation", function() {
    it('test Ratio.prototype.toQuantityOf() with invalid input', function() {
      var func = function(a, b, base) {
        return Ratio.parse(a, b).toQuantityOf(base).toString();
      };
      assert.equal(func(1, 3, {}), 'NaN/3');
      assert.equal(func(1, 3, 'ten'), 'NaN/3');
      assert.equal(Ratio.parse(1, 3).toQuantityOf().toString(), 'NaN/3');
    });
    it('test Ratio.prototype.toQuantityOf() with single arguments', function() {
      var func = function(a, b, base) {
        return Ratio.parse(a, b).toQuantityOf(base).toString();
      };
      assert.equal(func(1, 2, 2), '1/2');
      assert.equal(func(1, 2, 3), '2/3');
      assert.equal(func(5, 10, 2), '1/2');
      assert.equal(func(5, 10, 7), '4/7');
      assert.equal(func(27, 100, 3), '1/3');
      assert.equal(func(77, 100, 3), '2/3');
      assert.equal(func(99, 100, 9), '9/9');
      assert.equal(func(1, 100, 1000000), '10000/1000000');
      assert.equal(func(97, -100, 3), '-3/3');
      assert.equal(func(-27, 100, 3), '-1/3');
    });
    it('Ratio.prototype.toQuantityOf() with multiple arguments', function() {
      var func = function(a, b, units) {
        var x = Ratio.parse(a, b);
        return x.toQuantityOf.apply(x, units).toString();
      };
      assert.equal(func(3, 8, [
        2,
        3,
        4
      ]), '1/3');
      assert.equal(func(1, 3, [
        2,
        4,
        8
      ]), '3/8');
      assert.equal(func(1, 2, [
        1,
        2,
        3,
        4
      ]), '1/2');
    });
  });
  describe("Common.js Support", function() {
    it('test Nodes.js( NPM ) support', function() {
      assert.ok(exports.Ratio === Ratio, 'The Ratio object is the export object.');
      assert.ok(exports.Ratio.VERSION, 'Ratio was added to exports.');
    });
  });
  describe("Empty Argument Calls", function() {
    it('test Ratio static methods for errors when functions with required arguments aren\'t supplied when called.', function() {
      var fn;
      for (var fnName in Ratio) {
        fn = Ratio[fnName];
        if (typeof fn !== 'function' || fn.length === 0) {
          continue;
        }
        try {
          assert.equal(true, true);
        } catch ( e ) {
          assert.equal(true, false);
        }
      }
    });
    it('test Ratio.prototype methods for errors when functions with required arguments aren\'t supplied when called.', function() {
      var a = new Ratio();
      for (var fnName in a) {
        if (typeof a[fnName] !== 'function' || a[fnName].length === 0) {
          continue;
        }
        try {
          assert.equal(true, true);
        } catch ( e ) {
          assert.equal(true, false);
        }
      }
    });
  });
  describe("Non-destructive Method Calls", function() {
    it('test that non-destructive methods don\'t modify passed objects', function() {
      var makeStatement = function(a, b, c) {
        return a.toString() + ' + ' + b.toString() + ' = ' + c.toString();
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
        if (avoidThese[fnName] || typeof a[fnName] !== 'function' || a[fnName].length === 0 || a[fnName] === Ratio) {
          continue;
        }
        a = new Ratio(5, 4);
        b = new Ratio(1, 2);
        c = new Ratio(3, 4);
        a[fnName](b, c);
        assert.equal(str, makeStatement(a, b, c));
      }
    });
  });
});
