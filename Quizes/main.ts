#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(
  chalk.yellow(
    "<<<=========================================================================>>>"
  )
);

console.log(
  chalk.yellow(
    "<<<============= ",
    chalk.blueBright("Welcome to  code-with-ashu Quize_Project "),
    "=============>>>"
  )
);
console.log(
  chalk.yellow(
    "<<<===========================================================================>>>"
  )
);

async function main() {
  try {
    // Define the quiz object with name and questions
    let quiz: {
      name: string;
      questions: {
        question: string;
        choices: string[];
        answer: string;
      }[];
    } = {
      name: "",
      questions: [
        {
          question: chalk.green.italic("What is TypeScript?"),
          choices: [
            "A superset of JavaScript",
            "A front-end framework",
            "A JavaScript library",
          ],
          answer: "A superset of JavaScript",
        },
        {
          question: chalk.green.italic(
            "At what stage are TypeScript types checked?"
          ),
          choices: ["Compile-time", "Runtime", "Both"],
          answer: "Compile-time",
        },
        {
          question: chalk.green.italic(
            "Which symbol is commonly used to denote a type assertion in TypeScript?"
          ),
          choices: ["<>", "()", "{}"],
          answer: "<>",
        },
        {
          question: chalk.green.italic(
            "What is the purpose of `let` and `const` in TypeScript?"
          ),
          choices: [
            "Function definitions",
            "Variable declarations",
            "Object literals",
          ],
          answer: "Variable declarations",
        },
        {
          question: chalk.green.italic(
            "What does an interface represent in TypeScript?"
          ),
          choices: [
            "A class",
            "A blueprint for defining object structure",
            "A namespace",
          ],
          answer: "A blueprint for defining object structure",
        },
        {
          question: chalk.green.italic(
            "In which language is the TypeScript compiler written?"
          ),
          choices: ["JavaScript", "C++", "TypeScript"],
          answer: "TypeScript",
        },
        {
          question: chalk.green.italic(
            "What is the file extension used for TypeScript files?"
          ),
          choices: [".ts", ".js", ".txt"],
          answer: ".ts",
        },
        {
          question: chalk.green.italic(
            "Which command is used to convert TypeScript code to JavaScript?"
          ),
          choices: ["tsc", "gcc", "node"],
          answer: "tsc",
        },
        {
          question: chalk.green.italic(
            "What is the syntax for arrow functions in TypeScript?"
          ),
          choices: ["() => {}", "function() {}", "=> {}"],
          answer: "() => {}",
        },
        {
          question: chalk.green.italic(
            "How do you define a class in TypeScript?"
          ),
          choices: [
            "class MyClass {}",
            "function MyClass {}",
            "const MyClass = {}",
          ],
          answer: "class MyClass {}",
        },
        {
          question: chalk.green.italic(
            "What are generics used for in TypeScript?"
          ),
          choices: [
            "Reusable components",
            "Type annotations",
            "Static methods",
          ],
          answer: "Reusable components",
        },
        {
          question: chalk.green.italic(
            "Which type checks are used for `null` and `undefined` in TypeScript?"
          ),
          choices: ["null", "undefined", "both"],
          answer: "both",
        },
        {
          question: chalk.green.italic(
            "What is the purpose of union types in TypeScript?"
          ),
          choices: [
            "Multiple types for a variable",
            "Single type for a variable",
            "No type for a variable",
          ],
          answer: "Multiple types for a variable",
        },
        {
          question: chalk.green.italic(
            "How do you import modules in TypeScript?"
          ),
          choices: [
            'import module_name from "module_path";',
            'require("module_name");',
            "include <module_name>",
          ],
          answer: 'import module_name from "module_path";',
        },
        {
          question: chalk.green.italic(
            "What is the use of `namespace` in TypeScript?"
          ),
          choices: [
            "Function definition",
            "Object grouping",
            "Variable declaration",
          ],
          answer: "Object grouping",
        },
        {
          question: chalk.green.italic(
            "What is the use of the `type` keyword in TypeScript?"
          ),
          choices: [
            "Creating aliases for data types",
            "Defining classes",
            "Looping constructs",
          ],
          answer: "Creating aliases for data types",
        },
        {
          question: chalk.green.italic(
            "What is the use of `async` and `await` in TypeScript?"
          ),
          choices: [
            "Error handling",
            "Asynchronous programming",
            "Code optimization",
          ],
          answer: "Asynchronous programming",
        },
        {
          question: chalk.green.italic(
            "What is the difference between `interface` and `type` in TypeScript?"
          ),
          choices: [
            "No difference",
            "Interface is for objects, Type is for primitives",
            "Type is for objects, Interface is for primitives",
          ],
          answer: "Interface is for objects, Type is for primitives",
        },
        {
          question: chalk.green.italic(
            "What is the use of the `abstract` keyword in TypeScript?"
          ),
          choices: [
            "Object instantiation",
            "Class inheritance",
            "Code obfuscation",
          ],
          answer: "Class inheritance",
        },
        {
          question: chalk.green.italic(
            "What is the use of the `readonly` keyword in TypeScript?"
          ),
          choices: [
            "Making variables immutable",
            "Class encapsulation",
            "Error handling",
          ],
          answer: "Making variables immutable",
        },
      ],
    };

    // Prompt user for their name
    let userName = await inquirer.prompt({
      name: "name",
      type: "input",
      message: chalk.green.italic("Enter your name"),
    });
    quiz.name = userName.name;

    let score = 0;

    // Iterate through each question and prompt the user
    for (let i = 0; i < quiz.questions.length; i++) {
      let questionObj = quiz.questions[i];

      // Prompt user with each question
      let userAnswer = await inquirer.prompt({
        name: `question_${i + 1}`,
        type: "list",
        message: questionObj.question,
        choices: questionObj.choices,
      });

      // Check if the user's answer is correct
      if (userAnswer[`question_${i + 1}`] === questionObj.answer) {
        console.log(chalk.blue.italic("Correct"));
        score++;
      } else {
        console.log(chalk.blue.italic("Incorrect"));
      }
    }

    // Display final score and message to the user
    console.log(
      chalk.greenBright.italic(
        `Dear ${chalk.blueBright.bold(
          quiz.name
        )}, your total quiz score is ${chalk.blueBright.bold(
          score
        )} out of ${chalk.blueBright.bold(quiz.questions.length)}.`
      )
    );
  } catch (error) {
    // Handle any errors that occur during execution
    console.error("An error occurred:", error);
  }
}

// Call the main function to start the quiz
main();
