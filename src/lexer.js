function lex(input) {
	//get the lines into an array
	let lines = input.split("\n");
	//for each line
	lines.forEach(line => {
		line = line.replace(/#.*/, "").trim(); //remove comments and excess whitespace on ends
		if (line === "") return; //if the line is empty/is just a comment, move on to the next line
		let command = line.split(/\s+/)[0]; //get the command of the line
		console.log(line);
	});
}
module.exports = lex;
