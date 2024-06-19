// Importing necessary libraries
import inquirer from "inquirer"; // For interactive command line prompts
import chalk from "chalk"; // For colorful console output

// Class definition for ATM functionality
class ATM {
    private balance: number; // Private variable to store current balance

    // Constructor to initialize balance to 0
    constructor() {
        this.balance = 0;
    }

    // Method to check current balance
    checkBalance() {
        console.log(chalk.blueBright(`Current Balance: $${this.balance}`));
    }

    // Method to deposit money into the account
    deposit(amount: number) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.greenBright(`Deposited $${amount} successfully.`));
            this.checkBalance();
        } else {
            console.log(chalk.redBright("Invalid amount! Please enter a valid amount."));
        }
    }

    // Method to withdraw money from the account
    withdraw(amount: number) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.greenBright(`Withdrawn $${amount} successfully.`));
            this.checkBalance();
        } else if (amount <= 0) {
            console.log(chalk.redBright("Invalid amount! Please enter a valid amount."));
        } else {
            console.log(chalk.redBright("Insufficient balance! Please enter a valid amount."));
        }
    }

    // Method to transfer money to another account
    transfer(amount: number, recipient: string) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.greenBright(`Transferred $${amount} to ${recipient} successfully.`));
            this.checkBalance();
        } else if (amount <= 0) {
            console.log(chalk.redBright("Invalid amount! Please enter a valid amount."));
        } else {
            console.log(chalk.redBright("Insufficient balance! Please enter a valid amount."));
        }
    }
}

// Main function to start the ATM application
async function main() {
    const atm = new ATM(); // Creating an instance of the ATM class

    // Loop to continuously prompt the user for actions
    while (true) {
        // Prompting user to choose an action using inquirer
        const { action } = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "Choose an action:",
            choices: ["Check Balance", "Deposit", "Withdraw", "Transfer Funds", "Exit"]
        });

        // Handling user's chosen action with a switch statement
        switch (action) {
            case "Check Balance":
                atm.checkBalance();
                break;

            case "Deposit":
                // Prompting user to enter deposit amount
                const { depositAmount } = await inquirer.prompt({
                    name: "depositAmount",
                    type: "number",
                    message: "Enter deposit amount:"
                });
                atm.deposit(depositAmount);
                break;

            case "Withdraw":
                // Prompting user to enter withdrawal amount
                const { withdrawAmount } = await inquirer.prompt({
                    name: "withdrawAmount",
                    type: "number",
                    message: "Enter withdrawal amount:"
                });
                atm.withdraw(withdrawAmount);
                break;

            case "Transfer Funds":
                // Prompting user to enter transfer amount and recipient's name
                const { transferAmount, recipient } = await inquirer.prompt([
                    {
                        name: "transferAmount",
                        type: "number",
                        message: "Enter transfer amount:"
                    },
                    {
                        name: "recipient",
                        type: "input",
                        message: "Enter recipient's name:"
                    }
                ]);
                atm.transfer(transferAmount, recipient);
                break;

            case "Exit":
                console.log(chalk.yellow("Exiting the ATM application."));
                process.exit();
                break;

            default:
                console.log(chalk.red("Invalid choice! Please select a valid action."));
                break;
        }
    }
}

// Calling the main function to start the ATM application
main();
   