const connection = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { prompt } = require('inquirer');


function viewAllDepartments(mainQuestions) {
   // exec.then ~ exec(then)
   connection.query('SELECT * FROM departments;', function (err, results, fields) {
      console.table(results);
      mainQuestions();
   });
}

function addDepartment(mainQuestions) {
   prompt([{
      name: 'name',
      message: 'write department name',
   }]).then(res => {
      connection.query('INSERT INTO departments SET name = ?;', res.name, function (err, results, fields) {
         connection.query('SELECT * FROM departments;', function (err, results, fields) {
            console.table(results);
            mainQuestions();
         });
      })
   })
}


module.exports = { viewAllDepartments, addDepartment };

