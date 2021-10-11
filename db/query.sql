-- Add your code below and execute file in MySQL Shell --
SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, roles.title, roles.salary,
FROM employee
JOIN roles ON employee.role_id = roles;