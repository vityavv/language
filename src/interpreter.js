let parseMathExpression = require("./parseMathExpression");
let varsAndFuncs = require("./varsAndFuncs");
function interpret(tokenized) {
	for (let index = 0; index < tokenized.length; index++) {
		let line = tokenized[index];
		line.parameters = line.parameters.map(param => param.type === "expression" ? {value: parseMathExpression(param.value, varsAndFuncs.vars), type: "number"} : param);
		if (varsAndFuncs.funcs[line.command]) varsAndFuncs.funcs[line.command](...line.parameters);
		else throw Error(`There's no function with the name ${line.command}`);
	}
}
module.exports = interpret;
