//  --- Work in progress. ---
// This is a reference to what values will be outputted for the functions to retrieve the ratio values.
// toString() -> calls toLocaleString(), toString(true) -> calls toRaw()
// change: toString() will show modified values.
// add: toRaw();
// add: toStringArray();
// add: toRawArray();
{
	"valid" : {
		"fraction" : [{
				"description" : "a/b, where a != 0 and a % b != 0",
				"toString()" : "a/b",
				"toRaw()" : "a/b"
			}
		],
		"whole number" : [{
				"description" : "a/b = 0, where b >> a",
				"toString()" : "0",
				"toRaw()" : "a/b"
			}, {
				"description" : "0/b = 0",
				"toString()" : "0",
				"toRaw()" : "0/b"
			}, {
				"description" : "b/b = 1",
				"toString()" : "1",
				"toRaw()" : "b/b"
			}, {
				"description" : "nb/b = n",
				"toString()" : "n",
				"toRaw()" : "nb/b"
			}
		],
		"mixed number" : [{
				"description" : "(n + a)/b, where 1 < |n| and a != 0",
				"toString()" : "nb + (a/b)",
				"toRaw()" : "(n + a)/b"
			}
		]
	},
	"invalid" : {
		"decimals in fraction" : [{
				"description" : "a/b, where a % 1 != 0 or b % 1 != 0",
				"toString()" : "a/b", // call reduce() to correct the values
				"toRaw()" : "a/b"
			}
		],
		"Infinity" : [{
				"description" : "a/b, where |a| >> b",
				"toString()" : "+-Infinity",
				"toRaw()" : "a/b"
			}
		],
		"NaN" : [{
				"description" : "Infinity / Infinity",
				"toString()" : "NaN",
				"toRaw()" : "a/b"
			}, {
				"description" : "a/b, where a or b is NaN",
				"toString()" : "NaN",
				"toRaw()" : "a/b"
			}
		]
	}
}
