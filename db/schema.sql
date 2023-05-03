DROP DATABASE IF EXISTS employee_data;
CREATE DATABASE employee_data;

USE employee_data;

CREATE TABLE employees (
    employee_id INT NOT NULL,
    department VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (employee_id, department, role, salary)
);
