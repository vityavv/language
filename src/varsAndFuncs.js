let parseMathExpression = require("./parseMathExpression.js");
let parseEqExpression = require("./parseEqExpression.js");
let rl = require("readline-sync");
let varsAndFuncs = {
	funcs: {
		"if": function(...args) {
			if (!parseEqExpression(...args)) {
				check("^(fi|else)$", "if", "elif");
			} else {
				varsAndFuncs.blockStack.push("if");
			}
		},
		fi: function() {
			if (varsAndFuncs.blockStack[varsAndFuncs.blockStack.length - 1].match(/^(if|elif|else)$/)) varsAndFuncs.blockStack.pop();
			else throw Error("Unexpected fi statement");
		},
		elif: function() {
			if (varsAndFuncs.blockStack[varsAndFuncs.blockStack.length - 1].match(/^(if|elif)$/)) {
				check("^fi$", "elif");
				varsAndFuncs.blockStack.pop();
			} else throw Error("Unexpected elif statement");
		},
		"else": function() {
			if (varsAndFuncs.blockStack[varsAndFuncs.blockStack.length - 1].match(/^(if|elif)$/)) {
				check("^fi$", "else");
				varsAndFuncs.blockStack.pop();
			} else throw Error("Unexpected else statement");
		},
		"while": function(...args) {
			if (!parseEqExpression(...args)) {
				check("^elihw$", "while");
			}
			else varsAndFuncs.blockStack.push("while");
		},
		elihw: function() {
			//don't need to do as much error checking here so I'll just get over with it quick
			let storedBlockStack = varsAndFuncs.blockStack.length;
			let i;
			for (i = varsAndFuncs.intInfo.index - 1; i >= 0; i--) {//-1 so it doesn't catch the first elihw
				if (varsAndFuncs.intInfo.lines[i].command === "while" && storedBlockStack === varsAndFuncs.blockStack.length) {
					varsAndFuncs.blockStack.pop();
					break;
				}
				if (varsAndFuncs.intInfo.lines[i].command.match(/^(fi|elihw)$/)) storedBlockStack++;
				if (varsAndFuncs.intInfo.lines[i].command.match(/^(while|if)$/)) storedBlockStack--;
			}
			if (i < 0) throw Error(`Unexpected elihw statement`);
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
	intInfo: {},
	blockStack: []
};
function input(variablename, prompt = {value: `${variablename ? variablename.value : "error"}=`}, int) {
	if (!variablename) throw Error(`No variable name provided`);
	if (variablename.type !== "string") throw Error(`Expected variable name to be string, got ${variablename.type} instead`);
	varsAndFuncs.vars[variablename.value] = {value: int ? rl.questionFloat(prompt.value) : rl.question(prompt.value), type: int ? "number" : "string"};
}
function check(toFind, toMatch, toFindTwo = "") {//last argument only for if case
	let oldBlockStack = varsAndFuncs.blockStack.slice(0);
	oldBlockStack.push(varsAndFuncs.intInfo.lines[varsAndFuncs.intInfo.index].command);
	let storedBlockStack = oldBlockStack.slice(0);//shallow clone instead of pass by reference
	let i;
	for (i = varsAndFuncs.intInfo.index + 1; i < varsAndFuncs.intInfo.lines.length; i++) {
		if (varsAndFuncs.intInfo.lines[i].command.match(/^(while|if)$/)) {
			storedBlockStack.push(varsAndFuncs.intInfo.lines[i].command);
		}
		/*if (varsAndFuncs.intInfo.lines[i].command.match(/^(elif|else)$/)) {
			if (storedBlockStack[storedBlockStack.length - 1].match(/^(if|elif)$/)) {
				storedBlockStack.pop();
				storedBlockStack.push(varsAndFuncs.intInfo.lines[i].command);
			} else throw Error(`Unexpected ${varsAndFuncs.intInfo.lines[i].command} on line ${i+1}, triggered by ${toMatch}`);
		}*/
		if (varsAndFuncs.intInfo.lines[i].command.match(new RegExp(toFind))
			&& storedBlockStack.join("|") === oldBlockStack.join("|")) { //I know it's dirty shut up
			if (varsAndFuncs.intInfo.lines[i].command === "else") varsAndFuncs.blockStack.push("else");//sorry :sob:
			break;
		} else if (varsAndFuncs.intInfo.lines[i].command === toFindTwo) {//only for if case
			if (storedBlockStack.join("|") === oldBlockStack.join("|")//extra if is for this parseParams thing so it doesn't die
				&& parseEqExpression(...parseParams(...varsAndFuncs.intInfo.lines[i].parameters))) {
				varsAndFuncs.blockStack.push("if");//it's already a special case so why not
				break;
			}
		}
		if (varsAndFuncs.intInfo.lines[i].command === "fi") {
			if (storedBlockStack[storedBlockStack.length - 1].match(/^(else|elif|if)$/)) storedBlockStack.pop();
			else throw Error(`Unexpected fi on line ${i+1}, triggered by ${toMatch}`);
		}
		if (varsAndFuncs.intInfo.lines[i].command === "elihw") {
			if (storedBlockStack[storedBlockStack.length - 1] === "while") storedBlockStack.pop();
			else throw Error(`Unexpected elihw on line ${i+1}, triggered by ${toMatch}`);
		}
	}
	if (i >= varsAndFuncs.intInfo.lines.length) throw Error(`Unmatched ${toMatch} statement`);
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