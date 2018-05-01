function parseSingle(first, exp, last) {
	if (first.type !== last.type) throw Error(`Can't compare ${first.type} with ${last.type}`);
	if (exp.type !== "eqexpression") throw Error(`${exp.type}s are not valid operations!`);
	if (exp.value === "==") return first === last;
	if (first.type !== "number") throw Error(`Can't compare ${first.type}s other than for equality`);
	first = first.value;
	last = last.value;
	exp = exp.value;
	switch (exp) {
		case ">":
			return first > last;
			break;
		case "<":
			return first < last;
			break;
		case ">=":
		case "=>":
			return first >= last;
			break;
		case "<=":
		case "=<":
			return first <= last;
			break;
		case "!=":
		case "=!":
			return first !== last;
			break;
		default:
			throw Error(`${exp} is not a valid operation!`);//just in case
	}
}
function parseAndEtc(first, exp, last) {
	if (exp.type !== "eqexpression") throw Error(`${exp.type} is not a valid operation!`);
	exp = exp.value;
	if (first.length === 3) first = parseSingle(...first);
	if (exp === "and") return first && parseSingle(...last);
	if (exp === "or") return first || parseSingle(...last);
	throw Error(`${exp} is not a valid operation here`);
}
function parse(...args) {
	if ((args.length - 3) % 4 !== 0) throw Error("That is an unacceptable amount of arguments!");
	if (args.length === 3) return parseSingle(...args);
	let first = args.splice(0, 3);
	let exp = args.splice(0, 1)[0];
	let last = args.splice(0, 3);
	args.unshift(parseAndEtc(first, exp, last));
	while (args.length > 1) {
		let first = args.splice(0, 1);
		let exp = args.splice(0, 1)[0];
		let last = args.splice(0, 3);
		args.unshift(parseAndEtc(first[0], exp, last));
	}
	return args[0];
}
module.exports = parse;
