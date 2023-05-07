const connection = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { prompt } = require('inquirer');


function viewAllEmployees(mainQuestions) {
   const dbQuery = `
   SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees
   LEFT JOIN employees as manager
   ON employees.manager_id = manager.id
   INNER JOIN roles
   ON employees.role_id = roles.id
   INNER JOIN departments
   ON roles.department_id = departments.id;
   
   `;
   connection.query(dbQuery, function (err, results, fields) {
      console.table(results);
      mainQuestions();
   });
}


function addEmployee(mainQuestions) {
   prompt([{
      name: 'name',
      message: 'write employee name',
   }]).then(res => {
      connection.query('INSERT INTO employees SET name = ?;', res.name, function (err, results, fields) {
         connection.query('SELECT * FROM employees;', function (err, results, fields) {
            console.table(results);
            mainQuestions();
         });
      })
   })
}


module.exports = { viewAllEmployees, addEmployee };

