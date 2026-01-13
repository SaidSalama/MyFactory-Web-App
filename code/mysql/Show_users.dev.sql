-- Show Engineers
SELECT users.username AS Engineers, users.user_id  AS id
FROM users
WHERE users.role_id=1;


-- Show Engineers and the tasks they created
SELECT users.username AS Engineer , task.title AS Task_Created 
FROM users INNER JOIN task 
ON users.user_id=task.created_by;

-- Show Technician
SELECT users.username AS Technicians, users.user_id AS id
FROM users
WHERE users.role_id=2;

-- Show Technicians and the tasks assigned to them
SELECT users.username AS Technician , task.title AS Task_Assigned 
FROM users INNER JOIN task 
ON users.user_id=task.assigned_to;

-- Show Buisness Owners
SELECT users.username AS Buisness_Owners, users.user_id AS id
FROM users
WHERE users.role_id=3;

-- Show owners and their demands
SELECT users.username AS Buisness_Owners, demand.title AS Demand
FROM users INNER join demand
WHERE users.user_id=demand.created_by;