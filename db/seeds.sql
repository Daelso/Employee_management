INSERT INTO department (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Phrenology"),
       ("Basket Weaving");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesman", 35000.00, 001),
       ("Engineer", 65000.00, 002),
       ("Skull Inspector", 25000.00, 003),
       ("Basket Weaver", 125000.00, 004);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Long", 001, 25),
       ( "Fred", "Durst", 002, 245),
       ( "Charles", "Barkley", 003, 5),
       ( "Ashley", "Tisdale", 004, 2);

