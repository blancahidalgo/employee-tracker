const connection = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { prompt } = require('inquirer');


function deleteDepartment(mainQuestions) {
    // Get list of departments to choose from
    connection.query('SELECT id, name FROM departments', function (err, departments, fields) {
        if (err) {
            console.log(err);
            mainQuestions();
            return;
        }

        // Ask user which department to delete
        inquirer.prompt({
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to delete:',
            choices: departments.map(d => ({ name: d.name, value: d.id }))
        }).then(res => {
            const { departmentId } = res;

            // Delete the department from the database
            connection.query('DELETE FROM departments WHERE id = ?', [departmentId], function (err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Department deleted successfully!`);
                }
                mainQuestions();
            });
        });
    });
}

function deleteRole(mainQuestions) {
    // Get list of roles to choose from
    connection.query('SELECT id, title FROM roles', function (err, roles, fields) {
        if (err) {
            console.log(err);
            mainQuestions();
            return;
        }

        // Ask user which role to delete
        inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: 'Select a role to delete:',
            choices: roles.map(r => ({ name: r.title, value: r.id }))
        }).then(res => {
            const { roleId } = res;

            // Delete the role from the database
            connection.query('DELETE FROM roles WHERE id = ?', [roleId], function (err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Role deleted successfully!`);
                }
                mainQuestions();
            });
        });
    });
}

function deleteEmployee(mainQuestions) {
    // Get list of employees to choose from
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', function (err, employees, fields) {
        if (err) {
            console.log(err);
            mainQuestions();
            return;
        }

        // Ask user which employee to delete
        inquirer.prompt([{
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to delete:',
            choices: employees.map(e => ({ name: e.name, value: e.id }))
        }]).then(res => {
            const { employeeId } = res;

            // Delete employee from the database
            connection.query('DELETE FROM employees WHERE id = ?', [employeeId], function (err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Employee deleted successfully!`);
                }
                mainQuestions();
            });
        });
    });
}

module.exports = { deleteDepartment, deleteRole, deleteEmployee };













