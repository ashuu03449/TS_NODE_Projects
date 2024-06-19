#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Print separator line with yellow color
console.log(chalk.yellow("<<<=========================================================================>>>"));
// Print welcome message with blueBright color
console.log(chalk.yellow("<<<============= ", chalk.blueBright("Welcome to code-with-ashu Calculator "), "=============>>>"));
// Print closing separator line with yellow color
console.log(chalk.yellow("<<<===========================================================================>>>"));
// Function to format time from seconds to HH:MM:SS
let formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0"); // Calculate hours and pad with leading zeros if necessary
    let minutes = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0"); // Calculate minutes and pad with leading zeros if necessary
    let secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0"); // Calculate seconds and pad with leading zeros if necessary
    return chalk.greenBright(`${chalk.yellowBright.italic(hours)}:${chalk.yellowBright.italic(minutes)}:${chalk.yellowBright.italic(secs)}`); // Return formatted time string
};
// Function to start the countdown timer
let startCountDown = (seconds) => {
    let remaining = seconds; // Initialize remaining time
    let startInterval = setInterval(() => {
        console.log(formatTime(remaining)); // Print formatted remaining time to the console
        remaining -= 1; // Decrease remaining time by 1 second
        if (remaining <= 0) {
            clearInterval(startInterval); // Stop the interval when countdown completes
            console.log(chalk.greenBright.italic.bold("CountDown Complete!")); // Notify countdown completion
        }
    }, 1000); // Interval set to 1000 milliseconds (1 second)
};
// Function to prompt user input for countdown time
let promptUser = async () => {
    let enterSeconds = await inquirer.prompt([
        {
            name: "sec",
            type: "number",
            message: chalk.greenBright.italic("Enter countdown time in seconds:"), // Prompt message for user input
            validate: (val) => {
                if (isNaN(val) || val <= 0) {
                    return chalk.redBright.italic("Please enter a valid number of seconds."); // Validation check for valid input
                }
                return true;
            },
        },
    ]);
    let seconds = enterSeconds.sec; // Retrieve seconds input from user
    startCountDown(seconds); // Start countdown timer with user-provided seconds
};
promptUser(); // Call the promptUser function to begin the countdown process
