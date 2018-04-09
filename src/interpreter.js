//let vars = require("./vars.js");
let vars = {};
[vars.one, vars.two, vars.three, vars.four, vars.five] = [1,2,3,4,5];
function interpretAndRun(lines) {
}
function parseMathExpression(expression) {
	expression = expression.replace(/(?<=[\+\*\/\-\(\)])\s+/g, "");//remove all spaces before a (, ), +, -, *, or /
	expression = expression.replace(/\s+(?=[\+\*\/\-\(\)])/g, "");//remove all spaces after a (, ), +, -, *, or /
	expression = expression.replace(/[A-Za-z_]+/, variable => vars[variable]);//replace all variables with their values
	while (expression.match(/\*|\//g)) {//work through each multiplication and division and resolve them
		expression.replace(/\d+[\*\/]\d+/, exp => {
			if (expression.match(/\//)) {
				let numbers = exp.split("/").map(Number);
				return numbers[0] / numbers[1];
			} else {
				let numbers = exp.split("*").map(Number);
				return numbers[0] * numbers[1];
			}
		});
		console.log(expression);
	}
	console.log(expression);
}
module.exports = parseMathExpression;
