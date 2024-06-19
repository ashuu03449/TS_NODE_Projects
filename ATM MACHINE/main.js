import inquirer from "inquirer";
import chalk from "chalk";
class ATM {
    balance;
    constructor() {
        this.balance = 0; // Balance ko initialize karte hain 0 se
    }
    // Balance check karne ka method
    checkBalance() {
        console.log(chalk.blueBright(`Current Balance: $${this.balance}`));
    }
    // Paise deposit karne ka method
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(chalk.greenBright(`Deposited $${amount} successfully.`));
            this.checkBalance();
        }
        else {
            console.log(chalk.redBright("Invalid amount! Please enter a valid amount."));
        }
    }
    // Paise withdraw karne ka method
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.greenBright(`Withdrawn $${amount} successfully.`));
            this.checkBalance();
        }
        else if (amount <= 0) {
            console.log(chalk.redBright("Invalid amount! Please enter a valid amount."));
        }
        else {
            console.log(chalk.redBright("Insufficient balance! Please enter a valid amount."));
        }
    }
    // Paisay transfer karne ka method
    transfer(amount, recipient) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.greenBright(`Transferred $${amount} to ${recipient} successfully.`));
            this.checkBalance();
        }
        else if (amount <= 0) {
            console.log(chalk.redBright("Invalid amount! Please enter a valid amount."));
        }
        else {
            console.log(chalk.redBright("Insufficient balance! Please enter a valid amount."));
        }
    }
}
// Main function jo ATM application ko start karta hai
async function main() {
    const atm = new ATM();
    while (true) {
        const { action } = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "Choose an action:",
            choices: ["Check Balance", "Deposit", "Withdraw", "Transfer Funds", "Exit"]
        });
        switch (action) {
            case "Check Balance":
                atm.checkBalance();
                break;
            case "Deposit":
                const { depositAmount } = await inquirer.prompt({
                    name: "depositAmount",
                    type: "number",
                    message: "Enter deposit amount:"
                });
                atm.deposit(depositAmount);
                break;
            case "Withdraw":
                const { withdrawAmount } = await inquirer.prompt({
                    name: "withdrawAmount",
                    type: "number",
                    message: "Enter withdrawal amount:"
                });
                atm.withdraw(withdrawAmount);
                break;
            case "Transfer Funds":
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
main();
