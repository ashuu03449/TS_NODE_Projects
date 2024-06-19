#!/usr/bin/env node

// Import necessary modules
import inquirer from "inquirer";
import chalk from "chalk";

// Function to start the word counting process
async function startWordCounter() {
    console.log(chalk.yellow("<<<=========================================================================>>>"));
    console.log(chalk.yellow(`<<<============= ${chalk.blueBright("Welcome to code-with-ashu Word_Counter")} =============>>>`));
    console.log(chalk.yellow("<<<=========================================================================>>>"));

    let loop = true;

    while (loop) {
        // Prompt user to enter a sentence
        let userInput = await inquirer.prompt([
            {
                name: "sentence",
                type: "input",
                message: chalk.yellow("Enter a sentence:"),
            },
        ]);

        // Split the sentence into words and count them
        let wordsCount = userInput.sentence.trim().split(' ');

        // Display the words and their count
        console.log(chalk.yellow.bold("Sentence Words:"));
        console.log(wordsCount);
        console.log(chalk.green.bold(`Word Total: ${wordsCount.length}`));

        // Ask if the user wants to enter another sentence
        let exitOrNot = await inquirer.prompt([
            {
                name: "exit",
                type: "confirm",
                message: "Do you want to enter another sentence?",
                default: true,
            },
        ]);

        // Update loop based on user input
        loop = exitOrNot.exit;
    }

    console.log(chalk.yellow("<<<=========================================================================>>>"));
    console.log(chalk.yellow("<<<================== Thank you for using Word_Counter ===================>>>"));
    console.log(chalk.yellow("<<<=========================================================================>>>"));
}

// Execute the function to start the program
startWordCounter();
