#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Define the structure of a Student
interface Student {
  studentId: number;
  studentName: string;
  grade: string;
}

// Initialize an empty array to store collection of students
let collectionOfStudents: Student[] = [];

// Flag to control the main loop of the program
let loop = true;

// Display initial welcome messages with chalk styling
console.log(
  chalk.yellow(
    "<<<=========================================================================>>>"
  )
);
console.log(
  chalk.yellow(
    "<<<============= ",
    chalk.blueBright("Welcome to  code-with-ashu Student_Managemnet_System"),
    "=============>>>"
  )
);
console.log(
  chalk.yellow(
    "<<<===========================================================================>>>"
  )
);

// Main function to manage the student management system
async function StudentManagementSystem() {
  while (loop) {
    // Prompt user to select an option from a list
    let optionsSelect = await inquirer.prompt([
      {
        name: "opt",
        type: "list",
        message: chalk.greenBright.italic("Select an option from below list!"),
        choices: [
          "Add Student",
          "View Students",
          "Delete Student",
          "Update Student",
          "Exit",
        ],
      },
    ]);

    // Switch case to handle user's selection
    switch (optionsSelect.opt) {
      case "Add Student":
        await AddStudent();
        break;
      case "View Students":
        viewAllStudents();
        break;
      case "Delete Student":
        await DeleteStudent();
        break;
      case "Update Student":
        await UpdateStudent();
        break;
      case "Exit":
        loop = false;
        break;
    }
  }

  /**
   * Function to add a new student to the collectionOfStudents array.
   */
  async function AddStudent() {
    // Prompt user to enter student details
    let studentDetail = await inquirer.prompt([
      {
        name: "studentName",
        type: "input",
        message: chalk.green("Enter student's Name"),
      },
      {
        name: "studentId",
        type: "input",
        message: chalk.green("Enter student's ID"),
      },
      {
        name: "studentGrade",
        type: "input",
        message: chalk.green("Enter student's Grade"),
      },
    ]);

    // Push new student object to the collectionOfStudents array
    collectionOfStudents.push({
      studentName: studentDetail.studentName,
      studentId: parseInt(studentDetail.studentId),
      grade: studentDetail.studentGrade,
    });

    // Confirmation message
    console.log("\n");
    console.log(chalk.blue("Student Added Successfully!"));
    console.log(collectionOfStudents[collectionOfStudents.length - 1]);
  }

  /**
   * Function to view all students in the collectionOfStudents array.
   * Displays an error message if there are no students.
   */
  function viewAllStudents() {
    if (collectionOfStudents.length === 0) {
      // Display error message if no students are present
      console.log(chalk.red("There are no students to display."));
    } else {
      // Display list of all students
      console.log(chalk.yellowBright("\nList of All Students:"));
      for (let i = 0; i < collectionOfStudents.length; i++) {
        console.log(chalk.yellowBright("Student " + (i + 1)));
        console.log(collectionOfStudents[i]);
        console.log("\n");
      }
    }
  }

  /**
   * Function to delete a student from collectionOfStudents based on student ID.
   */
  async function DeleteStudent() {
    // Prompt user to enter the student ID to delete
    if (collectionOfStudents.length === 0) {
      // Display error message if no students are present
      console.log(chalk.red("There are no students to delete"));
      return;
    } else {
      let deleteStudentById = await inquirer.prompt({
        name: "studentIdEnter",
        type: "input",
        message: chalk.red("Please enter student's ID you want to delete"),
      });
      // Filter out the student with matching ID
      let filteredStudents = collectionOfStudents.filter(
        (student) =>
          student.studentId !== parseInt(deleteStudentById.studentIdEnter)
      );
      collectionOfStudents = filteredStudents;

      // Confirmation message
      console.log("\n");
      console.log(chalk.blue("Student Deleted Successfully!"));
    }
  }

  /**
   * Function to update student details in collectionOfStudents based on student ID.
   * Displays an error message if no student is found with the given ID.
   */
  async function UpdateStudent() {
    if (collectionOfStudents.length === 0) {
      // Display error message if no students are present
      console.log(chalk.red("There are no students to update."));
      return;
    }

    // Prompt user to enter the student ID to update
    let updateStudentId = await inquirer.prompt({
      name: "studentIdEnter",
      type: "input",
      message: chalk.green("Please enter student's ID you want to update"),
    });

    // Find the student with matching ID
    let studentId = parseInt(updateStudentId.studentIdEnter);
    let student = collectionOfStudents.find(
      (stu) => stu.studentId === studentId
    );

    if (student) {
      // Prompt user to update student details
      let updatedDetails = await inquirer.prompt([
        {
          name: "studentName",
          type: "input",
          message: chalk.green(
            "Enter new student's name (leave blank to keep current)"
          ),
          default: student.studentName,
        },
        {
          name: "studentGrade",
          type: "input",
          message: chalk.green(
            "Enter new student's grade (leave blank to keep current)"
          ),
          default: student.grade,
        },
      ]);

      // Update student's name if provided, otherwise keep old name
      student.studentName = updatedDetails.studentName || student.studentName;

      // Update student's grade if provided, otherwise keep old grade
      student.grade = updatedDetails.studentGrade || student.grade;

      // Confirmation message
      console.log("\n");
      console.log(chalk.blue("Student Updated Successfully!"));
      console.log(student);
    } else {
      // Display error message if no student found with the given ID
      console.log(chalk.red("Student not found with the given ID!"));
    }
  }
}

// Start the student management system
StudentManagementSystem();
