let parseMathExpression = require("./parseMathExpression.js");
let parseEqExpression = require("./parseEqExpression.js");
let rl = require("readline-sync");
let nativeAndVars = {
	funcs: {
		if: function(...args) {
			check("fi", "if", args)
		},
		fi: function() {},
		while: function(...args) {
			check("elihw", "while", args);
		},
		elihw: function(...args) {
			let i;
			for (i = nativeAndVars.intInfo.index; i >= 0; i--) {
				if (nativeAndVars.intInfo.lines[i].command === "while") {
					break;
				}
			}
			if (i < 0) throw Error(`Congradulations! You broke something! Submit a bug fix: https://github.com/vityavv/lanugage`);
			nativeAndVars.intInfo.index = i-1;
		},
		variable: function(variablename, value) {
			if (arguments.length !== 2) throw Error(`Exected 2 arguments, got ${arguments.length} instead`);
			if (variablename.type !== "string") throw Error(`Expected variable name to be string, got ${variablename.type} instead`);
			nativeAndVars.vars[variablename.value] = {...value};
		},
		"var": this.variable,
		print: function(...args) {
			console.log(...args.map(el => el.value));
		},
		input: function(variablename, prompt = {value: `${variablename ? variablename.value : "error"}=`}) {
				if (arguments.length > 2) throw Error(`Expected one or two arguments, got ${arguments.length} instead`);
				input(variablename, prompt, false);
		},
		inputnum: function(variablename, prompt = {value: `${variablename ? variablename.value : "error"}=`}) {
			if (arguments.length > 2) throw Error(`Expected one or two arguments, got ${arguments.length} instead`);
			input(variablename, prompt, true);
		}
	},
	vars: {},
	intInfo: {}
};
function input(variablename, prompt = {value: `${variablename ? variablename.value : "error"}=`}, int) {
	if (!variablename) throw Error(`No variable name provided`);
	if (variablename.type !== "string") throw Error(`Expected variable name to be string, got ${variablename.type} instead`);
	nativeAndVars.vars[variablename.value] = {value: int ? rl.questionFloat(prompt.value) : rl.question(prompt.value), type: int ? "number" : "string"};
}
function check(toFind, toMatch, args) {
	if (!parseEqExpression(...args)) {
		let i;
		for (i = nativeAndVars.intInfo.index; i < nativeAndVars.intInfo.lines.length; i++) {
			if (nativeAndVars.intInfo.lines[i].command === toFind) {
				break;
			}
		}
		if (i >= nativeAndVars.intInfo.lines.length) throw Error(`Unmatched ${toMatch} statement on line ${intInfo.index + 1}`);
		nativeAndVars.intInfo.index = i;
	}
}
module.exports = nativeAndVars;
