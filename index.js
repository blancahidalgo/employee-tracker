const express = require('express');
const router = express.Router();

router.use(require('./sources/roles'));
router.use(require('./sources/departments'));
router.use(require('./sources/manage_employees'));

module.exports = router;








// const inquirer = require('inquirer');
// const { viewEmployee, addEmployee } = require('./sources/manage_employees.js');
// const { viewAllRoles, addRole } = require('./sources/roles.js');

// // An array of questions for the command line prompt

// const questions = [
//     { 
//         type: 'list',
//         name: 'mainMenu',
//         message: 'What would you like to do?',
//         choices: [
//             'View all departments',
//             'Add a new department',
//             'View all employees',
//             'Add a new employee',
//             'Update an employee role',
//             'View all roles',
//             'Add a new role',
//         ]
//     },
// ]; 

// // A function to initialize app

// function init() {
//     inquirer.prompt(questions).then(answers => {
//         if (answers.action === 'View all departments') {
//             viewAllDepartments();
//         } else if (answers.action === 'Add a new department') {
//             addDepartment();
//         } else if (answers.action === 'View all employees') {
//             viewEmployee(); 
//         } else if (answers.action === 'Add a new employee') {
//             addEmployee();
//         } else if (answers.action === 'Update an employee role') {
//             updateEmployeeRole();
//         } else if (answers.action === 'View all roles') {
//             viewAllRoles();
//         } else if (answers.action === 'Add a new role') {
//             addRole();   
//         }
//     })
// };

// // Function call to initialize app
// init();
