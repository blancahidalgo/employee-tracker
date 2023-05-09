
# Blanca's SQL Employee Tracker 
  
## Description

The employee tracker CMS is a simple, command line application that allows users to request employee data within a company's database

## Table of Contents:
- [Overview](#Overview)
- [The Challenge](#The-Challenge)
- [Usage Information](#Usage-Information)
- [Built With](#Built-With)
- [Author](#Author)

# Overview

## The Challenge:

To create a command line application so HR managers within a commpany can retrieve data about their employees - via queries in the comman line that will return accurate tables with the information they need. 


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Usage Information
1. Click here to open the link to my repository - https://github.com/blancahidalgo/employee-tracker
2. Clone my repo to your local computer & initialise anny source code editor such as VS Code
3. Run MYSQL + the Sources - schema.swl & seeds.sql - quit & run 'node server.js'
4. With the arrows, navigate up & down the menu and select any queries 
5. Click enter - and you'll see the data/tables populate in the command line! 
6. Woohoo

Most importantly - a LINK TO MY WALKTTHROUGH VIDEO CAN BE FOUND HERE -> https://drive.google.com/file/d/1cLZMKelSQ2s95fFLziwdADOQDvWZPB3u/view

## Built With
- Dynamic JavaScript
- Node.js
- MySQL

## Author

Follow me on Github at [blancahidalgo] - (https://github.com/blancahidalgo)! - Any questions, don't hesidtate to reach out: b.hidalgo.ley@gmail.com 


