-- 6. Users (password = "MySecret123!" hashed with SHA2-256)
/*INSERT INTO users (username, password, email, role_id) VALUES
('alice_eng', SHA2('MySecret123!', 256), 'alice@factory.com', 1),
('bob_tech',  SHA2('MySecret123!', 256), 'bob@factory.com',   2);*/

INSERT INTO users (username, password, email, role_id) VALUES
('Said', SHA2('MySecret123!', 256), 'said@factory.com', 1),
('Alexandre',  SHA2('MySecret123!', 256), 'alexandre@factory.com',   2),
('Bruno',  SHA2('MySecret123!', 256), 'Bruno@factory.com',   2),
('John',  SHA2('MySecret123!', 256), 'alexandre@factory.com',   3);
