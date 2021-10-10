DROP DATABASE IF EXISTS employee_management;
CREATE DATABASE employee_management;

USE employee_management;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
  id INT NOT NULL PRIMARY KEY,
  dep_name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);