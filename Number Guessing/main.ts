#! /usr/bin/env node
// import inquirer & chalk
import inquirer from "inquirer";
import chalk from "chalk";


// Print separator line with yellow color
console.log(chalk.yellow("<<<=========================================================================>>>"));
// Print welcome message with blueBright color
console.log(chalk.yellow("<<<============= ", chalk.blueBright("Welcome to code-with-ashu Number_Guessinh_Game "), "=============>>>"));
// Print closing separator line with yellow color
console.log(chalk.yellow("<<<===========================================================================>>>"));






    //create a variable of generate Random Number
    let randomNum = Math.floor(Math.random()*10)+1;
    // ask question from user enter a guess number
    async function GuessFunc() {
        let userGuessNum = await inquirer.prompt([
            {
                name:"guessNumber",
                type:"number",
                message:chalk.yellow("Enter a Guess Number"),
                validate:(input:string)=> {
                    let parse = parseInt(input);
                    if(isNaN(parse) || parse < 1 || parse > 10){
                        return `plz enter guess number between 1 & 10`;
                        
                    }
                    return true;
                }
            },
        ]);
       return  parseInt(userGuessNum.guessNumber);
        
    }

async function userGuessFunc() {
    let userGuessNum:any;
    do{
        userGuessNum = await GuessFunc();
        if(userGuessNum !== randomNum){
            console.log('Wrong Guess => Try Again!');
            
        }
    }while(userGuessNum !== randomNum)
        console.log('Congrats! your guess Number is correct');
        
}



userGuessFunc();