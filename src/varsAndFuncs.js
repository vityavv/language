let parseMathExpression = require("./parseMathExpression.js");
let parseEqExpression = require("./parseEqExpression.js");
let nativeAndVars = {
	funcs: {
		if: function(...args) {
			if (!parseEqExpression(...args)) {
				for (let i = nativeAndVars.intInfo.index; i < nativeAndVars.intInfo.lines.length; i++) {
					if (nativeAndVars.intInfo.lines[i].command === "fi") {
						break;
					}
				}
				if (i >= nativeAndVars.intInfo.lines.length) throw Error(`Unmatched if statement on line ${intInfo.index + 1}`);
				nativeAndVars.intInfo.index = i;
			}
		},
		fi: function() {},
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
	vars: {},
	intInfo: {}
};
module.exports = nativeAndVars;
