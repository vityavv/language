let parseMathExpression = require("./parseMathExpression");
let varsAndFuncs = require("./varsAndFuncs");
function interpret(tokenized) {
	varsAndFuncs.intInfo.lines = tokenized;
	for (let index = 0; index < tokenized.length; index++) {
		let line = tokenized[index];
		varsAndFuncs.intInfo.line = line;
		varsAndFuncs.intInfo.index = index;
		line.parameters = line.parameters.map(param => {
			if (param.type === "expression")
				return {value: parseMathExpression(param.value, varsAndFuncs.vars), type: "number"}
			else if (param.type === "variable") {
				if (varsAndFuncs.vars[param.value])
					return {...varsAndFuncs.vars[param.value]};
				else throw Error(`${param.value} is not defined`);
			} else return param;
		});
		if (varsAndFuncs.funcs[line.command]) varsAndFuncs.funcs[line.command](...line.parameters);
		else throw Error(`There's no function with the name ${line.command}`);
		index = varsAndFuncs.intInfo.index;
	}
}
module.exports = interpret;
