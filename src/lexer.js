function lex(input) {
	//get the lines into an array
	let lines = input.split("\n");
	let tokenizedLines = [];//new empty array of tokenized lines
	//for each line
	lines.forEach(line => {
		let index = line.match(/#(?=([^"']*["'][^"']*['"])*[^"']*$)/);//match a comment not in quotes
		if (index) {
			index = index.index;
			line = line.substring(index, 0) //remove comments
		}
		line = line.trim();//remove excess whitespace on ends
		if (line === "") return; //if the line is empty/is just a comment, move on to the next line
		//Error handling!
		if ((line.match(/'(?=([^"]*"[^"]*")*[^"]*$)/g) || [1,2]).length % 2 === 1) {
			throw Error("You have an unmatched single quote!");
		}
		if ((line.match(/"(?=([^\']*\'[^\']*\')*[^\']*$)/g) || []).length % 2 === 1) {
			throw Error("You have an unmatched double quote!");
		}
		//get command
		let command = line.split(" ")[0];
		//get parameters
		line = line.split(" ");
		line.shift();
		line = line.join(" ");
		parameters = line.match(/('|").*?\1|[^\s,][^,]*/g);//thanks to a boi in sunglasses#7006 from discord.gg/code for this regex
		if (parameters) {
			parameters = parameters.map(el => el.trim());
			//turn parameters into tokens of parameters (show the type)
			parameters = parameters.map(param => {
				let type = "expression";
				if (Number(param)) {
					type = "number";
					param = Number(param);
				} else if (param.match(/^(>|<|>=|=>|<=|=<|!=|=!|==|and|or)$/)) {
					type = "eqexpression";//this is to prevent it from bein parsed by the math parser
				} else if (param.match(/^[A-Za-z_]+$/)) {
					type = "variable";
				} else {
					['"', "'"].forEach(quote => {
						if (param.startsWith(quote)) {
							if (param.endsWith(quote)) {
								type = "string";
								param = param.substring(1, param.length - 1);
							} else {
								throw Error("One of your parameters has a string and then something else!");
							}
						}
					});
				}
				return {type, value: param};
			});
		} else {
			parameters = [];
		}
		tokenizedLines.push({command, parameters});
	});
	return tokenizedLines;
}
module.exports = lex;
