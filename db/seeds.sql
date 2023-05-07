INSERT INTO departments (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Engineering"),
       ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Manager", 120000, 1),
        ("Marketing Manager", 125000, 2),
        ("Engineering Manager", 140000, 3),
        ("Finance Manager", 130000, 4);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Megan", "Barnard", 1, NULL),
        ("Blanca", "Hidalgo", 2, 1),
        ("Toby", "Carrol", 3, 2),
        ("Carol", "Helmore", 4, 2);












        

