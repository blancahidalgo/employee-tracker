const inquirer = require('inquirer');
const db = require('./db/connection.js');
const mysql2 = require('mysql2');
const express = require('express');
const connection = require('./db/connection.js');
const router = express.Router();


// db.connect(async function () {
//   start();
// })

const questions = [
      {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do?',
      choices: [
          'View all departments',
          'Add a new department',
          'View all employees',
          'Add a new employee',
          'Update an employee role',
          'View all roles',
          'Add a new role',
      ],
  }
]; 


// A function to initialize app

function init() {
  inquirer.prompt(questions).then(answers => {
      if (answers.action === 'View all departments') {
          viewAllDepartments();
      } else if (answers.action === 'Add a new department') {
          addDepartment();
      } else if (answers.action === 'View all employees') {
          viewEmployee(); 
      } else if (answers.action === 'Add a new employee') {
          addEmployee();
      } else if (answers.action === 'Update an employee role') {
          updateEmployeeRole();
      } else if (answers.action === 'View all roles') {
          viewAllRoles();
      } else if (answers.action === 'Add a new role') {
          addRole();   
      }
  })
};

// Function call to initialize app
init();



















// .then((answer) => {
//   switch (answer.choice) {
      
//       case 'View Employees':
          
//           viewEmployees();
//           break;
//       case 'View Roles':

//           viewRoles();
//           break;
//       case 'View Departments':

//           viewDepartments();
//           break;
//       case 'Add New Employee':

//           newEmployee();
//           break;

//           case 'Quit':

//           Quit();
//           break;
//  }
// }
// );


























// const express = require('express');
// const inquirer = require('inquirer');
// const mysql2 = require('mysql2'); 

// const PORT = process.env.PORT || 8080;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// // I originally moved my connection to a separate file. Is that better practice? It was here before. 







// // Query database
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  


// // MAIN QUESTIONS

// // ERROR TRYING TO RUN THE COMMAND LINE Q'S 
// // DO I EVEN NEED THIS SERVER.JS FILE HAVING INDEX.JS? 
// // WHY ARE MY PACKAGES IN GRAY? 
// // WHY IS MY CONNECTION NOT WORKING?





