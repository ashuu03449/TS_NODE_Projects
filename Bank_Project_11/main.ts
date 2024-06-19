#! /usr/bin/env node
// Import necessary modules
import inquirer from "inquirer";
import chalk from "chalk";
import { faker } from "@faker-js/faker";

console.log(chalk.yellow("<<<=========================================================================>>>"));

console.log(chalk.yellow("<<<============= ",chalk.blueBright("Welcome to  code-with-ashu Bank_Console_App "),"=============>>>" ));
console.log(chalk.yellow("<<<===========================================================================>>>"));


// Customer class to store customer details
class Customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  mobNumber: number;
  accountNum: number;
  constructor(
    fName: string,
    lName: string,
    age: number,
    gender: string,
    mobNum: number,
    accountNumber: number
  ) {
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.gender = gender;
    this.mobNumber = mobNum;
    this.accountNum = accountNumber;
  }
}

// Interface for BankAccount
interface BankAccount {
  balance: number;
  accNum: number;
}

// Bank class to manage customers and accounts
class Bank {
  cutomers: Customer[] = [];
  accounts: BankAccount[] = [];

  // Method to add a customer
  addCustomer(obj: Customer) {
    this.cutomers.push(obj);
  }

  // Method to add a bank account
  addAccountNumber(obj: BankAccount) {
    this.accounts.push(obj);
  }

  // Method to update account balance
  transition(bank: BankAccount) {
    let newAccounts = this.accounts.filter((acc) => acc.accNum !== bank.accNum);
    this.accounts = [...newAccounts, bank];
  }
}

// Initialize bank with dummy data
let myBank = new Bank();
for (let i = 1; i <= 10; i++) {
  let fName = faker.person.firstName("female");
  let lName = faker.person.lastName();
  let gender = faker.person.gender();
  let mobNum = parseInt(faker.phone.number());
  let customer = new Customer(fName, lName, i * 20, gender, mobNum, 1000 + i);
  myBank.addCustomer(customer);
  myBank.addAccountNumber({ balance: 1000 * i, accNum: customer.accountNum });
}

// Function to display all customers
let displayCustomers = () => {
  console.log(chalk.blue("Customers and their Account Numbers:"));
  myBank.cutomers.forEach((customer, index) => {
    console.log(
      chalk.greenBright.italic(
        `${chalk.yellowBright.italic(index + 1)}. ${customer.firstName} ${
          customer.lastName
        } - Account Number: ${chalk.blueBright.italic.bold(
          customer.accountNum
        )}`
      )
    );
  });
};
displayCustomers();

// Main banking service function
let BankService = async (bank: Bank) => {
  // Prompt user to choose an action
  let userInput = await inquirer.prompt([
    {
      name: "ans",
      type: "list",
      message: chalk.greenBright.italic("Select an option you want to do"),
      choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"],
    },
  ]);

  // Handle View Balance option
  if (userInput.ans === "View Balance") {
    let askuserAccountNumber = await inquirer.prompt([
      {
        name: "ans",
        type: "number",
        message: chalk.greenBright.italic("Enter your Account Number"),
      },
    ]);
    let account = myBank.accounts.find(
      (acc) => acc.accNum == askuserAccountNumber.ans
    );
    if (!account) {
      console.log(`invalid number`);
    } else {
      let name = myBank.cutomers.find(
        (acc) => acc.accountNum === account.accNum
      );
      console.log(
        chalk.greenBright.italic(
          `${name?.firstName} ${
            name?.lastName
          } your balance is ${chalk.blueBright.italic.bold(account.balance)}`
        )
      );
    }
  }
  // Handle Cash Withdraw option
  else if (userInput.ans === "Cash Withdraw") {
    let askuserAccountNumber = await inquirer.prompt([
      {
        name: "ans",
        type: "number",
        message: chalk.greenBright.italic("Enter your Account Number"),
      },
    ]);
    let account = myBank.accounts.find(
      (acc) => acc.accNum == askuserAccountNumber.ans
    );
    if (!account) {
      console.log(chalk.redBright.italic(`invalid number`));
    } else {
      let previousBalance = account.balance;
      let AmountWithdraw = await inquirer.prompt({
        name: "ans",
        type: "number",
        message: chalk.greenBright.italic("Enter your Withdraw Amount"),
      });
      if (AmountWithdraw.ans > account.balance) {
        console.log(chalk.redBright.italic("Insufficient Amount"));
        console.log(chalk.redBright.italic("Please enter a sufficient amount"));
        console.log(
          chalk.greenBright.italic(
            `Your current balance is: ${account.balance}`
          )
        );
      } else {
        let newBalance = (account.balance -= AmountWithdraw.ans);
        myBank.transition({ accNum: account.accNum, balance: account.balance });
        console.log(
          chalk.green.italic(
            `Previous balance: ${chalk.blueBright.italic(previousBalance)}`
          )
        );
        console.log(
          chalk.green.italic(
            `Withdrawal amount: ${chalk.blueBright.italic(AmountWithdraw.ans)}`
          )
        );
        console.log(
          chalk.green.italic(
            `New balance: ${chalk.blueBright.italic(account.balance)}`
          )
        );
      }
    }
  }
  // Handle Cash Deposit option
  else if (userInput.ans === "Cash Deposit") {
    let askuserAccountNumber = await inquirer.prompt([
      {
        name: "ans",
        type: "number",
        message: chalk.greenBright.italic("Enter your Account Number"),
      },
    ]);
    let account = myBank.accounts.find(
      (acc) => acc.accNum == askuserAccountNumber.ans
    );
    if (!account) {
      console.log(chalk.redBright.italic(`Invalid account number`));
    } else {
      let previousBalance = account.balance;
      let depositAmount = await inquirer.prompt({
        name: "ans",
        type: "number",
        message: chalk.greenBright.italic("Enter your Deposit Amount"),
      });
      let newBalance = (account.balance += depositAmount.ans);
      myBank.transition({ accNum: account.accNum, balance: account.balance });
      console.log(
        chalk.green.italic(
          `Previous balance: ${chalk.blueBright.italic(previousBalance)}`
        )
      );
      console.log(
        chalk.green.italic(
          `Deposit amount: ${chalk.blueBright.italic(depositAmount.ans)}`
        )
      );
      console.log(
        chalk.green.italic(
          `New balance: ${chalk.blueBright.italic(account.balance)}`
        )
      );
    }
  }
  // Handle Exit option
  else if (userInput.ans === "Exit") {
    console.log(
      chalk.yellowBright.italic(
        "Thank you for using the banking service. Goodbye!"
      )
    );
    return;
  }
  // Recursively call BankService to allow for multiple operations
  BankService(bank);
};

// Start the BankService
BankService(myBank);
