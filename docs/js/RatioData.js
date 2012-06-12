var data = [
  {
    "tags": [
      {
        "type": "purpose",
        "string": "Provides a Ratio(Fraction) object for Javascript. Similar to Fraction.py for Python.\r"
      },
      {
        "type": "author",
        "string": "Larry Battle , <http://bateru.com/news/>\r"
      },
      {
        "type": "license",
        "string": "MIT and GPL 3.0\r"
      },
      {
        "type": "",
        "string": "MIT License <http://www.opensource.org/licenses/mit-license>\r"
      },
      {
        "type": "",
        "string": "GPL v3 <http://opensource.org/licenses/GPL-3.0>\r"
      },
      {
        "type": "info",
        "string": "Project page: <https://github.com/LarryBattle/Ratio.js/>\r"
      },
      {
        "type": "version",
        "string": "Beta 0.1.8, 2012.06.9\r"
      },
      {
        "type": "//",
        "string": "testing\r"
      },
      {
        "type": "todo",
        "string": "Test scientific notation compatiblity. \r"
      },
      {
        "type": "todo",
        "string": "Add at least 5 user cases. a.add(4).toFraction() doesn't copy over the divSign.\r"
      },
      {
        "type": "\tEx:",
        "string": "Ratio.parse(1/3).negate().add(\"-0.1\").multiply(0xF3).divide(1,2).divide(1e-4).abs().toString()"
      }
    ],
    "description": {
      "full": "<p>@project Ratio.js</p>",
      "summary": "<p>@project Ratio.js</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false
  },
  {
    "tags": [
      {
        "type": "constructor\r",
        "string": ""
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "String",
          "Number"
        ],
        "name": "a",
        "description": "- can be a Ratio object or numeric value.\r"
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "String",
          "Number"
        ],
        "name": "b",
        "description": "- can be a Ratio object or numeric value.\r"
      },
      {
        "type": "param",
        "types": [
          "String"
        ],
        "name": "type",
        "description": "- can be either a \"string\" or \"decimal\". `type` forces a type on the Ratio object.\r"
      },
      {
        "type": "param",
        "types": [
          "Boolean"
        ],
        "name": "alwaysReduce",
        "description": "- If true, then the Ratio object and the child of it will always represent the simplified form of the rational.\r"
      },
      {
        "type": "returns",
        "string": "{Ratio} object that has a numerator and denominator, corresponding to a/b.\r"
      },
      {
        "type": "example",
        "string": "Ex. Ratio(2,4).toString() = Ratio(\"2/4\").toString() = \"2/4\""
      }
    ],
    "description": {
      "full": "<p>Ratio is an object that has a numerator and denominator, corresponding to a/b.<br/><br />Note: The keyword <code>new</code> is not required to create a new instance of the Ratio object, since this is done for you.<br/><br />In otherwords, <code><pre>new Ratio( value )</pre></code> is the same as <code><pre>Ratio( value )</pre></code>.</p>",
      "summary": "<p>Ratio is an object that has a numerator and denominator, corresponding to a/b.<br/><br />Note: The keyword <code>new</code> is not required to create a new instance of the Ratio object, since this is done for you.<br/><br />In otherwords, <code><pre>new Ratio( value )</pre></code> is the same as <code><pre>Ratio( value )</pre></code>.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "var Ratio = function (a, b, alwaysReduce) {\r\n    if(!(this instanceof Ratio)){\r\n        return new Ratio(a, b, alwaysReduce);\r\n    }\r\n    this.divSign = \"/\";\r\n    this.alwaysReduce = !!alwaysReduce;\r\n    this.type = \"\";\r\n    this.denominator = isNaN(\"\" + b) ? 1 : Math.abs(b);\r\n    this.numerator = isNaN(\"\" + a) ? 0 : Ratio.getNumeratorWithSign(a,(b||1));\r\n    if( this.denominator && this.alwaysReduce ){\r\n\t\tvar arr = Ratio.reduce(this);\r\n\t\tthis.numerator = arr[0];\r\n\t\tthis.denominator = arr[1];\r\n\t}\r\n\treturn this;\r\n};",
    "ctx": {
      "type": "function",
      "name": "Ratio",
      "string": "Ratio()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Object\r"
        ],
        "name": "",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{Boolean}\r"
      },
      {
        "type": "example",
        "string": "Ratio.isNumeric(\"1.0e3\") == true"
      }
    ],
    "description": {
      "full": "<p>Checks if value is a finite number. <br/> Borrowed from jQuery 1.7.2 <br/></p>",
      "summary": "<p>Checks if value is a finite number. <br/> Borrowed from jQuery 1.7.2 <br/></p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.isNumeric = function (obj) {\r\n    return !isNaN(parseFloat(obj)) && isFinite(obj);\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "isNumeric",
      "string": "Ratio.isNumeric()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "a\r",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{Number} b\r"
      },
      {
        "type": "example",
        "string": "Ratio.gcd(20,12) == 4"
      }
    ],
    "description": {
      "full": "<p>Find the Greatest Common Factor between two numbers using \"Euler Method\".</p>",
      "summary": "<p>Find the Greatest Common Factor between two numbers using \"Euler Method\".</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.gcd = function (a, b) {\r\n    var c;\r\n    b = (+b && +a) ? +b : 0;\r\n    a = b ? a : 1;\r\n    while (b) {\r\n        c = a % b;\r\n        a = b;\r\n        b = c;\r\n    }\r\n    return Math.abs(a);\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "gcd",
      "string": "Ratio.gcd()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "top\r",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "bottom\r",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{Number}\r"
      },
      {
        "type": "example",
        "string": "Ratio.getNumeratorWithSign(1,-2) == -1"
      }
    ],
    "description": {
      "full": "<p>Returns the numerator with the corresponding sign of (top/bottom). <br/><br />Used to force <code>top</code> to represent the sign of the Ratio.</p>",
      "summary": "<p>Returns the numerator with the corresponding sign of (top/bottom). <br/><br />Used to force <code>top</code> to represent the sign of the Ratio.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.getNumeratorWithSign = function (top, bottom) {\r\n    var x = (+top||1), y = (+bottom||1), a = \"\" + x*y;\r\n    return (/\\-/.test(a.charAt(0))) ? -Math.abs(+top) : Math.abs(+top);\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "getNumeratorWithSign",
      "string": "Ratio.getNumeratorWithSign()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "- Numeric Object containing a decimal point.\r"
      },
      {
        "type": "returns",
        "string": "{Array[Number, Number]}\r"
      },
      {
        "type": "example",
        "string": "Ratio.parseDecimal( \"-0.25\" ) // returns [-25,100]"
      }
    ],
    "description": {
      "full": "<p>Converts a decimal value to a ratio in the form of [top, bottom], such that top/bottom is the decimal value.</p>",
      "summary": "<p>Converts a decimal value to a ratio in the form of [top, bottom], such that top/bottom is the decimal value.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.parseDecimal = function (obj) {\r\n    var arr = [], parts;\r\n    if(!Ratio.isNumeric(obj)){\r\n        return arr;\r\n    }\r\n    obj = +obj;\r\n    if (/\\d+\\.\\d+$/.test(obj)) {\r\n        parts = obj.toString().split(/\\./);\r\n        arr[1] = Math.pow(10, parts[1].length);\r\n        arr[0] = Math.abs(parts[0]) * arr[1] + (+parts[1]);\r\n        arr[0] = (/\\-/.test(parts[0])) ? -arr[0] : arr[0];\r\n    }else{\r\n        arr = [obj, 1];\r\n    }\r\n    return arr;\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "parseDecimal",
      "string": "Ratio.parseDecimal()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "- Numeric Object containing a character `e`.\r"
      },
      {
        "type": "returns",
        "string": "{Array[Number, Number]}\r"
      },
      {
        "type": "example",
        "string": "Ratio.parseENotation(-2.5e23) // returns [-2.5e+24, 10]"
      }
    ],
    "description": {
      "full": "<p>Converts a scientific notated value to a ratio in the for of [top, bottom], such that top/bottom is the scientific notated value.</p>",
      "summary": "<p>Converts a scientific notated value to a ratio in the for of [top, bottom], such that top/bottom is the scientific notated value.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.parseENotation = function (obj) {\r\n    var arr = [], top, parts;\r\n    if(!Ratio.isNumeric(obj)){\r\n        return arr;\r\n    }\r\n    obj = +obj;\r\n    if( /e/i.test(obj) ){\r\n        parts = obj.toString().split(/e/i);\r\n        top = Ratio.parseDecimal(parts[0]);\r\n        if (Math.abs(obj) < 1) {\r\n            arr[0] = top[0];\r\n            arr[1] = +(top[1] + \"e\" + Math.abs(+parts[1]));\r\n        } else {\r\n            arr[0] = +(top[0] + \"e\" + Math.abs(+parts[1]));\r\n            arr[1] = top[1];\r\n        }\r\n    }else{\r\n        arr = Ratio.parseDecimal( obj );\r\n    }\r\n    return arr;\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "parseENotation",
      "string": "Ratio.parseENotation()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "- Numeric Object containing a character `e` or `.`.\r"
      },
      {
        "type": "returns",
        "string": "{Array[Number, Number]}\r"
      },
      {
        "type": "example",
        "string": "Ratio.parseNumber( NaN ) // returns [];"
      }
    ],
    "description": {
      "full": "<p>Bridge for Ratio.parseENotation and Ratio.parseDecimal.</p>",
      "summary": "<p>Bridge for Ratio.parseENotation and Ratio.parseDecimal.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.parseNumber = function (obj) {\r\n    if (!Ratio.isNumeric(obj)) {\r\n        return [];\r\n    }\r\n    return (/e/i.test(obj)) ? Ratio.parseENotation(obj) : Ratio.parseDecimal(obj);\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "parseNumber",
      "string": "Ratio.parseNumber()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "- Numeric Object.\r"
      },
      {
        "type": "returns",
        "string": "{Array[Number, Number]}\r"
      },
      {
        "type": "example",
        "string": "Ratio.parseToArray( 0.125 ) // returns [125, 1000]"
      }
    ],
    "description": {
      "full": "<p>Converts a numeric value to a Ratio in the form of [top, bottom], such that top/bottom.</p>",
      "summary": "<p>Converts a numeric value to a Ratio in the form of [top, bottom], such that top/bottom.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.parseToArray = function (obj) {\r\n    var arr = [], parts, re = /\\//;\r\n    if (typeof obj == \"undefined\" || obj === null) {\r\n        return arr;\r\n    }\r\n    if (obj instanceof Ratio) {\r\n        arr[0] = Ratio.getNumeratorWithSign(obj.numerator, obj.denominator);\r\n        arr[1] = Math.abs(obj.denominator);\r\n    } else {\r\n        if ( re.test(obj)) {\r\n            parts = obj.split( re );\r\n            arr[0] = Ratio.getNumeratorWithSign(parts[0], parts[1]);\r\n            arr[1] = Math.abs(+parts[1]);\r\n        } else {\r\n            arr = Ratio.parseNumber(obj);\r\n        }\r\n    }\r\n    return arr;\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "parseToArray",
      "string": "Ratio.parseToArray()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj\r",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj\r",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "<code><pre>\r"
      },
      {
        "type": "",
        "string": "// Example 1:\r"
      },
      {
        "type": "",
        "string": "var a = Ratio.parse(3,4);\r"
      },
      {
        "type": "",
        "string": "var b = Ratio(3,4);\r"
      },
      {
        "type": "",
        "string": "a.equals( b ) === true;\r"
      },
      {
        "type": "",
        "string": "\r"
      },
      {
        "type": "",
        "string": "// Example 2:\r"
      },
      {
        "type": "",
        "string": "Ratio.parse( \"3/4\" ).numerator == \"3\"\r"
      },
      {
        "type": "",
        "string": "</pre></code>"
      }
    ],
    "description": {
      "full": "<p>Converts a numeric value to a Ratio object.</p>",
      "summary": "<p>Converts a numeric value to a Ratio object.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.parse = function (obj, obj2) {\r\n    var arr = Ratio.parseToArray(obj), arr2;\r\n    if ( arr.length && typeof obj2 != \"undefined\" && obj2 !== null) {\r\n        arr2 = Ratio.parseToArray(obj2);\r\n        arr[0] *= arr2[1];\r\n        arr[1] *= arr2[0];\r\n    }\r\n    return new Ratio(arr[0], arr[1]);\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "parse",
      "string": "Ratio.parse()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj\r",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj\r",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{Array[ Number, Number ]}\r"
      },
      {
        "type": "example",
        "string": "<code><pre>\r"
      },
      {
        "type": "",
        "string": "// Example 1:\r"
      },
      {
        "type": "",
        "string": "Ratio.reduce( Ratio(36,-36) ) // returns [-1,1]\r"
      },
      {
        "type": "",
        "string": "\r"
      },
      {
        "type": "",
        "string": "// Example 2:\r"
      },
      {
        "type": "",
        "string": "Ratio.reduce( \"9/12\" ) // returns [3,4]\r"
      },
      {
        "type": "",
        "string": "\r"
      },
      {
        "type": "",
        "string": "// Example 3:\r"
      },
      {
        "type": "",
        "string": "Ratio.reduce( \"10/4\" ).toString() // returns [5,2]\r"
      },
      {
        "type": "",
        "string": "</pre></code>"
      }
    ],
    "description": {
      "full": "<p>Given a numerator and denominator in the form of [a,b], returns as an array of numbers.</p>",
      "summary": "<p>Given a numerator and denominator in the form of [a,b], returns as an array of numbers.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.reduce = function (obj,obj2) {\r\n\tobj = Ratio.parse( obj, obj2 );\r\n\tvar top = obj.numerator, bottom = obj.denominator, arr = Ratio.getRepeatProps(top/bottom);\r\n    if ( arr.length ) {\r\n        top = +(arr.join('')) - +(arr[0]+\"\"+arr[1]);\r\n        bottom = Math.pow(10, arr[1].length ) * ( Math.pow(10, arr[2].length ) - 1);\r\n    }\r\n    var factor = Ratio.gcd(top, bottom);\r\n    return [ top / factor, bottom / factor ];\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "reduce",
      "string": "Ratio.reduce()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "val",
        "description": "\r"
      },
      {
        "type": "returns",
        "string": "{Array[Number, Number, Number]}\r"
      },
      {
        "type": "example",
        "string": "Ratio.getRepeatProps( 22/7 ) // returns [\"3\", \"14\", \"285714\"]"
      }
    ],
    "description": {
      "full": "<p>This function divides a repeating decimal into 3 parts. If the value passed is not a repeating decimal then an empty array is returned.<br/><br />For repeating decimals, the return value is an array which contains the numeric value split into 3 parts like, [ \"numbers before decimal\", \"numbers before repeating pattern\", \"repeating pattern.\" ].<br />Here's another explanation. <br/><br />The return value is [i, x, r] for the repeating decimal value.<br/><br />where i are the values to the left of the decimal point. <br/><br />x are the decimals to the right of the decimal point and to the left of the repeating pattern.<br/><br />r is the unique repeating patterns for the repeating decimal.<br/><br />Ex. 22/7 = 3.142857142857143 = 3.14-285714-285714-3, i = 3, x = 14, r = 285714<br/><br />It should be noted that the last digit might be removed to avoid rounding errors.</p>",
      "summary": "<p>This function divides a repeating decimal into 3 parts. If the value passed is not a repeating decimal then an empty array is returned.<br/><br />For repeating decimals, the return value is an array which contains the numeric value split into 3 parts like, [ \"numbers before decimal\", \"numbers before repeating pattern\", \"repeating pattern.\" ].<br />Here's another explanation. <br/><br />The return value is [i, x, r] for the repeating decimal value.<br/><br />where i are the values to the left of the decimal point. <br/><br />x are the decimals to the right of the decimal point and to the left of the repeating pattern.<br/><br />r is the unique repeating patterns for the repeating decimal.<br/><br />Ex. 22/7 = 3.142857142857143 = 3.14-285714-285714-3, i = 3, x = 14, r = 285714<br/><br />It should be noted that the last digit might be removed to avoid rounding errors.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.getRepeatProps = function( val ){\r\n    val = \"\"+(val || \"\");\r\n    var RE1_getRepeatDecimals = /(?:[^\\.]+\\.\\d*)(\\d{2,})+(?:\\1)$/,\r\n        arr = [], \r\n        match = RE1_getRepeatDecimals.exec( val ), \r\n        RE2_RE1AtEnd,\r\n        RE3_RepeatingNums = /^(\\d+)(?:\\1)$/;\r\n    if( !match ){\r\n        val = val.replace( /\\d$/, \"\" );\r\n        match = RE1_getRepeatDecimals.exec( val );\r\n    }\r\n    if( match && 1 < match.length && /\\.\\d{10}/.test(match[0]) ){\r\n        match[1] = RE3_RepeatingNums.test(match[1]) ? RE3_RepeatingNums.exec(match[1])[1] : match[1];\r\n        RE2_RE1AtEnd = new RegExp( \"(\"+ match[1] +\")+$\" );\r\n        arr = val.split( /\\./ ).concat( match[1] );\r\n\t\tarr[1] = arr[1].replace( RE2_RE1AtEnd, \"\" );\r\n    }\r\n    return arr;\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "getRepeatProps",
      "string": "Ratio.getRepeatProps()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{Array[Number, Number]}\r"
      },
      {
        "type": "example",
        "string": "Ratio(1,2).toArray() // returns [1,2]"
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns the raw values of the numerator and denominator in the form [numerator, denominator].</p>",
      "summary": "<p>From the Ratio instance, returns the raw values of the numerator and denominator in the form [numerator, denominator].</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.toArray = function () {\r\n    return [this.numerator, this.denominator];\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "toArray",
      "string": "Ratio.prototype.toArray()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Boolean"
        ],
        "name": "showValue",
        "description": "- Is one of the factors that determine if the return value is the computed value of the Ratio or the toString() value.\r"
      },
      {
        "type": "returns",
        "string": "{Number|String}\r"
      },
      {
        "type": "example",
        "string": "<code><pre>\r"
      },
      {
        "type": "",
        "string": "// Example 1:\r"
      },
      {
        "type": "",
        "string": "Ratio(1,2).valueOf() == 0.5;\r"
      },
      {
        "type": "",
        "string": "\r"
      },
      {
        "type": "",
        "string": "// Example 2:\r"
      },
      {
        "type": "",
        "string": "Ratio(1,2).valueOf(true) == \"1/2\"\r"
      },
      {
        "type": "",
        "string": "</pre></code>"
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns the computed value of numerator / denominator.</p>",
      "summary": "<p>From the Ratio instance, returns the computed value of numerator / denominator.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.valueOf = function (showValue) {\r\n    return (!showValue && this.type == \"string\") ? this.toLocaleString() : (this.numerator / this.denominator);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "valueOf",
      "string": "Ratio.prototype.valueOf()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{String}\r"
      },
      {
        "type": "example",
        "string": "<code><pre>\r"
      },
      {
        "type": "",
        "string": "// Example 1:\r"
      },
      {
        "type": "",
        "string": "Ratio(1,10).toLocaleString() == \"1/10\"\r"
      },
      {
        "type": "",
        "string": "\r"
      },
      {
        "type": "",
        "string": "// Example 2:\r"
      },
      {
        "type": "",
        "string": "Ratio(0,0).toLocaleString() == \"NaN\"\r"
      },
      {
        "type": "",
        "string": "</code></pre>"
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns a string of the Ratio in fraction form if the numerator and denominator are Rational numbers.<br />Note: If the computed value of (numerator / denominator) is a whole number, then the whole number is returned.<br />Note: If the computed value of (numerator / denominator) is not a number, the result is returned.    </p>",
      "summary": "<p>From the Ratio instance, returns a string of the Ratio in fraction form if the numerator and denominator are Rational numbers.<br />Note: If the computed value of (numerator / denominator) is a whole number, then the whole number is returned.<br />Note: If the computed value of (numerator / denominator) is not a number, the result is returned.    </p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.toLocaleString = function () {\r\n    var str = \"\" + this.numerator, val = this.valueOf(true);\r\n    if ( +(this.numerator) && this.denominator != 1) {\r\n        str += this.divSign + Math.abs(this.denominator);\r\n    }\r\n    if ( +this.denominator === 0 || (this.numerator % this.denominator) === 0 ) {\r\n        str = val;\r\n    }\r\n    return (isNaN(val) || this.type == \"decimal\") ? val.toString() : str;\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "toLocaleString",
      "string": "Ratio.prototype.toLocaleString()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{String}\r"
      },
      {
        "type": "example",
        "string": "<code><pre>\r"
      },
      {
        "type": "",
        "string": "// Example 1:\r"
      },
      {
        "type": "",
        "string": "Ratio(8,2).toString() == \"8/2\";\r"
      },
      {
        "type": "",
        "string": "\r"
      },
      {
        "type": "",
        "string": "// Example 2:\r"
      },
      {
        "type": "",
        "string": "var a = Ratio(8,2);\r"
      },
      {
        "type": "",
        "string": "a.divSign = \":\";\r"
      },
      {
        "type": "",
        "string": "a.toString() == \"8:2\";\r"
      },
      {
        "type": "",
        "string": "</pre></code>"
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns the raw values of the numerator and denominator in the form \"a/b\".<br/><br />Note: The division symbol can be change by the use of <code>divSign</code> property.</p>",
      "summary": "<p>From the Ratio instance, returns the raw values of the numerator and denominator in the form \"a/b\".<br/><br />Note: The division symbol can be change by the use of <code>divSign</code> property.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.toString = function(){\r\n    return \"\" + this.numerator + this.divSign + this.denominator;\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "toString",
      "string": "Ratio.prototype.toString()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "top\r",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "bottom\r",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "String"
        ],
        "name": "type\r",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "Boolean"
        ],
        "name": "alwaysReduce\r",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "<code><pre>\r"
      },
      {
        "type": "",
        "string": "var a = Ratio(2,4);\r"
      },
      {
        "type": "",
        "string": "var b = a.clone();\r"
      },
      {
        "type": "",
        "string": "a.equals(b) === true;\r"
      },
      {
        "type": "",
        "string": "</pre></code>"
      }
    ],
    "description": {
      "full": "<p>Returns a new instance of the current Ratio. <br />The clone propery value can be changed if the appropriate argument value is supplied.</p>",
      "summary": "<p>Returns a new instance of the current Ratio. <br />The clone propery value can be changed if the appropriate argument value is supplied.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.getValueIfDefined = function( backup, value ){\r\n\treturn typeof value !== \"undefined\" && value !== null ? value : backup;\r\n};\r\nRatio.prototype.clone = function (top, bottom, type, alwaysReduce ) {\r\n\tvar func = Ratio.getValueIfDefined;\r\n\ttop = func( this.numerator, top);\r\n\tbottom = func( this.denominator, bottom );\r\n\talwaysReduce = func( this.alwaysReduce, alwaysReduce );\r\n\tvar obj = new Ratio( top, bottom, alwaysReduce );\r\n\tobj.type = func( this.type, type );\r\n\treturn obj;\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "getValueIfDefined",
      "string": "Ratio.getValueIfDefined()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(10,2).reduce().toString() == \"5/1\""
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns a new instacne with a reduced ratio by factoring out the greatest common multiple.</p>",
      "summary": "<p>From the Ratio instance, returns a new instacne with a reduced ratio by factoring out the greatest common multiple.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.reduce = function () {\r\n    var arr = Ratio.reduce( this.numerator, this.denominator );\r\n    return this.clone( arr[0], arr[1] );\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "reduce",
      "string": "Ratio.prototype.reduce()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "\r"
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "[optional]",
        "description": "obj2 \r"
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio( 1, 3 ).add( 1,2 ).toString() == \"5/6\""
      }
    ],
    "description": {
      "full": "<p>Adds the current Ratio by another Ratio.</p>",
      "summary": "<p>Adds the current Ratio by another Ratio.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.add = function (obj,obj2) {\r\n    if (!(obj instanceof Ratio) || typeof obj2 !== \"undefined\") {\r\n        obj = Ratio.parse(obj,obj2);\r\n    }\r\n    var x, top, bottom;\r\n    if (this.denominator == obj.denominator) {\r\n        top = this.numerator + obj.numerator;\r\n        bottom = this.denominator;\r\n    } else {\r\n        x = Ratio.gcd(this.denominator, obj.denominator),\r\n        top = ((this.numerator * obj.denominator) + ( this.denominator *obj.numerator)) / x,\r\n        bottom = (this.denominator * obj.denominator) / x;\r\n    }\r\n    return this.clone(top, bottom);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "add",
      "string": "Ratio.prototype.add()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "\r"
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "[optional]",
        "description": "obj2 \r"
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio( 1,2 ).divide( 3,4 ).toString() == \"2/3\""
      }
    ],
    "description": {
      "full": "<p>Divides the current Ratio by another Ratio. </p>",
      "summary": "<p>Divides the current Ratio by another Ratio. </p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.divide = function (obj, obj2) {\r\n    if (!(obj instanceof Ratio) || typeof obj2 !== \"undefined\") {\r\n        obj = Ratio.parse(obj,obj2);\r\n    }\r\n    return this.clone(this.numerator * obj.denominator, this.denominator * obj.numerator);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "divide",
      "string": "Ratio.prototype.divide()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Object"
        ],
        "name": "obj",
        "description": "\r"
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(1,2).equals( 1/2 ) === true"
      }
    ],
    "description": {
      "full": "<p>Compares if the current Ratio and another object have the same value.</p>",
      "summary": "<p>Compares if the current Ratio and another object have the same value.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.equals = function (obj) {\r\n    return (this.numerator / this.denominator) == obj.valueOf();\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "equals",
      "string": "Ratio.prototype.equals()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "\r"
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "[optional]",
        "description": "obj2 \r"
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(2,5).multiply( 1, 2 ).toString() == \"2/10\""
      }
    ],
    "description": {
      "full": "<p>Multiply the current Ratio by another Ratio. </p>",
      "summary": "<p>Multiply the current Ratio by another Ratio. </p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.multiply = function (obj, obj2) {\r\n    if (!(obj instanceof Ratio) || typeof obj2 !== \"undefined\") {\r\n        obj = Ratio.parse(obj, obj2);\r\n    }\r\n    return this.clone(this.numerator * obj.numerator, this.denominator * obj.denominator);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "multiply",
      "string": "Ratio.prototype.multiply()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "obj",
        "description": "\r"
      },
      {
        "type": "param",
        "types": [
          "Ratio",
          "Number",
          "String"
        ],
        "name": "[optional]",
        "description": "obj2 \r"
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(2,3).subtract(1,7).toString() === \"-1/3\""
      }
    ],
    "description": {
      "full": "<p>Subtracts the current Ratio by another Ratio.</p>",
      "summary": "<p>Subtracts the current Ratio by another Ratio.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.subtract = function (obj, obj2) {\r\n    if (!(obj instanceof Ratio) || typeof obj2 !== \"undefined\") {\r\n        obj = Ratio.parse(obj, obj2);\r\n    }\r\n    obj.numerator = -obj.numerator;\r\n    return this.add(obj);\r\n};\r\n// ###### Extras ######",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "subtract",
      "string": "Ratio.prototype.subtract()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "factor",
        "description": "\r"
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(10,4).descale( 2 ).toString() === \"5/2\""
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns an new Ratio divided by a factor. </p>",
      "summary": "<p>From the Ratio instance, returns an new Ratio divided by a factor. </p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.descale = function (factor) {\r\n    return this.clone(this.numerator / factor, this.denominator / factor);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "descale",
      "string": "Ratio.prototype.descale()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "power",
        "description": "\r"
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(2,4).pow(4).toString() === \"16/256\""
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns an new Ratio raised to a power. </p>",
      "summary": "<p>From the Ratio instance, returns an new Ratio raised to a power. </p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.pow = function (power) {\r\n    return this.clone(Math.pow(this.numerator, +power), Math.pow(this.denominator, +power));\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "pow",
      "string": "Ratio.prototype.pow()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "factor\r",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(1,10).scale(10).toString() === \"10/100\""
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns a new Ratio multiplied by a factor.</p>",
      "summary": "<p>From the Ratio instance, returns a new Ratio multiplied by a factor.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.scale = function (factor) {\r\n    return this.clone(this.numerator * +factor, this.denominator * +factor);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "scale",
      "string": "Ratio.prototype.scale()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(2,3).descale(2.1).toString() == \"\";\r"
      },
      {
        "type": "",
        "string": "<code><pre>\r"
      },
      {
        "type": "",
        "string": "var a = Ratio(20,30).descale(3);\r"
      },
      {
        "type": "",
        "string": "a.toString() == \"6.666666666666667/10\";\r"
      },
      {
        "type": "",
        "string": "a.cleanFormat().toString() == \"6666666666666667/10000000000000000\"\r"
      },
      {
        "type": "",
        "string": "</pre></code>"
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns a new Ratio by parsing the numerator and denominator.<br/><br />This is useful if want to ensure that the Ratio contains only whole numbers in the numerator and denominator after a caclulation.</p>",
      "summary": "<p>From the Ratio instance, returns a new Ratio by parsing the numerator and denominator.<br/><br />This is useful if want to ensure that the Ratio contains only whole numbers in the numerator and denominator after a caclulation.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.cleanFormat = function () {\r\n\tvar re = /^\\d+\\.\\d+$/;\r\n\tif( re.test( this.numerator ) || re.test( this.denominator ) ){\r\n\t\treturn Ratio.parse( this.numerator, this.denominator );\r\n\t}\r\n\tvar obj = this.clone();\r\n\tobj.numerator = Ratio.getCleanENotation( obj.numerator );\r\n\tobj.denominator = Ratio.getCleanENotation( obj.denominator );\r\n\treturn obj;\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "cleanFormat",
      "string": "Ratio.prototype.cleanFormat()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(-3,2).abs().toString() == \"3/2\""
      }
    ],
    "description": {
      "full": "<p>Returns a new instances that is the absolute value of the current Ratio.</p>",
      "summary": "<p>Returns a new instances that is the absolute value of the current Ratio.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.abs = function () {\r\n    return this.clone(Math.abs(this.numerator));\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "abs",
      "string": "Ratio.prototype.abs()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(3,10).mod().toString() == \"3\""
      }
    ],
    "description": {
      "full": "<p>From the Ratio instance, returns a new Ratio in the form of (numerator mod denominator)/1.<br/><br />Which is the same as Ratio( (numerator % denominator), 1 ).</p>",
      "summary": "<p>From the Ratio instance, returns a new Ratio in the form of (numerator mod denominator)/1.<br/><br />Which is the same as Ratio( (numerator % denominator), 1 ).</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.mod = function () {\r\n    return this.clone(this.numerator % this.denominator, 1);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "mod",
      "string": "Ratio.prototype.mod()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{Ratio}\r"
      },
      {
        "type": "example",
        "string": "Ratio(1,2).negate().toString() == \"-1/2\""
      }
    ],
    "description": {
      "full": "<p>Returns a new instance of the Ratio with the sign toggled.</p>",
      "summary": "<p>Returns a new instance of the Ratio with the sign toggled.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.negate = function () {\r\n    return this.clone( -this.numerator);\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "negate",
      "string": "Ratio.prototype.negate()"
    }
  },
  {
    "tags": [
      {
        "type": "returns",
        "string": "{Boolean}\r"
      },
      {
        "type": "example",
        "string": "Ratio(12,3).isProper() == false;"
      }
    ],
    "description": {
      "full": "<p>Determines if the current Ratio is a proper fraction.</p>",
      "summary": "<p>Determines if the current Ratio is a proper fraction.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.prototype.isProper = function () {\r\n    return Math.abs(this.numerator) < this.denominator;\r\n};",
    "ctx": {
      "type": "method",
      "constructor": "Ratio",
      "name": "isProper",
      "string": "Ratio.prototype.isProper()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "num",
        "description": "\r"
      },
      {
        "type": "returns",
        "string": "{Array[Number, Number, ... ]}\r"
      },
      {
        "type": "example",
        "string": "Ratio.getPrimeFactors(20) // returns [2,2,5]"
      }
    ],
    "description": {
      "full": "<p>Returns an array of the prime factors of a number. <br/> <br />More info <a href=\"http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/\"><a href='http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/'>http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/</a></a></p>",
      "summary": "<p>Returns an array of the prime factors of a number. <br/> <br />More info <a href=\"http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/\"><a href='http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/'>http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/</a></a></p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.getPrimeFactors = function (num) {\r\n    num = Math.floor(num);\r\n    var root, factors = [], x, sqrt = Math.sqrt, doLoop = 1 < num && isFinite(num);\r\n    while (doLoop) {\r\n        root = sqrt(num);\r\n        x = 2;\r\n        if (num % x) {\r\n            x = 3;\r\n            while ((num % x) && ((x += 2) < root));\r\n\r\n        }\r\n        x = (x > root) ? num : x;\r\n        factors.push(x);\r\n        doLoop = (x != num);\r\n        num /= x;\r\n    }\r\n    return factors;\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "getPrimeFactors",
      "string": "Ratio.getPrimeFactors()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "Number"
        ],
        "name": "num\r",
        "description": ""
      },
      {
        "type": "returns",
        "string": "{String}\r"
      },
      {
        "type": "example",
        "string": "<code><pre>\r"
      },
      {
        "type": "\t//",
        "string": "Example 1\r"
      },
      {
        "type": "\tRatio.getCleanENotation(",
        "string": "\"1.1000000000000003e-30\" ) === \"1.1e-30\";\r"
      },
      {
        "type": "\t//",
        "string": "Example 2\r"
      },
      {
        "type": "\tRatio.getCleanENotation(",
        "string": "\"9.999999999999999e+22\" ) === \"1e+23\";\r"
      },
      {
        "type": "\t</pre></code>",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Rounds up a scientific notated number with 8+ trailing 0s or 9s.<br />Note: Returns number as string to preserve value.</p>",
      "summary": "<p>Rounds up a scientific notated number with 8+ trailing 0s or 9s.<br />Note: Returns number as string to preserve value.</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Ratio.getCleanENotation = function(num){\r\n\tnum = (+num||0).toString();\r\n\tif( /\\.\\d+(0|9){8,}\\d?e/.test( num ) ){\r\n\t\tvar i = num.match( /(?:\\d+\\.)(\\d+)(?:e.*)/ )[1].replace(/(0|9)+\\d$/, '').length + 1;\r\n\t\tnum = (+num).toPrecision( i ).toString();\r\n\t}\r\n\treturn num;\r\n};",
    "ctx": {
      "type": "method",
      "receiver": "Ratio",
      "name": "getCleanENotation",
      "string": "Ratio.getCleanENotation()"
    }
  }
]