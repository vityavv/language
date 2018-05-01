# Making a Turing Complete, Interpreted Programming Language

## What is Turing Complete?
Alan Turing, born in June 1912 in London, England, was highly influential in the development of theories in computer science. You may have heard of his "Turing Test," a theoretical test to see if artificial intelligences are *truly intelligent*. However, I'm focusing on Turing Completeness.

When something is Turing Complete, that means that it can simulate any theoretical Turing Machine. According to [this answer on StackOverflow](https://stackoverflow.com/questions/7284/what-is-turing-complete/1610655#1610655), a Turing machine can...
* Make decisions based off of what it sees in the memory
* Run forever
* Use an infinite amount of memory (This is why it's all theoretical---this is impossible to test in real life)
* Randomly access said memory (In some programming languages, you have a "stack," and in order to access things in memory you have to pull from that stack one variable at a time. This is why those languages are not turing complete)

## What is an Interpreted Programming Language?
There are three major types of programming languages.
* Compiled languages - These are programming languages that come with a program called a "compiler". If you want to run a program in one of these languages, you must use that program to "compile" your code into machine-readable instructions (there's a specific instruction set). C and C++ are examples of these types of languages.
* Interpreted languages (this is the type I'm going to make) - These programming languages also come with a specific program, however this program is called an "interpreter". The main difference between interpreted languages and compiled languages is that interpreted languages are converted into instructions while they run. Python and JavaScript (the language I'm using) are examples of interpreted languages.
* Transpiled languages - These are a small subset of compiled languages. The main difference here is that while compiled languages get compiled into instructions to the processor and other parts of a computer, transpiled languages are turned into code for a different programming language. These types of languages are less common but they are cropping up now that JavaScript is the most popular language in the world and some people don't like using it. Examples of these include TypeScript and CoffeeScript.

<sup>Note: there exist compilers for some interpreted languages, transpilers for compiled languages, and compilers for transpiled languages. However, I separated these by what they were officially supposed to do and what most people use them for.</sup>

## Making my language
First, I read around, finding [this Medium post](https://medium.freecodecamp.org/the-programming-language-pipeline-91d3f449c919) to be useful. While a lot of the stuff went over my head, I gleaned that it would make it easier for me if I changed the code of my language into something more readable for the computer before running it. So, I made a *lexer* first, to convert the raw code to a list of lines, each one containing a command and a list of *parameters* to give to that command. You can find this file [here](../src/lexer.js).

Then, I decided to make a function that resolved mathematical expressions like `5 + 5` and `10 ** 2` (`**` means `to the power of`). You can find that file [here](../src/parseMathExpressions.js).
