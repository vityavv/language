let parseMathExpression = require("./parseMathExpression.js");
let nativeAndVars = {
	funcs: {
		variable: function(variablename, value, ...args) {
			if (arguments.length !== 2) throw Error(`Exected 2 arguments, got ${arguments.length} instead`);
			if (variablename.type !== "string") throw Error(`Expected variable name to be string, got ${variablename.type} instead`);
			nativeAndVars.vars[variablename.value] = {...value};
		},
		"var": this.variable,
		print: function(...args) {
			console.log(...args.map(el => el.value));
		},
	},
	vars: {}
};
module.exports = nativeAndVars;
