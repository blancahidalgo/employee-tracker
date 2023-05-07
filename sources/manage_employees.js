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
   })
};

   function addEmployee(mainQuestions) {
      // Here we create a Promise to get roles from the database
      const rolesPromise = new Promise((resolve, reject) => {
         connection.query('SELECT id, title FROM roles;', function (err, results, fields) {
            if (err) {
               reject(err);
            } else {
               resolve(results);
            }
         });
      });

      // Here we create a Promise to get managers from the database
      const managersPromise = new Promise((resolve, reject) => {
         connection.query(`
       SELECT id, CONCAT(first_name, ' ', last_name) AS name
       FROM employees
       WHERE manager_id IS NULL;
     `, function (err, results, fields) {
            if (err) {
               reject(err);
            } else {
               resolve(results);
            }
         });
      });

      // Here we are waiting for both Promises to resolve using Promise.all
      Promise.all([rolesPromise, managersPromise])
         .then(([roles, managers]) => {
            // Once both Promises resolve, we extract the roles and managers from the results

            // Prompt the user for the employee details
            prompt([
               {
                  name: 'firstName',
                  message: 'Enter employee first name:',
               },
               {
                  name: 'lastName',
                  message: 'Enter employee last name:',
               },
               {
                  type: 'list',
                  name: 'roleId',
                  message: 'Choose employee role:',
                  choices: roles.map((role) => ({ name: role.title, value: role.id })),
               },
               {
                  type: 'list',
                  name: 'managerId',
                  message: 'Choose employee manager:',
                  choices: managers.map((manager) => ({ name: manager.name, value: manager.id })),
               },
            ]).then((res) => {
               //  When the user has provided the employee details:

               //  We insert the new employee record into the database with the provided details
               connection.query(`
           INSERT INTO employees (first_name, last_name, role_id, manager_id)
           VALUES (?, ?, ?, ?);
         `, [res.firstName, res.lastName, res.roleId, res.managerId], function (err, results, fields) {
                  if (err) {
                     // If there is an error during insertion, throw the error
                     console.error(err);
                  } else {
                     // Log a success message
                     console.log('Employee added successfully.');
                  }

                  // We then call mainQuestions() to return to the main menu
                  mainQuestions();
               });
            });
         })
         .catch((err) => {
            //  If there is an error during fetching roles or managers, log the error
            console.error(err);
         });
   }

   function updateEmployeeRole(mainQuestions) {
      // Here we create a Promise to get employees from the database
      const employeesPromise = new Promise((resolve, reject) => {
         connection.query(`
       SELECT id, CONCAT(first_name, ' ', last_name) AS name
       FROM employees;
     `, function (err, results, fields) {
            if (err) {
               reject(err);
            } else {
               resolve(results);
            }
            
         });
      });

      // Here we create a Promise to get roles from the database
      const rolesPromise = new Promise((resolve, reject) => {
         connection.query('SELECT id, title FROM roles;', function (err, results, fields) {
            if (err) {
               reject(err);
            } else {
               resolve(results);
            }
         });
      });

      // Here we are waiting for both Promises to resolve using Promise.all
      Promise.all([employeesPromise, rolesPromise])
         .then(([employees, roles]) => {
            // Once both Promises resolve, we extract the employees and roles from the results

            // Prompt the user for the employee and new role details
            prompt([
               {
                  type: 'list',
                  name: 'employeeId',
                  message: 'Choose employee to update:',
                  choices: employees.map((employee) => ({ name: employee.name, value: employee.id })),
               },
               {
                  type: 'list',
                  name: 'roleId',
                  message: 'Choose new role:',
                  choices: roles.map((role) => ({ name: role.title, value: role.id })),
               },
            ]).then((res) => {
               // When the user has provided the employee and new role details:

               // We update the employee's role in the database with the provided details
               connection.query(`
           UPDATE employees
           SET role_id = ?
           WHERE id = ?;
         `, [res.roleId, res.employeeId], function (err, results, fields) {
                  if (err) {
                     // If there is an error during update, throw the error
                     console.error(err);
                  } else {
                     // Log a success message
                     console.log('Employee role updated successfully.');
                  }

                  // We then call mainQuestions() to return to the main menu
                  mainQuestions();
               });
            });
         })
         .catch((err) => {
            // If there is an error during fetching employees or roles, log the error
            console.error(err);
         });
   }

   module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole };
