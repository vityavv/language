let parseMathExpression = require("./parseMathExpression.js");
let nativeAndVars = {
	funcs: {
		variable: function(variablename, value, ...args) {
			if (args.length) throw Error(`Expected 2 argument for variable, got ${args.length + 2} or less`);
			nativeAndVars.vars[variablename] = value;
		},
		"var": this.variable,
		print: function(...args) {
			console.log(args.join("\n"));
		},
	},
	vars: {}
};
module.exports = nativeAndVars;
