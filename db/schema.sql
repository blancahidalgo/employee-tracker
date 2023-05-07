DROP DATABASE IF EXISTS employee_data;
CREATE DATABASE employee_data;

USE employee_data;

-- Formatted table showing 
-- DEPARTMENT NAMES and DEPARTMENT ID'S
CREATE TABLE departments (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Formatted table showing:
-- JOB TITLE, ROLE ID, DEPARTMENT, SALARY 
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  department_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_department_id
  FOREIGN KEY (department_id)
  REFERENCES departments (id)
  ON DELETE CASCADE,
  PRIMARY KEY (id)

);

-- FULL TABLE HERE 
-- employee data including:
-- EMPLOYEE ID'S, FIRST & LAST NAME, JOB TITLES, DEPARTMENTS, SALARIES, and MANAGERS that the employees report to
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  CONSTRAINT fk_role_id
  FOREIGN KEY (role_id)
  REFERENCES roles (id)
  ON DELETE CASCADE,
  PRIMARY KEY (id)
);

--  I added department & salary to this table as per the README. Contradicts the simplified version on README
--  Still missing manager names in seeds - I've only got ID's. Do I need names? 






