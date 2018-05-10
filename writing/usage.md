# How to use this language
* [Setup](#setup)
	* [Prerequisites](#prerequisites)
* [Usage](#usage)
	* [print](#print)
	* [variable](#variable)
	* [input](#input)
	* [inputnum](#inputnum)
	* [if](#if)
	* [fi](#fi)
	* [while](#while)
	* [elihw](#elihw)
## Setup

### Prerequisites
You must have [Node.JS](https://nodejs.org/en/) and [git](https://git-scm.com/) installed. Git is optional---you can just download the repo as a zip and then unzip it.

In a linux or macOS shell, type the following commands. ***I have not tested this on windows yet, so there is no guaranteed support**

1. Clone the repository. Skip this step if you just downloaded the zip. Navigate to the folder that you extracted the zip to using the command line instead.
```
git clone https://github.com/vityavv/language.git
cd language
```
2. Install the required module, readline-sync
```
npm install
```
3. Write your program (more below)
4. TODO: FINISH

## Usage

Commands start with `#`. The computer ignores them so write what you like after a `#`.

Each line in language is a command. Commands look like this:
```
<command> <param 1>, <param 2>, <param 3>...
```
Each parameter can be...
1. A string: `"Hello, World!"`
2. A number: `42`
3. A variable (more below): `variablename`
4. A mathematical expression. This follows PEMMDAS: `(<expression>)`, `**`, `*`, `%` (modulo), `/`, `-`, `+`.

Here are the list of commands:

### print
This command prints all of the parameters, seperated by newlines.
```
print 5, "orange", three
```

### variable
This command sets a variable. The first argument must be a string showing the name of the variable, and the second must be its value.
```
variable "orange", 7
print orange # this prints 7.
```

### input
This command takes input from the user and puts it in a variable. The first argument must be a string showing the name of the variable. The second parameter is optional and must be a string showing the prompt.
```
input "blue", "What is the bluest number? "
```
What they see:
```
What is the bluest number?
```
Here they can type what they want and then press enter to put it in the variable.

### inputnum
Same as input, but only allows numbers, and then detonates your variable as a number so it can be used in mathematic expressions.
```
inputnum "start"
print "Your starting number plus five:", start + 5
```

### if
This command takes an unlimited number of arguments and evaluates them. If they evaluate to true then the code continues. However, if they evaluate to false, it skips to the next `fi` command. Not providing a `fi` command results in an error.
```
if 5, ==, 5
	print "Everything is okay!"
	inputnum "num", "Input a number greater than five"
	if num, <=, 5
		print "You put a number that was less than five!"
	fi
	if num, >, 5
		print "That's great! Next question"
	fi
	inputnum "numtwo", "Input a number less than five"
	if num, >, 5, and, numtwo, <, 5
		print "You're an honest person!"
	fi
fi
```
Here's an example that shows different ways you can use if statements. You can use `>=`, `<=`, `>`, `<`, `==`, `!=`, to evaluate numbers, and then `and` or `or` to combine different evaluations. You can also use `==` on strings.

### fi
See if. This does nothing.

### while
See if to see how expressions are parsed. The difference between this and if lies in the partner function, `elihw`. It skips past `elihw` if the expression given evaluates to false, but if it doesn't it just keeps going.

### elihw
This skips back to the previous while, and lets that while evaluate its condition again.
