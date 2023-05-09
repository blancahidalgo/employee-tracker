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

function updateEmployeeManager(mainQuestions) {
   // Get list of employees to choose from
   connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', function (err, employees, fields) {
      if (err) {
         console.log(err);
         mainQuestions();
         return;
      }

      // Ask user which employee to update
      inquirer.prompt([{
         type: 'list',
         name: 'employeeId',
         message: 'Select an employee to update their manager:',
         choices: employees.map(e => ({ name: e.name, value: e.id }))
      },
      {
         type: 'list',
         name: 'managerId',
         message: 'Select the new manager for this employee:',
         choices: employees.map(e => ({ name: e.name, value: e.id }))
      }]).then(res => {
         const { employeeId, managerId } = res;

         // Update employee's manager in the database
         connection.query('UPDATE employees SET manager_id = ? WHERE id = ?', [managerId, employeeId], function (err, results, fields) {
            if (err) {
               console.log(err);
            } else {
               console.log(`Employee's manager updated successfully!`);
            }
            mainQuestions();
         });
      });
   });
}


   
function viewEmployeesByManager(mainQuestions) {
   // Get list of managers to choose from
   connection.query(`
     SELECT DISTINCT m.id, CONCAT(m.first_name, ' ', m.last_name) AS name
     FROM employees e
     JOIN employees m ON m.id = e.manager_id
     ORDER BY m.id;
   `, function (err, managers, fields) {
     if (err) {
       console.error(err);
       mainQuestions();
       return;
     }
 
     // This asks user which manager to view employees for
     inquirer.prompt([
       {
         type: 'list',
         name: 'managerId',
         message: 'Select a manager to view their employees:',
         choices: managers.map(m => ({ name: m.name, value: m.id }))
       }
     ]).then(res => {
       const { managerId } = res;
 
       // This gets a list of employees for the selected manager
       connection.query(`
         SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
         FROM employees e
         JOIN roles r ON r.id = e.role_id
         JOIN departments d ON d.id = r.department_id
         LEFT JOIN employees m ON m.id = e.manager_id
         WHERE e.manager_id = ?
         ORDER BY e.id;
       `, [managerId], function (err, employees, fields) {
         if (err) {
           console.error(err);
         } else {
           // This prints the table of employees for the selected manager
           console.table(employees);
         }
         mainQuestions();
       });
     });
   });
 }
 
 function viewEmployeesByDepartment(mainQuestions) {
   // Query to get list of departments
   const departmentQuery = 'SELECT id, name FROM departments';
 
   // Query to get list of employees by department
   const employeeQuery = `
     SELECT 
       e.id, 
       e.first_name, 
       e.last_name, 
       r.title AS role, 
       d.name AS department 
     FROM 
       employees e 
       LEFT JOIN roles r ON e.role_id = r.id 
       LEFT JOIN departments d ON r.department_id = d.id 
     WHERE 
       d.id = ?
     ORDER BY 
       e.id
   `;
 
   // Get list of departments
   connection.query(departmentQuery, (err, departments) => {
     if (err) {
       console.error(err);
       return mainQuestions();
     }
 
     // Prompt user to select department
     inquirer
       .prompt([
         {
           type: 'list',
           name: 'departmentId',
           message: 'Select a department to view employees:',
           choices: departments.map((department) => ({
             name: department.name,
             value: department.id,
           })),
         },
       ])
       .then((res) => {
         const departmentId = res.departmentId;
 
         // Query to get list of employees in selected department
         connection.query(employeeQuery, departmentId, (err, employees) => {
           if (err) {
             console.error(err);
             return mainQuestions();
           }
 
           // Display list of employees in selected department
           console.table(employees);
 
           // Return to main menu
           mainQuestions();
         });
       });
   });
 }
 
 module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment };

 