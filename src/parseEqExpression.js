function parse(first, exp, last) {
	if (first.type !== last.type) throw Error(`Can't compare ${first.type} with ${last.type}`);
	if (exp === "==") return first === last;
	if (first.type !== number) throw Error(`Can't compare ${first.type}s other than for equality`);
	first = first.value;
	last = last.value;
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
			throw Error(`${exp} is not a valid operation!`);
	}
}
