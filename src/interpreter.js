let parseMathExpression = require("./parseMathExpression");
let varsAndFuncs = require("./varsAndFuncs");
function interpret(tokenized) {
	varsAndFuncs.intInfo.lines = tokenized;
	for (let index = 0; index < tokenized.length; index++) {
		let line = Object.assign({}, tokenized[index]);
		varsAndFuncs.intInfo.line = line;
		varsAndFuncs.intInfo.index = index;
		line.parameters = line.parameters.map(param => {
			if (param.type === "expression") {
				try {
					return {
						value: parseMathExpression(param.value, varsAndFuncs.vars),
						type: "number"
					};
				} catch (error) {
					throw Error(error + ` (line ${index + 1})`);
				}
			} else if (param.type === "variable") {
				if (varsAndFuncs.vars[param.value]) return {...varsAndFuncs.vars[param.value]};
				else throw Error(`${param.value} is not defined (line ${index + 1})`);
			}
			else return param;
		});
		if (varsAndFuncs.funcs[line.command]) {
			try {
				varsAndFuncs.funcs[line.command](...line.parameters);
			} catch (error) {
				throw Error(error + ` (line ${index + 1})`);
			}
		}
		else throw Error(`There's no function with the name ${line.command} (line ${index + 1})`);
		index = varsAndFuncs.intInfo.index;
	}
}
module.exports = interpret;
