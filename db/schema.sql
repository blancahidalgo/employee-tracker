DROP DATABASE IF EXISTS employee_data;
CREATE DATABASE employee_data;

USE employee_data;

-- Formatted table showing 
-- DEPARTMENT NAMES and DEPARTMENT ID'S
CREATE TABLE departments (
    department_id INT UNSIGNED AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_id)
);

-- Formatted table showing:
-- JOB TITLE, ROLE ID, DEPARTMENT, SALARY 
CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_department_id
  FOREIGN KEY (department_id)
  REFERENCES departments (department_id)
  ON DELETE CASCADE,
  PRIMARY KEY (role_id)

);

-- FULL TABLE HERE 
-- employee data including:
-- EMPLOYEE ID'S, FIRST & LAST NAME, JOB TITLES, DEPARTMENTS, SALARIES, and MANAGERS that the employees report to
CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  manager_id INT,
  salary DECIMAL(10, 2) NOT NULL,
  CONSTRAINT fk_role_id
  FOREIGN KEY (role_id)
  REFERENCES roles (role_id)
  ON DELETE CASCADE,
  PRIMARY KEY (employee_id)
);

--  I added department & salary to this table as per the README. Contradicts the simplified version on README
--  Still missing manager names in seeds - I've only got ID's. Do I need names? 






