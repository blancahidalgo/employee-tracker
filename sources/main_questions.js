const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment } = require('./departments.js');
const { viewAllEmployees, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment } = require('./manage_employees');
const { deleteDepartment, deleteRole, deleteEmployee } = require('./delete');
const { viewAllRoles, addRole } = require('./roles');
// TODO: Import other questions

function mainQuestions() {
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
                'Update employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete department',
                'Delete roles', 
                'Delete employees',
                'View the total utilized budget of a department',
            ],
        }
    ];
    inquirer.prompt(questions).then((answers) => {
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
            updateEmployeeRole(mainQuestions);
        } else if (answers.action === 'View all roles') {
            viewAllRoles(mainQuestions);
        } else if (answers.action === 'Add a new role') {
            addRole(mainQuestions);
        } else if (answers.action === 'Update employee manager') {
            updateEmployeeManager(mainQuestions);
        } else if (answers.action === 'View employees by manager') {
            viewEmployeesByManager(mainQuestions);
        } else if (answers.action === 'View employees by department') {
            viewEmployeesByDepartment(mainQuestions);
        } else if (answers.action === 'Delete departments, roles, and employees') {
            deleteDepartment(mainQuestions);
        } else if (answers.action === 'Delete roles, and employees') {
            deleteRole(mainQuestions);
        } else if (answers.action === 'Delete employees') {
            deleteEmployee(mainQuestions);
        } else if (answers.action === 'View the total utilized budget of a department') {
            seeTotalBudget(mainQuestions);
        };   
});
};

module.exports = { mainQuestions };



// debug viewEmployeesByManager & viewEmployeesByDepartment