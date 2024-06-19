#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.yellow("<<<=========================================================================>>>"));

console.log(chalk.yellow("<<<============= ",chalk.blueBright("Welcome to  code-with-ashu Adventure_Game "),"=============>>>" ));
console.log(chalk.yellow("<<<===========================================================================>>>"));

// Player class represents the user character
class Player {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    // Decreases fuel by 25
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel < 0 ? 0 : fuel;
    }

    // Resets fuel to 100
    fuelIncrease() {
        this.fuel = 100;
    }

    // Defend action: attempts to defend against opponent's attack
    Defend() {
        console.log(chalk.yellow(`${this.name} used defensive tactics!`));
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 1) {
            console.log(chalk.green("Defend successful! No damage taken."));
        } else {
            this.fuelDecrease();
            console.log(chalk.red("Defend failed! You took damage."));
            console.log(chalk.red(`${this.name} - Fuel: ${this.fuel}`));
        }
    }

    // Special Attack action: deals high damage but may consume more fuel
    SpecialAttack() {
        console.log(chalk.yellow(`${this.name} initiated a special attack!`));
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 1) {
            console.log(chalk.green("Special attack successful! Inflicted high damage to the opponent."));
        } else {
            this.fuelDecrease();
            console.log(chalk.red("Special attack failed! You spent more fuel and inflicted less damage."));
            console.log(chalk.red(`${this.name} - Fuel: ${this.fuel}`));
        }
    }

    // Heal action: restores player's fuel to 100
    heal() {
        this.fuelIncrease();
        console.log(chalk.green(`You healed yourself. Your fuel is now ${this.fuel}.`));
    }

    // Escape action: attempts to escape from opponent
    escape() {
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 1) {
            console.log(chalk.green(`${this.name} successfully escaped from the opponent!`));
            process.exit();
        } else {
            console.log(chalk.red(`${this.name}'s attempt to escape failed! The opponent caught you.`));
            this.fuelDecrease();
            console.log(chalk.red(`${this.name} - Fuel: ${this.fuel}`));
        }
    }

    // Stealth Attack action: attempts to surprise attack opponent
    StealthAttack() {
        console.log(chalk.yellow(`${this.name} performed a stealth attack on the opponent!`));
        let randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 1) {
            console.log(chalk.green("Stealth attack successful! The opponent was surprised and suffered heavy damage."));
        } else {
            this.fuelDecrease();
            console.log(chalk.red("Stealth attack failed! You suffered damage and the opponent discovered your presence."));
            console.log(chalk.red(`${this.name} - Fuel: ${this.fuel}`));
        }
    }
}

// Opponent class represents the enemy characters
class Opponent {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    // Decreases fuel by 25
    fuelDecrease() {
        let fuel = this.fuel - 25;
        this.fuel = fuel < 0 ? 0 : fuel;
    }

    // Resets fuel to 100
    fuelIncrease() {
        this.fuel = 100;
    }
}

// Prompt for player's name
let playerName = await inquirer.prompt([{
    name: "ans",
    type: "input",
    message: "Enter your name:"
}]);

// Prompt for opponent selection
let OpponentName = await inquirer.prompt([{
    name: "ans",
    type: "list",
    message: "Select an opponent:",
    choices: ["Skeleton", "Assassin", "Zombie", "Dragon", "Vampire", "Orc", "Goblin"]
}]);

// Initialize player and opponent instances
let player = new Player(playerName.ans);
let opponent = new Opponent(OpponentName.ans);

// Main game logic
async function main() {
    do {
        console.log(chalk.redBright.bold(`${chalk.blueBright.bold(player.name)} VS ${chalk.blueBright.bold(opponent.name)}`));

        // Prompt user for action
        let action = await inquirer.prompt([{
            name: "act",
            type: "list",
            message: "Select an action:",
            choices: ["Attack", "Drink Health Potion", "Defend", "Special Attack", "Heal", "Escape", "Stealth Attack"]
        }]);

        // Process user's action
        if (action.act === "Attack") {
            let randomNumber = Math.floor(Math.random() * 2);
            if (randomNumber > 0) {
                player.fuelDecrease();
                console.log(chalk.redBright(`${player.name} - Fuel: ${player.fuel}`));
                console.log(chalk.greenBright(`${opponent.name} - Fuel: ${opponent.fuel}`));
                if (player.fuel <= 0) {
                    console.log("You lose. Better luck next time!");
                    break;
                }
            } else {
                opponent.fuelDecrease();
                console.log(chalk.redBright(`${opponent.name} - Fuel: ${opponent.fuel}`));
                console.log(chalk.greenBright(`${player.name} - Fuel: ${player.fuel}`));
                if (opponent.fuel <= 0) {
                    console.log("You win!");
                    process.exit();
                }
            }

        } else if (action.act === "Drink Health Potion") {
            player.fuelIncrease();
            console.log(`You drank a health potion. Your fuel is ${player.fuel}.`);

        } else if (action.act === "Defend") {
            player.Defend();

        } else if (action.act === "Special Attack") {
            player.SpecialAttack();

        } else if (action.act === "Heal") {
            player.heal();

        } else if (action.act === "Escape") {
            player.escape();

        } else if (action.act === "Stealth Attack") {
            player.StealthAttack();
        }

    } while (player.fuel > 0 && opponent.fuel > 0); // Loop until either player or opponent runs out of fuel
}

// Start the adventure game
main();
