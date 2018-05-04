i=require("./interpreter")
l=require("./lexer")
/*
i(l(`
print "Welcome to my program! This program will output all multiples of a between 0 and b"
inputnum "a", "First, enter a: "
inputnum "b", "Then, enter b: "
print "Okay, printing your numbers now!"
variable "i", 0
while i, <=, b
	print i
	variable "i", i + a
elihw
`))
*/
i(l(`
print "Hello! Welcome to the CLI tool that does things!"
variable "quit", 0
while quit, ==, 0
	input "command", "> "
	if command, ==, "hello"
		print "hello"
	fi
	if command, ==, "orange"
		print "orange"
	fi
	if command, ==, "quit"
		print "quitting now..."
		variable "quit", 1
	fi
	if command, !=, "orange", and, command, !=, "hello", and, command, !=, "quit"
		print "I don't know that word!"
	fi
elihw
`))
