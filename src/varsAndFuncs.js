let parseMathExpression = require("./parseMathExpression.js");
let nativeAndVars = {
	funcs: {
		variable: function(variablename, value, ...args) {
			if (args.length) throw Error(`Expected 2 argument for variable, got ${args.length + 2} or less`);
			if (variablename.type !== "string") throw Error(`Expected variablename to be a string, got a ${variablename.type} instead`);
			if (value.type === "expression") value = parseMathExpression("expression");
			nativeAndVars.vars[variablename.value] = value.value;
		},
		"var": this.variable,
		print: function(...args) {
			if (){}
		},
	},
	vars: {}
};
module.exports = nativeAndVars;
