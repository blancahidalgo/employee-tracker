const connection = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { prompt } = require('inquirer');


function viewAllEmployees() {
   connection.query('SELECT * FROM employees;', function (err, results, fields) {
      console.table(results);
   });
}


function addEmployee() {
   prompt([{
      name: 'name',
      message: 'write employee name',
   }]).then(res => {
      connection.query('INSERT INTO employees SET name = ?;', res.name, function (err, results, fields) {
         connection.query('SELECT * FROM employees;', function (err, results, fields) {
            console.table(results);
         });
      })
   })
}


module.exports = { viewAllEmployees, addEmployee };

