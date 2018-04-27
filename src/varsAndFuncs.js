let parseMathExpression = require("./parseMathExpression.js");
let nativeAndVars = {
	funcs: {
		variable: function(variablename, value) {
			if (arguments.length !== 2) throw Error(`Expected 2 argument for variable, got ${arguments.length} or less`);
			if (variablename.type !== "string") throw Error(`Expected variablename to be a string, got a ${variablename.type} instead`);
			if (value.type === "expression") {
				value.value = parseMathExpression(value.value, nativeAndVars.vars);
				value.type = "number";
			}
			nativeAndVars.vars[variablename.value] = {value: value.value, type: value.type};
		},
		"var": this.variable,
		print: function(...args) {
			args = args.map(el => el.type === "expression" ? parseMathExpression(el.value, nativeAndVars.vars) : el.value);
			console.log(...args);
		},
	},
	vars: {}
};
module.exports = nativeAndVars;
