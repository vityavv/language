function lex(input) {
	//get the lines into an array
	let lines = input.split("\n");
	let tokenizedLines = [];//new empty array of tokenized lines
	//for each line
	lines.forEach(line => {
		line = line.replace(/#.*/, "").trim(); //remove comments and excess whitespace on ends
		if (line === "") return; //if the line is empty/is just a comment, move on to the next line
		let tokenized = {};
		//get command
		tokenized.command = line.split(" ")[0];
		//get parameters
		line = line.split(" ");
		line.shift();
		line = line.join(" ");
		//thanks la_grib#1010 on discord (discord.gg/code) for this regex
		parameters = line.match(/(?<=, ?|^)('[^']*'|"[^"]*"|[^\s,][^,]*)(?=,|$)/g);
		parameters = parameters.map(el => el.trim());
		//turn parameters into tokens of parameters (show the type)
		parameters = parameters.map(param => {
			let type = "";
			if (Number(param)) {
				type = "number";
				param = Number(param);
			} else if (param.startsWith("'") || param.startsWith('"')) {
				type = "string";
			} else {
				type = "variable";
			}
			return {type, value: param};
		});
		console.log(tokenized);
	});
}
module.exports = lex;
