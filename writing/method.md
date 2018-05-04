# How it works

### Lexing
First, your program input goes into the [*lexer*](../src/lexer.js). This function will take your code, for example

```
print 5
if 5, >, 11
	print 7
fi
```

and it translates that code into something that looks like this:

```js
[
	{command: "print", parameters: [
		{value: 5, type: "number"}
	]},
	{command: "if", parameters: [
		{value: 5, type: "number"},
		{value: ">", type: "eqexpression"},
		{value: 11, type: "number"}
	]},
	{command: "print", parameters: [
		{value: 7, type: "number"}
	]},
	{command: "fi", parameters: []}
]
```

While this may seem like a much less readable format, it's really easy for the computer to read.

### Interpreting
This is where the bulk of the action happens. First, the computer goes over each line, one by one, using [this file](../src/interpreter.js). The variables get replaced with their values, the mathematical expressions get parsed, and then the file imports all of the native commands from [this file](../src/varsAndFuncs.js) and, if you provide a valid command, it runs it with the *parameters* you specified.
