require('dotenv').config();
const mysql2 = require('mysql2');


// Connect to database
const connection = mysql2.createConnection(
    {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employee_data database.`)
  );

module.exports = connection;


    