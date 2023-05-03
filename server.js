const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2'); 

const PORT = process.env.PORT || 8080;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Bootcamp123!',
    database: 'employee_data'
  },
  console.log(`Connected to the employee_data database.`)
);





















// Query database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  








