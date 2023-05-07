
const inquirer = require('inquirer');
const {viewAllDepartments, addDepartment} = require('./departments.js');
const {viewAllEmployees, addEmployee} = require('./manage_employees');
// TODO: Import other questions

function mainQuestions () {
    const questions = [
        {
        type: 'list',
        name: 'action',
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
    inquirer.prompt(questions).then(answers => {
      // console.log(answers);
        if (answers.action === 'View all departments') {
            viewAllDepartments(mainQuestions);
        } else if (answers.action === 'Add a new department') {
            addDepartment(mainQuestions);
        } else if (answers.action === 'View all employees') {
            viewAllEmployees(mainQuestions); 
        } else if (answers.action === 'Add a new employee') {
            addEmployee(mainQuestions);
        } else if (answers.action === 'Update an employee role') {
            updateEmployeeRole();
        } else if (answers.action === 'View all roles') {
            viewAllRoles(mainQuestions);
        } else if (answers.action === 'Add a new role') {
            addRole(mainQuestions);   
        }
    })
  };
  
 

module.exports = { mainQuestions };