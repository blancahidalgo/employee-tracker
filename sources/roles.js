const connection = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { prompt } = require('inquirer');


function viewAllRoles(mainQuestions) {
   connection.query('SELECT * FROM roles;'), function (err, results, fields) {
      console.table(results);
      mainQuestions();
   };

function addRole(mainQuestions) {
   inquirer.prompt([
     {
       name: 'title',
       message: 'Enter the role title:',
     },
     {
       name: 'salary',
       message: 'Enter the role salary:',
     },
     {
       name: 'department_id',
       message: 'Enter the department id:',
     },
   ]).then((res) => {
     connection.query(
       'INSERT INTO roles SET ?',
       {
         title: res.title,
         salary: res.salary,
         department_id: res.department_id,
       },
       function (err, results, fields) {
         if (err) {
           console.error(err);
         } else {
           console.log('Role added successfully.');
         }
         mainQuestions();
       }
     );
   });
 }

module.exports = { viewAllRoles, addRole }};