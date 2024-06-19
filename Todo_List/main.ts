#! /usr/bin/env node



// import inquirer and chalk 
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.yellow("<<<=========================================================================>>>"));

console.log(chalk.yellow("<<<============= ",chalk.blueBright("Welcome to  code-with-ashu Todo_List "),"=============>>>" ));
console.log(chalk.yellow("<<<===========================================================================>>>"));
// create a array for empty todoList
let todoList:any[] = [];
// loop for condition
let loop = true;

while(loop){
    // asking question from user you want to slect an option
    let todoListOptions = await inquirer.prompt([
        {
            name:"select",
            type:"list",
            message:chalk.magentaBright.italic("Select an option"),
            choices:["Add","Update","View","Delete","Exit"],
        },
    ]);


    // functions for add task in your todoList
    async function AddFunc() {
        let add = await inquirer.prompt([
            {
                name:"addList",
                type:"input",
                message:chalk.yellow.italic("Do you want to add task in your todoList")
            },
        ]);
        todoList.push(add.addList);
        console.log(chalk.green(`Successfully your ${add.addList} task has been added `));
    }
// functions for update task in your todoList
    async function UpdateFunc() {
       await ViewFunc();
       let update = await inquirer.prompt([
        {
            name:"up",
            type:"number",
            message:chalk.yellow.italic("Enter index No. you want to update"),
  
        },
        {
            name:"enterindex",
            type:"input",
            message:chalk.yellow.italic("Enter your task in Todo_List you want to update")
        }
       ]);
       if (update.up >= 0 && update.up < todoList.length) {
        todoList[update.up] = update.enterindex;
        console.log(chalk.green.italic(`Successfully your task at index ${update.up} has been updated`));
    } else {
        console.log(chalk.red.italic("Please enter a valid index number"));
    }
    }
    // functions for delete task in your todoList
    async function DeleteFunc() {
        await ViewFunc();
        let quesdel = await inquirer.prompt([
            {
                name:"del",
                type:"input",
                message:chalk.yellowBright.italic("Enter your task in Todo_List you want to delete"),
            },
        ]);
      if(quesdel.del <= todoList.length){
        todoList.splice(quesdel.del,1);
        console.log(chalk.greenBright.italic(`successfully your ${quesdel.del} task has been delete`));
        
      } else {
        console.log(chalk.red.italic("Please enter a valid index number"));
      }
    }
    // functions for  View All task in your todoList
    async function ViewFunc() {
        console.log(chalk.yellow.italic("View Your Todo_List"));
        todoList.forEach((list,index) => {
            console.log(`${chalk.yellowBright(index)}: ${chalk.greenBright.italic(list)}`);
            
        })
        
    }
        // if else if conditions for persform your actions
        if(todoListOptions.select == "Add"){
            await AddFunc();
        } else if(todoListOptions.select == "Update"){
            await UpdateFunc()
        } else if(todoListOptions.select == "View"){
            await ViewFunc();
        } else if(todoListOptions.select == "Delete"){
            await DeleteFunc()
        } else if(todoListOptions.select == "Exit"){
            loop = false;
        }
}





