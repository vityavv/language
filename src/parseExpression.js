function parseMathExpression(expression, vars = {}) {
	let original = expression;
	expression = expression.trim();
	expression = expression.replace(/[A-Za-z_]+/g, variable => vars[variable]);//replace all variables with their values
	if (expression.match(/[^\d.\+\*\/\-\(\)%=!><]/g)) {
		throw new Error("Looks like you used a character that isn't allowed in a mathematical expression");
	}
	//remove spaces before and after the following: ()+-*%/=!><
	expression = expression.replace(/(?<=[\+\*\/\-\(\)%=!><])\s+/g, "");
	expression = expression.replace(/\s+(?=[\+\*\/\-\(\)%=!><])/g, "");
	//error handling!
	if (expression.match(/[\+\*\/\-\(\)%=!><]$|^[\+\*\/\-\(\)%=!><]/g)) {
		throw new Error("Looks like you ended your expression on a symbol, which is not allowed");
	}
	if (expression.match(/\s/g)) {
		throw new Error("Looks like you have a stray space in your expression. I did my best to clean them out so look closely");
	}

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
