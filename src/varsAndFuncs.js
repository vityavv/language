let parseMathExpression = require("./parseMathExpression.js");
let parseEqExpression = require("./parseEqExpression.js");
let rl = require("readline-sync");
let varsAndFuncs = {
	funcs: {
		"if": function(...args) {
			if (!parseEqExpression(...args)) {
				let i;
				for (i = varsAndFuncs.intInfo.index; i < varsAndFuncs.intInfo.lines.length; i++) {
					if (varsAndFuncs.intInfo.lines[i].command.match(/^(fi|else)$/)) break;
					else if (varsAndFuncs.intInfo.lines[i].command === "elif") {
						if (parseEqExpression(...parseParams(...varsAndFuncs.intInfo.lines[i].parameters))) break;
					}
				}
				if (i >= varsAndFuncs.intInfo.lines.length) throw Error(`Unmatched if statement on line ${varsAndFuncs.intInfo.index + 1}`);
				varsAndFuncs.intInfo.index = i;
			}
		},
		fi: function() {},
		elif: function() {
			check("fi", "elif");
		},
		"else": function(...args) {
			check("fi", "else");
		},
		while: function(...args) {
			if (!parseEqExpression(...args)) {
				check("elihw", "while");
			}
		},
		elihw: function(...args) {
			let i;
			for (i = varsAndFuncs.intInfo.index; i >= 0; i--) {
				if (varsAndFuncs.intInfo.lines[i].command === "while") {
					break;
				}
			}
			if (i < 0) throw Error(`Congradulations! You broke something! Submit a bug fix: https://github.com/vityavv/lanugage`);
			varsAndFuncs.intInfo.index = i-1;
		},
		variable: function(variablename, value) {
			if (arguments.length !== 2) throw Error(`Exected 2 arguments, got ${arguments.length} instead`);
			if (variablename.type !== "string") throw Error(`Expected variable name to be string, got ${variablename.type} instead`);
			varsAndFuncs.vars[variablename.value] = {...value};
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
	varsAndFuncs.vars[variablename.value] = {value: int ? rl.questionFloat(prompt.value) : rl.question(prompt.value), type: int ? "number" : "string"};
}
function check(toFind, toMatch) {
	let i;
	for (i = varsAndFuncs.intInfo.index; i < varsAndFuncs.intInfo.lines.length; i++) {
		if (varsAndFuncs.intInfo.lines[i].command === toFind) {
			break;
		}
	}
	if (i >= varsAndFuncs.intInfo.lines.length) throw Error(`Unmatched ${toMatch} statement on line ${varsAndFuncs.intInfo.index + 1}`);
	varsAndFuncs.intInfo.index = i;
}
function parseParams(...parameters) {
	return parameters.map(param => {
		if (param.type === "expression")
			return {value: parseMathExpression(param.value, varsAndFuncs.vars), type: "number"}
		else if (param.type === "variable") {
			if (varsAndFuncs.vars[param.value]) return {...varsAndFuncs.vars[param.value]};
			else throw Error(`${param.value} is not defined`);
		}
		else return param;
	});
}
module.exports = varsAndFuncs;
