// Person class
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // Method to display person's information
    display() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
    }
}
// Student class extends Person
class Student extends Person {
    studentId;
    constructor(name, age, studentId) {
        super(name, age);
        this.studentId = studentId;
    }
    // Method to display student's information
    display() {
        super.display();
        console.log(`Student ID: ${this.studentId}`);
    }
    // Method to calculate grade (polymorphism)
    calculateGrade() {
        // Assume some logic to calculate grade based on performance
        return "A";
    }
}
// Teacher class extends Person
class Teacher extends Person {
    employeeId;
    constructor(name, age, employeeId) {
        super(name, age);
        this.employeeId = employeeId;
    }
    // Method to display teacher's information
    display() {
        super.display();
        console.log(`Employee ID: ${this.employeeId}`);
    }
    // Method to conduct class (polymorphism)
    conductClass() {
        console.log(`${this.name} is conducting the class.`);
    }
}
// Main application
let student = new Student("Ayesha", 15, 1001);
student.display();
console.log(`Grade: ${student.calculateGrade()}`);
let teacher = new Teacher("Mr. Ali", 35, 2001);
teacher.display();
teacher.conductClass();
export {};
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
* Classes implemented:
* - Person: Represents a basic entity with first and last names.
* - Employee: Inherits from Person and adds an employee ID, demonstrating inheritance and polymorphism.
* */ 
