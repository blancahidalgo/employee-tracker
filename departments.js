const connection = require('./db/connection')
const inquirer = require('inquirer')
const { prompt } = require('inquirer')


function viewAllDepartments() {
   connection.query('SELECT * FROM departments;', function (err, results, fields) {
      console.table(results);
   });
}


function addDepartment() {
   prompt([{
      name: 'name',
      message: 'write department name',
   }]).then(res => {
      connection.query('INSERT INTO departments SET name = ?;', res.name, function (err, results, fields) {
         connection.query('SELECT * FROM departments;', function (err, results, fields) {
            console.table(results);
         });
      })
   })
}


module.exports = { viewAllDepartments, addDepartment };

