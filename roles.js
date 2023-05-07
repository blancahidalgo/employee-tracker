const connection = require('../db/connection')
const inquirer = require('inquirer')

function viewAllRoles() {
   connection.query('SELECT * FROM roles;'), function (err, results, fields) 
      console.table(results);
   };


// Add roles
function addRole() {
   inquirer.prompt([{
      name: 'title',
      message: 'write role title',
   },
   {
      name: 'salary'
      message: 'write role salary',
   },
   {
      name: 'department_id'
      message: 'write department id',
   },
   ]).then(res => {
      connection.query('INSERT INTO role SET title = ?, salary = ?, department_id = ?', [res.title, res.salary, res.department_id], function (err, results, fields) {
         connection.query('SELECT * FROM role;', function (err, results, fields) {
            console.table(results);
         });
      });
   })
}
module.exports = { viewAllRoles, addRole };