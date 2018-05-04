# How it works - a more in-depth look

### Lexing - [lexer.js](../src/lexer.js)
Here are the steps the computer takes to turn your program into a computer-readable format
1. Split your program on `\n`, which is a *newline*.
2. For each line, it...
	1. First, it finds a `#`, which signifies a comment. It uses a *regular expression* to do this. Regular expressions are things that we can use to parse text, and I use them *a lot*. You can see the one I used here on line 7.
	2. If it finds a comment, it trims it out. The computer ignores comments. Then, it removes any extra spaces or tab characters off of the beginning and end of the line.
	3. We then do error handling. This is to make sure that in the future, we don't get any bugs, by filtering out any single and double quotes that aren't surrounded by the opposite quote type. We use a similar regular expression as the one used in step 1 on lines 15 and 18.
	4. We get the command of the line by just reading all of the characters up to the first space.
	5. We get the parameters by...
		1. First, we use a regex to find each parameter. This regex splits the string on commas, so long as those commas aren't inside a pair of quotes. I didn't think of this expression myself---someone who calls themselves `a boi in sunglasses` with the identifier `7006` did on a [community that I frequent for help](https://discord.gg/code).
		2. We remove excess whitespace off of the ends of each parameter.
		3. For each parameter, we...
			1. Assume the type is an `expression`. If it doesn't match any of the other criteria, then it probably is one
			2. If it's a number, change the type to a number
			3. If it is one out of a list you can find on line 36, it's given the type `eqexpression`. This type is to make sure that it doesn't get caught in the math parser
			4. If it's a string of characters with no spaces, change the type to a `variable`
			5. Otherwise, we check if it's a string. If it is, we give it the type `string`.
			6. Finally, we spit this out
		6. Finally, we add the newly-formatted line into our list of tokenized lines.
	3. And then we spit out these lines.

### Interpreting - [interpreter.js](../src/interpreter.js)
These are the steps that the computer takes to run the program
1. Import the math expression parser and the native variables
2. For each line, it...
	1. Copies the line, so as to not modify the original
	2. For each parameter...
		1. If it's an expression, it parses that
		2. If it's a variable, it replaces it with the value of that variable (or an error if it's not defined)
		3. Otherwise, it just keeps the original
	3. If the command that the line calls exists, then it calls it with the parameters. Otherwise, it errors.

### Parsing Mathematical Expressions - [parseMathExpression.js](../src/parseMathExpression.js)
These are the steps that the computer takes to parse math expressions
1. Remove un-necessary whitespace on the ends (this was left over from testing days but I keep it in just in case)
2. Remove spaces before and after the special characters that we keep. This set is `()+=*%`.
3. Replace each variable name with it's value (if the variable isn't a number, it errors, and if the variable doesn't exist, it errors as well)
4. It does some error handling (makes sure that you only use the allowed symbols, make sure you don't end your expression or begin it with a mathematical operation
5. It goes through each set of parentheses that is **not** inside another set, and calls that same function with it's contents. This is the P in PEMDAS. The way we do this step, and all of the other steps in PEMDAS, is that we run a loop while there's still valid operations left to do, and resolve the first one we see, so that it goes left to right.
6. It goes through each exponentiation and resolves it using the method above.
7. It goes through each multiplication, division, and modulo operator and resolves it. Modulo is just the remainder you get after a devision (e.g. `5 % 2` is `1`)
8. It goes through each addition and subtraction and resolves it.
9. It returns the result.

### Native Functions - [varsAndFuncs.js](../src/varsAndFuncs.js)
The native functions are all in a file together, seperated by a special structure:
```js
{
	funcs: {
		//here is where I put the functions
	},
	vars: {
		//this is where the computer puts the variables while your program is being run
	},
	intInfo: {
		//this is where the interpreter puts it's information so that functions can manipulate it
	}
}
```
The list of functions goes as follows:
1. Print - This function simply takes the value of each argument and prints it using javascript's `console.log` method.
2. Variable - This function takes the variable name and value and adds a variable into the list.
3. Input and Inputnum - These functions take input using the `readline-sync` module, and put them into the provided variable. Input uses the `question` method and Inputnum uses the `questionFloat` method, the difference being that the num method gets a number and the other one gets a string
4. If - parses the expression given, and if it's true it continues execution, but if it's false, it changes the intInfo to skip ahead to the next `fi`, the closing command.
5. Fi - Doesn't do anything.
6. While - parses the expression given, and if it's true it continues execution, but if it's false, it changes the intInfo to skip ahead past the next `elihw`, the closing command.
7. Elihw - unlike fi, this does something. It finds the previous while, and jumps to it. If the previous while is false, then it'll just jump past the elihw, preventing an infinite loop.
A note about 3, and 4 and 6---of course I don't rewrite the extremely similar code. I put this code in a function and then run that instead. These functions are not exposed to the world, though
