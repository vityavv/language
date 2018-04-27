let varsAndFuncs = require("./varsAndFuncs.js");
function run(lines) {
	for (let index = 0; index < lines.length; index++) {
		let line = lines[index];
		if (varsAndFuncs.funcs[line.command]) {
			varsAndFuncs.funcs[line.command](...line.parameters);
		} else {
			throw Error("That is not a recognized command");
		}
	}
}

module.exports = run;
