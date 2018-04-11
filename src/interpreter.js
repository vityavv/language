function parseMathExpression(expression, vars) {
	expression = expression.replace(/(?<=[\+\*\/\-\(\)%])\s+/g, "");//remove all spaces before a (, ), +, -, *, %, or /
	expression = expression.replace(/\s+(?=[\+\*\/\-\(\)%])/g, "");//remove all spaces after a (, ), +, -, *, %, or /
	expression = expression.replace(/[A-Za-z_]+/, variable => vars[variable]);//replace all variables with their values
	while (expression.match(/(?<!\()\(.*?\)(?!\))/g)) {//work through each *single nested parentheses* and resolve it
		expression = expression.replace(/(?<!\()\((.*?)\)(?!\))/g, (thing, exp) => {
			return parseMathExpression(exp, vars);
		});
	}
	while (expression.match(/\*\*/g)) {//work through each exponentiation and resolve it
		expression = expression.replace(/[\d.]+\*\*[\d.]+/, exp => {
			let numbers = exp.split("**").map(Number);
			return numbers[0] ** numbers[1];//ES7 ftw
		});
	}
	while (expression.match(/[\*\/%]/g)) {//work through each multiplication and division and mod and resolve them
		expression = expression.replace(/[\d.]+[\*\/%][\d.]+/, exp => {
			if (exp.match(/\//)) {
				let numbers = exp.split("/").map(Number);
				return numbers[0] / numbers[1];
			} else if (exp.match(/\*/)) {
				let numbers = exp.split("*").map(Number);
				return numbers[0] * numbers[1];
			} else {
				let numbers = exp.split("%").map(Number);
				return numbers[0] % numbers[1];
			}
		});
	}
	while (expression.match(/\+|-/g)) {//work through each addition and subtraction and resolve it
		expression = expression.replace(/[\d.]+[\+\-][\d.]+/, exp => {
			if (exp.match(/-/)) {
				let numbers = exp.split("-").map(Number);
				return numbers[0] - numbers[1];
			} else {
				let numbers = exp.split("+").map(Number);
				return numbers[0] + numbers[1];
			}
		});
	}
	return Number(expression);
}
module.exports = parseMathExpression;
