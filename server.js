const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2'); 

const PORT = process.env.PORT || 8080;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// I originally moved my connection to a separate file. Is that better practice? It was here before. 







// Query database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  








