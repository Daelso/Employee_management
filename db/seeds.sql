INSERT INTO department (id, dep_name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Phrenology"),
       (004, "Basket Weaving")

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Salesman", 35000.00, 001),
       (002, "Engineer", 65000.00, 002),
       (003, "Skull Inspector", 25000.00, 003),
       (004, "Basket Weaver", 125000.00, 004)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Chris", "Long", 001, 25),
       (6, "Fred", "Durst", 002, 245),
       (8, "Charles", "Barkley", 003, 5),
       (25, "Ashley", "Tisdale", 004, 2)

