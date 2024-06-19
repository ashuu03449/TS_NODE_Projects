#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellow("<<<=========================================================================>>>"));
console.log(chalk.yellow("<<<============= ", chalk.blueBright("Welcome to  code-with-ashu Calculator "), "=============>>>"));
console.log(chalk.yellow("<<<===========================================================================>>>"));
//create a variable to use loop condition is true
let loop = true;
while (loop) {
    // get user input
    let UserInput = await inquirer.prompt([
        //first Question enter first Number 
        {
            name: "firstNumber",
            type: "number",
            message: chalk.green("Enter a First Number"),
        },
        //second Question enter second Number 
        {
            name: "secondNumber",
            type: "number",
            message: chalk.green("Enter a Second Number"),
        },
        // third question slect any operator to perform action
        {
            name: "operator",
            type: "list",
            message: chalk.green("Select an operation to perform an action"),
            choices: ["Addition", "Substraction", "Multiplication", "Division", "Exponentiation", "Modulus", "Exit"],
        },
    ]);
    // if else-if condition
    if (UserInput.operator == "Addition") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} + ${UserInput.secondNumber} = ${UserInput.firstNumber + UserInput.secondNumber}`));
    }
    else if (UserInput.operator == "Substraction") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} - ${UserInput.secondNumber} = ${UserInput.firstNumber - UserInput.secondNumber}`));
    }
    else if (UserInput.operator == "Multiplication") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} * ${UserInput.secondNumber} = ${UserInput.firstNumber * UserInput.secondNumber}`));
    }
    else if (UserInput.operator == "Division") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} / ${UserInput.secondNumber} = ${UserInput.firstNumber / UserInput.secondNumber}`));
    }
    else if (UserInput.operator == "Exponentiation") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} ** ${UserInput.secondNumber} = ${UserInput.firstNumber ** UserInput.secondNumber}`));
    }
    else if (UserInput.operator == "Modulus") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} % ${UserInput.secondNumber} = ${UserInput.firstNumber % UserInput.secondNumber}`));
    }
    else if (UserInput.operator === "Exit") {
        process.exit();
    }
    else {
        console.log("invalid slect operator");
    }
}
