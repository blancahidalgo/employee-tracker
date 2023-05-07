const inquirer = require('inquirer');
const db = require('./db/connection.js');
const mysql2 = require('mysql2');
const express = require('express');
const connection = require('./db/connection.js');
const router = express.Router();
const {mainQuestions} = require("./sources/main_questions");


 // Function call to main_questions 
 mainQuestions();




















// .then((answer) => {
//   switch (answer.choice) {
      
//       case 'View Employees':
          
//           viewEmployees();
//           break;
//       case 'View Roles':

//           viewRoles();
//           break;
//       case 'View Departments':

//           viewDepartments();
//           break;
//       case 'Add New Employee':

//           newEmployee();
//           break;

//           case 'Quit':

//           Quit();
//           break;
//  }
// }
// );


























// const express = require('express');
// const inquirer = require('inquirer');
// const mysql2 = require('mysql2'); 

// const PORT = process.env.PORT || 8080;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// // I originally moved my connection to a separate file. Is that better practice? It was here before. 







// // Query database
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  


// // MAIN QUESTIONS

// // ERROR TRYING TO RUN THE COMMAND LINE Q'S 
// // DO I EVEN NEED THIS SERVER.JS FILE HAVING INDEX.JS? 
// // WHY ARE MY PACKAGES IN GRAY? 
// // WHY IS MY CONNECTION NOT WORKING?





