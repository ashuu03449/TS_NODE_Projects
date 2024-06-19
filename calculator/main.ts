#!/usr/bin/env node

// Import necessary modules
import inquirer from "inquirer";
import chalk from "chalk";

// Print separator line with yellow color
console.log(chalk.yellow("<<<=========================================================================>>>"));
// Print welcome message with blueBright color
console.log(chalk.yellow("<<<============= ", chalk.blueBright("Welcome to code-with-ashu Calculator "), "=============>>>"));
// Print closing separator line with yellow color
console.log(chalk.yellow("<<<===========================================================================>>>"));

// Main loop to continuously prompt user for calculations
let loop = true;
while (loop) {
    // Get user input using inquirer
    let UserInput = await inquirer.prompt([
        // Prompt for the first number
        {
            name: "firstNumber",
            type: "number",
            message: chalk.green("Enter the First Number:"),
        },
        // Prompt for the second number
        {
            name: "secondNumber",
            type: "number",
            message: chalk.green("Enter the Second Number:"),
        },
        // Prompt to select an operation
        {
            name: "operator",
            type: "list",
            message: chalk.green("Select an operation to perform:"),
            choices: ["Addition", "Subtraction", "Multiplication", "Division", "Exponentiation", "Modulus", "Exit"],
        },
    ]);

    // Perform calculation based on user's choice
    if (UserInput.operator === "Addition") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} + ${UserInput.secondNumber} = ${UserInput.firstNumber + UserInput.secondNumber}`));
    } else if (UserInput.operator === "Subtraction") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} - ${UserInput.secondNumber} = ${UserInput.firstNumber - UserInput.secondNumber}`));
    } else if (UserInput.operator === "Multiplication") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} * ${UserInput.secondNumber} = ${UserInput.firstNumber * UserInput.secondNumber}`));
    } else if (UserInput.operator === "Division") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} / ${UserInput.secondNumber} = ${UserInput.firstNumber / UserInput.secondNumber}`));
    } else if (UserInput.operator === "Exponentiation") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} ** ${UserInput.secondNumber} = ${UserInput.firstNumber ** UserInput.secondNumber}`));
    } else if (UserInput.operator === "Modulus") {
        console.log(chalk.yellow(`\n\t Your answer is: ${UserInput.firstNumber} % ${UserInput.secondNumber} = ${UserInput.firstNumber % UserInput.secondNumber}`));
    } else if (UserInput.operator === "Exit") {
        // Exit the program if user selects 'Exit'
        process.exit();
    } else {
        // Handle invalid operator selection
        console.log(chalk.red("Invalid operator selection."));
    }
}
