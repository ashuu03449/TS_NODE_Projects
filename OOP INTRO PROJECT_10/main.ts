#! /usr/bin/env node
import chalk from "chalk";

// Print separator line with yellow color
console.log(chalk.yellow("<<<=========================================================================>>>"));
// Print welcome message with blueBright color
console.log(chalk.yellow("<<<============= ", chalk.blueBright("Welcome to code-with-ashu OOP_Concepts"), "=============>>>"));
// Print closing separator line with yellow color
console.log(chalk.yellow("<<<===========================================================================>>>"));

// Person class
class Person {
    protected name: string;
    protected age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Method to display person's information
    display(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
    }
}
// Student class extends Person
class Student extends Person {
    private studentId: number;

    constructor(name: string, age: number, studentId: number) {
        super(name, age);
        this.studentId = studentId;
    }

    // Method to display student's information
    display(): void {
        super.display();
        console.log(`Student ID: ${this.studentId}`);
    }

    // Method to calculate grade (polymorphism)
    calculateGrade(): string {
        // Assume some logic to calculate grade based on performance
        return "A";
    }
}

// Teacher class extends Person
class Teacher extends Person {
    private employeeId: number;

    constructor(name: string, age: number, employeeId: number) {
        super(name, age);
        this.employeeId = employeeId;
    }

    // Method to display teacher's information
    display(): void {
        super.display();
        console.log(`Employee ID: ${this.employeeId}`);
    }

    // Method to conduct class (polymorphism)
    conductClass(): void {
        console.log(`${this.name} is conducting the class.`);
    }
}
// Main 
let student = new Student("Ayesha", 17, 1001);
student.display();
console.log(`Grade: ${student.calculateGrade()}`);

let teacher = new Teacher("Mr. Ali", 35, 2001);
teacher.display();
teacher.conductClass();


/*
ABOUT OOP INTRODUCTION
* This TypeScript console application demonstrates Object-Oriented Programming (OOP) concepts.
* It includes examples of inheritance, polymorphism, and encapsulation.
* 
* Concepts demonstrated:
* - Inheritance: Employee class inherits from Person class.
* - Polymorphism: Method overriding in the Employee class.
* - Encapsulation: Private and public access modifiers used in class properties.
* 
* */