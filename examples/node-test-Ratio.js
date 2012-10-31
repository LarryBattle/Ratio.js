// This is a basic demo of using Ratio.js with node.js
var Ratio = require("./../src/Ratio.js");

console.log( "Ratio.VERSION = %s", Ratio.VERSION );
console.log( "Ratio.parse(3,4).add(1,8).toString() = %s", Ratio.parse(3,4).add(1,8).toString() );