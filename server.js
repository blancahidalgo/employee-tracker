const inquirer = require('inquirer');
const db = require('./db/connection.js');
const mysql2 = require('mysql2');
const express = require('express');
const connection = require('./db/connection.js');
const router = express.Router();
const {mainQuestions} = require("./sources/main_questions");


 // Function call to main_questions 
 mainQuestions();






























